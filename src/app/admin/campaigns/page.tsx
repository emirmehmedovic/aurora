"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Target, Upload, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import AttributionChart from "@/components/admin/AttributionChart";
import CampaignFunnel from "@/components/admin/CampaignFunnel";

interface Campaign {
  id: string;
  name: string;
  source: string;
  medium?: string;
  active: boolean;
  spend: number;
  revenue: number;
  orders: number;
  leads: number;
  roas: number;
  cpl: number;
  cpa: number;
  impressions: number;
  clicks: number;
  results: number;
  ctr: number;
  cpc: number;
  cpm: number;
  createdAt: string;
}

interface LandingBreakdownItem {
  campaign: string;
  page: string;
  leads: number;
  confirmed: number;
  conversionRate: number;
}

interface ImportInfo {
  lastUploadedAt: string | null;
  lastFilename: string | null;
  lastImportedPeriodStart: string | null;
  lastImportedPeriodEnd: string | null;
  latestCoveredDate: string | null;
}

export default function CampaignsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingImports, setDeletingImports] = useState(false);
  const [importInfo, setImportInfo] = useState<ImportInfo | null>(null);
  const [landingBreakdown, setLandingBreakdown] = useState<LandingBreakdownItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New campaign form
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignSource, setNewCampaignSource] = useState("facebook");
  const [newCampaignMedium, setNewCampaignMedium] = useState("cpc");
  const [newCampaignDescription, setNewCampaignDescription] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchCampaigns();
    }
  }, [session]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/admin/campaigns");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns);
        setImportInfo(data.importInfo ?? null);
        setLandingBreakdown(data.landingBreakdown ?? []);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/campaigns/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `Import završio. Novo: ${data.importedCount}, ažurirano: ${data.updatedCount}, preskočeno: ${data.skippedOverlapCount}.`
        );
        if (data.errors && data.errors.length > 0) {
          toast.warning(`${data.errors.length} upozorenja pri importu`, {
            description: data.errors.slice(0, 3).join("\n"),
          });
        }
        await fetchCampaigns();
        setShowUpload(false);
      } else {
        toast.error(data.error || "Greška pri importu fajla");
      }
    } catch (error) {
      toast.error("Greška pri upload-u fajla");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCampaignName.trim()) {
      toast.error("Naziv kampanje je obavezan");
      return;
    }

    try {
      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCampaignName,
          source: newCampaignSource,
          medium: newCampaignMedium,
          description: newCampaignDescription,
        }),
      });

      if (response.ok) {
        toast.success("Kampanja kreirana!");
        fetchCampaigns();
        setShowNewCampaign(false);
        setNewCampaignName("");
        setNewCampaignSource("facebook");
        setNewCampaignMedium("cpc");
        setNewCampaignDescription("");
      } else {
        const data = await response.json();
        toast.error(data.error || "Greška pri kreiranju kampanje");
      }
    } catch (error) {
      toast.error("Greška pri kreiranju kampanje");
    }
  };

  const handleDeleteImportedData = async () => {
    const confirmed = window.confirm(
      "Obrisati sve importovane ad spend podatke? Kampanje će ostati, ali će spend i import historija biti uklonjeni."
    );

    if (!confirmed) {
      return;
    }

    setDeletingImports(true);
    try {
      const response = await fetch("/api/admin/campaigns/import", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Greška pri brisanju importovanih podataka");
        return;
      }

      toast.success(`Obrisano redova: ${data.deletedRows}.`);
      await fetchCampaigns();
    } catch (error) {
      toast.error("Greška pri brisanju importovanih podataka");
    } finally {
      setDeletingImports(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatDate = (value: string | null) => {
    if (!value) return "Nije dostupno";
    return new Date(value).toLocaleDateString("bs-BA");
  };

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalOrders = campaigns.reduce((sum, c) => sum + c.orders, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalResults = campaigns.reduce((sum, c) => sum + c.results, 0);
  const overallROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const overallCPL = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const overallCPA = totalOrders > 0 ? totalSpend / totalOrders : 0;
  const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const overallCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const overallCPM = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Marketing Kampanje</h1>
            <p className="text-gray-600">Praćenje Facebook/Instagram kampanja</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import CSV/XLSX
            </button>
            <button
              onClick={handleDeleteImportedData}
              disabled={deletingImports}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              {deletingImports ? "Brišem..." : "Obriši import"}
            </button>
            <button
              onClick={() => setShowNewCampaign(true)}
              className="px-4 py-2 bg-[#563435] text-white rounded-lg hover:bg-[#6d4446] flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nova kampanja
            </button>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Spend */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Spend</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(totalSpend)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>

          {/* ROAS */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">ROAS</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{overallROAS.toFixed(2)}<span className="text-sm text-gray-500 font-normal">x</span></p>
          </div>

          {/* CPL */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">CPL</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(overallCPL)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>

          {/* CPA */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">CPA</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(overallCPA)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Impressions</p>
            <p className="text-2xl font-bold text-gray-800">{totalImpressions.toLocaleString()}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Clicks</p>
            <p className="text-2xl font-bold text-gray-800">{totalClicks.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">CTR {overallCTR.toFixed(2)}%</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Results</p>
            <p className="text-2xl font-bold text-gray-800">{totalResults.toLocaleString()}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">CPC / CPM</p>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(overallCPC)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
            <p className="text-sm text-gray-500 mt-1">CPM {formatPrice(overallCPM)} KM</p>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AttributionChart />
          <CampaignFunnel />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Landing Breakdown Po Kampanji</h2>
            <p className="text-sm text-gray-500 mt-1">
              Prikazane su samo stranice koje počinju sa <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">/l/</code>.
            </p>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Landing</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kampanja</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Leadovi</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Potvrđeni</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Konverzija</th>
                </tr>
              </thead>
              <tbody>
                {landingBreakdown.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      Nema landing podataka za kampanje.
                    </td>
                  </tr>
                ) : (
                  landingBreakdown.map((item) => (
                    <tr key={`${item.campaign}-${item.page}`} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{item.page}</code>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.campaign}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{item.leads}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{item.confirmed}</td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-800">{item.conversionRate.toFixed(1)}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {landingBreakdown.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nema landing podataka za kampanje.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {landingBreakdown.map((item) => (
                  <div key={`${item.campaign}-${item.page}`} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{item.page}</code>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.campaign}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Leadovi</p>
                        <p className="font-semibold text-gray-800">{item.leads}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Potvrđeni</p>
                        <p className="font-semibold text-gray-800">{item.confirmed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Konverzija</p>
                        <p className="font-semibold text-gray-800">{item.conversionRate.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CSV Upload Section */}
        {showUpload && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Import Ad Spend CSV/XLSX</h2>
              <button
                onClick={() => setShowUpload(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <p className="font-semibold">
                Zadnji pokriveni datum: {formatDate(importInfo?.latestCoveredDate ?? null)}
              </p>
              <p className="mt-1">
                Preporuka je da novi izvještaj krene od tog datuma ili kasnije, da se izbjegne djelimično preklapanje.
              </p>
              <p className="mt-1 text-amber-800">
                Ako želiš krenuti ispočetka, koristi dugme <span className="font-semibold">Obriši import</span> pa onda uradi novi upload.
              </p>
              {importInfo?.lastFilename && (
                <p className="mt-1 text-amber-800">
                  Zadnji upload: {importInfo.lastFilename}
                  {importInfo.lastImportedPeriodStart && importInfo.lastImportedPeriodEnd
                    ? ` (${formatDate(importInfo.lastImportedPeriodStart)} - ${formatDate(importInfo.lastImportedPeriodEnd)})`
                    : ""}
                </p>
              )}
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Prevuci CSV/XLSX fajl ili klikni za upload</p>
              <p className="text-sm text-gray-500 mb-4">
                Podržano: Meta export i slični izvještaji sa datumom, nazivom kampanje/oglasa i troškom
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-4 px-6 py-2 bg-[#563435] text-white rounded-lg hover:bg-[#6d4446] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploaduje se..." : "Izaberi fajl"}
              </button>
            </div>
          </div>
        )}

        {/* New Campaign Modal */}
        {showNewCampaign && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Nova kampanja</h2>
                <button
                  onClick={() => setShowNewCampaign(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Naziv kampanje *
                  </label>
                  <input
                    type="text"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    placeholder="npr. Summer Sale 2026"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Izvor *
                  </label>
                  <select
                    value={newCampaignSource}
                    onChange={(e) => setNewCampaignSource(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google Ads</option>
                    <option value="tiktok">TikTok</option>
                    <option value="organic">Organic</option>
                    <option value="other">Ostalo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium
                  </label>
                  <select
                    value={newCampaignMedium}
                    onChange={(e) => setNewCampaignMedium(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                  >
                    <option value="cpc">CPC</option>
                    <option value="cpm">CPM</option>
                    <option value="cpa">CPA</option>
                    <option value="organic">Organic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opis
                  </label>
                  <textarea
                    value={newCampaignDescription}
                    onChange={(e) => setNewCampaignDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    rows={3}
                    placeholder="Dodatne informacije o kampanji..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewCampaign(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Otkaži
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#563435] text-white rounded-lg hover:bg-[#6d4446]"
                  >
                    Kreiraj
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Campaigns List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Sve kampanje</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kampanja</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Platforma</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Spend</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Revenue</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">ROAS</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Impr.</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Clicks</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CTR</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Results</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Leadovi</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPL</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Narudžbe</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPA</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPC</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPM</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="py-12 text-center text-gray-500">
                      Nema kampanja. Kreiraj novu ili importuj CSV/XLSX.
                    </td>
                  </tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">{campaign.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(campaign.createdAt).toLocaleDateString("bs-BA")}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {campaign.source}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-800">
                        {formatPrice(campaign.spend)} KM
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-green-600">
                        {formatPrice(campaign.revenue)} KM
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`font-bold ${campaign.roas >= 2 ? 'text-green-600' : campaign.roas >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {campaign.roas.toFixed(2)}x
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.impressions.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.clicks.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.ctr.toFixed(2)}%</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.results.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.leads}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpl)} KM</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.orders}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpa)} KM</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpc)} KM</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpm)} KM</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {campaigns.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nema kampanja. Kreiraj novu ili importuj CSV/XLSX.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{campaign.name}</h3>
                        <p className="text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString("bs-BA")}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {campaign.source}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Spend</p>
                        <p className="font-semibold text-gray-800">{formatPrice(campaign.spend)} KM</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="font-semibold text-green-600">{formatPrice(campaign.revenue)} KM</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">ROAS</p>
                        <p className={`font-bold ${campaign.roas >= 2 ? 'text-green-600' : campaign.roas >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {campaign.roas.toFixed(2)}x
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">CPA</p>
                        <p className="font-semibold text-gray-800">{formatPrice(campaign.cpa)} KM</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Clicks / CTR</p>
                        <p className="font-semibold text-gray-800">{campaign.clicks.toLocaleString()} / {campaign.ctr.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">CPC / CPM</p>
                        <p className="font-semibold text-gray-800">{formatPrice(campaign.cpc)} / {formatPrice(campaign.cpm)} KM</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-50">
                       <div className="text-center">
                         <p className="text-xs text-gray-500">Impr.</p>
                         <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                       </div>
                       <div className="text-center border-l border-gray-100">
                         <p className="text-xs text-gray-500">Leadovi</p>
                         <p className="font-semibold">{campaign.leads}</p>
                       </div>
                       <div className="text-center border-l border-gray-100">
                         <p className="text-xs text-gray-500">Results</p>
                         <p className="font-semibold">{campaign.results.toLocaleString()}</p>
                       </div>
                       <div className="text-center border-l border-gray-100">
                         <p className="text-xs text-gray-500">Narudžbe</p>
                         <p className="font-semibold">{campaign.orders}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
