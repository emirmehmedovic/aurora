"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Package,
  MessageSquare,
  X,
  Plus,
  Save,
  DollarSign,
  CheckCircle,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";

interface CustomerDetail {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  zipCode: string | null;
  tags: string[];
  notes: string | null;
  createdAt: string;
  orders: any[];
  leads: any[];
  stats: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    deliveredOrders: number;
    returnedOrders: number;
    favoriteProduct: { name: string; count: number } | null;
  };
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [editedNotes, setEditedNotes] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/customers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
        setEditedTags(data.tags || []);
        setEditedNotes(data.notes || "");
      }
    } catch (error) {
      console.error("Failed to fetch customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditedTags(editedTags.filter((t) => t !== tag));
  };

  const handleSaveTags = async () => {
    try {
      const response = await fetch(`/api/admin/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: editedTags }),
      });

      if (response.ok) {
        await fetchCustomer();
        setIsEditingTags(false);
      }
    } catch (error) {
      console.error("Failed to save tags:", error);
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await fetch(`/api/admin/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: editedNotes }),
      });

      if (response.ok) {
        await fetchCustomer();
        setIsEditingNotes(false);
      }
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  };

  if (status === "loading" || loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Kupac nije pronađen</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* Back button */}
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Nazad na kupce
        </Link>

        {/* Header */}
        <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {customer.fullName}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${customer.phone}`} className="hover:text-purple-600">
                    {customer.phone}
                  </a>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${customer.email}`} className="hover:text-purple-600">
                      {customer.email}
                    </a>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {customer.address}, {customer.city} {customer.zipCode}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Kupac od {format(new Date(customer.createdAt), "dd.MM.yyyy")}
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <a
                href={`tel:${customer.phone}`}
                className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#563435]/90 transition-colors text-sm font-medium"
              >
                Pozovi
              </a>
              <a
                href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#563435]/90 transition-colors text-sm font-medium"
              >
                WhatsApp
              </a>
              {customer.email && (
                <a
                  href={`mailto:${customer.email}`}
                  className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#563435]/90 transition-colors text-sm font-medium"
                >
                  Email
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Tagovi</h3>
              {!isEditingTags && (
                <button
                  onClick={() => setIsEditingTags(true)}
                  className="text-xs text-[#563435] hover:text-[#563435]/80 font-medium"
                >
                  Uredi
                </button>
              )}
            </div>

            {isEditingTags ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {editedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#563435]/10 text-[#563435] rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Novi tag..."
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveTags}
                    className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#563435]/90 text-sm font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sačuvaj
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingTags(false);
                      setEditedTags(customer.tags || []);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 text-sm font-medium"
                  >
                    Otkaži
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {customer.tags.length > 0 ? (
                  customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#563435]/10 text-[#563435] rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Nema tagova</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Warning Card for Multiple Returns */}
        {customer.stats.returnedOrders >= 2 && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 backdrop-blur-md border-2 border-red-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">
                  Upozorenje: Puno povrata
                </h3>
                <p className="text-red-700 mb-3">
                  Ovaj kupac ima <span className="font-bold">{customer.stats.returnedOrders} {customer.stats.returnedOrders === 1 ? 'povrat' : 'povrata'}</span>. Potrebna je dodatna pažnja pri obradi novih narudžbi.
                </p>
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <RotateCcw className="w-4 h-4" />
                  <span className="font-medium">Provjerite razloge povrata prije obrade</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Orders */}
          <div className="bg-gradient-to-br from-[#563435]/5 via-white/60 to-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#563435] flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#563435]">
                  {customer.stats.totalOrders}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Ukupno narudžbi
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Bez otkazanih
            </p>
          </div>

          {/* Delivered Orders */}
          <div className="bg-gradient-to-br from-emerald-50/30 via-white/60 to-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">
                  {customer.stats.deliveredOrders}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Preuzeto i plaćeno
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Uspješno dostavljeno
            </p>
          </div>

          {/* Returns */}
          <div className={`bg-gradient-to-br backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
            customer.stats.returnedOrders >= 2
              ? 'from-red-50/50 via-white/60 to-white/50 border-red-200'
              : 'from-orange-50/30 via-white/60 to-white/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                customer.stats.returnedOrders >= 2 ? 'bg-red-500' : 'bg-orange-500'
              }`}>
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${
                  customer.stats.returnedOrders >= 2 ? 'text-red-600' : 'text-orange-600'
                }`}>
                  {customer.stats.returnedOrders}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Povrati
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {customer.stats.returnedOrders >= 2 ? '⚠️ Upozorenje!' : 'Vraćene narudžbe'}
            </p>
          </div>

          {/* Total Spent */}
          <div className="bg-gradient-to-br from-amber-50/30 via-white/60 to-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center shadow-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">
                  {(customer.stats.totalSpent / 100).toFixed(0)}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Ukupna potrošnja
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              KM
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Additional Statistics */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dodatna statistika</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prosječna narudžba</div>
                </div>
                <div className="text-2xl font-bold text-gray-800 ml-11">
                  {(customer.stats.averageOrderValue / 100).toFixed(0)} <span className="text-sm text-gray-500 font-normal">KM</span>
                </div>
              </div>
              {customer.stats.favoriteProduct && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Omiljeni proizvod</div>
                  <div className="font-semibold text-gray-800">
                    {customer.stats.favoriteProduct.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {customer.stats.favoriteProduct.count}x kupljeno
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Interne bilješke
              </h2>
              {!isEditingNotes && (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-sm text-[#563435] hover:text-[#563435]/80 font-medium"
                >
                  Uredi
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <div className="space-y-3">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  placeholder="Dodaj bilješke..."
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#563435]/90 text-sm font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sačuvaj
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingNotes(false);
                      setEditedNotes(customer.notes || "");
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 text-sm font-medium"
                  >
                    Otkaži
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 whitespace-pre-wrap">
                {customer.notes || (
                  <span className="text-gray-400 italic">Nema bilješki</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Istorija narudžbi ({customer.orders.length})
          </h2>

          {customer.orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nema narudžbi
            </div>
          ) : (
            <div className="space-y-3">
              {customer.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-4 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-1">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {order.items.map((item: any) => (
                          <span
                            key={item.id}
                            className="text-xs bg-gray-100 px-2 py-1 rounded-lg"
                          >
                            {item.quantity}x {item.product.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800 mb-1">
                        {(order.totalAmount / 100).toFixed(0)} KM
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
