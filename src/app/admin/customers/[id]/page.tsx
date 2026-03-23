"use client";

import { useState, useEffect } from "react";
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
  Save
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
    favoriteProduct: { name: string; count: number } | null;
  };
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
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
      const response = await fetch(`/api/admin/customers/${params.id}`);
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
      const response = await fetch(`/api/admin/customers/${params.id}`, {
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
      const response = await fetch(`/api/admin/customers/${params.id}`, {
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
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Back button */}
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Nazad na kupce
        </Link>

        {/* Header */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-6 shadow-sm">
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
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Pozovi
              </a>
              <a
                href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium"
              >
                WhatsApp
              </a>
              {customer.email && (
                <a
                  href={`mailto:${customer.email}`}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm font-medium"
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
                  className="text-xs text-purple-600 hover:text-purple-800"
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
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-2"
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
                    className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 text-sm font-medium flex items-center gap-2"
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
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Statistics */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Statistika</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Ukupno narudžbi</div>
                <div className="text-2xl font-bold text-gray-800">
                  {customer.stats.totalOrders}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Ukupna potrošnja</div>
                <div className="text-2xl font-bold text-gray-800">
                  {(customer.stats.totalSpent / 100).toFixed(0)} KM
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Prosječna narudžba</div>
                <div className="text-2xl font-bold text-gray-800">
                  {(customer.stats.averageOrderValue / 100).toFixed(0)} KM
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
                  className="text-sm text-purple-600 hover:text-purple-800"
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
                    className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 text-sm font-medium flex items-center gap-2"
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
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
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
