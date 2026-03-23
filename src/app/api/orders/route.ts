import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, address, city, zipCode, product, notes } = body;

    // Validate required fields
    if (!fullName || !phone || !address || !city || !product) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get product details
    const productMap: Record<string, { id: string; name: string; price: number }> = {
      "ice-cool-pro": { id: "ice-cool-pro-1", name: "ICE COOL PRO", price: 17500 },
      "ice-cool-pro-max": { id: "ice-cool-pro-max-1", name: "ICE COOL Max", price: 19000 },
      "ice-cool-lite": { id: "ice-cool-lite-1", name: "ICE COOL LITE", price: 16500 }
    };

    const productInfo = productMap[product];
    if (!productInfo) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    // Extract UTM parameters from headers or query
    const utmSource = request.nextUrl.searchParams.get("utm_source") || "direct";
    const utmMedium = request.nextUrl.searchParams.get("utm_medium") || "none";
    const utmCampaign = request.nextUrl.searchParams.get("utm_campaign") || "none";

    // Create or find customer
    let customer = await prisma.customer.findFirst({
      where: {
        OR: [
          { phone },
          email ? { email } : {}
        ]
      }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName,
          phone,
          email: email || null,
          address,
          city,
          zipCode: zipCode || null
        }
      });
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        source: utmSource,
        status: "NEW",
        notes: notes || null,
        utmSource,
        utmMedium,
        utmCampaign
      }
    });

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        status: "NEW",
        totalAmount: productInfo.price,
        utmSource,
        utmMedium,
        utmCampaign,
        notes: notes || null,
        items: {
          create: [
            {
              product: {
                connect: { id: productInfo.id }
              },
              quantity: 1,
              price: productInfo.price
            }
          ]
        }
      },
      include: {
        items: true,
        customer: true
      }
    });

    // Send Telegram notification
    try {
      await sendOrderNotification({
        orderNumber: order.orderNumber,
        customerName: customer.fullName,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        zipCode: customer.zipCode || undefined,
        totalAmount: order.totalAmount,
        products: [
          {
            name: productInfo.name,
            quantity: 1,
            price: productInfo.price
          }
        ],
        source: utmSource,
        utmSource: utmSource !== 'direct' ? utmSource : undefined,
        utmCampaign: utmCampaign !== 'none' ? utmCampaign : undefined
      });
    } catch (error) {
      // Log error but don't fail the order
      console.error('Failed to send Telegram notification:', error);
    }

    // TODO: Send email notification
    // TODO: Send SMS notification

    // Track conversion
    console.log("Order created:", {
      orderId: order.id,
      leadId: lead.id,
      value: productInfo.price,
      product: productInfo.name
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      leadId: lead.id,
      value: productInfo.price,
      message: "Narudžba uspješno kreirana"
    });

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get recent orders (for admin)
    const dbOrders = await prisma.order.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Map db response to expected frontend structure
    const orders = dbOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount / 100, // Assuming stored in cents, but if not we should check. Wait, price above is 17500 so yes it's cents
      createdAt: order.createdAt,
      notes: order.notes,
      customer: {
        fullName: order.customer.fullName,
        phone: order.customer.phone,
        email: order.customer.email,
      },
      shippingAddress: order.customer.address,
      city: order.customer.city,
      zipCode: order.customer.zipCode,
      items: order.items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price / 100
      }))
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
