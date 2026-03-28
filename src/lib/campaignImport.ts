import * as XLSX from "xlsx";

export interface ParsedCampaignImportRow {
  startDate: Date;
  endDate: Date;
  campaignName: string;
  adSetName: string | null;
  adName: string | null;
  spend: number;
  sourceCurrency: "EUR" | "KM";
  impressions: number | null;
  clicks: number | null;
  resultCount: number | null;
  resultIndicator: string | null;
}

interface HeaderIndexes {
  startDate: number;
  endDate: number;
  campaignName: number;
  adSetName: number;
  adName: number;
  spend: number;
  impressions: number;
  clicks: number;
  resultCount: number;
  resultIndicator: number;
}

interface CurrencyInfo {
  spend: "EUR" | "KM";
}

function normalizeHeader(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findHeaderIndex(headers: string[], candidates: string[]) {
  for (const candidate of candidates) {
    const index = headers.findIndex((header) => header.includes(candidate));
    if (index !== -1) {
      return index;
    }
  }

  return -1;
}

function detectCurrency(header: string) {
  if (header.includes("(eur)") || header.includes(" eur")) {
    return "EUR" as const;
  }

  return "KM" as const;
}

function parseNumber(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const normalized = String(value)
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "")
    .replace(/,(?=\d{1,2}$)/, ".")
    .replace(/,/g, "");

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: unknown) {
  const parsed = parseNumber(value);
  return parsed === null ? null : Math.round(parsed);
}

function parseDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  }

  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
    }
  }

  const raw = String(value ?? "").trim();
  if (!raw) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const [year, month, day] = raw.slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  const parts = raw.split(/[./-]/).map((part) => Number(part));
  if (parts.length === 3 && parts.every(Number.isFinite)) {
    const [first, second, third] = parts;
    if (first > 31) {
      return new Date(Date.UTC(first, second - 1, third));
    }
    return new Date(Date.UTC(third, second - 1, first));
  }

  const fallback = new Date(raw);
  if (!Number.isNaN(fallback.getTime())) {
    return new Date(Date.UTC(fallback.getUTCFullYear(), fallback.getUTCMonth(), fallback.getUTCDate()));
  }

  return null;
}

function buildHeaderIndexes(headers: string[]): HeaderIndexes {
  return {
    startDate: findHeaderIndex(headers, [
      "reporting starts",
      "reporting start",
      "izvjestavanje zapocinje",
      "izvjestavanje pocinje",
      "datum pocetka",
      "date start",
      "start date",
      "datum",
    ]),
    endDate: findHeaderIndex(headers, [
      "reporting ends",
      "reporting end",
      "izvjestavanje zavrsava",
      "datum zavrsetka",
      "end date",
    ]),
    campaignName: findHeaderIndex(headers, [
      "campaign name",
      "naziv kampanje",
    ]),
    adSetName: findHeaderIndex(headers, [
      "ad set name",
      "naziv kompleta oglasa",
      "skup oglasa",
    ]),
    adName: findHeaderIndex(headers, [
      "ad name",
      "naziv oglasa",
    ]),
    spend: findHeaderIndex(headers, [
      "amount spent",
      "potroseni iznos",
      "spend",
      "trosak",
    ]),
    impressions: findHeaderIndex(headers, [
      "impressions",
      "prikaz",
      "doseg",
      "reach",
    ]),
    clicks: findHeaderIndex(headers, [
      "link clicks",
      "klikovi na poveznicu",
      "clicks",
      "klik",
      "broj posjeta",
      "visits",
    ]),
    resultCount: findHeaderIndex(headers, [
      "results",
      "rezultati",
    ]),
    resultIndicator: findHeaderIndex(headers, [
      "result indicator",
      "indikator rezultata",
    ]),
  };
}

function getCell(row: unknown[], index: number) {
  return index >= 0 ? row[index] : null;
}

export async function parseCampaignImportFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, {
    type: "buffer",
    raw: false,
    cellDates: true,
  });

  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!firstSheet) {
    throw new Error("Fajl nema nijedan sheet");
  }

  const rows = XLSX.utils.sheet_to_json(firstSheet, {
    header: 1,
    defval: "",
    blankrows: false,
    raw: false,
  }) as unknown[][];

  if (rows.length < 2) {
    throw new Error("Fajl je prazan ili nema dovoljno redova");
  }

  const headers = rows[0].map(normalizeHeader);
  const indexes = buildHeaderIndexes(headers);
  const currency: CurrencyInfo = {
    spend: detectCurrency(headers[indexes.spend] ?? ""),
  };

  const hasDate = indexes.startDate >= 0 || indexes.endDate >= 0;
  const hasName = indexes.campaignName >= 0 || indexes.adSetName >= 0 || indexes.adName >= 0;

  if (!hasDate || !hasName || indexes.spend === -1) {
    throw new Error("Nedostaju obavezne kolone. Potrebni su datum, naziv kampanje/oglasa i trošak.");
  }

  const parsedRows: ParsedCampaignImportRow[] = [];
  const errors: string[] = [];

  for (let index = 1; index < rows.length; index++) {
    const row = rows[index];
    if (!row?.some((cell) => String(cell ?? "").trim() !== "")) {
      continue;
    }

    const startDate = parseDate(getCell(row, indexes.startDate));
    const endDate = parseDate(getCell(row, indexes.endDate)) ?? startDate;
    const adSetName = String(getCell(row, indexes.adSetName) ?? "").trim() || null;
    const adName = String(getCell(row, indexes.adName) ?? "").trim() || null;
    const campaignName =
      String(getCell(row, indexes.campaignName) ?? "").trim() ||
      adSetName ||
      adName ||
      "";
    const spend = parseNumber(getCell(row, indexes.spend));

    if (!startDate || !endDate || !campaignName || spend === null) {
      errors.push(`Red ${index + 1}: nedostaju datum, naziv ili trošak.`);
      continue;
    }

    parsedRows.push({
      startDate,
      endDate,
      campaignName,
      adSetName,
      adName,
      spend,
      sourceCurrency: currency.spend,
      impressions: parseInteger(getCell(row, indexes.impressions)),
      clicks: parseInteger(getCell(row, indexes.clicks)),
      resultCount: parseNumber(getCell(row, indexes.resultCount)),
      resultIndicator: String(getCell(row, indexes.resultIndicator) ?? "").trim() || null,
    });
  }

  return {
    rows: parsedRows,
    errors,
  };
}
