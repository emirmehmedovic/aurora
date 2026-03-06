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
    const productMap: Record<string, { id: string; name: string; price: number }> = {
      "ice-cool-pro": { id: "ice-cool-pro-1", name: "Ice Cool PRO™", price: 17250 },
      "ice-cool-pro-max": { id: "ice-cool-pro-max-1", name: "Ice Cool PRO™ Max", price: 19900 },
      "ice-cool-lite": { id: "ice-cool-lite-1", name: "Ice Cool Lite™", price: 14900 }
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
