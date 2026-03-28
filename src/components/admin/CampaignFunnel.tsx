"use client";

import { useState, useEffect } from "react";
import { Eye, MousePointer, Users, ShoppingCart } from "lucide-react";

interface FunnelData {
  impressions: number;
  clicks: number;
  leads: number;
  orders: number;
  clickRate: number;
  leadRate: number;
  conversionRate: number;
}

interface Props {
  campaignId?: string | null;
}

export default function CampaignFunnel({ campaignId = null }: Props) {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [campaignId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = campaignId
        ? `/api/admin/campaigns/analytics?endpoint=funnel&campaignId=${campaignId}`
        : "/api/admin/campaigns/analytics?endpoint=funnel";

      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch funnel data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Funnel performanse</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

  const stages = [
    {
      label: "Impressions",
      value: data.impressions,
      icon: Eye,
      color: "bg-blue-500",
      width: 100,
    },
    {
      label: "Clicks",
      value: data.clicks,
      icon: MousePointer,
      color: "bg-purple-500",
      width: clampPercent(data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0),
      rate: data.clickRate,
    },
    {
      label: "Leads",
      value: data.leads,
      icon: Users,
      color: "bg-orange-500",
      width: clampPercent(data.impressions > 0 ? (data.leads / data.impressions) * 100 : 0),
      rate: data.leadRate,
    },
    {
      label: "Orders",
      value: data.orders,
      icon: ShoppingCart,
      color: "bg-green-500",
      width: clampPercent(data.impressions > 0 ? (data.orders / data.impressions) * 100 : 0),
      rate: data.conversionRate,
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Funnel performanse</h2>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const previousValue = index > 0 ? stages[index - 1].value : 0;
          const Icon = stage.icon;
          const dropoff = index > 0
            ? previousValue > 0
              ? ((previousValue - stage.value) / previousValue) * 100
              : 0
            : 0;

          return (
            <div key={stage.label}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${stage.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-right">
                      {stage.rate !== undefined && (
                        <span className="text-xs text-green-600 font-semibold">
                          {stage.rate.toFixed(1)}% rate
                        </span>
                      )}
                      {index > 0 && dropoff > 0 && (
                        <span className="text-xs text-red-600">
                          -{dropoff.toFixed(1)}% dropoff
                        </span>
                      )}
                      <span className="text-sm font-bold text-gray-800 min-w-[80px]">
                        {stage.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${stage.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${stage.width}%` }}
                    />
                  </div>
                </div>
              </div>

              {index < stages.length - 1 && (
                <div className="ml-5 border-l-2 border-gray-300 h-4" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary metrics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {data.clickRate.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-600">CTR</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">
              {data.leadRate.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-600">Lead Rate</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {data.conversionRate.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-600">Conversion</div>
          </div>
        </div>
      </div>
    </div>
  );
}
