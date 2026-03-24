import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { updateCustomerStats } from "@/lib/customerStats";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, orderIds, status } = body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: "Order IDs are required" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "updateStatus":
        if (!status) {
          return NextResponse.json(
            { error: "Status is required" },
            { status: 400 }
          );
        }

        // Validate status
        const validOrderStatuses = ['NEW', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
        if (!validOrderStatuses.includes(status)) {
          return NextResponse.json(
            { error: "Invalid status" },
            { status: 400 }
          );
        }

        result = await prisma.order.updateMany({
          where: { id: { in: orderIds } },
          data: { status },
        });

        // Update customer stats for all affected orders
        const orders = await prisma.order.findMany({
          where: { id: { in: orderIds } },
          select: { customerId: true }
        });
        const uniqueCustomerIds = [...new Set(orders.map(o => o.customerId))];
        await Promise.all(
          uniqueCustomerIds.map(customerId => updateCustomerStats(customerId))
        );

        return NextResponse.json({
          success: true,
          updated: result.count,
          message: `${result.count} narudžbi ažurirano`,
        });

      case "delete":
        result = await prisma.order.deleteMany({
          where: { id: { in: orderIds } },
        });

        return NextResponse.json({
          success: true,
          deleted: result.count,
          message: `${result.count} narudžbi obrisano`,
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Bulk orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
