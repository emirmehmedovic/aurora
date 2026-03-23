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
    const search = searchParams.get("search") || "";
    const tag = searchParams.get("tag") || "";
    const sortBy = searchParams.get("sortBy") || "lastOrderAt";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (tag) {
      where.tags = { has: tag };
    }

    // Build orderBy clause
    let orderBy: any = {};
    switch (sortBy) {
      case "totalSpent":
        orderBy = { totalSpent: "desc" };
        break;
      case "orderCount":
        orderBy = { orderCount: "desc" };
        break;
      case "lastOrderAt":
        orderBy = { lastOrderAt: { sort: "desc", nulls: "last" } };
        break;
      case "name":
        orderBy = { fullName: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          orders: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
              totalAmount: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          _count: {
            select: { orders: true },
          },
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return NextResponse.json({
      customers,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Customers list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
