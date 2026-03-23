import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sendOrderStatusUpdate } from "@/lib/telegram";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    // Fetch current order with customer info
    const currentOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true
      }
    });

    if (!currentOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const oldStatus = currentOrder.status;

    // Update order
    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined && { notes })
      },
      include: {
        customer: true
      }
    });

    // Send Telegram notification if status changed
    if (oldStatus !== status) {
      try {
        await sendOrderStatusUpdate({
          orderNumber: order.orderNumber,
          customerName: order.customer.fullName,
          phone: order.customer.phone,
          oldStatus,
          newStatus: status,
          totalAmount: order.totalAmount,
          notes: notes || order.notes || undefined
        });
      } catch (error) {
        console.error('Failed to send status update to Telegram:', error);
        // Don't fail the request if Telegram notification fails
      }
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
