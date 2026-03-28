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

    const [campaigns, latestImport, latestCoveredRowWithEndDate, latestCoveredLegacyRow] = await Promise.all([
      prisma.campaign.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.adSpendImport.findFirst({
        orderBy: { uploadedAt: "desc" },
      }),
      prisma.adSpendRow.findFirst({
        where: { endDate: { not: null } },
        orderBy: { endDate: "desc" },
      }),
      prisma.adSpendRow.findFirst({
        orderBy: { date: "desc" },
      }),
    ]);

    // Calculate metrics for each campaign
    const campaignsWithMetrics = await Promise.all(
      campaigns.map(async (campaign) => {
        // Get orders for this campaign
        const orders = await prisma.order.findMany({
          where: { utmCampaign: campaign.name },
        });

        // Get leads for this campaign
        const leads = await prisma.lead.findMany({
          where: { utmCampaign: campaign.name },
        });

        // Get ad spend for this campaign
        const adSpend = await prisma.adSpendRow.aggregate({
          where: { campaignName: campaign.name },
          _sum: {
            spend: true,
            impressions: true,
            clicks: true,
            resultCount: true,
          },
        });

        const revenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        const spendInCents = Math.round((adSpend._sum.spend || 0) * 100);
        const impressions = adSpend._sum.impressions || 0;
        const clicks = adSpend._sum.clicks || 0;
        const results = adSpend._sum.resultCount || 0;
        
        const roas = spendInCents > 0 ? revenue / spendInCents : 0;
        const cpl = leads.length > 0 ? spendInCents / leads.length : 0;
        const cpa = orders.length > 0 ? spendInCents / orders.length : 0;
        const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
        const cpc = clicks > 0 ? spendInCents / clicks : 0;
        const cpm = impressions > 0 ? (spendInCents / impressions) * 1000 : 0;

        return {
          id: campaign.id,
          name: campaign.name,
          // platform: campaign.platform, // 'platform' does not exist in schema
          source: campaign.source,
          medium: campaign.medium,
          active: campaign.active,
          spend: spendInCents / 100, 
          revenue: revenue / 100,
          orders: orders.length,
          leads: leads.length,
          roas,
          cpl: cpl / 100,
          cpa: cpa / 100,
          impressions,
          clicks,
          results,
          ctr,
          cpc: cpc / 100,
          cpm: cpm / 100,
          createdAt: campaign.createdAt.toISOString(),
        };
      })
    );

    const latestCoveredRow = latestCoveredRowWithEndDate ?? latestCoveredLegacyRow;

    return NextResponse.json({
      campaigns: campaignsWithMetrics,
      importInfo: {
        lastUploadedAt: latestImport?.uploadedAt.toISOString() ?? null,
        lastFilename: latestImport?.filename ?? null,
        lastImportedPeriodStart: latestImport?.periodStart?.toISOString() ?? null,
        lastImportedPeriodEnd: latestImport?.periodEnd?.toISOString() ?? null,
        latestCoveredDate: (latestCoveredRow?.endDate ?? latestCoveredRow?.date)?.toISOString() ?? null,
      },
    });

  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, source, medium, description, active = true, cpaTarget } = body;

    if (!name || !source) {
      return NextResponse.json(
        { error: "Name and source are required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        source,
        medium,
        description,
        active,
        cpaTarget,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
