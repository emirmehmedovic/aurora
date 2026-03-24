import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file content
    const text = await file.text();
    const lines = text.split("\n").filter(line => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "CSV file is empty or invalid" },
        { status: 400 }
      );
    }

    // Parse header
    const header = lines[0].split(",").map(h => h.trim().toLowerCase());

    // Expected columns: date, campaign, spend, impressions, clicks, platform
    const dateIdx = header.findIndex(h => h.includes("date") || h.includes("datum"));
    const campaignIdx = header.findIndex(h => h.includes("campaign") || h.includes("kampanja"));
    const spendIdx = header.findIndex(h => h.includes("spend") || h.includes("trosak") || h.includes("amount"));
    const impressionsIdx = header.findIndex(h => h.includes("impression") || h.includes("prikaz"));
    const clicksIdx = header.findIndex(h => h.includes("click") || h.includes("klik"));

    if (dateIdx === -1 || campaignIdx === -1 || spendIdx === -1) {
      return NextResponse.json(
        { error: "CSV must contain Date, Campaign, and Spend columns" },
        { status: 400 }
      );
    }

    // Create import record
    const importRecord = await prisma.adSpendImport.create({
      data: {
        filename: file.name,
      },
    });

    let importedCount = 0;
    const errors: string[] = [];

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(",").map(v => v.trim());

        if (values.length < 3) continue; // Skip incomplete rows

        const dateStr = values[dateIdx];
        const campaignName = values[campaignIdx];
        const spendStr = values[spendIdx]?.replace(/[^\d.-]/g, ""); // Remove currency symbols

        if (!dateStr || !campaignName || !spendStr) {
          errors.push(`Line ${i + 1}: Missing required fields`);
          continue;
        }

        // Parse date (supports multiple formats)
        let date: Date;
        try {
          // Try ISO format first
          date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            // Try DD/MM/YYYY or DD-MM-YYYY
            const parts = dateStr.split(/[\/\-\.]/);
            if (parts.length === 3) {
              date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }
          }
          if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
          }
        } catch (e) {
          errors.push(`Line ${i + 1}: Invalid date format: ${dateStr}`);
          continue;
        }

        const spend = parseFloat(spendStr);
        if (isNaN(spend)) {
          errors.push(`Line ${i + 1}: Invalid spend amount: ${spendStr}`);
          continue;
        }

        // Optional fields
        const impressions = impressionsIdx >= 0 ? parseInt(values[impressionsIdx]?.replace(/[^\d]/g, "") || "0") : null;
        const clicks = clicksIdx >= 0 ? parseInt(values[clicksIdx]?.replace(/[^\d]/g, "") || "0") : null;

        // Calculate metrics
        const cpm = impressions && impressions > 0 ? (spend / impressions) * 1000 : null;
        const cpc = clicks && clicks > 0 ? spend / clicks : null;

        // Create ad spend row
        await prisma.adSpendRow.create({
          data: {
            importId: importRecord.id,
            date,
            campaignName,
            spend,
            impressions,
            clicks,
            cpm,
            cpc,
          },
        });

        // Create or update campaign if it doesn't exist
        const existingCampaign = await prisma.campaign.findFirst({
          where: { name: campaignName },
        });

        if (!existingCampaign) {
          await prisma.campaign.create({
            data: {
              name: campaignName,
              source: "facebook", // Default, can be customized
              active: true,
            },
          });
        }

        importedCount++;
      } catch (rowError) {
        errors.push(`Line ${i + 1}: ${rowError instanceof Error ? rowError.message : "Unknown error"}`);
      }
    }

    return NextResponse.json({
      success: true,
      importId: importRecord.id,
      importedCount,
      totalRows: lines.length - 1,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error("CSV import error:", error);
    return NextResponse.json(
      { error: "Failed to import CSV", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
