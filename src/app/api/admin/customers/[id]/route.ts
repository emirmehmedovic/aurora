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

    // Fetch customer with selective fields and pagination
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            totalAmount: true,
            createdAt: true,
            items: {
              select: {
                id: true,
                quantity: true,
                product: {
                  select: { id: true, name: true }
                }
              }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 50  // Pagination limit
        },
        leads: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            status: true,
            createdAt: true
          },
          orderBy: { createdAt: "desc" },
          take: 20
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Calculate stats using SQL aggregation
    const orderStats = await prisma.order.aggregate({
      where: {
        customerId: id,
        status: { notIn: ['CANCELLED', 'RETURNED'] }
      },
      _count: { id: true },
      _sum: { totalAmount: true }
    });

    // Count delivered/paid orders
    const deliveredCount = await prisma.order.count({
      where: {
        customerId: id,
        status: 'DELIVERED'
      }
    });

    // Count returned orders
    const returnedCount = await prisma.order.count({
      where: {
        customerId: id,
        status: 'RETURNED'
      }
    });

    // Favorite product - use raw SQL for efficiency
    const favoriteProduct = await prisma.$queryRaw<Array<{
      productId: string;
      productName: string;
      totalQuantity: bigint;
    }>>`
      SELECT
        oi."productId",
        p.name as "productName",
        SUM(oi.quantity) as "totalQuantity"
      FROM order_items oi
      JOIN orders o ON oi."orderId" = o.id
      JOIN products p ON oi."productId" = p.id
      WHERE o."customerId" = ${id}
        AND o.status NOT IN ('CANCELLED', 'RETURNED')
      GROUP BY oi."productId", p.name
      ORDER BY SUM(oi.quantity) DESC
      LIMIT 1
    `;

    const stats = {
      totalOrders: orderStats._count.id,
      totalSpent: orderStats._sum.totalAmount || 0,
      averageOrderValue: orderStats._count.id > 0
        ? (orderStats._sum.totalAmount || 0) / orderStats._count.id
        : 0,
      deliveredOrders: deliveredCount,
      returnedOrders: returnedCount,
      favoriteProduct: favoriteProduct.length > 0
        ? {
            name: favoriteProduct[0].productName,
            count: Number(favoriteProduct[0].totalQuantity)
          }
        : null
    };

    return NextResponse.json({
      ...customer,
      stats
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
    const { tags, notes, fullName, phone, email, address, city, zipCode } = body;

    const data: any = {};
    if (tags !== undefined) data.tags = tags;
    if (notes !== undefined) data.notes = notes;
    if (fullName !== undefined) data.fullName = fullName;
    if (phone !== undefined) data.phone = phone;
    if (email !== undefined) data.email = email;
    if (address !== undefined) data.address = address;
    if (city !== undefined) data.city = city;
    if (zipCode !== undefined) data.zipCode = zipCode;

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
