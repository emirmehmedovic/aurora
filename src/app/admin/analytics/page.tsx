"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  DollarSign,
  Package,
  Search,
  Target,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

interface DailyAnalyticsRow {
  date: string;
  deliveredOrders: number;
  revenue: number;
  leads: number;
  adSpend: number;
  productCost: number;
  shippingCost: number;
  fixedCosts: number;
  profit: number;
  avgLeadCost: number;
  avgProfitPerOrder: number;
  campaigns: string[];
}

interface AnalyticsData {
  assumptions: {
    productCostKm: number;
    shippingCostKm: number;
    fixedCostPerOrderKm: number;
    adSpendAllocation: string;
    realizedSaleStatus: string;
  };
  filters: {
    from: string;
    to: string;
    campaign: string;
  };
  kpis: {
    totalRevenue: number;
    totalAdSpend: number;
    totalProductCost: number;
    totalShippingCost: number;
    totalFixedCosts: number;
    totalProfit: number;
    totalLeads: number;
    deliveredOrders: number;
    averageLeadCost: number;
    averageProfitPerOrder: number;
    averageDailyProfit: number;
    profitMargin: number;
    leadToDeliveredRate: number;
  };
  highlights: {
    bestDay: DailyAnalyticsRow | null;
    worstDay: DailyAnalyticsRow | null;
  };
  calendar: DailyAnalyticsRow[];
  historicalData: DailyAnalyticsRow[];
  campaignOptions: string[];
}

function getDefaultFromDate() {
  const date = new Date();
  date.setDate(date.getDate() - 29);
  return date.toISOString().slice(0, 10);
}

function getDefaultToDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildRange(days: number) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - (days - 1));

  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(getDefaultFromDate);
  const [toDate, setToDate] = useState(getDefaultToDate);
  const [campaignFilter, setCampaignFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tableFromDate, setTableFromDate] = useState(getDefaultFromDate);
  const [tableToDate, setTableToDate] = useState(getDefaultToDate);
  const quickRanges = [7, 14, 30, 60, 90];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session, fromDate, toDate, campaignFilter]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        from: fromDate,
        to: toDate,
      });

      if (campaignFilter) {
        params.set("campaign", campaignFilter);
      }

      const response = await fetch(`/api/admin/analytics?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyQuickRange = (days: number) => {
    const range = buildRange(days);
    setFromDate(range.from);
    setToDate(range.to);
    setTableFromDate(range.from);
    setTableToDate(range.to);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  if (!session || !analytics) {
    return null;
  }

  const formatCurrency = (value: number) => `${value.toFixed(2)} KM`;
  const formatDate = (value: string) => new Date(value).toLocaleDateString("bs-BA");

  const filteredHistoricalData = analytics.historicalData.filter((row) => {
    if (row.date < tableFromDate || row.date > tableToDate) {
      return false;
    }

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      row.date.includes(query) ||
      row.campaigns.some((campaign) => campaign.toLowerCase().includes(query))
    );
  });

  const profitValues = analytics.calendar.map((row) => row.profit);
  const maxAbsProfit = Math.max(...profitValues.map((value) => Math.abs(value)), 1);
  const activeQuickRange =
    quickRanges.find((days) => {
      const range = buildRange(days);
      return range.from === fromDate && range.to === toDate;
    }) ?? null;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-5 lg:p-6">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analitika profita</h1>
            <p className="text-sm md:text-base text-gray-600">Profit nakon robe, poštarine i oglašavanja</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-white/70 border border-white/50 rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-gray-500">Fiksni trošak po realizovanoj prodaji</p>
              <p className="text-base md:text-lg font-bold text-gray-800">
                {analytics.assumptions.productCostKm} + {analytics.assumptions.shippingCostKm} = {analytics.assumptions.fixedCostPerOrderKm} KM
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickRanges.map((days) => (
              <button
                key={days}
                onClick={() => applyQuickRange(days)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeQuickRange === days
                    ? "bg-[#563435] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Zadnjih {days} dana
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Od datuma</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do datuma</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kampanja</label>
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
              >
                <option value="">Sve kampanje</option>
                {analytics.campaignOptions.map((campaign) => (
                  <option key={campaign} value={campaign}>
                    {campaign}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pretraga historije</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Datum ili kampanja"
                  className="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
            {analytics.assumptions.adSpendAllocation}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 mb-3">
          <MetricCard
            label="Ukupan profit"
            value={formatCurrency(analytics.kpis.totalProfit)}
            icon={TrendingUp}
            tone={analytics.kpis.totalProfit >= 0 ? "green" : "red"}
          />
          <MetricCard
            label="Prosj. profit"
            value={formatCurrency(analytics.kpis.averageProfitPerOrder)}
            icon={DollarSign}
            tone="blue"
          />
          <MetricCard
            label="Prosj. cijena lead-a"
            value={formatCurrency(analytics.kpis.averageLeadCost)}
            icon={Users}
            tone="indigo"
          />
          <MetricCard
            label="Prihod"
            value={formatCurrency(analytics.kpis.totalRevenue)}
            icon={DollarSign}
            tone="green"
          />
          <MetricCard
            label="Ad spend"
            value={formatCurrency(analytics.kpis.totalAdSpend)}
            icon={Target}
            tone="rose"
          />
          <MetricCard
            label="Profit margin"
            value={`${analytics.kpis.profitMargin.toFixed(2)}%`}
            icon={TrendingUp}
            tone="purple"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 mb-6">
          <MetricCard
            label="Realizovane prodaje"
            value={analytics.kpis.deliveredOrders.toString()}
            icon={Package}
            tone="orange"
          />
          <MetricCard
            label="Leadovi"
            value={analytics.kpis.totalLeads.toString()}
            icon={Users}
            tone="indigo"
          />
          <MetricCard
            label="Lead → sale"
            value={`${analytics.kpis.leadToDeliveredRate.toFixed(2)}%`}
            icon={Target}
            tone="blue"
          />
          <MetricCard
            label="Trošak robe"
            value={formatCurrency(analytics.kpis.totalProductCost)}
            icon={Package}
            tone="amber"
          />
          <MetricCard
            label="Poštarina"
            value={formatCurrency(analytics.kpis.totalShippingCost)}
            icon={Truck}
            tone="purple"
          />
          <MetricCard
            label="Prosj. dnevni profit"
            value={formatCurrency(analytics.kpis.averageDailyProfit)}
            icon={CalendarDays}
            tone="emerald"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Kalendar profita</h2>
              <p className="text-sm text-gray-500">Dnevni profit za izabrani period</p>
            </div>
            <div className="text-sm text-gray-500">
              {analytics.filters.from} - {analytics.filters.to}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-7 gap-2 mb-2">
            {["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"].map((day) => (
              <div key={day} className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {analytics.calendar.map((day) => {
              const intensity = Math.min(Math.abs(day.profit) / maxAbsProfit, 1);
              const positive = day.profit >= 0;
              const background = positive
                ? `rgba(34, 197, 94, ${0.10 + intensity * 0.32})`
                : `rgba(239, 68, 68, ${0.10 + intensity * 0.28})`;

              return (
                <div
                  key={day.date}
                  className="rounded-2xl border border-gray-100 p-2.5 md:p-3 min-h-[108px] lg:min-h-[118px] flex flex-col justify-between"
                  style={{ backgroundColor: background }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500">{formatDate(day.date)}</p>
                      <p className={`text-base md:text-lg font-bold ${positive ? "text-green-700" : "text-red-700"}`}>
                        {day.profit >= 0 ? "+" : ""}{day.profit.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-[10px] md:text-[11px] px-2 py-1 rounded-full bg-white/80 text-gray-600">
                      {day.deliveredOrders} sale
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex justify-between gap-2">
                      <span>Prihod</span>
                      <span className="font-medium">{day.revenue.toFixed(0)} KM</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Ads</span>
                      <span className="font-medium">{day.adSpend.toFixed(0)} KM</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Leadovi</span>
                      <span className="font-medium">{day.leads}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Sažetak troškova</h2>
            <div className="space-y-3">
              <SummaryRow label="Ad spend" value={formatCurrency(analytics.kpis.totalAdSpend)} />
              <SummaryRow label="Roba" value={formatCurrency(analytics.kpis.totalProductCost)} />
              <SummaryRow label="Poštarina" value={formatCurrency(analytics.kpis.totalShippingCost)} />
              <SummaryRow label="Fiksni troškovi" value={formatCurrency(analytics.kpis.totalFixedCosts)} />
              <SummaryRow label="Neto profit" value={formatCurrency(analytics.kpis.totalProfit)} strong />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Najbolji i najgori dan</h2>
            <HighlightCard
              title="Najbolji dan"
              row={analytics.highlights.bestDay}
              icon={TrendingUp}
              positive
            />
            <div className="h-4" />
            <HighlightCard
              title="Najgori dan"
              row={analytics.highlights.worstDay}
              icon={TrendingDown}
              positive={false}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Historijski podaci</h2>
            <p className="text-sm text-gray-500 mt-1">Filtrirano po datumu, kampanji i tekstualnoj pretrazi</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Historija od</label>
                <input
                  type="date"
                  value={tableFromDate}
                  onChange={(e) => setTableFromDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Historija do</label>
                <input
                  type="date"
                  value={tableToDate}
                  onChange={(e) => setTableToDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Datum</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Leadovi</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Prodaje</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Prihod</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Ads</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Roba</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Poštarina</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Profit</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Prosj. lead</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Prosj. profit</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kampanje</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistoricalData.map((row) => (
                  <tr key={row.date} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800">{formatDate(row.date)}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{row.leads}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{row.deliveredOrders}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.revenue)}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.adSpend)}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.productCost)}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.shippingCost)}</td>
                    <td className={`py-4 px-6 text-sm text-right font-semibold ${row.profit >= 0 ? "text-green-700" : "text-red-700"}`}>
                      {formatCurrency(row.profit)}
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.avgLeadCost)}</td>
                    <td className="py-4 px-6 text-sm text-right text-gray-800">{formatCurrency(row.avgProfitPerOrder)}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{row.campaigns.join(", ") || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {filteredHistoricalData.map((row) => (
              <div key={row.date} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">{formatDate(row.date)}</p>
                    <p className="text-sm text-gray-500">{row.deliveredOrders} prodaja · {row.leads} leadova</p>
                  </div>
                  <p className={`font-bold ${row.profit >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {formatCurrency(row.profit)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Prihod</p>
                    <p className="font-medium text-gray-800">{formatCurrency(row.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ads</p>
                    <p className="font-medium text-gray-800">{formatCurrency(row.adSpend)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Roba + poštarina</p>
                    <p className="font-medium text-gray-800">{formatCurrency(row.fixedCosts)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Prosj. lead</p>
                    <p className="font-medium text-gray-800">{formatCurrency(row.avgLeadCost)}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500">{row.campaigns.join(", ") || "Bez kampanje"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "green" | "red" | "blue" | "indigo" | "rose" | "purple" | "orange" | "amber" | "emerald";
}) {
  const tones = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-3.5 md:p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tones[tone]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm ${strong ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>{value}</span>
    </div>
  );
}

function HighlightCard({
  title,
  row,
  icon: Icon,
  positive,
}: {
  title: string;
  row: DailyAnalyticsRow | null;
  icon: React.ComponentType<{ className?: string }>;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-xs text-gray-500">{row ? new Date(row.date).toLocaleDateString("bs-BA") : "Nema podataka"}</p>
        </div>
      </div>
      {row && (
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between gap-3">
            <span>Profit</span>
            <span className={`font-bold ${positive ? "text-green-700" : "text-red-700"}`}>{row.profit.toFixed(2)} KM</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Prodaje</span>
            <span className="font-medium">{row.deliveredOrders}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Ads</span>
            <span className="font-medium">{row.adSpend.toFixed(2)} KM</span>
          </div>
        </div>
      )}
    </div>
  );
}
