"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Phone, Mail, MapPin, Printer, ChevronDown, ChevronUp, CheckCircle, Truck, XCircle, ShoppingBag, Clock } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  city: string;
  zipCode: string;
  notes: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

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

  const generatePDF = (order: Order) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ICE COOL PRO", 14, 20);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Dostavnica / Shipping Slip", 14, 30);
    
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(14, 35, 196, 35);
    
    // Order Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Podaci o narudžbi:", 14, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`ID narudžbe: #${order.id.slice(0, 8)}`, 14, 52);
    doc.text(`Datum: ${new Date(order.createdAt).toLocaleDateString("bs-BA")}`, 14, 59);
    doc.text(`Iznos za naplatu (Pouzećem): ${order.totalAmount.toFixed(2)} KM`, 14, 66);
    
    // Customer Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Podaci o kupcu (Dostaviti na):", 110, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Ime i prezime: ${order.customer.fullName}`, 110, 52);
    doc.text(`Telefon: ${order.customer.phone}`, 110, 59);
    doc.text(`Adresa: ${order.shippingAddress || "Nije uneseno"}`, 110, 66);
    doc.text(`Grad: ${order.city || ""} ${order.zipCode || ""}`, 110, 73);
    
    if (order.notes) {
      doc.setFont("helvetica", "italic");
      doc.text(`Napomena za kurira: ${order.notes}`, 110, 80);
    }

    // Line separator
    doc.setLineWidth(0.2);
    doc.line(14, 90, 196, 90);

    // Items table
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Stavke narudžbe:", 14, 100);
    
    const tableData = order.items.map(item => [
      item.quantity.toString(),
      item.productName,
      `${item.price.toFixed(2)} KM`,
      `${(item.quantity * item.price).toFixed(2)} KM`
    ]);

    autoTable(doc, {
      startY: 105,
      head: [['Količina', 'Proizvod', 'Jedinična cijena', 'Ukupno']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [86, 52, 53] },
    });

    // Save PDF
    doc.save(`Dostavnica_${order.id.slice(0, 8)}.pdf`);
  };

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="text-lg text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const statusConfig: Record<string, { color: string, label: string, icon: any }> = {
    PENDING: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Na čekanju", icon: Clock },
    CONFIRMED: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Potvrđeno", icon: CheckCircle },
    SHIPPED: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Poslano", icon: Truck },
    DELIVERED: { color: "bg-green-100 text-green-800 border-green-200", label: "Dostavljeno", icon: Package },
    CANCELLED: { color: "bg-red-100 text-red-800 border-red-200", label: "Otkazano", icon: XCircle },
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/admin" className="p-2 hover:bg-white rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Narudžbe</h1>
            </div>
            <p className="text-gray-600 ml-10">Upravljanje i obrada svih narudžbi</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Trenutno nema narudžbi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200/60">
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">ID Narudžbe</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Datum</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Kupac</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Iznos</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Akcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const StatusIcon = statusConfig[order.status]?.icon || Clock;
                    const isExpanded = expandedOrderId === order.id;

                    return (
                      <React.Fragment key={order.id}>
                        {/* Main Row */}
                        <tr 
                          className={`hover:bg-white/50 transition-colors cursor-pointer ${isExpanded ? 'bg-white/80' : ''}`}
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">
                            #{order.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString("bs-BA", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-800">{order.customer.fullName}</p>
                            <p className="text-xs text-gray-500">{order.customer.phone}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-[#563435]">
                            {order.totalAmount.toFixed(2)} KM
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[order.status]?.color}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {statusConfig[order.status]?.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              className="p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100"
                              onClick={(e) => { e.stopPropagation(); toggleOrderDetails(order.id); }}
                            >
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Details Row */}
                        {isExpanded && (
                          <tr className="bg-white/80 border-b-2 border-gray-200/60">
                            <td colSpan={6} className="px-6 py-6">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Details Col 1: Customer */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Podaci o kupcu</h4>
                                  <div className="bg-gray-50/50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <Phone className="w-4 h-4" />
                                      </div>
                                      <span className="font-medium">{order.customer.phone}</span>
                                    </div>
                                    {order.customer.email && (
                                      <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                          <Mail className="w-4 h-4" />
                                        </div>
                                        <span>{order.customer.email}</span>
                                      </div>
                                    )}
                                    <div className="flex items-start gap-3 text-sm text-gray-700">
                                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <MapPin className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{order.shippingAddress}</p>
                                        <p>{order.city} {order.zipCode}</p>
                                      </div>
                                    </div>
                                    {order.notes && (
                                      <div className="mt-2 pt-2 border-t border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">Napomena:</p>
                                        <p className="text-sm italic text-gray-700">{order.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Details Col 2: Items */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Naručeni proizvodi</h4>
                                  <div className="bg-gray-50/50 rounded-xl p-4 space-y-3">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                        <div className="flex items-center gap-2">
                                          <span className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-medium text-xs text-gray-600">
                                            {item.quantity}x
                                          </span>
                                          <span className="font-medium text-gray-800">{item.productName}</span>
                                        </div>
                                        <span className="font-bold text-[#563435]">{(item.price * item.quantity).toFixed(2)} KM</span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                                      <span className="font-medium text-gray-600">Ukupno za naplatu:</span>
                                      <span className="text-lg font-bold text-[#563435]">{order.totalAmount.toFixed(2)} KM</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Details Col 3: Actions */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Upravljanje statusom</h4>
                                  <div className="bg-gray-50/50 rounded-xl p-4 flex flex-col gap-3">
                                    
                                    {order.status === "PENDING" && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                                      >
                                        <CheckCircle className="w-4 h-4" /> Potvrdi narudžbu
                                      </button>
                                    )}
                                    
                                    {(order.status === "PENDING" || order.status === "CONFIRMED") && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
                                      >
                                        <Truck className="w-4 h-4" /> Označi kao POSLANO
                                      </button>
                                    )}
                                    
                                    {order.status === "SHIPPED" && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                                      >
                                        <Package className="w-4 h-4" /> Označi kao DOSTAVLJENO
                                      </button>
                                    )}
                                    
                                    {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                                      <button
                                        onClick={() => {
                                          if(confirm("Da li ste sigurni da želite otkazati ovu narudžbu?")) {
                                            updateOrderStatus(order.id, "CANCELLED");
                                          }
                                        }}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors"
                                      >
                                        <XCircle className="w-4 h-4" /> Otkaži narudžbu
                                      </button>
                                    )}

                                    {/* Print PDF Button */}
                                    <div className="pt-3 mt-1 border-t border-gray-200">
                                      <button
                                        onClick={() => generatePDF(order)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-sm"
                                      >
                                        <Printer className="w-4 h-4" /> Štampaj dostavnicu (PDF)
                                      </button>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
