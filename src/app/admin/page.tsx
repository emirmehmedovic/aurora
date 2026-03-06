"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Users, TrendingUp, DollarSign, ShoppingCart, MessageSquare, Clock, UserPlus } from "lucide-react";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalLeads: number;
  conversionRate: number;
  pendingOrders: number;
  newLeads: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalLeads: 0,
    conversionRate: 0,
    pendingOrders: 0,
    newLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
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

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Dobrodošli, {session.user?.name || session.user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600 font-semibold">TOTAL</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Ukupno narudžbi</p>
            <p className="text-4xl font-bold text-gray-800">{stats.totalOrders}</p>
            <div className="mt-3 pt-3 border-t border-blue-100">
              <p className="text-xs text-gray-500">Sve narudžbe</p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600 font-semibold">REVENUE</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Ukupan prihod</p>
            <p className="text-4xl font-bold text-gray-800">{(stats.totalRevenue / 100).toFixed(2)} KM</p>
            <div className="mt-3 pt-3 border-t border-green-100">
              <p className="text-xs text-gray-500">Svi prihodi</p>
            </div>
          </div>

          {/* Total Leads */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-purple-600 font-semibold">LEADS</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Ukupno leadova</p>
            <p className="text-4xl font-bold text-gray-800">{stats.totalLeads}</p>
            <div className="mt-3 pt-3 border-t border-purple-100">
              <p className="text-xs text-gray-500">Svi leadovi</p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-orange-600 font-semibold">RATE</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Conversion rate</p>
            <p className="text-4xl font-bold text-gray-800">{stats.conversionRate.toFixed(1)}%</p>
            <div className="mt-3 pt-3 border-t border-orange-100">
              <p className="text-xs text-gray-500">Lead → Order</p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-yellow-600 font-semibold">PENDING</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Na čekanju</p>
            <p className="text-4xl font-bold text-gray-800">{stats.pendingOrders}</p>
            <div className="mt-3 pt-3 border-t border-yellow-100">
              <p className="text-xs text-gray-500">Nove narudžbe</p>
            </div>
          </div>

          {/* New Leads */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-600 font-semibold">NEW</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Novi leadovi</p>
            <p className="text-4xl font-bold text-gray-800">{stats.newLeads}</p>
            <div className="mt-3 pt-3 border-t border-indigo-100">
              <p className="text-xs text-gray-500">Zadnjih 7 dana</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Brze akcije</h2>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/orders"
              className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-lg transition-all border border-blue-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Narudžbe</h3>
              <p className="text-sm text-gray-600">Upravljaj narudžbama</p>
            </Link>
            <Link
              href="/admin/leads"
              className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all border border-purple-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Leadovi</h3>
              <p className="text-sm text-gray-600">Upravljaj leadovima</p>
            </Link>
            <Link
              href="/admin/products"
              className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all border border-green-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Proizvodi</h3>
              <p className="text-sm text-gray-600">Upravljaj proizvodima</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
