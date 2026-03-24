import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { mergeCustomers } from "@/lib/customerDeduplication";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetId, sourceIds, strategy } = await request.json();

    if (!targetId || !sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
      return NextResponse.json(
        { error: "Target ID and source IDs are required" },
        { status: 400 }
      );
    }

    await mergeCustomers(targetId, sourceIds, strategy || 'most_complete');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Merge error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
