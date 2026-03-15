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

    // ---- UTM Campaign Performance ----
    const allOrders = await prisma.order.findMany({
      where: { status: { not: "CANCELLED" } },
      select: {
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    const allLeads = await prisma.lead.findMany({
      select: {
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        landingPage: true,
        status: true,
        createdAt: true,
      },
    });

    // Group orders by UTM source
    const sourceStats: Record<string, { orders: number; revenue: number; leads: number }> = {};
    
    allOrders.forEach((order) => {
      const src = order.utmSource || "direct";
      if (!sourceStats[src]) sourceStats[src] = { orders: 0, revenue: 0, leads: 0 };
      sourceStats[src].orders += 1;
      sourceStats[src].revenue += order.totalAmount;
    });

    allLeads.forEach((lead) => {
      const src = lead.utmSource || "direct";
      if (!sourceStats[src]) sourceStats[src] = { orders: 0, revenue: 0, leads: 0 };
      sourceStats[src].leads += 1;
    });

    const sourceBreakdown = Object.entries(sourceStats)
      .map(([source, data]) => ({
        source,
        ...data,
        conversionRate: data.leads > 0 ? ((data.orders / data.leads) * 100) : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Group orders by UTM campaign
    const campaignStats: Record<string, { orders: number; revenue: number; leads: number }> = {};

    allOrders.forEach((order) => {
      const campaign = order.utmCampaign || "(bez kampanje)";
      if (!campaignStats[campaign]) campaignStats[campaign] = { orders: 0, revenue: 0, leads: 0 };
      campaignStats[campaign].orders += 1;
      campaignStats[campaign].revenue += order.totalAmount;
    });

    allLeads.forEach((lead) => {
      const campaign = lead.utmCampaign || "(bez kampanje)";
      if (!campaignStats[campaign]) campaignStats[campaign] = { orders: 0, revenue: 0, leads: 0 };
      campaignStats[campaign].leads += 1;
    });

    const campaignBreakdown = Object.entries(campaignStats)
      .map(([campaign, data]) => ({
        campaign,
        ...data,
        conversionRate: data.leads > 0 ? ((data.orders / data.leads) * 100) : 0,
        cpa: data.orders > 0 ? (data.revenue / data.orders) : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // ---- Landing Page Performance ----
    const landingPageStats: Record<string, { leads: number; converted: number }> = {};

    allLeads.forEach((lead) => {
      const page = lead.landingPage || "(direktan pristup)";
      if (!landingPageStats[page]) landingPageStats[page] = { leads: 0, converted: 0 };
      landingPageStats[page].leads += 1;
      if (lead.status === "CONFIRMED") {
        landingPageStats[page].converted += 1;
      }
    });

    const landingPageBreakdown = Object.entries(landingPageStats)
      .map(([page, data]) => ({
        page,
        ...data,
        conversionRate: data.leads > 0 ? ((data.converted / data.leads) * 100) : 0,
      }))
      .sort((a, b) => b.leads - a.leads);

    // ---- Daily Trends (last 30 days) ----
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrders = allOrders.filter((o) => o.createdAt >= thirtyDaysAgo);
    const recentLeads = allLeads.filter((l) => l.createdAt >= thirtyDaysAgo);

    const dailyTrends: Record<string, { orders: number; revenue: number; leads: number }> = {};

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dailyTrends[d.toISOString().split("T")[0]] = { orders: 0, revenue: 0, leads: 0 };
    }

    recentOrders.forEach((order) => {
      const key = order.createdAt.toISOString().split("T")[0];
      if (dailyTrends[key]) {
        dailyTrends[key].orders += 1;
        dailyTrends[key].revenue += order.totalAmount;
      }
    });

    recentLeads.forEach((lead) => {
      const key = lead.createdAt.toISOString().split("T")[0];
      if (dailyTrends[key]) {
        dailyTrends[key].leads += 1;
      }
    });

    const dailyData = Object.entries(dailyTrends).map(([date, data]) => ({ date, ...data }));

    // ---- Lead Status Breakdown ----
    const leadStatusCounts = await prisma.lead.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const leadStatusBreakdown = leadStatusCounts.map((s) => ({
      status: s.status,
      count: s._count.id,
    }));

    // ---- Summary ----
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((s, o) => s + o.totalAmount, 0);
    const totalLeads = allLeads.length;
    const paidOrders = allOrders.filter((o) => o.utmSource && o.utmSource !== "direct").length;
    const organicOrders = totalOrders - paidOrders;
    const paidRevenue = allOrders
      .filter((o) => o.utmSource && o.utmSource !== "direct")
      .reduce((s, o) => s + o.totalAmount, 0);

    return NextResponse.json({
      summary: {
        totalOrders,
        totalRevenue,
        totalLeads,
        paidOrders,
        organicOrders,
        paidRevenue,
        organicRevenue: totalRevenue - paidRevenue,
        overallConversion: totalLeads > 0 ? ((totalOrders / totalLeads) * 100) : 0,
      },
      sourceBreakdown,
      campaignBreakdown,
      landingPageBreakdown,
      dailyData,
      leadStatusBreakdown,
    });
  } catch (error) {
    console.error("Tracking analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
