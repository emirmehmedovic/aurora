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

    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });

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
          _sum: { spend: true },
        });

        const revenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        const spend = (adSpend._sum.spend || 0) * 100; // Convert to cents to match revenue/int format if needed, or keep as float. 
        // Note: revenue is likely in cents (Int), spend in AdSpendRow is Float (likely dollars/euros).
        // Let's assume AdSpendRow.spend is in main currency unit (e.g. KM/EUR) and revenue is in cents.
        // The original code had: spend = campaign.totalSpend (likely cents).
        // And: spend: spend / 100
        // So let's assume we need `spend` in cents here for consistency with previous logic.
        const spendInCents = Math.round((adSpend._sum.spend || 0) * 100);
        
        const roas = spendInCents > 0 ? revenue / spendInCents : 0;
        const cpl = leads.length > 0 ? spendInCents / leads.length : 0;
        const cpa = orders.length > 0 ? spendInCents / orders.length : 0;

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
          createdAt: campaign.createdAt.toISOString(),
        };
      })
    );

    return NextResponse.json({ campaigns: campaignsWithMetrics });

  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
