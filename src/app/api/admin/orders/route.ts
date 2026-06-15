import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/telegram";
import { normalizePhone } from "@/lib/phoneUtils";
import { normalizeNameForMatching } from "@/lib/textUtils";
import { findDuplicateCustomers } from "@/lib/customerDeduplication";
import { updateCustomerStats } from "@/lib/customerStats";
import { sendMetaPurchaseEvent } from "@/lib/metaConversionsAPI";

function generateOrderNumber() {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      address,
      city,
      zipCode,
      productId,
      quantity = 1,
      unitPrice,
      notes,
      source,
    } = body;

    if (!fullName || !phone || !address || !city || !productId || !Number.isInteger(unitPrice)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    if (unitPrice < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const phoneNormalized = normalizePhone(phone);
    const fullNameNormalized = normalizeNameForMatching(fullName);
    const duplicates = await findDuplicateCustomers(phone, email || null, fullName);

    let customer;

    if (duplicates.length > 0 && duplicates[0].confidence >= 0.95) {
      customer = await prisma.customer.findUnique({
        where: { id: duplicates[0].customerId },
      });

      if (!customer) {
        return NextResponse.json({ error: "Customer not found" }, { status: 404 });
      }

      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          fullName,
          fullNameNormalized,
          phone,
          phoneNormalized,
          email: email || customer.email || null,
          address,
          city,
          zipCode: zipCode || null,
        },
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          fullName,
          fullNameNormalized,
          phone,
          phoneNormalized,
          email: email || null,
          address,
          city,
          zipCode: zipCode || null,
        },
      });
    }

    const totalAmount = unitPrice * quantity;
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: customer.id,
        status: "CONFIRMED",
        totalAmount,
        notes: notes || null,
        source: source?.trim() || "Direktna prodaja",
        utmSource: "admin",
        utmMedium: "direct",
        items: {
          create: [
            {
              productId: product.id,
              quantity,
              price: unitPrice,
            },
          ],
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    try {
      await sendOrderNotification({
        orderNumber: order.orderNumber,
        customerName: customer.fullName,
        phone: customer.phone,
        address: customer.address || "Nije uneseno",
        city: customer.city || "Nije uneseno",
        zipCode: customer.zipCode || undefined,
        totalAmount: order.totalAmount,
        products: [
          {
            name: product.name,
            quantity,
            price: unitPrice,
          },
        ],
        source: source?.trim() || "Direktna prodaja",
        utmSource: "admin",
      });
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }

    // Send Meta Conversions API event for offline/manual orders
    try {
      const sourceLabel = source?.trim()?.toLowerCase() || '';
      let actionSource: 'phone_call' | 'physical_store' | 'other' = 'other';

      // Determine action source based on order source
      if (sourceLabel.includes('whatsapp') || sourceLabel.includes('telefon') || sourceLabel.includes('phone')) {
        actionSource = 'phone_call';
      } else if (sourceLabel.includes('shop') || sourceLabel.includes('trgovina')) {
        actionSource = 'physical_store';
      }

      await sendMetaPurchaseEvent({
        orderId: order.orderNumber,
        value: totalAmount / 100, // Convert from cents to BAM
        currency: 'BAM',
        contentIds: [product.id],
        contentName: product.name,
        customer: {
          email: customer.email,
          phone: customer.phone,
          fullName: customer.fullName,
          city: customer.city,
          zipCode: customer.zipCode,
        },
        eventSourceUrl: 'https://aurorashop.ba',
        actionSource: actionSource,
      });

      console.log(`[Meta Conversions API] Offline Purchase event sent (${actionSource})`);
    } catch (error) {
      console.error('[Meta Conversions API] Failed to send offline event:', error);
    }

    await updateCustomerStats(customer.id);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Admin order creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
