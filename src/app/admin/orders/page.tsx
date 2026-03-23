"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Phone, Mail, MapPin, Printer, ChevronDown, ChevronUp, CheckCircle, Truck, XCircle, ShoppingBag, Clock, RotateCcw, Filter, Search, X as XIcon } from "lucide-react";
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

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  // Helper function to handle UTF-8 characters for PDF
  const sanitizeForPDF = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/č/g, 'c').replace(/Č/g, 'C')
      .replace(/ć/g, 'c').replace(/Ć/g, 'C')
      .replace(/đ/g, 'dj').replace(/Đ/g, 'Dj')
      .replace(/š/g, 's').replace(/Š/g, 'S')
      .replace(/ž/g, 'z').replace(/Ž/g, 'Z');
  };

  const generatePDF = (order: Order) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Border around entire page (shipping label style)
    doc.setLineWidth(1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // ============= HEADER SECTION =============
    doc.setFillColor(86, 52, 53); // #563435
    doc.rect(5, 5, pageWidth - 10, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("ICE COOL PRO", pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("DOSTAVNICA / SHIPPING LABEL", pageWidth / 2, 30, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // ============= BARCODE/ORDER ID SECTION =============
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 45, pageWidth - 20, 20, 'F');
    doc.setLineWidth(0.5);
    doc.rect(10, 45, pageWidth - 20, 20);

    doc.setFontSize(20);
    doc.setFont("courier", "bold");
    doc.text(`#${order.id.slice(0, 12).toUpperCase()}`, pageWidth / 2, 58, { align: 'center' });

    // ============= DELIVERY INFO BOX (MAIN SECTION) =============
    let yPos = 75;

    // "DOSTAVITI NA:" label with background
    doc.setFillColor(86, 52, 53);
    doc.rect(10, yPos, pageWidth - 20, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("DOSTAVITI NA:", 15, yPos + 8);

    yPos += 18;
    doc.setTextColor(0, 0, 0);

    // Customer name - LARGE
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(sanitizeForPDF(order.customer.fullName), 15, yPos);

    yPos += 12;

    // Address - LARGE
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text(sanitizeForPDF(order.shippingAddress || "Nije uneseno"), 15, yPos);

    yPos += 10;

    // City + Zip - LARGE
    const cityText = `${sanitizeForPDF(order.city || "")} ${order.zipCode || ""}`.trim();
    doc.text(cityText, 15, yPos);

    yPos += 15;

    // Phone - LARGE with icon
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`TEL: ${order.customer.phone}`, 15, yPos);

    // Box around delivery info
    doc.setLineWidth(0.8);
    doc.rect(10, 75, pageWidth - 20, yPos - 75 + 5);

    yPos += 15;

    // ============= PAYMENT SECTION =============
    doc.setFillColor(255, 235, 59); // Yellow for cash on delivery
    doc.rect(10, yPos, pageWidth - 20, 25, 'F');
    doc.setLineWidth(0.8);
    doc.rect(10, yPos, pageWidth - 20, 25);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("NACIN PLACANJA:", 15, yPos + 8);

    doc.setFontSize(24);
    doc.text("POUZECE", 15, yPos + 20);

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(`${order.totalAmount.toFixed(2)} KM`, pageWidth - 15, yPos + 20, { align: 'right' });

    yPos += 35;

    // ============= PRODUCTS TABLE =============
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SADRZAJ POSILJKE:", 15, yPos);

    yPos += 5;

    const tableData = order.items.map(item => [
      item.quantity + 'x',
      sanitizeForPDF(item.productName),
      `${item.price.toFixed(2)} KM`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Kol.', 'Proizvod', 'Cijena']],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [86, 52, 53],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 12
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 120 },
        2: { cellWidth: 50, halign: 'right' }
      },
      margin: { left: 10, right: 10 }
    });

    // ============= NOTES SECTION (if exists) =============
    if (order.notes) {
      const finalY = (doc as any).lastAutoTable.finalY || yPos;
      doc.setFillColor(255, 243, 224);
      doc.rect(10, finalY + 10, pageWidth - 20, 20, 'F');
      doc.rect(10, finalY + 10, pageWidth - 20, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("NAPOMENA ZA KURIRA:", 15, finalY + 17);
      doc.setFont("helvetica", "normal");
      doc.text(sanitizeForPDF(order.notes), 15, finalY + 24);
    }

    // ============= FOOTER =============
    const footerY = pageHeight - 20;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const date = new Date(order.createdAt).toLocaleDateString("bs-BA", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Datum: ${sanitizeForPDF(date)}`, 15, footerY);
    doc.text("www.aurorashop.ba", pageWidth - 15, footerY, { align: 'right' });

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

  // Filter and search logic
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== "ALL" && order.status !== statusFilter) {
      return false;
    }

    // Search filter (by customer name, phone, or order ID)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesCustomer = order.customer.fullName.toLowerCase().includes(query);
      const matchesPhone = order.customer.phone.includes(query);
      const matchesOrderId = order.id.toLowerCase().includes(query);

      if (!matchesCustomer && !matchesPhone && !matchesOrderId) {
        return false;
      }
    }

    // Date range filter
    if (dateFrom) {
      const orderDate = new Date(order.createdAt);
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (orderDate < fromDate) {
        return false;
      }
    }

    if (dateTo) {
      const orderDate = new Date(order.createdAt);
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (orderDate > toDate) {
        return false;
      }
    }

    return true;
  });

  const clearFilters = () => {
    setStatusFilter("ALL");
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters = statusFilter !== "ALL" || searchQuery !== "" || dateFrom !== "" || dateTo !== "";

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
    NEW: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Nova", icon: ShoppingBag },
    PENDING: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Na čekanju", icon: Clock },
    CONFIRMED: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Potvrđeno", icon: CheckCircle },
    PREPARING: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", label: "U pripremi", icon: Package },
    SHIPPED: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Poslano", icon: Truck },
    DELIVERED: { color: "bg-green-100 text-green-800 border-green-200", label: "Dostavljeno", icon: Package },
    CANCELLED: { color: "bg-red-100 text-red-800 border-red-200", label: "Otkazano", icon: XCircle },
    RETURNED: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Vraćeno", icon: RotateCcw },
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/admin" className="p-2 hover:bg-white rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Narudžbe</h1>
            </div>
            <p className="text-gray-600 ml-10">Upravljanje i obrada svih narudžbi</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasActiveFilters
                ? "bg-[#563435] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-200`}
          >
            <Filter className="w-4 h-4" />
            Filteri {hasActiveFilters && `(${filteredOrders.length})`}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraga
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ime, telefon, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                >
                  <option value="ALL">Svi statusi</option>
                  <option value="NEW">Nova</option>
                  <option value="PENDING">Na čekanju</option>
                  <option value="CONFIRMED">Potvrđeno</option>
                  <option value="PREPARING">U pripremi</option>
                  <option value="SHIPPED">Poslano</option>
                  <option value="DELIVERED">Dostavljeno</option>
                  <option value="CANCELLED">Otkazano</option>
                  <option value="RETURNED">Vraćeno</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum od
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum do
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                  Očisti filtere
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {hasActiveFilters ? "Nema rezultata pretrage." : "Trenutno nema narudžbi."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#563435] hover:underline"
                >
                  Očisti filtere
                </button>
              )}
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
                  {filteredOrders.map((order) => {
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
                                    
                                    {(order.status === "NEW" || order.status === "PENDING") && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                                      >
                                        <CheckCircle className="w-4 h-4" /> Potvrdi narudžbu
                                      </button>
                                    )}

                                    {order.status === "CONFIRMED" && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "PREPARING")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                                      >
                                        <Package className="w-4 h-4" /> U pripremi
                                      </button>
                                    )}

                                    {(order.status === "PREPARING" || order.status === "CONFIRMED") && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
                                      >
                                        <Truck className="w-4 h-4" /> Označi kao POSLANO
                                      </button>
                                    )}
                                    
                                    {order.status === "SHIPPED" && (
                                      <>
                                        <button
                                          onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                                        >
                                          <Package className="w-4 h-4" /> Označi kao DOSTAVLJENO
                                        </button>
                                        <button
                                          onClick={() => {
                                            if(confirm("Da li je pošiljka vraćena nazad?")) {
                                              updateOrderStatus(order.id, "RETURNED");
                                            }
                                          }}
                                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                                        >
                                          <RotateCcw className="w-4 h-4" /> Vraćeno
                                        </button>
                                      </>
                                    )}

                                    {order.status !== "CANCELLED" && order.status !== "DELIVERED" && order.status !== "RETURNED" && (
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
