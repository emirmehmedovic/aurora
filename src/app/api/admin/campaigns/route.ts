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
      include: {
        _count: {
          select: {
            orders: true,
            leads: true,
          },
        },
      },
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

        const revenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        const spend = campaign.totalSpend;
        const roas = spend > 0 ? revenue / spend : 0;
        const cpl = leads.length > 0 ? spend / leads.length : 0;
        const cpa = orders.length > 0 ? spend / orders.length : 0;

        return {
          id: campaign.id,
          name: campaign.name,
          platform: campaign.platform,
          status: campaign.status,
          spend: spend / 100, // Convert from cents
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
