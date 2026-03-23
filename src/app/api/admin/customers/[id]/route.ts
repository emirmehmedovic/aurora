import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        leads: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Calculate statistics
    const stats = {
      totalOrders: customer.orders.length,
      totalSpent: customer.orders
        .filter((o) => o.status !== "CANCELLED")
        .reduce((sum, o) => sum + o.totalAmount, 0),
      averageOrderValue: 0,
      favoriteProduct: null as { name: string; count: number } | null,
    };

    if (stats.totalOrders > 0) {
      stats.averageOrderValue = stats.totalSpent / stats.totalOrders;
    }

    // Find favorite product
    const productCounts = new Map<string, { name: string; count: number }>();
    customer.orders.forEach((order) => {
      order.items.forEach((item) => {
        const existing = productCounts.get(item.productId);
        if (existing) {
          existing.count += item.quantity;
        } else {
          productCounts.set(item.productId, {
            name: item.product.name,
            count: item.quantity,
          });
        }
      });
    });

    if (productCounts.size > 0) {
      stats.favoriteProduct = Array.from(productCounts.values()).reduce((prev, curr) =>
        curr.count > prev.count ? curr : prev
      );
    }

    return NextResponse.json({
      ...customer,
      stats,
    });
  } catch (error) {
    console.error("Customer detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { tags, notes } = body;

    const data: any = {};
    if (tags !== undefined) data.tags = tags;
    if (notes !== undefined) data.notes = notes;

    const customer = await prisma.customer.update({
      where: { id },
      data,
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Customer update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
