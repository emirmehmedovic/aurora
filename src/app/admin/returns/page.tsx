"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCcw, Search, Filter, CheckCircle, XCircle, Package, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface Return {
  id: string;
  rmaNumber: string;
  reason: string;
  status: string;
  refundAmount: number | null;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
  };
  order: {
    orderNumber: string;
    totalAmount: number;
  };
}

export default function ReturnsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchReturns();
    }
  }, [session, statusFilter, search]);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search) params.append("search", search);

      const response = await fetch(`/api/admin/returns?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setReturns(data.returns);
      }
    } catch (error) {
      console.error("Failed to fetch returns:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session) {
    return null;
  }

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    REQUESTED: { label: "Zahtjev", color: "bg-yellow-100 text-yellow-700", icon: Package },
    APPROVED: { label: "Odobreno", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    REJECTED: { label: "Odbijeno", color: "bg-red-100 text-red-700", icon: XCircle },
    RECEIVED: { label: "Primljeno", color: "bg-purple-100 text-purple-700", icon: Package },
    REFUNDED: { label: "Refundirano", color: "bg-green-100 text-green-700", icon: DollarSign },
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Povrati i refundacije</h1>
          </div>
          <p className="text-gray-600">
            Upravljanje zahtjevima za povrat i refundacijom
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pretraži po RMA broju ili kupcu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              >
                <option value="ALL">Svi statusi</option>
                <option value="REQUESTED">Zahtjev</option>
                <option value="APPROVED">Odobreno</option>
                <option value="REJECTED">Odbijeno</option>
                <option value="RECEIVED">Primljeno</option>
                <option value="REFUNDED">Refundirano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Returns List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Učitavanje...</div>
          </div>
        ) : returns.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center">
            <RotateCcw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Nema povrata</p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      RMA Broj
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Kupac
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Narudžba
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Razlog
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Datum
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Akcije
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {returns.map((returnItem) => {
                    const StatusIcon = statusConfig[returnItem.status]?.icon || Package;

                    return (
                      <tr key={returnItem.id} className="hover:bg-white/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">
                            {returnItem.rmaNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">
                            {returnItem.customer.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {returnItem.customer.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-800">
                            {returnItem.order.orderNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(returnItem.order.totalAmount / 100).toFixed(0)} KM
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {returnItem.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              statusConfig[returnItem.status]?.color
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusConfig[returnItem.status]?.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {format(new Date(returnItem.createdAt), "dd.MM.yyyy")}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/returns/${returnItem.id}`}
                            className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                          >
                            Detalji →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
