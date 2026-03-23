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
    const returnRecord = await prisma.return.findUnique({
      where: { id },
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
    });

    if (!returnRecord) {
      return NextResponse.json({ error: "Return not found" }, { status: 404 });
    }

    return NextResponse.json(returnRecord);
  } catch (error) {
    console.error("Return detail error:", error);
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
    const { status, refundAmount, refundMethod, notes } = body;

    const data: any = {};

    if (status) data.status = status;
    if (refundAmount !== undefined) data.refundAmount = refundAmount;
    if (refundMethod) data.refundMethod = refundMethod;
    if (notes !== undefined) data.notes = notes;

    // If status is REFUNDED, set refundedAt timestamp
    if (status === "REFUNDED") {
      data.refundedAt = new Date();
    }

    const returnRecord = await prisma.return.update({
      where: { id },
      data,
      include: {
        customer: true,
        order: true,
      },
    });

    return NextResponse.json(returnRecord);
  } catch (error) {
    console.error("Update return error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
