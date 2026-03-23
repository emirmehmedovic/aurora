import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");
    const model = searchParams.get("model") || "lastTouch";

    if (endpoint === "attribution") {
      return handleAttribution(model);
    } else if (endpoint === "funnel") {
      const campaignId = searchParams.get("campaignId");
      return handleFunnel(campaignId);
    } else if (endpoint === "compare") {
      const ids = searchParams.get("ids")?.split(",") || [];
      return handleCompare(ids);
    } else if (endpoint === "roi") {
      return handleROI();
    }

    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  } catch (error) {
    console.error("Campaign analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleAttribution(model: string) {
  // Get all orders with campaign data
  const orders = await prisma.order.findMany({
    where: { status: { not: "CANCELLED" } },
    select: {
      id: true,
      totalAmount: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      attributedCampaign: true,
      adCost: true,
      createdAt: true,
    },
  });

  // Get all leads with attribution data
  const leads = await prisma.lead.findMany({
    select: {
      id: true,
      utmSource: true,
      utmCampaign: true,
      firstTouch: true,
      lastTouch: true,
      createdAt: true,
    },
  });

  // Group by campaign based on attribution model
  const campaignStats = new Map<string, {
    revenue: number;
    orders: number;
    leads: number;
    adCost: number;
    roas: number;
    cpa: number;
  }>();

  orders.forEach(order => {
    let campaign = "Direct";

    if (model === "firstTouch") {
      campaign = order.utmCampaign || "Direct";
    } else if (model === "lastTouch") {
      campaign = order.attributedCampaign || order.utmCampaign || "Direct";
    }

    const existing = campaignStats.get(campaign) || {
      revenue: 0,
      orders: 0,
      leads: 0,
      adCost: 0,
      roas: 0,
      cpa: 0,
    };

    existing.revenue += order.totalAmount;
    existing.orders += 1;
    existing.adCost += order.adCost || 0;

    campaignStats.set(campaign, existing);
  });

  // Add leads to stats
  leads.forEach(lead => {
    let campaign = "Direct";

    if (model === "firstTouch") {
      campaign = lead.firstTouch || lead.utmCampaign || "Direct";
    } else if (model === "lastTouch") {
      campaign = lead.lastTouch || lead.utmCampaign || "Direct";
    }

    const existing = campaignStats.get(campaign) || {
      revenue: 0,
      orders: 0,
      leads: 0,
      adCost: 0,
      roas: 0,
      cpa: 0,
    };

    existing.leads += 1;
    campaignStats.set(campaign, existing);
  });

  // Calculate ROAS and CPA
  const result = Array.from(campaignStats.entries()).map(([campaign, stats]) => {
    const roas = stats.adCost > 0 ? stats.revenue / stats.adCost : 0;
    const cpa = stats.orders > 0 ? stats.adCost / stats.orders : 0;

    return {
      campaign,
      ...stats,
      roas,
      cpa,
    };
  });

  return NextResponse.json({
    model,
    campaigns: result.sort((a, b) => b.revenue - a.revenue),
  });
}

async function handleFunnel(campaignId: string | null) {
  const where = campaignId ? { utmCampaign: campaignId } : {};

  const [totalImpressions, totalLeads, totalOrders] = await Promise.all([
    // Impressions would come from ad platform data
    // For now, use a placeholder or ad spend data
    Promise.resolve(0),

    prisma.lead.count({ where }),

    prisma.order.count({
      where: {
        ...where,
        status: { not: "CANCELLED" },
      },
    }),
  ]);

  // Get ad spend data for this campaign
  const adSpendData = await prisma.adSpendRow.findMany({
    where: campaignId ? { campaignName: campaignId } : {},
    select: {
      impressions: true,
      clicks: true,
    },
  });

  const impressions = adSpendData.reduce((sum, row) => sum + (row.impressions || 0), 0);
  const clicks = adSpendData.reduce((sum, row) => sum + (row.clicks || 0), 0);

  return NextResponse.json({
    impressions,
    clicks,
    leads: totalLeads,
    orders: totalOrders,
    clickRate: impressions > 0 ? (clicks / impressions) * 100 : 0,
    leadRate: clicks > 0 ? (totalLeads / clicks) * 100 : 0,
    conversionRate: totalLeads > 0 ? (totalOrders / totalLeads) * 100 : 0,
  });
}

async function handleCompare(campaignIds: string[]) {
  if (campaignIds.length === 0) {
    return NextResponse.json({ campaigns: [] });
  }

  const campaigns = await Promise.all(
    campaignIds.map(async (id) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id },
      });

      if (!campaign) return null;

      const [leads, orders] = await Promise.all([
        prisma.lead.count({
          where: { utmCampaign: campaign.name },
        }),
        prisma.order.findMany({
          where: {
            utmCampaign: campaign.name,
            status: { not: "CANCELLED" },
          },
          select: {
            totalAmount: true,
            adCost: true,
          },
        }),
      ]);

      const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      const adCost = orders.reduce((sum, o) => sum + (o.adCost || 0), 0);
      const roas = adCost > 0 ? revenue / adCost : 0;
      const cpa = orders.length > 0 ? adCost / orders.length : 0;

      return {
        id: campaign.id,
        name: campaign.name,
        leads,
        orders: orders.length,
        revenue,
        adCost,
        roas,
        cpa,
        conversionRate: leads > 0 ? (orders.length / leads) * 100 : 0,
      };
    })
  );

  return NextResponse.json({
    campaigns: campaigns.filter(c => c !== null),
  });
}

async function handleROI() {
  // Get all campaigns
  const campaigns = await prisma.campaign.findMany({
    where: { active: true },
  });

  const campaignROI = await Promise.all(
    campaigns.map(async (campaign) => {
      const [orders, adSpend] = await Promise.all([
        prisma.order.findMany({
          where: {
            utmCampaign: campaign.name,
            status: { not: "CANCELLED" },
          },
          select: {
            totalAmount: true,
            adCost: true,
          },
        }),
        prisma.adSpendRow.aggregate({
          where: { campaignName: campaign.name },
          _sum: { spend: true },
        }),
      ]);

      const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      const orderAdCost = orders.reduce((sum, o) => sum + (o.adCost || 0), 0);
      const totalSpend = (adSpend._sum.spend || 0) * 100; // Convert to cents
      const combinedCost = orderAdCost + totalSpend;

      const roi = combinedCost > 0 ? ((revenue - combinedCost) / combinedCost) * 100 : 0;
      const roas = combinedCost > 0 ? revenue / combinedCost : 0;

      return {
        campaignId: campaign.id,
        campaignName: campaign.name,
        revenue,
        spend: combinedCost,
        profit: revenue - combinedCost,
        roi,
        roas,
        orders: orders.length,
        cpaTarget: campaign.cpaTarget,
        actualCPA: orders.length > 0 ? combinedCost / orders.length : 0,
      };
    })
  );

  return NextResponse.json({
    campaigns: campaignROI.sort((a, b) => b.roi - a.roi),
  });
}
