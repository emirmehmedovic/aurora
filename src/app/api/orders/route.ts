import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const productMap: Record<string, { name: string; price: number }> = {
      "ice-cool-pro": { name: "Ice Cool PRO™", price: 172.50 },
      "ice-cool-pro-max": { name: "Ice Cool PRO™ Max", price: 199.00 },
      "ice-cool-lite": { name: "Ice Cool Lite™", price: 149.00 }
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
        productInterest: productInfo.name,
        source: utmSource,
        status: "NEW",
        notes: notes || null,
        utmSource,
        utmMedium,
        utmCampaign
      }
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        status: "PENDING",
        totalAmount: productInfo.price,
        shippingAddress: `${address}, ${city}${zipCode ? `, ${zipCode}` : ""}`,
        paymentMethod: "CASH_ON_DELIVERY",
        utmSource,
        utmMedium,
        utmCampaign,
        notes: notes || null,
        items: {
          create: [
            {
              productName: productInfo.name,
              quantity: 1,
              price: productInfo.price,
              total: productInfo.price
            }
          ]
        }
      },
      include: {
        items: true,
        customer: true
      }
    });

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
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        items: true
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
