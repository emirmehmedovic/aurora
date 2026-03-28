import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const PRODUCT_COST_KM = 30;
const SHIPPING_COST_KM = 10;
const FIXED_COST_PER_ORDER_KM = PRODUCT_COST_KM + SHIPPING_COST_KM;

type DailyBucket = {
  date: string;
  deliveredOrders: number;
  revenue: number;
  leads: number;
  adSpend: number;
  productCost: number;
  shippingCost: number;
  fixedCosts: number;
  profit: number;
  avgLeadCost: number;
  avgProfitPerOrder: number;
  campaigns: string[];
};

function toDateOnlyString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function buildDateRange(start: Date, end: Date) {
  const range: Date[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    range.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return range;
}

function ensureBucket(map: Map<string, DailyBucket>, date: string) {
  if (!map.has(date)) {
    map.set(date, {
      date,
      deliveredOrders: 0,
      revenue: 0,
      leads: 0,
      adSpend: 0,
      productCost: 0,
      shippingCost: 0,
      fixedCosts: 0,
      profit: 0,
      avgLeadCost: 0,
      avgProfitPerOrder: 0,
      campaigns: [],
    });
  }

  return map.get(date)!;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const campaignFilter = searchParams.get("campaign")?.trim() || "";

    const defaultTo = startOfDay(new Date());
    const defaultFrom = new Date(defaultTo);
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 29);

    const from = fromParam ? startOfDay(new Date(`${fromParam}T00:00:00.000Z`)) : defaultFrom;
    const to = toParam ? startOfDay(new Date(`${toParam}T00:00:00.000Z`)) : defaultTo;

    const deliveredWhere = {
      status: "DELIVERED" as const,
      createdAt: {
        gte: from,
        lte: new Date(`${toDateOnlyString(to)}T23:59:59.999Z`),
      },
      ...(campaignFilter
        ? {
            OR: [
              { utmCampaign: { contains: campaignFilter, mode: "insensitive" as const } },
              { attributedCampaign: { contains: campaignFilter, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const leadWhere = {
      createdAt: {
        gte: from,
        lte: new Date(`${toDateOnlyString(to)}T23:59:59.999Z`),
      },
      ...(campaignFilter
        ? { utmCampaign: { contains: campaignFilter, mode: "insensitive" as const } }
        : {}),
    };

    const adSpendWhere = campaignFilter
      ? { campaignName: { contains: campaignFilter, mode: "insensitive" as const } }
      : {};

    const [deliveredOrders, leads, adSpendRows, campaignNames] = await Promise.all([
      prisma.order.findMany({
        where: deliveredWhere,
        select: {
          id: true,
          totalAmount: true,
          createdAt: true,
          utmCampaign: true,
          attributedCampaign: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.lead.findMany({
        where: leadWhere,
        select: {
          id: true,
          createdAt: true,
          utmCampaign: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.adSpendRow.findMany({
        where: adSpendWhere,
        select: {
          spend: true,
          startDate: true,
          endDate: true,
          date: true,
          campaignName: true,
        },
        orderBy: { date: "asc" },
      }),
      prisma.campaign.findMany({
        orderBy: { name: "asc" },
        select: { name: true },
      }),
    ]);

    const buckets = new Map<string, DailyBucket>();
    buildDateRange(from, to).forEach((date) => ensureBucket(buckets, toDateOnlyString(date)));

    for (const order of deliveredOrders) {
      const date = toDateOnlyString(order.createdAt);
      const bucket = ensureBucket(buckets, date);
      const revenueKm = order.totalAmount / 100;

      bucket.deliveredOrders += 1;
      bucket.revenue += revenueKm;
      bucket.productCost += PRODUCT_COST_KM;
      bucket.shippingCost += SHIPPING_COST_KM;
      bucket.fixedCosts += FIXED_COST_PER_ORDER_KM;

      const campaignName = order.attributedCampaign || order.utmCampaign;
      if (campaignName && !bucket.campaigns.includes(campaignName)) {
        bucket.campaigns.push(campaignName);
      }
    }

    for (const lead of leads) {
      const date = toDateOnlyString(lead.createdAt);
      const bucket = ensureBucket(buckets, date);
      bucket.leads += 1;

      if (lead.utmCampaign && !bucket.campaigns.includes(lead.utmCampaign)) {
        bucket.campaigns.push(lead.utmCampaign);
      }
    }

    for (const row of adSpendRows) {
      const rawStart = row.startDate ?? row.date;
      const rawEnd = row.endDate ?? row.date;
      const normalizedStart = startOfDay(rawStart < from ? from : rawStart);
      const normalizedEnd = startOfDay(rawEnd > to ? to : rawEnd);

      if (normalizedStart > to || normalizedEnd < from) {
        continue;
      }

      const allocationDates = buildDateRange(normalizedStart, normalizedEnd);
      const dailySpend = allocationDates.length > 0 ? row.spend / allocationDates.length : row.spend;

      for (const date of allocationDates) {
        const bucket = ensureBucket(buckets, toDateOnlyString(date));
        bucket.adSpend += dailySpend;

        if (row.campaignName && !bucket.campaigns.includes(row.campaignName)) {
          bucket.campaigns.push(row.campaignName);
        }
      }
    }

    const historicalData = Array.from(buckets.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((bucket) => {
        const profit = bucket.revenue - bucket.fixedCosts - bucket.adSpend;

        return {
          ...bucket,
          adSpend: Number(bucket.adSpend.toFixed(2)),
          revenue: Number(bucket.revenue.toFixed(2)),
          productCost: Number(bucket.productCost.toFixed(2)),
          shippingCost: Number(bucket.shippingCost.toFixed(2)),
          fixedCosts: Number(bucket.fixedCosts.toFixed(2)),
          profit: Number(profit.toFixed(2)),
          avgLeadCost: bucket.leads > 0 ? Number((bucket.adSpend / bucket.leads).toFixed(2)) : 0,
          avgProfitPerOrder:
            bucket.deliveredOrders > 0 ? Number((profit / bucket.deliveredOrders).toFixed(2)) : 0,
          campaigns: bucket.campaigns.sort(),
        };
      });

    const totals = historicalData.reduce(
      (acc, day) => {
        acc.totalRevenue += day.revenue;
        acc.totalAdSpend += day.adSpend;
        acc.totalLeads += day.leads;
        acc.deliveredOrders += day.deliveredOrders;
        acc.totalProductCost += day.productCost;
        acc.totalShippingCost += day.shippingCost;
        acc.totalFixedCosts += day.fixedCosts;
        acc.totalProfit += day.profit;
        return acc;
      },
      {
        totalRevenue: 0,
        totalAdSpend: 0,
        totalLeads: 0,
        deliveredOrders: 0,
        totalProductCost: 0,
        totalShippingCost: 0,
        totalFixedCosts: 0,
        totalProfit: 0,
      }
    );

    const averageLeadCost =
      totals.totalLeads > 0 ? Number((totals.totalAdSpend / totals.totalLeads).toFixed(2)) : 0;
    const averageProfitPerOrder =
      totals.deliveredOrders > 0 ? Number((totals.totalProfit / totals.deliveredOrders).toFixed(2)) : 0;
    const averageDailyProfit =
      historicalData.length > 0 ? Number((totals.totalProfit / historicalData.length).toFixed(2)) : 0;
    const profitMargin =
      totals.totalRevenue > 0 ? Number(((totals.totalProfit / totals.totalRevenue) * 100).toFixed(2)) : 0;

    const bestDay = [...historicalData].sort((a, b) => b.profit - a.profit)[0] ?? null;
    const worstDay = [...historicalData].sort((a, b) => a.profit - b.profit)[0] ?? null;

    return NextResponse.json({
      assumptions: {
        productCostKm: PRODUCT_COST_KM,
        shippingCostKm: SHIPPING_COST_KM,
        fixedCostPerOrderKm: FIXED_COST_PER_ORDER_KM,
        adSpendAllocation: "Ad spend iz periodskih izvještaja raspodijeljen je ravnomjerno po danima unutar raspona.",
        realizedSaleStatus: "DELIVERED",
      },
      filters: {
        from: toDateOnlyString(from),
        to: toDateOnlyString(to),
        campaign: campaignFilter,
      },
      kpis: {
        totalRevenue: Number(totals.totalRevenue.toFixed(2)),
        totalAdSpend: Number(totals.totalAdSpend.toFixed(2)),
        totalProductCost: Number(totals.totalProductCost.toFixed(2)),
        totalShippingCost: Number(totals.totalShippingCost.toFixed(2)),
        totalFixedCosts: Number(totals.totalFixedCosts.toFixed(2)),
        totalProfit: Number(totals.totalProfit.toFixed(2)),
        totalLeads: totals.totalLeads,
        deliveredOrders: totals.deliveredOrders,
        averageLeadCost,
        averageProfitPerOrder,
        averageDailyProfit,
        profitMargin,
        leadToDeliveredRate:
          totals.totalLeads > 0 ? Number(((totals.deliveredOrders / totals.totalLeads) * 100).toFixed(2)) : 0,
      },
      highlights: {
        bestDay,
        worstDay,
      },
      calendar: historicalData,
      historicalData,
      campaignOptions: campaignNames.map((campaign) => campaign.name),
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
