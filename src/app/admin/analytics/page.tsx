"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Users, ShoppingCart, Target, Percent } from "lucide-react";

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  totalLeads: number;
  conversionRate: number;
  averageOrderValue: number;
  leadsToOrdersRate: number;
  topProducts: Array<{
    name: string;
    orders: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    date: string;
    orders: number;
    revenue: number;
    leads: number;
  }>;
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
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

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Analitika</h1>
          <p className="text-gray-600">Pregled performansi i metrika</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Total Revenue */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prihod</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(analytics.totalRevenue)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>

          {/* Average Order Value */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">AOV</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatPrice(analytics.averageOrderValue)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Konverzija</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{analytics.conversionRate.toFixed(1)}<span className="text-lg text-gray-500">%</span></p>
          </div>

          {/* Total Orders */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Narudžbe</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{analytics.totalOrders}</p>
          </div>

          {/* Total Leads */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leadovi</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{analytics.totalLeads}</p>
          </div>

          {/* Lead to Order Rate */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <Percent className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">L→O Rate</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{analytics.leadsToOrdersRate.toFixed(1)}<span className="text-lg text-gray-500">%</span></p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top proizvodi</h2>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#563435] text-white rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.orders} narudžbi</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatPrice(product.revenue)} KM</p>
                  <p className="text-sm text-gray-600">prihod</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Nedavna aktivnost</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Datum</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Narudžbe</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Prihod</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Leadovi</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {new Date(activity.date).toLocaleDateString("bs-BA")}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">{activity.orders}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{formatPrice(activity.revenue)} KM</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{activity.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden divide-y divide-gray-100">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {new Date(activity.date).toLocaleDateString("bs-BA")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.orders} narudžbi • {activity.leads} leadova
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatPrice(activity.revenue)} KM</p>
                  <p className="text-xs text-gray-500">prihod</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
