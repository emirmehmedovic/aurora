"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AttributionData {
  model: string;
  campaigns: {
    campaign: string;
    revenue: number;
    orders: number;
    leads: number;
    adCost: number;
    roas: number;
    cpa: number;
  }[];
}

export default function AttributionChart() {
  const [data, setData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState("lastTouch");

  useEffect(() => {
    fetchData();
  }, [selectedModel]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/campaigns/analytics?endpoint=attribution&model=${selectedModel}`
      );
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch attribution data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Atribucioni model</h2>
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!data || data.campaigns.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Atribucioni model</h2>
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">Nema podataka</div>
        </div>
      </div>
    );
  }

  const chartData = data.campaigns.slice(0, 10).map(c => ({
    name: c.campaign.substring(0, 20),
    revenue: c.revenue / 100,
    orders: c.orders,
    roas: c.roas,
  }));

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Atribucioni model</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedModel("firstTouch")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedModel === "firstTouch"
                ? "bg-[#563435] text-white"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            Prvi dodir
          </button>
          <button
            onClick={() => setSelectedModel("lastTouch")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedModel === "lastTouch"
                ? "bg-[#563435] text-white"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            Posljednji dodir
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            style={{ fontSize: "11px" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            yAxisId="left"
            stroke="#10b981"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#3b82f6"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: any, name: any) => {
              if (value === undefined || typeof value !== 'number') return [value ?? "-", name ?? ""];
              if (name === "revenue") {
                return [`${value.toFixed(2)} KM`, "Prihod"];
              } else if (name === "roas") {
                return [`${value.toFixed(2)}x`, "ROAS"];
              }
              return [value, name === "orders" ? "Narudžbe" : name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            fill="#10b981"
            name="Prihod (KM)"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="orders"
            fill="#3b82f6"
            name="Narudžbe"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Top campaigns table */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Top kampanje ({selectedModel === "firstTouch" ? "Prvi dodir" : "Posljednji dodir"}):
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-3 py-2 text-left">Kampanja</th>
                <th className="px-3 py-2 text-right">Leadovi</th>
                <th className="px-3 py-2 text-right">Narudžbe</th>
                <th className="px-3 py-2 text-right">Prihod</th>
                <th className="px-3 py-2 text-right">ROAS</th>
                <th className="px-3 py-2 text-right">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.campaigns.slice(0, 5).map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-800">
                    {campaign.campaign}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600">
                    {campaign.leads}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600">
                    {campaign.orders}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-800">
                    {(campaign.revenue / 100).toFixed(0)} KM
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        campaign.roas >= 3
                          ? "bg-green-100 text-green-700"
                          : campaign.roas >= 2
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {campaign.roas.toFixed(2)}x
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600">
                    {(campaign.cpa / 100).toFixed(0)} KM
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
