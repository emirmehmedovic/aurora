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
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { rmaNumber: { contains: search, mode: "insensitive" } },
        { customer: { fullName: { contains: search, mode: "insensitive" } } },
      ];
    }

    const returns = await prisma.return.findMany({
      where,
      include: {
        customer: true,
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

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
