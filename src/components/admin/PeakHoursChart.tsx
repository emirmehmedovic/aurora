"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HourData {
  hour: number;
  orders: number;
}

export default function PeakHoursChart() {
  const [data, setData] = useState<HourData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats?endpoint=peak-hours");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch peak hours:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Najaktivniji sati</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    hour: `${item.hour}:00`,
    orders: item.orders,
  }));

  const maxOrders = Math.max(...data.map(d => d.orders), 1);
  const topHours = [...data].sort((a, b) => b.orders - a.orders).slice(0, 3);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Najaktivniji sati</h2>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="hour"
            stroke="#6b7280"
            style={{ fontSize: "11px" }}
            interval={1}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px"
            }}
            formatter={(value: any) => [`${value ?? 0} narudžbi`, "Broj narudžbi"]}
          />
          <Bar
            dataKey="orders"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 3 najaktivnija sata:</h3>
        <div className="flex gap-3">
          {topHours.map((item, index) => (
            <div
              key={item.hour}
              className="flex-1 p-3 bg-purple-50 rounded-xl text-center"
            >
              <div className="text-xs text-purple-600 font-medium mb-1">
                #{index + 1}
              </div>
              <div className="text-lg font-bold text-gray-800">
                {item.hour}:00
              </div>
              <div className="text-xs text-gray-500">
                {item.orders} narudžbi
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
