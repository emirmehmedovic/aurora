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
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Analitika</h1>
          <p className="text-gray-600">Pregled performansi i metrika</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Ukupan prihod</p>
            <p className="text-3xl font-bold text-gray-800">{formatPrice(analytics.totalRevenue)} KM</p>
          </div>

          {/* Average Order Value */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Prosječna narudžba</p>
            <p className="text-3xl font-bold text-gray-800">{formatPrice(analytics.averageOrderValue)} KM</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Conversion rate</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.conversionRate.toFixed(1)}%</p>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Ukupno narudžbi</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.totalOrders}</p>
          </div>

          {/* Total Leads */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Ukupno leadova</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.totalLeads}</p>
          </div>

          {/* Lead to Order Rate */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Lead → Order rate</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.leadsToOrdersRate.toFixed(1)}%</p>
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
