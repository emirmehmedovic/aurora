import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

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
    const { productId, quantity, price } = body;

    // Fetch current order item to get order details
    const currentItem = await prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            items: true
          }
        }
      }
    });

    if (!currentItem) {
      return NextResponse.json({ error: "Order item not found" }, { status: 404 });
    }

    // Update the order item
    const data: any = {};
    if (productId !== undefined) data.productId = productId;
    if (quantity !== undefined) data.quantity = quantity;
    if (price !== undefined) data.price = price;

    const updatedItem = await prisma.orderItem.update({
      where: { id },
      data,
      include: {
        product: true
      }
    });

    // Recalculate order total amount
    const allItems = await prisma.orderItem.findMany({
      where: { orderId: currentItem.orderId }
    });

    const newTotalAmount = allItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Update order total
    await prisma.order.update({
      where: { id: currentItem.orderId },
      data: { totalAmount: newTotalAmount }
    });

    return NextResponse.json({
      item: updatedItem,
      newOrderTotal: newTotalAmount
    });

  } catch (error) {
    console.error("Update order item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
