"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Users, TrendingUp, Filter, Phone, Mail, Download } from "lucide-react";
import { exportToExcel, formatCustomersForExport } from "@/lib/excel";

interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  tags: string[];
  totalSpent: number;
  orderCount: number;
  lastOrderAt: string | null;
  _count: {
    orders: number;
  };
}

export default function CustomersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("lastOrderAt");
  const [selectedTag, setSelectedTag] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchCustomers();
  }, [search, sortBy, selectedTag]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sortBy) params.append("sortBy", sortBy);
      if (selectedTag) params.append("tag", selectedTag);

      const response = await fetch(`/api/admin/customers?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(customers.flatMap((c) => c.tags))
  ).sort();

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Kupci</h1>
            </div>
            <p className="text-gray-600">
              Upravljajte bazom kupaca i pratite njihovu aktivnost
            </p>
          </div>
          <button
            onClick={() => {
              const formatted = formatCustomersForExport(customers);
              exportToExcel(formatted, `kupci-${new Date().toISOString().split('T')[0]}`);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Izvezi Excel
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pretraži po imenu, telefonu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="lastOrderAt">Posljednja narudžba</option>
                <option value="totalSpent">Ukupna potrošnja</option>
                <option value="orderCount">Broj narudžbi</option>
                <option value="name">Ime (A-Z)</option>
              </select>
            </div>

            {/* Tag filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="">Svi tagovi</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Pronađeno: <span className="font-semibold">{total}</span> kupaca
        </div>

        {/* Customers list */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Učitavanje...</div>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nema kupaca</p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kupac
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontakt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Narudžbe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ukupno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tagovi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akcije
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {customer.fullName}
                        </div>
                        {customer.lastOrderAt && (
                          <div className="text-xs text-gray-500">
                            Posljednja: {new Date(customer.lastOrderAt).toLocaleDateString("sr-Latn-RS")}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {customer.orderCount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {(customer.totalSpent / 100).toFixed(0)} KM
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                        >
                          Detalji →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
