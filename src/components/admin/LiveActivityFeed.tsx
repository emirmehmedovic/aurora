"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { sr } from "date-fns/locale";
import { ShoppingCart, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

interface ActivityData {
  recentOrders: any[];
  recentLeads: any[];
  newOrdersLastHour: number;
  newLeadsLastHour: number;
}

export default function LiveActivityFeed() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/stats?endpoint=live-activity");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch live activity:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Trenutna aktivnost</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Combine and sort activities
  const activities = [
    ...data.recentOrders.map(order => ({
      type: "order" as const,
      id: order.id,
      title: `Narudžba ${order.orderNumber}`,
      description: `${order.customer.fullName} - ${(order.totalAmount / 100).toFixed(0)} KM`,
      time: new Date(order.createdAt),
      link: `/admin/orders/${order.id}`,
    })),
    ...data.recentLeads.map(lead => ({
      type: "lead" as const,
      id: lead.id,
      title: `Novi lead`,
      description: `${lead.fullName} - ${lead.phone}`,
      time: new Date(lead.createdAt),
      link: `/admin/leads/${lead.id}`,
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 10);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Trenutna aktivnost</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Uživo</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 bg-blue-50/60 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">U zadnjih sat</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {data.newOrdersLastHour}
          </div>
          <div className="text-xs text-gray-500">narudžbi</div>
        </div>

        <div className="p-3 bg-purple-50/60 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">U zadnjih sat</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {data.newLeadsLastHour}
          </div>
          <div className="text-xs text-gray-500">leadova</div>
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <Link
            key={`${activity.type}-${activity.id}`}
            href={activity.link}
            className="block p-3 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === "order"
                    ? "bg-blue-50"
                    : "bg-purple-50"
                }`}
              >
                {activity.type === "order" ? (
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                ) : (
                  <Users className="w-4 h-4 text-purple-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 text-sm truncate">
                  {activity.title}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {activity.description}
                </div>
              </div>

              <div className="text-xs text-gray-400 flex-shrink-0">
                {formatDistanceToNow(activity.time, {
                  addSuffix: true,
                  locale: sr,
                })}
              </div>
            </div>
          </Link>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nema nedavne aktivnosti
          </div>
        )}
      </div>
    </div>
  );
}
