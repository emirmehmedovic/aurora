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
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Povrati i refundacije</h1>
                <p className="text-gray-600">
                  Narudžbe označene kao vraćene
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-orange-100 border border-orange-300 rounded-xl">
              <p className="text-sm font-bold text-orange-800">
                {returns.length} {returns.length === 1 ? 'povrat' : 'povrata'}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-white/70 via-white/60 to-white/50 backdrop-blur-md border border-white/40 rounded-3xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#563435] flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Filteri</h3>
              <p className="text-xs text-gray-500">Pretraži i filtriraj povrate</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                <Search className="w-3 h-3 inline mr-1" />
                Pretraga
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Narudžba, kupac, telefon..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#563435] focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                <Package className="w-3 h-3 inline mr-1" />
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#563435] focus:border-transparent transition-all shadow-sm font-medium"
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
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 animate-spin text-orange-600" />
            </div>
            <p className="text-gray-600 font-medium">Učitavanje povrata...</p>
          </div>
        ) : returns.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Nema povrata</h3>
            <p className="text-gray-600">Trenutno nema narudžbi označenih kao vraćene</p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50/80 to-gray-50/40 border-b-2 border-gray-200/60">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      RMA Broj
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Kupac
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Narudžba
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Razlog
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Akcije
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {returns.map((returnItem) => {
                    const StatusIcon = statusConfig[returnItem.status]?.icon || Package;

                    return (
                      <tr key={returnItem.id} className="hover:bg-white/70 transition-all">
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
                            href={`/admin/orders/${returnItem.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#563435] text-white text-sm font-bold rounded-xl hover:bg-[#563435]/90 transition-all shadow-sm hover:shadow-md"
                          >
                            Vidi narudžbu
                            <Package className="w-4 h-4" />
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
