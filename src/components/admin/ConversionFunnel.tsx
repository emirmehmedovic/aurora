"use client";

import { useState, useEffect } from "react";
import { Users, Phone, CheckCircle, ShoppingCart } from "lucide-react";

interface FunnelData {
  leads: number;
  contacted: number;
  qualified: number;
  converted: number;
  rate: number;
}

export default function ConversionFunnel() {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);

  const clampPercentage = (value: number) => Math.max(0, Math.min(100, value));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats?endpoint=conversion-funnel");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch conversion funnel:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Konverzijski funnel</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const stages = [
    {
      label: "Leadovi",
      value: data.leads,
      icon: Users,
      color: "bg-purple-500",
      width: 100,
    },
    {
      label: "Kontaktirani",
      value: data.contacted,
      icon: Phone,
      color: "bg-blue-500",
      width: clampPercentage(data.leads > 0 ? (data.contacted / data.leads) * 100 : 0),
    },
    {
      label: "Kvalifikovani",
      value: data.qualified,
      icon: CheckCircle,
      color: "bg-orange-500",
      width: clampPercentage(data.leads > 0 ? (data.qualified / data.leads) * 100 : 0),
    },
    {
      label: "Konvertovani",
      value: data.converted,
      icon: ShoppingCart,
      color: "bg-green-500",
      width: clampPercentage(data.leads > 0 ? (data.converted / data.leads) * 100 : 0),
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Konverzijski funnel</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {(data.rate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">stopa konverzije</div>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const previousValue = index > 0 ? stages[index - 1].value : 0;
          const dropoffRate = index > 0
            ? previousValue > 0
              ? ((previousValue - stage.value) / previousValue) * 100
              : 0
            : 0;

          return (
            <div key={stage.label}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                    <div className="flex items-center gap-3">
                      {index > 0 && dropoffRate > 0 && (
                        <span className="text-xs text-red-600">
                          -{dropoffRate.toFixed(1)}%
                        </span>
                      )}
                      <span className="text-sm font-bold text-gray-800">{stage.value}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${stage.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${stage.width}%` }}
                    />
                  </div>
                </div>
              </div>

              {index < stages.length - 1 && (
                <div className="ml-4 border-l-2 border-gray-300 h-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
