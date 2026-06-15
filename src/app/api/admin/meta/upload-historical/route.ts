import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sendMetaConversionEvent } from "@/lib/metaConversionsAPI";

/**
 * Upload historical orders to Meta Conversions API
 *
 * Query parameters:
 * - days: Number of days back to upload (default: 7, max: 62)
 * - status: Filter by order status (optional, e.g., "CONFIRMED,DELIVERED")
 * - dryRun: If true, only logs what would be sent without actually sending (default: false)
 */
async function uploadHistoricalOrders(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const daysBack = Math.min(parseInt(searchParams.get('days') || '7'), 62);
    const statusFilterRaw = searchParams.get('status')?.split(',');
    const dryRun = searchParams.get('dryRun') === 'true';

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Build where clause
    const whereClause: any = {
      createdAt: {
        gte: startDate,
      },
    };

    if (statusFilterRaw && statusFilterRaw.length > 0) {
      whereClause.status = { in: statusFilterRaw };
    }

    // Fetch historical orders
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`[Meta Historical Upload] Found ${orders.length} orders from last ${daysBack} days`);

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        message: `Found ${orders.length} orders. Run without dryRun=true to upload.`,
        orders: orders.map(o => ({
          orderNumber: o.orderNumber,
          createdAt: o.createdAt,
          totalAmount: o.totalAmount,
          totalAmountBAM: (o.totalAmount / 100).toFixed(2) + ' KM',
          customerName: o.customer.fullName,
          source: o.source || 'N/A',
          utmSource: o.utmSource || 'N/A',
        })),
      });
    }

    const results = {
      total: orders.length,
      sent: 0,
      failed: 0,
      errors: [] as any[],
    };

    // Upload each order
    for (const order of orders) {
      try {
        // Determine action source
        const sourceLabel = order.source?.toLowerCase() || '';
        let actionSource: 'website' | 'phone_call' | 'physical_store' | 'other' = 'other';

        if (order.utmSource === 'admin') {
          // Manual/offline order
          if (sourceLabel.includes('whatsapp') || sourceLabel.includes('telefon') || sourceLabel.includes('phone')) {
            actionSource = 'phone_call';
          } else if (sourceLabel.includes('shop') || sourceLabel.includes('trgovina')) {
            actionSource = 'physical_store';
          }
        } else {
          // Web order
          actionSource = 'website';
        }

        // Get product info
        const productIds = order.items.map(item => item.product.id);
        const productName = order.items.map(item => item.product.name).join(', ');

        // Send Purchase event with historical timestamp
        await sendMetaConversionEvent({
          eventName: 'Purchase',
          eventSourceUrl: 'https://aurorashop.ba',
          eventTime: Math.floor(order.createdAt.getTime() / 1000), // Convert to Unix timestamp
          actionSource: actionSource,
          userData: {
            email: order.customer.email || undefined,
            phone: order.customer.phone,
            fullName: order.customer.fullName,
            city: order.customer.city || undefined,
            zipCode: order.customer.zipCode || undefined,
            country: 'ba',
          },
          customData: {
            value: order.totalAmount / 100, // Convert from cents to BAM
            currency: 'BAM',
            contentIds: productIds,
            contentName: productName,
            contentType: 'product',
            orderId: order.orderNumber,
          },
        });

        results.sent++;
        console.log(`[Meta Historical Upload] Sent order ${order.orderNumber} (${order.createdAt.toISOString()})`);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error: any) {
        results.failed++;
        results.errors.push({
          orderNumber: order.orderNumber,
          error: error.message,
        });
        console.error(`[Meta Historical Upload] Failed to send order ${order.orderNumber}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Uploaded ${results.sent} of ${results.total} orders`,
      results,
    });

  } catch (error) {
    console.error("[Meta Historical Upload] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Support both GET and POST methods
export async function GET(request: NextRequest) {
  return uploadHistoricalOrders(request);
}

export async function POST(request: NextRequest) {
  return uploadHistoricalOrders(request);
}
