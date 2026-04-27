import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { startOfDay, subDays, format, eachDayOfInterval } from "date-fns";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");

    // Handle different endpoints
    if (endpoint === "sales-trend") {
      return handleSalesTrend(searchParams);
    } else if (endpoint === "top-products") {
      return handleTopProducts(searchParams);
    } else if (endpoint === "conversion-funnel") {
      return handleConversionFunnel();
    } else if (endpoint === "peak-hours") {
      return handlePeakHours();
    } else if (endpoint === "live-activity") {
      return handleLiveActivity();
    }

    // Default stats endpoint
    return handleDefaultStats();

  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleDefaultStats() {
  // Get total orders (excluding cancelled and returned)
  const totalOrders = await prisma.order.count({
    where: { status: { notIn: ["CANCELLED", "RETURNED"] } }
  });

  // Get total revenue (excluding cancelled and returned)
  const orders = await prisma.order.findMany({
    where: { status: { notIn: ["CANCELLED", "RETURNED"] } },
    select: { totalAmount: true }
  });
  const totalRevenue = orders.reduce((sum: number, order: { totalAmount: number }) => sum + order.totalAmount, 0);

  // Get total leads
  const totalLeads = await prisma.lead.count();

  // Calculate conversion rate
  const conversionRate = totalLeads > 0 ? (totalOrders / totalLeads) * 100 : 0;

  // Get pending orders
  const pendingOrders = await prisma.order.count({
    where: { status: "NEW" }
  });

  // Get new leads (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newLeads = await prisma.lead.count({
    where: {
      createdAt: { gte: sevenDaysAgo },
      status: "NEW"
    }
  });

  return NextResponse.json({
    totalOrders,
    totalRevenue,
    totalLeads,
    conversionRate,
    pendingOrders,
    newLeads,
  });
}

async function handleSalesTrend(searchParams: URLSearchParams) {
  const days = parseInt(searchParams.get("days") || "30");
  const endDate = startOfDay(new Date());
  const startDate = subDays(endDate, days - 1);

  // Get all dates in range
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  // Get orders grouped by date (excluding cancelled and returned)
  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: startDate },
      status: { notIn: ["CANCELLED", "RETURNED"] }
    },
    select: {
      createdAt: true,
      totalAmount: true,
    }
  });

  // Group by date
  const dataByDate = new Map<string, { revenue: number; orders: number }>();

  dateRange.forEach(date => {
    const dateStr = format(date, "yyyy-MM-dd");
    dataByDate.set(dateStr, { revenue: 0, orders: 0 });
  });

  orders.forEach(order => {
    const dateStr = format(startOfDay(order.createdAt), "yyyy-MM-dd");
    const existing = dataByDate.get(dateStr);
    if (existing) {
      existing.revenue += order.totalAmount;
      existing.orders += 1;
    }
  });

  const dates = Array.from(dataByDate.keys()).sort();
  const revenue = dates.map(date => dataByDate.get(date)!.revenue);
  const orderCounts = dates.map(date => dataByDate.get(date)!.orders);

  return NextResponse.json({
    dates,
    revenue,
    orders: orderCounts
  });
}

async function handleTopProducts(searchParams: URLSearchParams) {
  const limit = parseInt(searchParams.get("limit") || "5");

  const topProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
      price: true,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc"
      }
    },
    take: limit,
  });

  // Get product details
  const productIds = topProducts.map(p => p.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, images: true }
  });

  const productMap = new Map(products.map(p => [p.id, p]));

  const result = topProducts.map(item => {
    const product = productMap.get(item.productId);
    return {
      name: product?.name || "Unknown",
      count: item._sum.quantity || 0,
      revenue: item._sum.price || 0,
      image: product?.images?.[0] || null,
    };
  });

  return NextResponse.json(result);
}

async function handleConversionFunnel() {
  const totalLeads = await prisma.lead.count();

  const contacted = await prisma.lead.count({
    where: { status: { in: ["CALLED", "CONFIRMED", "FOLLOW_UP", "CANCELLED"] } }
  });

  const qualified = await prisma.lead.count({
    where: { status: { in: ["CONFIRMED", "FOLLOW_UP"] } }
  });

  const converted = await prisma.order.count();

  const conversionRate = totalLeads > 0 ? (converted / totalLeads) : 0;

  return NextResponse.json({
    leads: totalLeads,
    contacted,
    qualified,
    converted,
    rate: conversionRate,
  });
}

async function handlePeakHours() {
  const thirtyDaysAgo = subDays(new Date(), 30);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true }
  });

  const hourCounts = new Map<number, number>();
  for (let i = 0; i < 24; i++) {
    hourCounts.set(i, 0);
  }

  orders.forEach(order => {
    const hour = order.createdAt.getHours();
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  });

  const result = Array.from(hourCounts.entries())
    .map(([hour, orders]) => ({ hour, orders }))
    .sort((a, b) => a.hour - b.hour);

  return NextResponse.json(result);
}

async function handleLiveActivity() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      items: {
        include: { product: true }
      }
    }
  });

  // Get recent leads
  const recentLeads = await prisma.lead.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      phone: true,
      status: true,
      createdAt: true,
    }
  });

  // Count new orders in last hour
  const newOrdersLastHour = await prisma.order.count({
    where: { createdAt: { gte: oneHourAgo } }
  });

  const newLeadsLastHour = await prisma.lead.count({
    where: { createdAt: { gte: oneHourAgo } }
  });

  return NextResponse.json({
    recentOrders,
    recentLeads,
    newOrdersLastHour,
    newLeadsLastHour,
  });
}
