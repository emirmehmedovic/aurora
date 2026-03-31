import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDailySummary } from '@/lib/telegram';

/**
 * Generate and send daily summary to Telegram
 * This endpoint should be called by a cron job at 00:05
 * POST /api/telegram/daily-summary
 *
 * Optional: Pass date in query params to generate for specific date
 * Example: ?date=2026-03-22
 */
export async function POST(request: NextRequest) {
  try {
    // Require cron secret for every invocation.
    const cronSecret = request.headers.get('x-cron-secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (!expectedSecret || cronSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get date from query params or use yesterday
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    let targetDate: Date;
    if (dateParam) {
      targetDate = new Date(dateParam);
    } else {
      // Default to yesterday
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - 1);
    }

    // Set to start and end of day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch orders for the day
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Separate cancelled orders from confirmed/shipped ones
    const cancelledOrders = orders.filter(o => o.status === 'CANCELLED');
    const validOrders = orders.filter(o => ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'].includes(o.status));

    // Fetch leads for the day
    const leads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // Calculate statistics (only count confirmed/shipped orders for revenue)
    const totalOrders = orders.length; // All orders
    const confirmedOrders = validOrders.length; // Orders that count towards revenue
    const totalRevenue = validOrders.reduce((sum, order) => sum + order.totalAmount, 0); // Only valid orders
    const cancelledCount = cancelledOrders.length;
    const newLeads = leads.length;

    // Calculate top products (from valid orders only)
    const productCounts: { [key: string]: { name: string; count: number } } = {};
    validOrders.forEach(order => {
      order.items.forEach(item => {
        const key = item.product.name;
        if (!productCounts[key]) {
          productCounts[key] = { name: key, count: 0 };
        }
        productCounts[key].count += item.quantity;
      });
    });
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate orders by status (all orders)
    const statusCounts: { [key: string]: number } = {};
    orders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));

    // Calculate orders by source (only valid orders)
    const sourceCounts: { [key: string]: number } = {};
    validOrders.forEach(order => {
      const source = order.source || 'Direktno';
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });
    const ordersBySource = Object.entries(sourceCounts).map(([source, count]) => ({
      source,
      count
    }));

    // Format date for display
    const dateStr = targetDate.toLocaleDateString('bs-BA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Send daily summary
    await sendDailySummary({
      date: dateStr,
      totalOrders,
      confirmedOrders,
      cancelledOrders: cancelledCount,
      totalRevenue,
      newLeads,
      topProducts,
      ordersByStatus,
      ordersBySource
    });

    return NextResponse.json({
      success: true,
      message: 'Daily summary sent successfully',
      stats: {
        date: dateStr,
        totalOrders,
        confirmedOrders,
        cancelledOrders: cancelledCount,
        totalRevenue: totalRevenue / 100,
        newLeads,
        topProducts,
        ordersByStatus,
        ordersBySource
      }
    });
  } catch (error) {
    console.error('Error sending daily summary:', error);
    return NextResponse.json(
      { error: 'Failed to send daily summary' },
      { status: 500 }
    );
  }
}
