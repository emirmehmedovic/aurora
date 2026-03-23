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
    // Verify cron secret (optional security)
    const cronSecret = request.headers.get('x-cron-secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && cronSecret !== expectedSecret) {
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

    // Fetch leads for the day
    const leads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const newLeads = leads.length;

    // Calculate top products
    const productCounts: { [key: string]: { name: string; count: number } } = {};
    orders.forEach(order => {
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

    // Calculate orders by status
    const statusCounts: { [key: string]: number } = {};
    orders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));

    // Calculate orders by source
    const sourceCounts: { [key: string]: number } = {};
    orders.forEach(order => {
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
