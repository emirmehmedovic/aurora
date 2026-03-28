import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { parseCampaignImportFile } from "@/lib/campaignImport";

const EUR_TO_KM_RATE = 1.95583;

function sameDay(left: Date | null | undefined, right: Date) {
  return !!left && left.toISOString().slice(0, 10) === right.toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isSupportedFile =
      file.name.toLowerCase().endsWith(".csv") ||
      file.name.toLowerCase().endsWith(".xlsx") ||
      file.name.toLowerCase().endsWith(".xls");

    if (!isSupportedFile) {
      return NextResponse.json(
        { error: "Podržani su samo CSV i Excel fajlovi (.csv, .xlsx, .xls)" },
        { status: 400 }
      );
    }

    const { rows, errors } = await parseCampaignImportFile(file);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Nijedan validan red nije pronađen u fajlu", errors },
        { status: 400 }
      );
    }

    const periodStart = rows.reduce(
      (current, row) => (row.startDate < current ? row.startDate : current),
      rows[0].startDate
    );
    const periodEnd = rows.reduce(
      (current, row) => (row.endDate > current ? row.endDate : current),
      rows[0].endDate
    );

    const importRecord = await prisma.adSpendImport.create({
      data: {
        filename: file.name,
        periodStart,
        periodEnd,
      },
    });

    let importedCount = 0;
    let updatedCount = 0;
    let skippedOverlapCount = 0;

    for (const [index, row] of rows.entries()) {
      try {
        const overlaps = await prisma.adSpendRow.findMany({
          where: {
            campaignName: row.campaignName,
            adSetName: row.adSetName,
            adName: row.adName,
            OR: [
              {
                AND: [
                  { startDate: { not: null, lte: row.endDate } },
                  { endDate: { not: null, gte: row.startDate } },
                ],
              },
              {
                AND: [
                  { startDate: null },
                  { date: { gte: row.startDate, lte: row.endDate } },
                ],
              },
            ],
          },
          orderBy: { createdAt: "desc" },
        });

        const exactMatch = overlaps.find(
          (existing) =>
            sameDay(existing.startDate, row.startDate) &&
            sameDay(existing.endDate ?? existing.date, row.endDate)
        );

        const spend =
          row.sourceCurrency === "EUR"
            ? Number((row.spend * EUR_TO_KM_RATE).toFixed(2))
            : row.spend;
        const cpm = row.impressions && row.impressions > 0 ? (spend / row.impressions) * 1000 : null;
        const cpc = row.clicks && row.clicks > 0 ? spend / row.clicks : null;

        if (exactMatch) {
          await prisma.adSpendRow.update({
            where: { id: exactMatch.id },
            data: {
              importId: importRecord.id,
              date: row.endDate,
              startDate: row.startDate,
              endDate: row.endDate,
              campaignName: row.campaignName,
              adSetName: row.adSetName,
              adName: row.adName,
              resultCount: row.resultCount,
              resultIndicator: row.resultIndicator,
              spend,
              impressions: row.impressions,
              clicks: row.clicks,
              cpm,
              cpc,
            },
          });
          updatedCount++;
          continue;
        }

        if (overlaps.length > 0) {
          skippedOverlapCount++;
          errors.push(
            `Red ${index + 2}: preskočen zbog preklapanja perioda ${row.startDate.toISOString().slice(0, 10)} - ${row.endDate.toISOString().slice(0, 10)} za "${row.campaignName}".`
          );
          continue;
        }

        await prisma.adSpendRow.create({
          data: {
            importId: importRecord.id,
            date: row.endDate,
            startDate: row.startDate,
            endDate: row.endDate,
            campaignName: row.campaignName,
            adSetName: row.adSetName,
            adName: row.adName,
            resultCount: row.resultCount,
            resultIndicator: row.resultIndicator,
            spend,
            impressions: row.impressions,
            clicks: row.clicks,
            cpm,
            cpc,
          },
        });

        const existingCampaign = await prisma.campaign.findFirst({
          where: {
            name: {
              equals: row.campaignName,
              mode: "insensitive",
            },
          },
        });

        if (!existingCampaign) {
          await prisma.campaign.create({
            data: {
              name: row.campaignName,
              source: "facebook",
              active: true,
            },
          });
        }

        importedCount++;
      } catch (rowError) {
        errors.push(
          `Red ${index + 2}: ${rowError instanceof Error ? rowError.message : "Nepoznata greška"}`
        );
      }
    }

    const latestCoveredRow =
      (await prisma.adSpendRow.findFirst({
        where: { endDate: { not: null } },
        orderBy: { endDate: "desc" },
      })) ??
      (await prisma.adSpendRow.findFirst({
        orderBy: { date: "desc" },
      }));

    return NextResponse.json({
      success: true,
      importId: importRecord.id,
      importedCount,
      updatedCount,
      skippedOverlapCount,
      totalRows: rows.length,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
      latestCoveredDate: (latestCoveredRow?.endDate ?? latestCoveredRow?.date)?.toISOString() ?? null,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Campaign import error:", error);
    return NextResponse.json(
      {
        error: "Failed to import file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [deletedRows, deletedImports] = await prisma.$transaction([
      prisma.adSpendRow.deleteMany({}),
      prisma.adSpendImport.deleteMany({}),
    ]);

    return NextResponse.json({
      success: true,
      deletedRows: deletedRows.count,
      deletedImports: deletedImports.count,
    });
  } catch (error) {
    console.error("Delete campaign import data error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete import data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
