import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/telegram";
import { normalizePhone } from '@/lib/phoneUtils';
import { normalizeNameForMatching } from '@/lib/textUtils';
import { findDuplicateCustomers } from '@/lib/customerDeduplication';
import { updateCustomerStats } from '@/lib/customerStats';
import { getStorefrontProductBySlug } from "@/lib/storefront-products";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { formatOrderSourceLabel, formatWebOrderSource } from "@/lib/order-source";
import { sendMetaPurchaseEvent, sendMetaLeadEvent } from "@/lib/metaConversionsAPI";
import { sendOrderConfirmation } from "@/lib/messaging";
import { z } from "zod";

const MIN_FORM_FILL_MS = 1000;

const publicOrderSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  address: z.string().trim().min(4).max(200),
  city: z.string().trim().min(2).max(100),
  zipCode: z.string().trim().max(20).optional().or(z.literal("")),
  product: z.string().trim().min(1).max(100),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  sourcePath: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`public-order:${ip}`, 12, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Previše zahtjeva. Pokušajte ponovo kasnije." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = publicOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Neispravni podaci forme" }, { status: 400 });
    }

    const {
      fullName,
      phone,
      email,
      address,
      city,
      zipCode,
      product,
      notes,
      sourcePath,
      website,
      formStartedAt,
    } = parsed.data;

    if (website) {
      return NextResponse.json({ success: true, message: "Narudžba uspješno kreirana" });
    }

    if (!formStartedAt || Date.now() - formStartedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json(
        { error: "Forma je poslana prebrzo. Pokušajte ponovo." },
        { status: 400 }
      );
    }

    const landingPage = sourcePath || null;
    const orderSourceLabel = formatWebOrderSource(sourcePath);

    const productInfo = await getStorefrontProductBySlug(product);
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

    // Normalize for matching
    const phoneNorm = normalizePhone(phone);
    const nameNorm = normalizeNameForMatching(fullName);

    // Check for duplicates
    const duplicates = await findDuplicateCustomers(phone, email || null, fullName);

    let customer;
    if (duplicates.length > 0 && duplicates[0].confidence >= 0.95) {
      // Use existing customer (high confidence match)
      customer = await prisma.customer.findUnique({
        where: { id: duplicates[0].customerId }
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      // Update if more complete data provided
      const updateData: any = {};
      if (!customer.email && email) updateData.email = email;
      if (!customer.address && address) updateData.address = address;
      if (!customer.city && city) updateData.city = city;
      if (!customer.zipCode && zipCode) updateData.zipCode = zipCode;

      if (Object.keys(updateData).length > 0) {
        customer = await prisma.customer.update({
          where: { id: customer.id },
          data: updateData
        });
      }
    } else {
      // Create new customer
      customer = await prisma.customer.create({
        data: {
          fullName,
          fullNameNormalized: nameNorm,
          phone,
          phoneNormalized: phoneNorm,
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
        landingPage,
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
        source: orderSourceLabel,
        totalAmount: Math.round(productInfo.price * 100),
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
              price: Math.round(productInfo.price * 100)
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
        address: customer.address || 'Nije uneseno',
        city: customer.city || 'Nije uneseno',
        zipCode: customer.zipCode || undefined,
        totalAmount: order.totalAmount,
        products: [
          {
            name: productInfo.name,
            quantity: 1,
            price: Math.round(productInfo.price * 100)
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

    // Send Meta Conversions API events (server-side tracking)
    try {
      // Send Purchase event
      await sendMetaPurchaseEvent({
        orderId: order.orderNumber,
        value: productInfo.price,
        currency: 'BAM',
        contentIds: [productInfo.id],
        contentName: productInfo.name,
        customer: {
          email: customer.email,
          phone: customer.phone,
          fullName: customer.fullName,
          city: customer.city,
          zipCode: customer.zipCode,
        },
        eventSourceUrl: `https://aurorashop.ba${sourcePath || '/naruci'}`,
        actionSource: 'website',
      });

      // Send Lead event
      await sendMetaLeadEvent({
        leadId: lead.id,
        customer: {
          email: customer.email,
          phone: customer.phone,
          fullName: customer.fullName,
          city: customer.city,
          zipCode: customer.zipCode,
        },
        eventSourceUrl: `https://aurorashop.ba${sourcePath || '/naruci'}`,
        actionSource: 'website',
      });

      console.log('[Meta Conversions API] Purchase and Lead events sent successfully');
    } catch (error) {
      // Log error but don't fail the order
      console.error('[Meta Conversions API] Failed to send events:', error);
    }

    // Send WhatsApp/Viber confirmation message
    try {
      await sendOrderConfirmation({
        customerName: customer.fullName,
        customerPhone: customer.phone,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        productName: productInfo.name,
      });
      console.log('[Order] WhatsApp/Viber confirmation sent');
    } catch (error) {
      // Log error but don't fail the order
      console.error('[Order] Failed to send WhatsApp/Viber:', error);
    }

    // TODO: Send email notification

    // Update customer stats
    await updateCustomerStats(customer.id);

    // Track conversion
    console.log("Order created:", {
      orderId: order.id,
      leadId: lead.id,
      value: Math.round(productInfo.price * 100),
      product: productInfo.name
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      leadId: lead.id,
      value: Math.round(productInfo.price * 100),
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters for filtering and pagination
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build where clause
    const whereClause: any = {};

    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) whereClause.createdAt.gte = new Date(dateFrom);
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999); // Include entire day
        whereClause.createdAt.lte = endDate;
      }
    }

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customer: { fullName: { contains: search, mode: 'insensitive' } } },
        { customer: { phone: { contains: search } } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.order.count({ where: whereClause });

    // Get aggregate stats for ALL filtered orders (not just current page)
    const allFilteredOrders = await prisma.order.findMany({
      where: whereClause,
      select: {
        totalAmount: true,
        status: true,
        items: {
          select: {
            quantity: true,
          },
        },
      },
    });

    // Calculate aggregate stats
    const validOrders = allFilteredOrders.filter(
      (o) => o.status !== 'CANCELLED' && o.status !== 'RETURNED'
    );

    const totalRevenue = validOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrdersCount = validOrders.length;
    const totalPurchaseCost = validOrders.reduce((sum, order) => {
      const totalQuantity = order.items.reduce((qty, item) => qty + item.quantity, 0);
      return sum + totalQuantity * 3000; // 30 KM per item in cents
    }, 0);
    const netProfit = totalRevenue - totalPurchaseCost;

    // Get orders with filters
    const dbOrders = await prisma.order.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              include: {
                galleryImages: {
                  orderBy: [{ isCover: "desc" }, { order: "asc" }],
                  select: {
                    media: {
                      select: {
                        url: true,
                      },
                    },
                  },
                },
              },
            },
          }
        }
      }
    });

    // Map db response to expected frontend structure
    const orders = dbOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      source: formatOrderSourceLabel(order.source, order.utmSource, order.utmCampaign),
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      notes: order.notes,
      customer: {
        id: order.customer.id,
        fullName: order.customer.fullName,
        phone: order.customer.phone,
        email: order.customer.email,
        address: order.customer.address,
        city: order.customer.city,
        zipCode: order.customer.zipCode,
      },
      shippingAddress: order.customer.address,
      city: order.customer.city,
      zipCode: order.customer.zipCode,
      items: order.items.map((item) => {
        const galleryImages = item.product.galleryImages.map((image) => image.media.url);
        const images = galleryImages.length > 0 ? galleryImages : item.product.images;

        return {
          id: item.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price,
          product: {
            id: item.product.id,
            name: item.product.name,
            images,
          },
        };
      })
    }));

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      stats: {
        totalRevenue,
        totalOrdersCount,
        totalPurchaseCost,
        netProfit,
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
