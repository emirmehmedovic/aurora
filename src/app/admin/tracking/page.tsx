"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp, DollarSign, Users, ShoppingCart, Target, Globe,
  Megaphone, FileText, ArrowLeft, BarChart3, Eye, MousePointerClick,
  MessageCircle, Percent, ArrowUpRight, ArrowDownRight
} from "lucide-react";

interface TrackingData {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    totalLeads: number;
    paidOrders: number;
    organicOrders: number;
    paidRevenue: number;
    organicRevenue: number;
    overallConversion: number;
  };
  sourceBreakdown: Array<{
    source: string;
    orders: number;
    revenue: number;
    leads: number;
    conversionRate: number;
  }>;
  campaignBreakdown: Array<{
    campaign: string;
    orders: number;
    revenue: number;
    leads: number;
    conversionRate: number;
    cpa: number;
  }>;
  landingPageBreakdown: Array<{
    page: string;
    leads: number;
    converted: number;
    conversionRate: number;
  }>;
  dailyData: Array<{
    date: string;
    orders: number;
    revenue: number;
    leads: number;
  }>;
  leadStatusBreakdown: Array<{
    status: string;
    count: number;
  }>;
}

const statusLabels: Record<string, string> = {
  NEW: "Novi",
  CALLED: "Pozvani",
  CONFIRMED: "Potvrđeni",
  CANCELLED: "Otkazani",
  NO_ANSWER: "Bez odgovora",
  FOLLOW_UP: "Za praćenje",
};

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CALLED: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  NO_ANSWER: "bg-gray-100 text-gray-800",
  FOLLOW_UP: "bg-purple-100 text-purple-800",
};

