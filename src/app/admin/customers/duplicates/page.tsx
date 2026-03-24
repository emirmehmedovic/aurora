"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

interface DuplicateGroup {
  phoneNormalized: string;
  customers: Customer[];
}

export default function CustomerDuplicatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [merging, setMerging] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchDuplicates();
    }
  }, [session]);

  const fetchDuplicates = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/customers/duplicates");
      const data = await response.json();
      setDuplicates(data.duplicates);
    } catch (error) {
      console.error("Failed to fetch duplicates:", error);
      toast.error("Greška pri učitavanju duplikata");
    } finally {
      setLoading(false);
    }
  };

  const handleMerge = async (targetId: string, sourceIds: string[], phoneNorm: string) => {
    if (!confirm(`Da li ste sigurni da želite spojiti ${sourceIds.length + 1} kupaca u jednog?`)) {
      return;
    }

    try {
      setMerging(phoneNorm);
      const response = await fetch("/api/admin/customers/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId,
          sourceIds,
          strategy: "most_complete"
        })
      });

      if (response.ok) {
        toast.success("Kupci uspješno spojeni!");
        fetchDuplicates();
      } else {
        toast.error("Greška pri spajanju kupaca");
      }
    } catch (error) {
      console.error("Merge error:", error);
      toast.error("Greška pri spajanju kupaca");
    } finally {
      setMerging(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#563435]" />
          </div>
          <p className="text-gray-600 font-medium">Učitavanje duplikata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin/customers" className="p-2 hover:bg-white/60 rounded-full transition-all">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Dupli Kupci</h1>
          </div>
          <p className="text-gray-600 ml-10">
            Pronađeno {duplicates.length} grupa duplikata (ukupno {duplicates.reduce((sum, g) => sum + g.customers.length, 0)} kupaca)
          </p>
        </div>

        {/* Stats Cards */}
        {duplicates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Grupe duplikata</p>
              </div>
              <p className="text-3xl font-bold text-gray-800">{duplicates.length}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Ukupno duplikata</p>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {duplicates.reduce((sum, g) => sum + g.customers.length, 0)}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prosječno po grupi</p>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {(duplicates.reduce((sum, g) => sum + g.customers.length, 0) / duplicates.length).toFixed(1)}
              </p>
            </div>
          </div>
        )}

        {duplicates.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Nema duplikata</h3>
            <p className="text-gray-600">
              Svi kupci imaju jedinstvene telefone
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {duplicates.map((group) => (
              <div key={group.phoneNormalized} className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    📞 {group.phoneNormalized}
                  </h3>
                  <span className="px-4 py-2 bg-red-50 text-red-700 rounded-xl text-sm font-bold border border-red-100">
                    {group.customers.length} duplikata
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {group.customers.map((customer, index) => (
                    <div
                      key={customer.id}
                      className={`border-2 rounded-2xl p-5 transition-all ${
                        index === 0
                          ? 'border-green-300 bg-green-50/50 hover:shadow-md'
                          : 'border-white/60 bg-white/40 hover:bg-white/60 hover:shadow-md'
                      }`}
                    >
                      {index === 0 && (
                        <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded mb-2">
                          GLAVNI
                        </span>
                      )}
                      <p className="font-bold text-gray-900 mb-1">{customer.fullName}</p>
                      <p className="text-sm text-gray-600 mb-1">{customer.phone}</p>
                      {customer.email && (
                        <p className="text-sm text-gray-600 mb-2">{customer.email}</p>
                      )}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Narudžbe</p>
                          <p className="text-sm font-semibold text-gray-900">{customer.orderCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Ukupno</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {(customer.totalSpent / 100).toFixed(2)} KM
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(customer.createdAt).toLocaleDateString("bs-BA")}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleMerge(
                    group.customers[0].id,
                    group.customers.slice(1).map(c => c.id),
                    group.phoneNormalized
                  )}
                  disabled={merging === group.phoneNormalized}
                  className="w-full px-6 py-4 bg-[#563435] text-white rounded-2xl font-bold hover:bg-[#563435]/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {merging === group.phoneNormalized ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Spajanje...
                    </>
                  ) : (
                    `Spoji sve u jednog kupca`
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
