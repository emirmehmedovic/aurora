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
    const statusFilter = searchParams.get("status");
    const search = searchParams.get("search");

    // Fetch orders with RETURNED status
    const orderWhere: any = {
      status: "RETURNED"
    };

    if (search) {
      orderWhere.OR = [
        { orderNumber: { contains: search, mode: "insensitive" } },
        { customer: { fullName: { contains: search, mode: "insensitive" } } },
        { customer: { phone: { contains: search, mode: "insensitive" } } },
      ];
    }

    const returnedOrders = await prisma.order.findMany({
      where: orderWhere,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Map orders to return format for compatibility with frontend
    const returns = returnedOrders.map(order => ({
      id: order.id,
      rmaNumber: `RMA-${order.orderNumber}`,
      reason: "Vraćeno",
      status: "RECEIVED", // Orders marked as RETURNED are considered received
      refundAmount: null,
      createdAt: order.updatedAt || order.createdAt,
      customer: {
        id: order.customer.id,
        fullName: order.customer.fullName,
        phone: order.customer.phone,
      },
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        items: order.items,
      },
    }));

    return NextResponse.json({ returns });
  } catch (error) {
    console.error("Returns list error:", error);
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
    const { orderId, customerId, reason, reasonDetails, itemsToReturn } = body;

    if (!orderId || !customerId || !reason || !itemsToReturn) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate RMA number
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    const rmaNumber = `RMA-${dateStr}-${randomStr}`;

    const returnRecord = await prisma.return.create({
      data: {
        rmaNumber,
        orderId,
        customerId,
        reason,
        reasonDetails,
        itemsToReturn,
        status: "REQUESTED",
      },
      include: {
        customer: true,
        order: true,
      },
    });

    return NextResponse.json(returnRecord);
  } catch (error) {
    console.error("Create return error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
