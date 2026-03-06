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

    // Get total orders
    const totalOrders = await prisma.order.count();

    // Get total revenue
    const orders = await prisma.order.findMany({
      where: { status: { not: "CANCELLED" } },
      select: { totalAmount: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Get total leads
    const totalLeads = await prisma.lead.count();

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? (totalOrders / totalLeads) * 100 : 0;

    // Get pending orders
    const pendingOrders = await prisma.order.count({
      where: { status: "PENDING" }
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

  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
