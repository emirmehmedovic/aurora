import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find duplicates grouped by normalized phone
    const duplicates = await prisma.$queryRaw<Array<{
      phoneNormalized: string;
      customers: any;
    }>>`
      SELECT
        "phoneNormalized",
        json_agg(
          json_build_object(
            'id', id,
            'fullName', "fullName",
            'phone', phone,
            'email', email,
            'orderCount', "orderCount",
            'totalSpent', "totalSpent",
            'createdAt', "createdAt"
          ) ORDER BY "createdAt" ASC
        ) as customers
      FROM customers
      WHERE "phoneNormalized" IS NOT NULL
      GROUP BY "phoneNormalized"
      HAVING COUNT(*) > 1
      ORDER BY COUNT(*) DESC
      LIMIT 100
    `;

    return NextResponse.json({ duplicates });
  } catch (error) {
    console.error("Find duplicates error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
