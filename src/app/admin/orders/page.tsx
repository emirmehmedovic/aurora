"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Phone, Mail, MapPin, Printer, ChevronDown, ChevronUp, CheckCircle, Truck, XCircle, ShoppingBag, Clock, RotateCcw, Filter, Search, X as XIcon, Download, Edit, Trash2, User, ExternalLink, Plus, FileText, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BulkActionBar from "@/components/admin/BulkActionBar";
import { exportToExcel, formatOrdersForExport } from "@/lib/excel";
import CommentSection from "@/components/admin/CommentSection";
import BulkStatusModal from "@/components/admin/BulkStatusModal";
import LiveOrderProcessor from "@/components/admin/LiveOrderProcessor";
import { DeliveryTruck } from "@/components/admin/DeliveryTruck";
import { DeliveredPackage } from "@/components/admin/DeliveredPackage";
import { OrderProcessingAgent } from "@/components/admin/OrderProcessingAgent";
import { toast } from "sonner";

let pdfUnicodeFontPromise: Promise<string> | null = null;

async function loadPdfUnicodeFont() {
  if (!pdfUnicodeFontPromise) {
    pdfUnicodeFontPromise = fetch("/fonts/ArialUnicode.ttf")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load PDF font");
        }

        return response.arrayBuffer();
      })
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;
        let binary = "";

        for (let index = 0; index < bytes.length; index += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
        }

        return btoa(binary);
      });
  }

  return pdfUnicodeFontPromise;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  source?: string | null;
  totalAmount: number;
  createdAt: string;
  customer: {
    id: string;
    fullName: string;
    phone: string;
    email: string | null;
  };
  items: {
    id?: string;
    productName: string;
    quantity: number;
    price: number;
    product?: {
      id: string;
      name: string;
      images: string[];
    };
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

  // Bulk operations
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Live processing
  const [showLiveProcessor, setShowLiveProcessor] = useState(false);

  // Shipping animation
  const [showShippingAnimation, setShowShippingAnimation] = useState(false);

  // Delivered animation
  const [showDeliveredAnimation, setShowDeliveredAnimation] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [exportingPendingPdf, setExportingPendingPdf] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
  }>>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [manualOrder, setManualOrder] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    productId: "",
    quantity: 1,
    unitPrice: "",
    source: "Društvene mreže",
    notes: "",
  });

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

  useEffect(() => {
    if (showCreateModal && availableProducts.length === 0) {
      fetchProducts();
    }
  }, [showCreateModal, availableProducts.length]);

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

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch("/api/admin/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setAvailableProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Greška pri učitavanju proizvoda");
    } finally {
      setLoadingProducts(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
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

      const response = await fetch(`/api/admin/orders/${orderId}`, {
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
          DELIVERED: "dostavljena",
          RETURNED: "vraćena",
        };
        toast.success(`Narudžba ${statusMessages[newStatus] || "ažurirana"}!`);
        fetchOrders();
      } else {
        toast.error("Greška pri ažuriranju statusa");
      }
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Greška pri ažuriranju statusa");
    }
  };

  // Bulk operations handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const toggleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch("/api/admin/orders/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          orderIds: selectedOrders,
          status: newStatus,
        }),
      });

      if (response.ok) {
        toast.success("Status ažuriran!");
        fetchOrders();
        setSelectedOrders([]);
        setShowStatusModal(false);
      } else {
        toast.error("Greška pri ažuriranju narudžbi");
      }
    } catch (error) {
      console.error("Bulk status update failed:", error);
      toast.error("Greška pri ažuriranju narudžbi");
    }
  };

  const handleBulkExport = () => {
    const ordersToExport = orders.filter(o => selectedOrders.includes(o.id));
    const formatted = formatOrdersForExport(ordersToExport);
    exportToExcel(formatted, `narudzbe-${new Date().toISOString().split('T')[0]}`);
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Da li ste sigurni da želite obrisati ${selectedOrders.length} narudžbi?`)) {
      return;
    }

    try {
      const response = await fetch("/api/admin/orders/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          orderIds: selectedOrders,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchOrders();
        setSelectedOrders([]);
      }
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert("Greška pri brisanju narudžbi");
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

  const formatPdfDate = (value: string | Date) =>
    new Date(value).toLocaleDateString("bs-BA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getPdfStatusLabel = (status: string) =>
    ({
      NEW: "Nova",
      PENDING: "Na čekanju",
      CONFIRMED: "Potvrđena",
      PREPARING: "U pripremi",
      SHIPPED: "Poslana",
      DELIVERED: "Dostavljena",
      CANCELLED: "Otkazana",
      RETURNED: "Vraćena",
    }[status] || status);

  const ensurePdfUnicodeFont = async (doc: jsPDF) => {
    const fontData = await loadPdfUnicodeFont();
    const fontList = (doc as any).getFontList?.() || {};

    if (!fontList.ArialUnicode) {
      doc.addFileToVFS("ArialUnicode.ttf", fontData);
      doc.addFont("ArialUnicode.ttf", "ArialUnicode", "normal");
      doc.addFont("ArialUnicode.ttf", "ArialUnicode", "bold");
    }

    doc.setFont("ArialUnicode", "normal");
  };

  const resetManualOrder = () => {
    setManualOrder({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      productId: "",
      quantity: 1,
      unitPrice: "",
      source: "Društvene mreže",
      notes: "",
    });
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetManualOrder();
  };

  const selectedManualProduct = availableProducts.find((product) => product.id === manualOrder.productId);
  const defaultUnitPrice = selectedManualProduct ? selectedManualProduct.price / 100 : 0;
  const manualUnitPriceNumber = Number.parseFloat(manualOrder.unitPrice || "0");
  const effectiveUnitPrice = Number.isFinite(manualUnitPriceNumber) ? manualUnitPriceNumber : 0;
  const manualDiscountPerUnit = selectedManualProduct
    ? Math.max(0, Number(((selectedManualProduct.price / 100) - effectiveUnitPrice).toFixed(2)))
    : 0;
  const manualTotal = Number((effectiveUnitPrice * manualOrder.quantity).toFixed(2));

  const handleManualProductChange = (productId: string) => {
    const product = availableProducts.find((entry) => entry.id === productId);
    setManualOrder((current) => ({
      ...current,
      productId,
      unitPrice: product ? (product.price / 100).toFixed(2) : "",
    }));
  };

  const createDirectOrder = async () => {
    if (!manualOrder.productId) {
      toast.error("Odaberite proizvod");
      return;
    }

    try {
      setCreatingOrder(true);
      const unitPrice = Math.round(effectiveUnitPrice * 100);
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...manualOrder,
          quantity: manualOrder.quantity,
          unitPrice,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Greška pri kreiranju narudžbe");
      }

      toast.success("Direktna narudžba kreirana");
      closeCreateModal();
      fetchOrders();
    } catch (error) {
      console.error("Failed to create direct order:", error);
      toast.error(error instanceof Error ? error.message : "Greška pri kreiranju narudžbe");
    } finally {
      setCreatingOrder(false);
    }
  };

  const loadImageAsDataUrl = async (src: string) => {
    return await new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Canvas context not available"));
          return;
        }

        context.drawImage(image, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = reject;
      image.src = src;
    });
  };

  const generatePDF = async (order: Order) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    await ensurePdfUnicodeFont(doc);

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
    doc.setFont("ArialUnicode", "bold");
    doc.text("ICE COOL PRO", pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("ArialUnicode", "normal");
    doc.text("DOSTAVNICA / SHIPPING LABEL", pageWidth / 2, 30, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // ============= BARCODE/ORDER ID SECTION =============
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 45, pageWidth - 20, 20, 'F');
    doc.setLineWidth(0.5);
    doc.rect(10, 45, pageWidth - 20, 20);

    doc.setFontSize(20);
    doc.setFont("ArialUnicode", "bold");
    doc.text(`#${order.id.slice(0, 12).toUpperCase()}`, pageWidth / 2, 58, { align: 'center' });

    // ============= DELIVERY INFO BOX (MAIN SECTION) =============
    let yPos = 75;

    // "DOSTAVITI NA:" label with background
    doc.setFillColor(86, 52, 53);
    doc.rect(10, yPos, pageWidth - 20, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("ArialUnicode", "bold");
    doc.text("DOSTAVITI NA:", 15, yPos + 8);

    yPos += 18;
    doc.setTextColor(0, 0, 0);

    // Customer name - LARGE
    doc.setFontSize(22);
    doc.setFont("ArialUnicode", "bold");
    doc.text(order.customer.fullName, 15, yPos);

    yPos += 12;

    // Address - LARGE
    doc.setFontSize(18);
    doc.setFont("ArialUnicode", "normal");
    doc.text(order.shippingAddress || "Nije uneseno", 15, yPos);

    yPos += 10;

    // City + Zip - LARGE
    const cityText = `${order.city || ""} ${order.zipCode || ""}`.trim();
    doc.text(cityText, 15, yPos);

    yPos += 15;

    // Phone - LARGE with icon
    doc.setFontSize(20);
    doc.setFont("ArialUnicode", "bold");
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
    doc.setFont("ArialUnicode", "bold");
    doc.text("NAČIN PLAĆANJA:", 15, yPos + 8);

    doc.setFontSize(24);
    doc.text("POUZECE", 15, yPos + 20);

    doc.setFontSize(28);
    doc.setFont("ArialUnicode", "bold");
    doc.text(`${(order.totalAmount / 100).toFixed(2)} KM`, pageWidth - 15, yPos + 20, { align: 'right' });

    yPos += 35;

    // ============= PRODUCTS TABLE =============
    doc.setFontSize(14);
    doc.setFont("ArialUnicode", "bold");
    doc.text("SADRŽAJ POŠILJKE:", 15, yPos);

    yPos += 5;

    const tableData = order.items.map(item => [
      item.quantity + 'x',
      item.productName,
      `${(item.price / 100).toFixed(2)} KM`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Kol.', 'Proizvod', 'Cijena']],
      body: tableData,
      theme: 'grid',
      styles: {
        font: "ArialUnicode",
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
      doc.setFont("ArialUnicode", "bold");
      doc.text("NAPOMENA ZA KURIRA:", 15, finalY + 17);
      doc.setFont("ArialUnicode", "normal");
      doc.text(order.notes, 15, finalY + 24);
    }

    // ============= FOOTER =============
    const footerY = pageHeight - 20;
    doc.setFontSize(9);
    doc.setFont("ArialUnicode", "normal");
    doc.setTextColor(100, 100, 100);
    const date = new Date(order.createdAt).toLocaleDateString("bs-BA", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Datum: ${date}`, 15, footerY);
    doc.text("www.aurorashop.ba", pageWidth - 15, footerY, { align: 'right' });

    // Save PDF
    doc.save(`Dostavnica_${order.id.slice(0, 8)}.pdf`);
  };

  const exportConfirmedPendingOrdersPdf = async () => {
    const exportOrders = orders.filter(
      (order) => order.status === "CONFIRMED" || order.status === "PREPARING"
    );

    if (exportOrders.length === 0) {
      toast.info("Nema potvrđenih, a neposlatih narudžbi");
      return;
    }

    try {
      setExportingPendingPdf(true);

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      await ensurePdfUnicodeFont(doc);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let index = 0; index < exportOrders.length; index += 1) {
        const order = exportOrders[index];

        if (index > 0) {
          doc.addPage();
        }

        doc.setFillColor(86, 52, 53);
        doc.rect(0, 0, pageWidth, 22, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("ArialUnicode", "bold");
        doc.setFontSize(18);
        doc.text("Lista potvrđenih, neposlatih narudžbi", 14, 14);

        doc.setTextColor(0, 0, 0);
        doc.setFont("ArialUnicode", "normal");
        doc.setFontSize(11);
        doc.text(`Order: ${order.orderNumber || order.id}`, 14, 32);
        doc.text(
          `Datum: ${formatPdfDate(order.createdAt)} | Status: ${getPdfStatusLabel(order.status)}`,
          14,
          38
        );

        let imageBottomY = 42;
        const coverImage = order.items[0]?.product?.images?.[0];

        if (coverImage) {
          try {
            const imageData = await loadImageAsDataUrl(coverImage);
            doc.addImage(imageData, "PNG", pageWidth - 56, 28, 34, 34);
            imageBottomY = 64;
          } catch (error) {
            console.error("Failed to load cover image for PDF:", error);
          }
        }

        const detailsTop = Math.max(48, imageBottomY + 2);

        autoTable(doc, {
          startY: detailsTop,
          theme: "grid",
          columnStyles: {
            0: { cellWidth: 38, fontStyle: "bold" },
            1: { cellWidth: pageWidth - 52 },
          },
          body: [
            ["Kupac", order.customer.fullName],
            ["Telefon", order.customer.phone],
            ["Email", order.customer.email || "-"],
            ["Adresa", order.shippingAddress || "-"],
            ["Grad", `${order.city || ""} ${order.zipCode || ""}`.trim() || "-"],
            ["Izvor", order.source || "Direktno / webshop"],
            ["Napomena", order.notes || "-"],
            ["Ukupno", `${(order.totalAmount / 100).toFixed(2)} KM`],
          ],
          margin: { left: 14, right: 14 },
          styles: {
            font: "ArialUnicode",
            fontSize: 10,
            cellPadding: 3,
            overflow: "linebreak",
          },
        });

        const itemRows = order.items.map((item) => [
          item.productName,
          `${item.quantity}x`,
          `${(item.price / 100).toFixed(2)} KM`,
          `${((item.price * item.quantity) / 100).toFixed(2)} KM`,
        ]);

        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 8,
          head: [["Proizvod", "Kol.", "Cijena", "Ukupno"]],
          body: itemRows,
          theme: "striped",
          styles: {
            font: "ArialUnicode",
            fontSize: 10,
            cellPadding: 3,
          },
          headStyles: {
            fillColor: [86, 52, 53],
          },
          margin: { left: 14, right: 14 },
        });

        doc.setFontSize(9);
        doc.setFont("ArialUnicode", "normal");
        doc.setTextColor(110, 110, 110);
        doc.text(
          `Generisano: ${new Date().toLocaleString("bs-BA")}`,
          14,
          pageHeight - 10
        );
      }

      doc.save(`potvrdjene-neposlate-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("PDF eksport je spreman");
    } catch (error) {
      console.error("Failed to export pending orders PDF:", error);
      toast.error("Greška pri PDF eksportu");
    } finally {
      setExportingPendingPdf(false);
    }
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
      const matchesCustomer = order.customer.fullName?.toLowerCase().includes(query) ?? false;
      const matchesPhone = order.customer.phone.includes(query);
      const matchesOrderId = order.id?.toLowerCase().includes(query) ?? false;

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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/admin" className="p-2 hover:bg-white rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Narudžbe</h1>
              </div>
              <p className="text-gray-600 ml-10">Upravljanje i obrada svih narudžbi</p>
            </div>
            {hasActiveFilters && (
              <div className="px-4 py-2 bg-amber-100 border border-amber-300 rounded-xl">
                <p className="text-sm font-medium text-amber-800">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Prikazano: {filteredOrders.length} narudžbi
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportConfirmedPendingOrdersPdf}
              disabled={exportingPendingPdf}
              className="px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              {exportingPendingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              PDF potvrđene / neposlate
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-3 rounded-2xl bg-[#563435] text-white font-medium hover:bg-[#563435]/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Unesi direktnu prodaju
            </button>
          </div>
        </div>

        {/* Bento Grid Hero Section - Live Order Processing */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Animated Agent */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent backdrop-blur-md rounded-3xl shadow-sm border border-white/40 p-8 flex items-center justify-center overflow-hidden">
            <OrderProcessingAgent size={320} />
          </div>

          {/* Right: Action Button + Stats */}
          <div className="flex flex-col gap-4">
            {/* Live Processing Button */}
            <button
              onClick={() => {
                const newOrders = orders.filter(o => o.status === "NEW");
                if (newOrders.length === 0) {
                  toast.info("Nema novih narudžbi za obradu");
                } else {
                  setShowLiveProcessor(true);
                }
              }}
              className="group relative overflow-hidden bg-gradient-to-r from-[#563435] to-[#563435]/80 text-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-10 h-10" />
                  <span className="px-4 py-2 bg-white/20 rounded-xl font-bold text-2xl">
                    {orders.filter(o => o.status === "NEW").length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Live Rješavanje</h3>
                <p className="text-white/80 text-sm">Obradi narudžbe brzo i efikasno</p>
              </div>
            </button>

            {/* Stats Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 p-6">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Pregled danas</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Nove</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orders.filter(o => o.status === "NEW").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#563435]"></div>
                    <span className="text-sm text-gray-600">Potvrđene</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orders.filter(o => o.status === "CONFIRMED").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-600">Dostavljene</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orders.filter(o => o.status === "DELIVERED").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel - Always Visible */}
        <div className="mb-6 bg-gradient-to-br from-white/70 via-white/60 to-white/50 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#563435] flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Filteri</h3>
                <p className="text-xs text-gray-500">Filtriraj i pretraži narudžbe</p>
              </div>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium text-sm border border-red-200"
              >
                <XIcon className="w-4 h-4" />
                Očisti filtere
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  placeholder="Ime, telefon, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                <Clock className="w-3 h-3 inline mr-1" />
                Datum od
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#563435] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                <Clock className="w-3 h-3 inline mr-1" />
                Datum do
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#563435] focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

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
                    <th className="px-4 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#563435] focus:ring-[#563435]"
                      />
                    </th>
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
                          className={`hover:bg-white/50 transition-colors ${isExpanded ? 'bg-white/80' : ''}`}
                        >
                          <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(order.id)}
                              onChange={() => toggleOrderSelection(order.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#563435] focus:ring-[#563435]"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                            #{order.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                            {new Date(order.createdAt).toLocaleDateString("bs-BA", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </td>
                          <td className="px-6 py-4 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                            <p className="text-sm font-medium text-gray-800">{order.customer.fullName}</p>
                            <p className="text-xs text-gray-500">{order.customer.phone}</p>
                            <p className="text-xs text-[#563435] mt-1">{order.source || "Direktno / webshop"}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-[#563435] cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                            {(order.totalAmount / 100).toFixed(2)} KM
                          </td>
                          <td className="px-6 py-4 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
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
                          <tr className="bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent">
                            <td colSpan={7} className="px-6 py-8">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Details Col 1: Customer */}
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Podaci o kupcu</h4>
                                    <Link
                                      href={`/admin/customers/${order.customer.id}`}
                                      className="flex items-center gap-1 px-3 py-1 bg-[#563435] text-white text-xs font-medium rounded-lg hover:bg-[#563435]/90 transition-all shadow-sm"
                                    >
                                      <User className="w-3 h-3" />
                                      Profil
                                      <ExternalLink className="w-3 h-3" />
                                    </Link>
                                  </div>
                                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm space-y-4">
                                    {/* Customer Name - Clickable */}
                                    <Link
                                      href={`/admin/customers/${order.customer.id}`}
                                      className="flex items-center gap-3 p-3 rounded-xl bg-[#563435]/5 hover:bg-[#563435]/10 transition-all group"
                                    >
                                      <div className="w-10 h-10 rounded-full bg-[#563435] flex items-center justify-center text-white flex-shrink-0">
                                        <User className="w-5 h-5" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-bold text-gray-800 group-hover:text-[#563435] transition-colors">{order.customer.fullName}</p>
                                        <p className="text-xs text-gray-500">Klikni za profil</p>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-[#563435] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>

                                    {/* Phone */}
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <Phone className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-xs text-gray-500">Telefon</p>
                                        <a href={`tel:${order.customer.phone}`} className="font-medium hover:text-blue-600 transition-colors">
                                          {order.customer.phone}
                                        </a>
                                      </div>
                                    </div>

                                    {/* Email */}
                                    {order.customer.email && (
                                      <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                          <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-xs text-gray-500">Email</p>
                                          <a href={`mailto:${order.customer.email}`} className="font-medium hover:text-purple-600 transition-colors break-all">
                                            {order.customer.email}
                                          </a>
                                        </div>
                                      </div>
                                    )}

                                    {/* Address */}
                                    <div className="flex items-start gap-3 text-sm text-gray-700">
                                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <MapPin className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">Adresa dostave</p>
                                        <p className="font-medium text-gray-800">{order.shippingAddress}</p>
                                        <p className="text-gray-600">{order.city} {order.zipCode}</p>
                                      </div>
                                    </div>

                                    {/* Notes */}
                                    {order.notes && (
                                      <div className="mt-2 pt-3 border-t border-gray-200/60">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Napomena:</p>
                                        <p className="text-sm text-gray-700 bg-amber-50/50 rounded-lg p-3 italic border border-amber-100">
                                          {order.notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Details Col 2: Items */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Naručeni proizvodi</h4>
                                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm space-y-3">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50/80 to-transparent border border-gray-100 hover:shadow-sm transition-all">
                                        <div className="flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-[#563435] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                            {item.quantity}x
                                          </span>
                                          <div>
                                            <p className="font-semibold text-gray-800">{item.productName}</p>
                                            <p className="text-xs text-gray-500">{(item.price / 100).toFixed(2)} KM po komadu</p>
                                          </div>
                                        </div>
                                        <span className="font-bold text-[#563435] text-lg">{(item.price * item.quantity / 100).toFixed(2)} KM</span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-4 mt-3 border-t-2 border-[#563435]/20">
                                      <span className="font-bold text-gray-700">Ukupno za naplatu:</span>
                                      <span className="text-2xl font-bold text-[#563435]">{(order.totalAmount / 100).toFixed(2)} KM</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Details Col 3: Actions */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Upravljanje statusom</h4>
                                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm flex flex-col gap-3">

                                    {(order.status === "NEW" || order.status === "PENDING") && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#563435] text-white text-sm font-bold rounded-xl hover:bg-[#563435]/90 transition-all shadow-md hover:shadow-lg"
                                      >
                                        <CheckCircle className="w-5 h-5" /> Potvrdi narudžbu
                                      </button>
                                    )}

                                    {order.status === "CONFIRMED" && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "PREPARING")}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 text-white text-sm font-bold rounded-xl hover:bg-amber-700 transition-all shadow-md hover:shadow-lg"
                                      >
                                        <Package className="w-5 h-5" /> U pripremi
                                      </button>
                                    )}

                                    {(order.status === "PREPARING" || order.status === "CONFIRMED") && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#563435]/80 text-white text-sm font-bold rounded-xl hover:bg-[#563435] transition-all shadow-md hover:shadow-lg"
                                      >
                                        <Truck className="w-5 h-5" /> Označi kao POSLANO
                                      </button>
                                    )}

                                    {order.status === "SHIPPED" && (
                                      <>
                                        <button
                                          onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
                                        >
                                          <CheckCircle className="w-5 h-5" /> Označi kao DOSTAVLJENO
                                        </button>
                                        <button
                                          onClick={() => {
                                            if(confirm("Da li je pošiljka vraćena nazad?")) {
                                              updateOrderStatus(order.id, "RETURNED");
                                            }
                                          }}
                                          className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                          <RotateCcw className="w-5 h-5" /> Vraćeno
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
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 text-sm font-bold rounded-xl transition-all"
                                      >
                                        <XCircle className="w-5 h-5" /> Otkaži narudžbu
                                      </button>
                                    )}

                                    {/* Print PDF Button */}
                                    <div className="pt-3 mt-2 border-t-2 border-gray-200/60">
                                      <button
                                        onClick={() => generatePDF(order)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-bold rounded-xl hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg"
                                      >
                                        <Printer className="w-5 h-5" /> Štampaj dostavnicu (PDF)
                                      </button>
                                    </div>

                                    {/* View Details Button - NEW */}
                                    <div className="pt-3 mt-2 border-t-2 border-gray-200/60">
                                      <Link
                                        href={`/admin/orders/${order.id}`}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                                      >
                                        <Edit className="w-5 h-5" /> Detalji & Uredi narudžbu
                                      </Link>
                                    </div>

                                  </div>
                                </div>
                              </div>

                              {/* Comments Section */}
                              <div className="mt-6">
                                <CommentSection orderId={order.id} />
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

        {showCreateModal && (
          <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center">
              <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-white/40 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Direktna narudžba</h2>
                    <p className="text-sm text-gray-500">Usmena, Instagram, Facebook, WhatsApp ili druga ručna prodaja</p>
                  </div>
                  <button
                    onClick={closeCreateModal}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ime i prezime</label>
                    <input
                      type="text"
                      value={manualOrder.fullName}
                      onChange={(e) => setManualOrder((current) => ({ ...current, fullName: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={manualOrder.phone}
                      onChange={(e) => setManualOrder((current) => ({ ...current, phone: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={manualOrder.email}
                      onChange={(e) => setManualOrder((current) => ({ ...current, email: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Izvor prodaje</label>
                    <input
                      type="text"
                      value={manualOrder.source}
                      onChange={(e) => setManualOrder((current) => ({ ...current, source: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresa</label>
                    <input
                      type="text"
                      value={manualOrder.address}
                      onChange={(e) => setManualOrder((current) => ({ ...current, address: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grad</label>
                    <input
                      type="text"
                      value={manualOrder.city}
                      onChange={(e) => setManualOrder((current) => ({ ...current, city: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poštanski broj</label>
                    <input
                      type="text"
                      value={manualOrder.zipCode}
                      onChange={(e) => setManualOrder((current) => ({ ...current, zipCode: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proizvod</label>
                    <select
                      value={manualOrder.productId}
                      onChange={(e) => handleManualProductChange(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    >
                      <option value="">{loadingProducts ? "Učitavanje..." : "Odaberi proizvod"}</option>
                      {availableProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {(product.price / 100).toFixed(2)} KM
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Količina</label>
                    <input
                      type="number"
                      min={1}
                      value={manualOrder.quantity}
                      onChange={(e) => setManualOrder((current) => ({ ...current, quantity: Math.max(1, Number.parseInt(e.target.value || "1", 10)) }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prodajna cijena / kom</label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={manualOrder.unitPrice}
                      onChange={(e) => setManualOrder((current) => ({ ...current, unitPrice: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Regularna cijena</p>
                      <p className="font-bold text-gray-900">{defaultUnitPrice.toFixed(2)} KM</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Popust po komadu</p>
                      <p className="font-bold text-amber-700">{manualDiscountPerUnit.toFixed(2)} KM</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Ukupno za naplatu</p>
                      <p className="font-bold text-[#563435]">{manualTotal.toFixed(2)} KM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Napomena</label>
                  <textarea
                    rows={4}
                    value={manualOrder.notes}
                    onChange={(e) => setManualOrder((current) => ({ ...current, notes: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                    placeholder="Napomena za direktnu prodaju, popust, dogovor s kupcem..."
                  />
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    onClick={closeCreateModal}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={createDirectOrder}
                    disabled={creatingOrder}
                    className="px-5 py-3 rounded-xl bg-[#563435] text-white font-medium hover:bg-[#563435]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {creatingOrder ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Kreiraj narudžbu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedOrders.length}
          onCancel={() => setSelectedOrders([])}
          actions={[
            {
              label: "Promijeni status",
              onClick: () => setShowStatusModal(true),
              icon: <Edit className="w-4 h-4" />,
            },
            {
              label: "Izvezi Excel",
              onClick: handleBulkExport,
              icon: <Download className="w-4 h-4" />,
            },
            {
              label: "Obriši",
              onClick: handleBulkDelete,
              icon: <Trash2 className="w-4 h-4" />,
              className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2",
            },
          ]}
        />

        {/* Bulk Status Modal */}
        <BulkStatusModal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          onConfirm={handleBulkStatusUpdate}
          selectedCount={selectedOrders.length}
          statusOptions={Object.entries(statusConfig).map(([value, config]) => ({
            value,
            label: config.label,
            color: config.color,
            icon: config.icon
          }))}
          title="narudžbe"
          currentStatusConfig={statusConfig}
        />

        {/* Live Order Processor */}
        <LiveOrderProcessor
          isOpen={showLiveProcessor}
          onClose={() => setShowLiveProcessor(false)}
          initialOrders={orders.filter(o => o.status === "NEW") as any}
          onOrdersUpdate={fetchOrders}
        />

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
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
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
    </div>
  );
}
