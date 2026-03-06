import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all orders with items
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, order: { totalAmount: number }) => sum + order.totalAmount, 0);

    // Get total leads
    const totalLeads = await prisma.lead.count();

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? (totalOrders / totalLeads) * 100 : 0;

    // Calculate average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate leads to orders rate
    const leadsToOrdersRate = totalLeads > 0 ? (totalOrders / totalLeads) * 100 : 0;

    // Get top products
    const productStats: Record<string, { name: string; orders: number; revenue: number }> = {};

    orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        const productName = item.product?.name || "Unknown";
        if (!productStats[productName]) {
          productStats[productName] = { name: productName, orders: 0, revenue: 0 };
        }
        productStats[productName].orders += item.quantity;
        productStats[productName].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    const recentLeads = await prisma.lead.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Group by date
    const activityByDate: Record<string, { orders: number; revenue: number; leads: number }> = {};

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      activityByDate[dateStr] = { orders: 0, revenue: 0, leads: 0 };
    }

    recentOrders.forEach((order: any) => {
      const dateStr = order.createdAt.toISOString().split("T")[0];
      if (activityByDate[dateStr]) {
        activityByDate[dateStr].orders += 1;
        activityByDate[dateStr].revenue += order.totalAmount;
      }
    });

    recentLeads.forEach((lead: any) => {
      const dateStr = lead.createdAt.toISOString().split("T")[0];
      if (activityByDate[dateStr]) {
        activityByDate[dateStr].leads += 1;
      }
    });

    const recentActivity = Object.entries(activityByDate).map(([date, data]) => ({
      date,
      ...data,
    }));

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      totalLeads,
      conversionRate,
      averageOrderValue,
      leadsToOrdersRate,
      topProducts,
      recentActivity,
    });

  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