export default function TrackingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/tracking");
      if (res.ok) setData(await res.json());
    } catch (err) {
      console.error("Failed to fetch tracking data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => (n / 100).toFixed(2);
  const fmtShort = (n: number) => (n / 100).toFixed(0);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  if (!session || !data) return null;

  const s = data.summary;
  const maxDailyOrders = Math.max(...data.dailyData.map((d) => d.orders), 1);
  const maxDailyLeads = Math.max(...data.dailyData.map((d) => d.leads), 1);

  return (
    <div className="p-4 md:p-6 bg-gray-50/30 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2">
              <ArrowLeft className="w-4 h-4" /> Nazad na dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Praćenje & Metrike</h1>
            <p className="text-gray-600">UTM kampanje, izvori, landing stranice, funnel analiza</p>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-white/60 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-all"
          >
            Osvježi
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prihod</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{fmtShort(s.totalRevenue)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
            <div className="flex gap-3 mt-2 text-xs">
              <span className="text-green-600">Plaćeni: {fmtShort(s.paidRevenue)} KM</span>
              <span className="text-gray-500">Organski: {fmtShort(s.organicRevenue)} KM</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Narudžbe</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.totalOrders}</p>
            <div className="flex gap-3 mt-2 text-xs">
              <span className="text-blue-600">Plaćeni: {s.paidOrders}</span>
              <span className="text-gray-500">Organski: {s.organicOrders}</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leadovi</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.totalLeads}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Konverzija</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.overallConversion.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">Lead → Narudžba</p>
          </div>
        </div>

        {/* Daily Chart (simple bar chart) */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-600" /> Dnevni pregled (zadnjih 30 dana)
          </h2>
          <p className="text-sm text-gray-500 mb-4">Narudžbe i leadovi po danu</p>

          <div className="flex items-end gap-[2px] h-32 mb-2">
            {data.dailyData.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-[1px] group relative">
                {/* Lead bar */}
                <div
                  className="w-full bg-purple-200 rounded-t-sm min-h-[1px]"
                  style={{ height: `${(day.leads / maxDailyLeads) * 50}%` }}
                />
                {/* Order bar */}
                <div
                  className="w-full bg-[#563435] rounded-t-sm min-h-[1px]"
                  style={{ height: `${(day.orders / maxDailyOrders) * 50}%` }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {new Date(day.date).toLocaleDateString("bs-BA", { day: "numeric", month: "short" })}
                  <br />{day.orders} narudžbi · {day.leads} leadova
                  <br />{fmt(day.revenue)} KM
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{new Date(data.dailyData[0]?.date).toLocaleDateString("bs-BA", { day: "numeric", month: "short" })}</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#563435] rounded-full inline-block" /> Narudžbe</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-200 rounded-full inline-block" /> Leadovi</span>
            </div>
            <span>{new Date(data.dailyData[data.dailyData.length - 1]?.date).toLocaleDateString("bs-BA", { day: "numeric", month: "short" })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* UTM Source Breakdown */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-600" /> Izvori (UTM Source)
            </h2>
            {data.sourceBreakdown.length === 0 ? (
              <p className="text-gray-500 text-sm">Nema podataka. Narudžbe će se pojaviti kad korisnici dođu s UTM linkova.</p>
            ) : (
              <div className="space-y-3">
                {data.sourceBreakdown.map((src) => (
                  <div key={src.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 uppercase">
                        {src.source.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{src.source}</p>
                        <p className="text-xs text-gray-500">{src.leads} leadova · {src.orders} narudžbi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-sm">{fmtShort(src.revenue)} KM</p>
                      <p className="text-xs text-gray-500">{src.conversionRate.toFixed(1)}% konv.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lead Status Funnel */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" /> Lead Status Funnel
            </h2>
            {data.leadStatusBreakdown.length === 0 ? (
              <p className="text-gray-500 text-sm">Nema podataka.</p>
            ) : (
              <div className="space-y-3">
                {data.leadStatusBreakdown
                  .sort((a, b) => b.count - a.count)
                  .map((ls) => {
                    const pct = s.totalLeads > 0 ? ((ls.count / s.totalLeads) * 100) : 0;
                    return (
                      <div key={ls.status} className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[ls.status] || "bg-gray-100 text-gray-800"}`}>
                          {statusLabels[ls.status] || ls.status}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-[#563435] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700 w-12 text-right">{ls.count}</span>
                        <span className="text-xs text-gray-500 w-12 text-right">{pct.toFixed(0)}%</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-gray-600" /> Kampanje (UTM Campaign)
            </h2>
            <p className="text-sm text-gray-500">Performanse po kampanji — koristi UTM parametre na ad linkovima</p>
          </div>

          {data.campaignBreakdown.length === 0 ? (
            <div className="p-6 text-gray-500 text-sm">
              Nema podataka. Dodaj <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">?utm_campaign=naziv</code> na linkove u reklamama.
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Kampanja</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Leadovi</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Narudžbe</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Konverzija</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Prihod</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Avg. narudžba</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaignBreakdown.map((c) => (
                      <tr key={c.campaign} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-medium text-gray-800 text-sm">{c.campaign}</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-600">{c.leads}</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-800 font-semibold">{c.orders}</td>
                        <td className="py-3 px-4 text-right text-sm">
                          <span className={`font-semibold ${c.conversionRate >= 10 ? "text-green-600" : c.conversionRate >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                            {c.conversionRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-800">{fmtShort(c.revenue)} KM</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-600">{c.orders > 0 ? fmt(c.cpa) : "—"} KM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden divide-y divide-gray-100">
                {data.campaignBreakdown.map((c) => (
                  <div key={c.campaign} className="p-4">
                    <p className="font-semibold text-gray-800 text-sm mb-2">{c.campaign}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-gray-500">Leadovi:</span> <span className="font-medium">{c.leads}</span></div>
                      <div><span className="text-gray-500">Narudžbe:</span> <span className="font-bold">{c.orders}</span></div>
                      <div><span className="text-gray-500">Konv.:</span> <span className="font-semibold">{c.conversionRate.toFixed(1)}%</span></div>
                    </div>
                    <p className="text-sm font-bold text-gray-800 mt-2">{fmtShort(c.revenue)} KM prihod</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Landing Page Performance */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" /> Landing stranice
            </h2>
            <p className="text-sm text-gray-500">Koje stranice generiraju najviše leadova</p>
          </div>

          {data.landingPageBreakdown.length === 0 ? (
            <div className="p-6 text-gray-500 text-sm">Nema podataka o landing stranicama.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.landingPageBreakdown.map((lp) => (
                <div key={lp.page} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{lp.page}</p>
                    <p className="text-xs text-gray-500">{lp.leads} leadova · {lp.converted} potvrđenih</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${lp.conversionRate >= 10 ? "text-green-600" : "text-gray-800"}`}>
                      {lp.conversionRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">konverzija</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-indigo-800 mb-2">💡 Kako koristiti ove metrike</h3>
          <div className="text-sm text-indigo-700 space-y-2">
            <p><strong>UTM parametri:</strong> Dodaj na linkove u reklamama, npr: <code className="bg-white/60 px-1 py-0.5 rounded text-xs">?utm_source=meta&utm_medium=cpc&utm_campaign=ipl-pro-ljeto</code></p>
            <p><strong>Scroll depth + CTA klikovi:</strong> Vidljivi u Google Analytics → Events → scroll_depth, cta_click</p>
            <p><strong>Form abandonment:</strong> GA4 → Events → form_start, form_abandon (pokaže gdje korisnici odustaju)</p>
            <p><strong>Heatmaps:</strong> Microsoft Clarity dashboard → clarity.microsoft.com (sesije, klikovi, scroll mape)</p>
            <p><strong>WhatsApp klikovi:</strong> GA4 → Events → whatsapp_click</p>
          </div>
        </div>
      </div>
    </div>
  );
}
