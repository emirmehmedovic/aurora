"use client";

import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  DollarSign,
  User,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  ShoppingBag,
  MessageSquare,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import CommentSection from "@/components/admin/CommentSection";

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingFee: number;
  codAmount: number | null;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  customer: {
    id: string;
    fullName: string;
    phone: string;
    email: string | null;
    address: string | null;
    city: string | null;
    zipCode: string | null;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  }>;
  returns: any[];
  comments: any[];
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [editingTracking, setEditingTracking] = useState(false);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (session) {
      fetchOrder();
    }
  }, [session, id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
        setNewStatus(data.order.status);
        setNotes(data.order.notes || "");
        setTrackingNumber(data.order.trackingNumber || "");
      } else {
        toast.error("Greška pri učitavanju narudžbe");
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
      toast.error("Greška pri učitavanju narudžbe");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async () => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Status ažuriran!");
        setEditingStatus(false);
        fetchOrder();
      } else {
        toast.error("Greška pri ažuriranju statusa");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Greška pri ažuriranju statusa");
    } finally {
      setUpdating(false);
    }
  };

  const updateNotes = async () => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        toast.success("Bilješke ažurirane!");
        setEditingNotes(false);
        fetchOrder();
      } else {
        toast.error("Greška pri ažuriranju bilješki");
      }
    } catch (error) {
      console.error("Failed to update notes:", error);
      toast.error("Greška pri ažuriranju bilješki");
    } finally {
      setUpdating(false);
    }
  };

  const statusConfig: Record<string, { color: string, label: string, icon: any }> = {
    NEW: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Nova", icon: ShoppingBag },
    CONFIRMED: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Potvrđeno", icon: CheckCircle },
    PREPARING: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", label: "U pripremi", icon: Package },
    SHIPPED: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Poslano", icon: Truck },
    DELIVERED: { color: "bg-green-100 text-green-800 border-green-200", label: "Dostavljeno", icon: Package },
    CANCELLED: { color: "bg-red-100 text-red-800 border-red-200", label: "Otkazano", icon: XCircle },
    RETURNED: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Vraćeno", icon: RotateCcw },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#563435]" />
          </div>
          <p className="text-gray-600 font-medium">Učitavanje narudžbe...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Narudžba nije pronađena</h2>
          <Link href="/admin/orders" className="text-blue-500 hover:underline">
            Povratak na narudžbe
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  return (
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="mb-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/admin/orders" className="p-2 hover:bg-white/60 rounded-full transition-all">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Narudžba {order.orderNumber}</h1>
          </div>
          <div className="flex items-center gap-3 ml-10">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 ${statusConfig[order.status]?.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig[order.status]?.label}
            </span>
            <button
              onClick={() => setEditingStatus(true)}
              className="text-sm text-[#563435] hover:text-[#563435]/80 flex items-center gap-1 font-medium"
            >
              <Edit className="w-4 h-4" />
              Promijeni status
            </button>
          </div>
        </div>

        {/* Status Edit Modal */}
        {editingStatus && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-md border border-white/40 rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Promijeni status</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Novi status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#563435] focus:border-[#563435] transition-all font-medium"
                >
                  {Object.entries(statusConfig).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview of selected status */}
              <div className={`mb-6 p-4 rounded-2xl border-2 ${statusConfig[newStatus]?.color} flex items-center gap-3`}>
                {React.createElement(statusConfig[newStatus]?.icon || Clock, { className: "w-5 h-5" })}
                <span className="font-semibold">{statusConfig[newStatus]?.label}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingStatus(false);
                    setNewStatus(order.status);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-all"
                >
                  Otkaži
                </button>
                <button
                  onClick={updateOrderStatus}
                  disabled={updating}
                  className="flex-1 px-6 py-3 bg-[#563435] text-white rounded-xl font-bold hover:bg-[#563435]/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? "Ažuriranje..." : "Potvrdi"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Informacije o kupcu</h2>
                <Link
                  href={`/admin/customers/${order.customer.id}`}
                  className="text-sm text-[#563435] hover:text-[#563435]/80 flex items-center gap-1 font-medium"
                >
                  <User className="w-4 h-4" />
                  Profil kupca
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <a href={`tel:${order.customer.phone}`} className="text-blue-500 hover:underline">
                      {order.customer.phone}
                    </a>
                  </div>
                </div>
                {order.customer.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <a href={`mailto:${order.customer.email}`} className="text-blue-500 hover:underline">
                        {order.customer.email}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{order.customer.address}</p>
                    <p className="text-gray-500 text-sm">
                      {order.customer.city} {order.customer.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Stavke narudžbe</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                    {item.product.images && item.product.images[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Količina: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {(item.price / 100).toFixed(2)} KM
                      </p>
                      <p className="text-sm text-gray-500">
                        {((item.price * item.quantity) / 100).toFixed(2)} KM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Ukupno proizvodi:</span>
                  <span>{(order.totalAmount / 100).toFixed(2)} KM</span>
                </div>
                {order.shippingFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Dostava:</span>
                    <span>{(order.shippingFee / 100).toFixed(2)} KM</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>UKUPNO:</span>
                  <span>{((order.totalAmount + order.shippingFee) / 100).toFixed(2)} KM</span>
                </div>
                {order.codAmount && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Plaćanje pouzećem:</span>
                    <span>{(order.codAmount / 100).toFixed(2)} KM</span>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Bilješke</h2>
                <button
                  onClick={() => setEditingNotes(!editingNotes)}
                  className="text-sm text-[#563435] hover:text-[#563435]/80 flex items-center gap-1 font-medium"
                >
                  <Edit className="w-4 h-4" />
                  {editingNotes ? "Otkaži" : "Uredi"}
                </button>
              </div>
              {editingNotes ? (
                <div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dodaj bilješke..."
                  />
                  <button
                    onClick={updateNotes}
                    disabled={updating}
                    className="mt-3 px-4 py-2 bg-[#563435] text-white rounded-lg font-medium hover:bg-[#563435]/90 transition-colors disabled:opacity-50"
                  >
                    {updating ? "Čuvanje..." : "Sačuvaj"}
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {order.notes || "Nema bilješki"}
                </p>
              )}
            </div>

            {/* Comments */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Komentari
              </h2>
              <CommentSection orderId={order.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Detalji narudžbe</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Datum kreiranja</p>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Posljednja izmjena</p>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(order.updatedAt), "dd.MM.yyyy HH:mm")}
                  </p>
                </div>
                {order.source && (
                  <div>
                    <p className="text-gray-500">Izvor</p>
                    <p className="font-semibold text-gray-900">{order.source}</p>
                  </div>
                )}
                {order.utmCampaign && (
                  <div>
                    <p className="text-gray-500">Kampanja</p>
                    <p className="font-semibold text-gray-900">{order.utmCampaign}</p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <p className="text-gray-500">Tracking broj</p>
                    <p className="font-semibold text-gray-900">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Brze akcije</h2>
              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full px-4 py-3 bg-white/60 text-gray-700 rounded-xl font-medium hover:bg-white hover:shadow-md transition-all border border-white/50 flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Štampaj narudžbu
                </button>
                <Link
                  href={`tel:${order.customer.phone}`}
                  className="w-full px-4 py-3 bg-[#563435] text-white rounded-xl font-medium hover:bg-[#563435]/90 hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Pozovi kupca
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
