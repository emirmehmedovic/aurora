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
    const data: {
      active?: boolean;
      name?: string;
      slug?: string;
      price?: number;
      compareAtPrice?: number | null;
    } = {};

    if (typeof body.active === "boolean") {
      data.active = body.active;
    }

    if (typeof body.name === "string") {
      data.name = body.name.trim();
    }

    if (typeof body.slug === "string") {
      data.slug = body.slug.trim();
    }

    if (typeof body.price === "number") {
      data.price = body.price;
    }

    if (body.compareAtPrice === null || typeof body.compareAtPrice === "number") {
      data.compareAtPrice = body.compareAtPrice;
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({ product });

  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
