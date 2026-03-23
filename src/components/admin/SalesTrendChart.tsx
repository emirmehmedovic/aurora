"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface SalesTrendData {
  dates: string[];
  revenue: number[];
  orders: number[];
}

interface Props {
  days?: number;
}

export default function SalesTrendChart({ days = 30 }: Props) {
  const [data, setData] = useState<SalesTrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(days);

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/stats?endpoint=sales-trend&days=${selectedPeriod}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch sales trend:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Transform data for recharts
  const chartData = data.dates.map((date, index) => ({
    date: format(new Date(date), "dd.MM"),
    revenue: data.revenue[index] / 100, // Convert to KM
    orders: data.orders[index],
  }));

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Trend prodaje</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod(7)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 7
                ? "bg-[#563435] text-white"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            7 dana
          </button>
          <button
            onClick={() => setSelectedPeriod(30)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 30
                ? "bg-[#563435] text-white"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            30 dana
          </button>
          <button
            onClick={() => setSelectedPeriod(90)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 90
                ? "bg-[#563435] text-white"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            90 dana
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            yAxisId="left"
            stroke="#10b981"
            style={{ fontSize: "12px" }}
            label={{ value: "Prihod (KM)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#3b82f6"
            style={{ fontSize: "12px" }}
            label={{ value: "Narudžbe", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px"
            }}
            formatter={(value: any, name: any) => {
              if (typeof value !== 'number') return [value ?? "-", name ?? ""];
              if (name === "revenue") {
                return [`${value.toFixed(2)} KM`, "Prihod"];
              }
              return [value, "Narudžbe"];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            iconType="line"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 3 }}
            activeDot={{ r: 5 }}
            name="Prihod (KM)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 3 }}
            activeDot={{ r: 5 }}
            name="Narudžbe"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
