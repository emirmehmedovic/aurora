"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Users, TrendingUp, DollarSign, ShoppingCart, Clock, UserPlus, BarChart3 } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="mb-8 bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Dobrodošli, <span className="font-medium text-[#563435]">{session.user?.name || session.user?.email}</span></p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Total Orders */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Narudžbe</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prihod</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{(stats.totalRevenue / 100).toFixed(0)} <span className="text-sm text-gray-500 font-normal">KM</span></p>
          </div>

          {/* Total Leads */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leadovi</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalLeads}</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Konverzija</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.conversionRate.toFixed(1)}%</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Na čekanju</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
          </div>

          {/* New Leads */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Novi leadovi</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.newLeads}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Brze akcije</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/orders"
              className="group p-5 bg-white/60 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Narudžbe</h3>
                <p className="text-xs text-gray-500">Upravljanje narudžbama</p>
              </div>
            </Link>
            
            <Link
              href="/admin/leads"
              className="group p-5 bg-white/60 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Leadovi</h3>
                <p className="text-xs text-gray-500">Baza potencijalnih kupaca</p>
              </div>
            </Link>
            
            <Link
              href="/admin/products"
              className="group p-5 bg-white/60 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Proizvodi</h3>
                <p className="text-xs text-gray-500">Cijene i informacije</p>
              </div>
            </Link>

            <Link
              href="/admin/tracking"
              className="group p-5 bg-white/60 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Praćenje & Metrike</h3>
                <p className="text-xs text-gray-500">UTM kampanje, funnel, izvori</p>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="group p-5 bg-white/60 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Analitika</h3>
                <p className="text-xs text-gray-500">Prihod, proizvodi, aktivnost</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
