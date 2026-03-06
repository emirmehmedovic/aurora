"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Target, Upload, Plus } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: string;
  spend: number;
  revenue: number;
  orders: number;
  leads: number;
  roas: number;
  cpl: number;
  cpa: number;
  createdAt: string;
}

export default function CampaignsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

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
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
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

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalOrders = campaigns.reduce((sum, c) => sum + c.orders, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const overallROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const overallCPL = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const overallCPA = totalOrders > 0 ? totalSpend / totalOrders : 0;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Marketing Kampanje</h1>
            <p className="text-gray-600">Praćenje Facebook/Instagram kampanja</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import CSV
            </button>
            <button className="px-4 py-2 bg-[#563435] text-white rounded-lg hover:bg-[#6d4446] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova kampanja
            </button>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Spend */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Ukupan spend</p>
            <p className="text-3xl font-bold text-gray-800">{formatPrice(totalSpend)} KM</p>
            <div className="mt-3 pt-3 border-t border-red-100">
              <p className="text-xs text-gray-500">Svi oglasi</p>
            </div>
          </div>

          {/* ROAS */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">ROAS</p>
            <p className="text-3xl font-bold text-gray-800">{overallROAS.toFixed(2)}x</p>
            <div className="mt-3 pt-3 border-t border-green-100">
              <p className="text-xs text-gray-500">Return on ad spend</p>
            </div>
          </div>

          {/* CPL */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">CPL</p>
            <p className="text-3xl font-bold text-gray-800">{formatPrice(overallCPL)} KM</p>
            <div className="mt-3 pt-3 border-t border-blue-100">
              <p className="text-xs text-gray-500">Cost per lead</p>
            </div>
          </div>

          {/* CPA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">CPA</p>
            <p className="text-3xl font-bold text-gray-800">{formatPrice(overallCPA)} KM</p>
            <div className="mt-3 pt-3 border-t border-purple-100">
              <p className="text-xs text-gray-500">Cost per acquisition</p>
            </div>
          </div>
        </div>

        {/* CSV Upload Section */}
        {showUpload && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Import Ad Spend CSV</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Prevuci CSV fajl ili klikni za upload</p>
              <p className="text-sm text-gray-500">Format: Date, Campaign, Spend, Platform</p>
              <input type="file" accept=".csv" className="hidden" />
              <button className="mt-4 px-6 py-2 bg-[#563435] text-white rounded-lg hover:bg-[#6d4446]">
                Izaberi fajl
              </button>
            </div>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Sve kampanje</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kampanja</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Platforma</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Spend</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Revenue</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">ROAS</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Leadovi</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPL</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Narudžbe</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">CPA</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500">
                      Nema kampanja. Kreiraj novu ili importuj CSV.
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
                          {campaign.platform}
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
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.leads}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpl)} KM</td>
                      <td className="py-4 px-6 text-right text-gray-800">{campaign.orders}</td>
                      <td className="py-4 px-6 text-right text-gray-800">{formatPrice(campaign.cpa)} KM</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
