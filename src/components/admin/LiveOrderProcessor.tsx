"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, Mail, MapPin, Package, ArrowRight, Clock, CheckCircle, XCircle, SkipForward, Loader2, History, ChevronLeft, ChevronRight, ShoppingBag, Wallet, TrendingUp, Truck, Home } from "lucide-react";
import { toast } from "sonner";
import { DeliveryTruck } from "./DeliveryTruck";
import { DeliveredPackage } from "./DeliveredPackage";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
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
  notes: string | null;
}

interface LiveOrderProcessorProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrders: Order[];
  onOrdersUpdate: () => void;
}

export default function LiveOrderProcessor({
  isOpen,
  onClose,
  initialOrders,
  onOrdersUpdate,
}: LiveOrderProcessorProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [skippedOrders, setSkippedOrders] = useState<Set<string>>(new Set());

  // Tabs and history
  const [activeTab, setActiveTab] = useState<"order" | "history">("order");
  const [customerHistory, setCustomerHistory] = useState<Order[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Shipping animation
  const [showShippingAnimation, setShowShippingAnimation] = useState(false);

  // Delivered animation
  const [showDeliveredAnimation, setShowDeliveredAnimation] = useState(false);

  useEffect(() => {
    setOrders(initialOrders);
    setCurrentIndex(0);
    setSkippedOrders(new Set());
    setActiveTab("order");
    setCustomerHistory([]);
  }, [initialOrders]);

  const fetchCustomerHistory = async (customerId: string) => {
    try {
      setLoadingHistory(true);
      const response = await fetch(`/api/admin/customers/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        // Filter out the current order and only show completed/delivered orders
        const history = data.orders
          .filter(
            (o: Order) => o.id !== currentOrder.id && ["DELIVERED", "SHIPPED", "CONFIRMED", "PREPARING"].includes(o.status)
          )
          .map((o: any) => ({
            ...o,
            customer: data // Use parent customer data for all orders
          }));
        setCustomerHistory(history);
        setHistoryIndex(0);
      }
    } catch (error) {
      console.error("Failed to fetch customer history:", error);
      toast.error("Greška pri učitavanju historije");
    } finally {
      setLoadingHistory(false);
    }
  };

  if (!isOpen || orders.length === 0) return null;

  // Get current order, filtering out already processed orders
  const unprocessedOrders = orders.filter(
    (order) => !skippedOrders.has(order.id) && order.status === "NEW"
  );

  if (unprocessedOrders.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Sve riješeno! 🎉</h3>
          <p className="text-gray-600 mb-6">
            Nema više novih narudžbi za obradu.
            {skippedOrders.size > 0 && ` (${skippedOrders.size} preskočeno)`}
          </p>
          <button
            onClick={() => {
              onClose();
              onOrdersUpdate();
            }}
            className="px-6 py-3 bg-[#563435] text-white rounded-xl font-bold hover:bg-[#563435]/90 transition-all"
          >
            Zatvori
          </button>
        </div>
      </div>
    );
  }

  const currentOrder = unprocessedOrders[0];
  const totalUnprocessed = unprocessedOrders.length;
  const totalSkipped = skippedOrders.size;

  const updateOrderStatus = async (newStatus: string) => {
    try {
      setUpdating(true);

      // Show shipping animation for SHIPPED status
      if (newStatus === "SHIPPED") {
        setShowShippingAnimation(true);
        // Auto-close after 4 seconds
        setTimeout(() => {
          setShowShippingAnimation(false);
        }, 4000);
      }

      // Show delivered animation for DELIVERED status
      if (newStatus === "DELIVERED") {
        setShowDeliveredAnimation(true);
        // Auto-close after 4 seconds
        setTimeout(() => {
          setShowDeliveredAnimation(false);
        }, 4000);
      }

      const response = await fetch(`/api/admin/orders/${currentOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const statusMessages: Record<string, string> = {
          CONFIRMED: "potvrđena",
          CANCELLED: "otkazana",
          SHIPPED: "poslana",
          PREPARING: "u pripremi",
        };
        toast.success(`Narudžba ${statusMessages[newStatus] || "ažurirana"}!`);

        // Remove this order from the list
        setOrders(orders.filter(o => o.id !== currentOrder.id));

        // Move to next order automatically
        setCurrentIndex(0);
      } else {
        toast.error("Greška pri ažuriranju");
      }
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Greška pri ažuriranju");
    } finally {
      setUpdating(false);
    }
  };

  const skipOrder = () => {
    setSkippedOrders(new Set([...skippedOrders, currentOrder.id]));
    toast.info("Narudžba preskočena");
  };

  const statusActions = [
    {
      label: "Potvrdi",
      status: "CONFIRMED",
      icon: CheckCircle,
      color: "bg-[#563435] hover:bg-[#563435]/90",
      textColor: "text-white",
    },
    {
      label: "U pripremi",
      status: "PREPARING",
      icon: Package,
      color: "bg-amber-600 hover:bg-amber-700",
      textColor: "text-white",
    },
    {
      label: "Pošalji",
      status: "SHIPPED",
      icon: Truck,
      color: "bg-[#563435]/80 hover:bg-[#563435]",
      textColor: "text-white",
    },
    {
      label: "Dostavljeno",
      status: "DELIVERED",
      icon: Home,
      color: "bg-emerald-600 hover:bg-emerald-700",
      textColor: "text-white",
    },
    {
      label: "Otkaži",
      status: "CANCELLED",
      icon: XCircle,
      color: "bg-stone-500 hover:bg-stone-600",
      textColor: "text-white",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-7xl w-full shadow-2xl my-8 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#563435] to-[#563435]/80 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Live Rješavanje Narudžbi</h2>
            <button
              onClick={() => {
                onClose();
                onOrdersUpdate();
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Preostalo: {totalUnprocessed}</span>
            </div>
            {totalSkipped > 0 && (
              <div className="flex items-center gap-2">
                <SkipForward className="w-4 h-4" />
                <span>Preskočeno: {totalSkipped}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/60 border-b border-gray-200 px-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("order")}
              className={`px-4 py-3 font-bold transition-all relative ${
                activeTab === "order"
                  ? "text-[#563435]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Narudžba
              </div>
              {activeTab === "order" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#563435] rounded-t-lg" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("history");
                if (customerHistory.length === 0) {
                  fetchCustomerHistory(currentOrder.customer.id);
                }
              }}
              className={`px-4 py-3 font-bold transition-all relative ${
                activeTab === "history"
                  ? "text-[#563435]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Historija kupca
                {customerHistory.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-[#563435]/10 text-[#563435] rounded-full text-xs font-bold">
                    {customerHistory.length}
                  </span>
                )}
              </div>
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#563435] rounded-t-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {activeTab === "order" ? (
            <>
              {/* Order Number & Status */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Broj narudžbe</p>
              <h3 className="text-2xl font-bold text-gray-800">{currentOrder.orderNumber}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Datum</p>
              <p className="font-semibold text-gray-800">
                {new Date(currentOrder.createdAt).toLocaleDateString("bs-BA", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Informacije o kupcu</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ime</p>
                  <p className="font-bold text-gray-800">{currentOrder.customer.fullName}</p>
                  <a
                    href={`tel:${currentOrder.customer.phone}`}
                    className="text-[#563435] hover:underline font-medium"
                  >
                    {currentOrder.customer.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adresa</p>
                  <p className="font-semibold text-gray-800">
                    {currentOrder.customer.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentOrder.customer.city} {currentOrder.customer.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {currentOrder.customer.email && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${currentOrder.customer.email}`}
                    className="text-[#563435] hover:underline font-medium"
                  >
                    {currentOrder.customer.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Stavke narudžbe</h4>
            <div className="space-y-3">
              {currentOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  {item.product.images && item.product.images[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-800">{item.product.name}</h5>
                    <p className="text-sm text-gray-500">Količina: {item.quantity}x</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {((item.price * item.quantity) / 100).toFixed(2)} KM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">UKUPNO:</span>
              <span className="text-2xl font-bold text-[#563435]">
                {(currentOrder.totalAmount / 100).toFixed(2)} KM
              </span>
            </div>
          </div>

          {/* Notes */}
          {currentOrder.notes && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm font-semibold text-yellow-800 mb-1">Napomena:</p>
              <p className="text-gray-700">{currentOrder.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            {statusActions.map((action) => (
              <button
                key={action.status}
                onClick={() => updateOrderStatus(action.status)}
                disabled={updating}
                className={`px-6 py-4 ${action.color} ${action.textColor} rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {updating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <action.icon className="w-5 h-5" />
                    {action.label}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Skip Button - Separate from main actions */}
          <button
            onClick={skipOrder}
            disabled={updating}
            className="w-full px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-[#563435]/30 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <SkipForward className="w-5 h-5" />
            Preskoči za kasnije
          </button>

          {/* Quick Actions */}
          <div className="mt-6 flex items-center justify-center gap-4 pt-6 border-t-2 border-[#563435]/10">
            <a
              href={`tel:${currentOrder.customer.phone}`}
              className="px-6 py-3 bg-[#563435] text-white rounded-xl font-bold hover:bg-[#563435]/90 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Pozovi kupca
            </a>
            <a
              href={`https://wa.me/${currentOrder.customer.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#25D366]/90 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
            </>
          ) : (
            /* History Tab */
            <div className="h-full flex flex-col">
              {loadingHistory ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-[#563435]" />
                </div>
              ) : customerHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Nema historije</h3>
                  <p className="text-gray-600">
                    Ovo je prva narudžba ovog kupca
                  </p>
                </div>
              ) : (
                <>
                  {/* History Navigation */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#563435]/10">
                    <button
                      onClick={() => setHistoryIndex(Math.max(0, historyIndex - 1))}
                      disabled={historyIndex === 0}
                      className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-[#563435]/30 hover:bg-[#563435]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Prethodna
                    </button>
                    <div className="text-center px-6 py-2 bg-[#563435]/5 rounded-xl border border-[#563435]/20">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Narudžba</p>
                      <p className="text-xl font-bold text-[#563435]">
                        {historyIndex + 1} / {customerHistory.length}
                      </p>
                    </div>
                    <button
                      onClick={() => setHistoryIndex(Math.min(customerHistory.length - 1, historyIndex + 1))}
                      disabled={historyIndex === customerHistory.length - 1}
                      className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-[#563435]/30 hover:bg-[#563435]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
                    >
                      Sljedeća
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* History Order Details */}
                  {(() => {
                    const historyOrder = customerHistory[historyIndex];
                    const statusConfig: Record<string, { color: string, label: string }> = {
                      DELIVERED: { color: "bg-[#563435]/10 text-[#563435] border-[#563435]/30", label: "Dostavljeno" },
                      SHIPPED: { color: "bg-amber-50 text-amber-800 border-amber-200", label: "Poslano" },
                      CONFIRMED: { color: "bg-[#563435]/5 text-[#563435]/80 border-[#563435]/20", label: "Potvrđeno" },
                      PREPARING: { color: "bg-stone-100 text-stone-700 border-stone-200", label: "U pripremi" },
                    };

                    return (
                      <div className="space-y-6">
                        {/* Order Info */}
                        <div className="bg-gradient-to-r from-[#563435]/5 to-transparent rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Broj narudžbe</p>
                              <h3 className="text-xl font-bold text-gray-800">{historyOrder.orderNumber}</h3>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 ${statusConfig[historyOrder.status]?.color || "bg-gray-100 text-gray-800"}`}>
                                {statusConfig[historyOrder.status]?.label || historyOrder.status}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Datum narudžbe</p>
                              <p className="font-semibold text-gray-800">
                                {new Date(historyOrder.createdAt).toLocaleDateString("bs-BA", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500">Ukupan iznos</p>
                              <p className="text-2xl font-bold text-[#563435]">
                                {(historyOrder.totalAmount / 100).toFixed(2)} KM
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Adresa dostave</p>
                            <p className="font-semibold text-gray-800">{historyOrder.customer.address}</p>
                            <p className="text-sm text-gray-600">
                              {historyOrder.customer.city} {historyOrder.customer.zipCode}
                            </p>
                          </div>
                          <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Kontakt</p>
                            <p className="font-semibold text-gray-800">{historyOrder.customer.phone}</p>
                            {historyOrder.customer.email && (
                              <p className="text-sm text-gray-600">{historyOrder.customer.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Items */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-[#563435]" />
                            Stavke narudžbe
                          </h4>
                          <div className="space-y-3">
                            {historyOrder.items.map((item, idx) => {
                              const itemPrice = item.price || 0;
                              const itemTotal = itemPrice * item.quantity;

                              return (
                                <div
                                  key={item.id || idx}
                                  className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-gray-200 hover:border-[#563435]/30 transition-all"
                                >
                                  {item.product?.images?.[0] && (
                                    <img
                                      src={item.product.images[0]}
                                      alt={item.product.name}
                                      className="w-20 h-20 rounded-lg object-cover border-2 border-gray-100"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <h5 className="font-bold text-gray-800 mb-1">{item.product?.name || "Proizvod"}</h5>
                                    <div className="flex items-center gap-3 text-sm">
                                      <span className="px-3 py-1 bg-[#563435]/10 text-[#563435] rounded-lg font-medium">
                                        {item.quantity}x
                                      </span>
                                      <span className="text-gray-500">
                                        {(itemPrice / 100).toFixed(2)} KM po komadu
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Ukupno</p>
                                    <p className="text-xl font-bold text-[#563435]">
                                      {(itemTotal / 100).toFixed(2)} KM
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Total Summary */}
                          <div className="mt-4 p-6 bg-gradient-to-r from-[#563435]/5 to-transparent rounded-xl border-2 border-[#563435]/20">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-gray-800">UKUPAN IZNOS:</span>
                              <span className="text-3xl font-bold text-[#563435]">
                                {(historyOrder.totalAmount / 100).toFixed(2)} KM
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Notes if any */}
                        {historyOrder.notes && (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <p className="text-sm font-semibold text-yellow-800 mb-1">Napomena:</p>
                            <p className="text-gray-700">{historyOrder.notes}</p>
                          </div>
                        )}

                        {/* Customer Stats Summary */}
                        <div className="bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent rounded-2xl p-6 border-2 border-[#563435]/10">
                          <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-[#563435]" />
                            Statistika kupca
                          </h4>
                          <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center justify-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-[#563435]/10 flex items-center justify-center">
                                  <ShoppingBag className="w-6 h-6 text-[#563435]" />
                                </div>
                              </div>
                              <p className="text-3xl font-bold text-[#563435] text-center mb-1">
                                {customerHistory.length + 1}
                              </p>
                              <p className="text-xs text-gray-500 text-center uppercase tracking-wider">
                                Ukupno narudžbi
                              </p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center justify-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                                  <Wallet className="w-6 h-6 text-amber-600" />
                                </div>
                              </div>
                              <p className="text-3xl font-bold text-[#563435] text-center mb-1">
                                {((customerHistory.reduce((sum, o) => sum + o.totalAmount, 0) + currentOrder.totalAmount) / 100).toFixed(0)}
                              </p>
                              <p className="text-xs text-gray-500 text-center uppercase tracking-wider">
                                Ukupno KM
                              </p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center justify-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                  <TrendingUp className="w-6 h-6 text-stone-600" />
                                </div>
                              </div>
                              <p className="text-3xl font-bold text-[#563435] text-center mb-1">
                                {(((customerHistory.reduce((sum, o) => sum + o.totalAmount, 0) + currentOrder.totalAmount) / (customerHistory.length + 1)) / 100).toFixed(0)}
                              </p>
                              <p className="text-xs text-gray-500 text-center uppercase tracking-wider">
                                Prosječno KM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Shipping Animation Modal */}
      {showShippingAnimation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#563435]/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-10 h-10 text-[#563435]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Narudžba je poslana! 🚚
              </h3>
              <p className="text-gray-600">
                Paket je na putu ka kupcu
              </p>
            </div>

            {/* Animated Truck */}
            <div className="flex justify-center mb-6">
              <DeliveryTruck size={280} />
            </div>

            <button
              onClick={() => setShowShippingAnimation(false)}
              className="w-full px-6 py-3 bg-[#563435] text-white rounded-xl font-bold hover:bg-[#563435]/90 transition-all"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}

      {/* Delivered Animation Modal */}
      {showDeliveredAnimation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Uspješno dostavljeno! 🏡
              </h3>
              <p className="text-gray-600">
                Paket je stigao na odredište
              </p>
            </div>

            {/* Animated House with Package */}
            <div className="flex justify-center mb-6">
              <DeliveredPackage size={280} />
            </div>

            <button
              onClick={() => setShowDeliveredAnimation(false)}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
