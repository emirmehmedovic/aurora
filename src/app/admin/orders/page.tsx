"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Phone, Mail, MapPin } from "lucide-react";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string | null;
  };
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to update order:", error);
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

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Na čekanju",
    CONFIRMED: "Potvrđeno",
    SHIPPED: "Poslato",
    DELIVERED: "Dostavljeno",
    CANCELLED: "Otkazano",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Narudžbe</h1>
            <p className="text-gray-600">Upravljanje svim narudžbama</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Nema narudžbi</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">#{order.id.slice(0, 8)}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("bs-BA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{order.totalAmount.toFixed(2)} KM</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-sm">Kupac</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {order.customer.fullName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {order.customer.phone}
                      </p>
                      {order.customer.email && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {order.customer.email}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {order.shippingAddress}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-sm">Proizvodi</h4>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {item.quantity}x {item.productName} - {item.price.toFixed(2)} KM
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2 flex-wrap">
                  {order.status === "PENDING" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                    >
                      Potvrdi
                    </button>
                  )}
                  {order.status === "CONFIRMED" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                      className="px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600"
                    >
                      Označi kao poslato
                    </button>
                  )}
                  {order.status === "SHIPPED" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                      className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600"
                    >
                      Označi kao dostavljeno
                    </button>
                  )}
                  {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                      className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                    >
                      Otkaži
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
