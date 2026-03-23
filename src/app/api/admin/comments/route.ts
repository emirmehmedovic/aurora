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
    const orderId = searchParams.get("orderId");
    const leadId = searchParams.get("leadId");

    const where: any = {};
    if (orderId) where.orderId = orderId;
    if (leadId) where.leadId = leadId;

    const comments = await prisma.comment.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Comments list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, orderId, leadId, mentions } = body;
    console.log("Request body:", { content, orderId, leadId, mentions });

    if (!content || (!orderId && !leadId)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("Found user:", user?.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Creating comment with data:", {
      content,
      authorId: user.id,
      orderId: orderId || null,
      leadId: leadId || null,
      mentions: mentions || [],
    });

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        orderId: orderId || null,
        leadId: leadId || null,
        mentions: mentions || [],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    console.log("Comment created successfully:", comment.id);
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Create comment error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
