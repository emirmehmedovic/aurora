import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { description, amount, incurredOn, notes } = body;

    if (!description?.trim() || !Number.isInteger(amount) || !incurredOn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (amount < 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const cost = await prisma.variableCost.create({
      data: {
        description: description.trim(),
        amount,
        incurredOn: new Date(`${incurredOn}T12:00:00.000Z`),
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, cost });
  } catch (error) {
    console.error("Create variable cost error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
