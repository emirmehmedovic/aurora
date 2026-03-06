"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Users, TrendingUp, DollarSign, ShoppingCart, MessageSquare } from "lucide-react";

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
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Dobrodošli, {session.user?.name || session.user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-violet-600" />
              </div>
              <span className="text-sm text-gray-500">Ukupno</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.totalOrders}</h3>
            <p className="text-sm text-gray-600">Narudžbe</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-sm text-gray-500">Ukupno</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.totalRevenue.toFixed(2)} KM</h3>
            <p className="text-sm text-gray-600">Prihod</p>
          </div>

          {/* Total Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-rose-600" />
              </div>
              <span className="text-sm text-gray-500">Ukupno</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.totalLeads}</h3>
            <p className="text-sm text-gray-600">Leadovi</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500">Stopa</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.conversionRate.toFixed(1)}%</h3>
            <p className="text-sm text-gray-600">Konverzija</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Na čekanju</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.pendingOrders}</h3>
            <p className="text-sm text-gray-600">Narudžbe</p>
          </div>

          {/* New Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
              <span className="text-sm text-gray-500">Novi</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.newLeads}</h3>
            <p className="text-sm text-gray-600">Leadovi</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/orders"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <ShoppingCart className="w-8 h-8 text-[#563435] mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Narudžbe</h3>
            <p className="text-sm text-gray-600">Upravljanje narudžbama</p>
          </Link>

          <Link
            href="/admin/leads"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Users className="w-8 h-8 text-[#563435] mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Leadovi</h3>
            <p className="text-sm text-gray-600">Upravljanje leadovima</p>
          </Link>

          <Link
            href="/admin/products"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Package className="w-8 h-8 text-[#563435] mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Proizvodi</h3>
            <p className="text-sm text-gray-600">Upravljanje proizvodima</p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <TrendingUp className="w-8 h-8 text-[#563435] mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Analitika</h3>
            <p className="text-sm text-gray-600">Marketing dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
