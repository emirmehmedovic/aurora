import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sendOrderStatusUpdate } from "@/lib/telegram";
import { updateCustomerStats } from "@/lib/customerStats";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true
          }
        },
        returns: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
          address: order.customer.address || 'Nije uneseno',
          city: order.customer.city || 'Nije uneseno',
          zipCode: order.customer.zipCode || undefined,
          oldStatus,
          newStatus: status,
          totalAmount: order.totalAmount,
          notes: notes || order.notes || undefined
        });
      } catch (error) {
        console.error('Failed to send status update to Telegram:', error);
        // Don't fail the request if Telegram notification fails
      }

      // Update customer stats when status changes
      await updateCustomerStats(order.customerId);
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
