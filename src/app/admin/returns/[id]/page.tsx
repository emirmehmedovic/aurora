"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Package, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ReturnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [returnData, setReturnData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundMethod, setRefundMethod] = useState("ORIGINAL_PAYMENT");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchReturn();
    }
  }, [session]);

  const fetchReturn = async () => {
    try {
      const response = await fetch(`/api/admin/returns/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReturnData(data);
        setRefundAmount(String(data.refundAmount || data.order.totalAmount));
        setNotes(data.notes || "");
      }
    } catch (error) {
      console.error("Failed to fetch return:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/returns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          ...(newStatus === "REFUNDED" && {
            refundAmount: parseInt(refundAmount),
            refundMethod
          }),
          notes
        }),
      });

      if (response.ok) {
        toast.success("Status ažuriran!");
        fetchReturn();
      }
    } catch (error) {
      toast.error("Greška pri ažuriranju");
    }
  };

  if (loading || !returnData) {
    return <div className="p-8 text-center">Učitavanje...</div>;
  }

  const statusColors: Record<string, string> = {
    REQUESTED: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
    RECEIVED: "bg-purple-100 text-purple-700",
    REFUNDED: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/returns" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Nazad
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl font-bold mb-4">{returnData.rmaNumber}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-500">Kupac</div>
              <div className="font-semibold">{returnData.customer.fullName}</div>
              <div className="text-sm">{returnData.customer.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Narudžba</div>
              <div className="font-semibold">{returnData.order.orderNumber}</div>
              <div className="text-sm">{(returnData.order.totalAmount / 100).toFixed(0)} KM</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Status</div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[returnData.status]}`}>
              {returnData.status}
            </span>
          </div>

          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-700 mb-2">Razlog povrata</div>
            <div className="text-gray-800">{returnData.reason}</div>
            {returnData.reasonDetails && (
              <div className="text-sm text-gray-600 mt-2">{returnData.reasonDetails}</div>
            )}
          </div>

          {returnData.status === "REQUESTED" && (
            <div className="flex gap-3">
              <button onClick={() => updateStatus("APPROVED")} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Odobri
              </button>
              <button onClick={() => updateStatus("REJECTED")} className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Odbij
              </button>
            </div>
          )}

          {returnData.status === "APPROVED" && (
            <button onClick={() => updateStatus("RECEIVED")} className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Označi kao primljeno
            </button>
          )}

          {returnData.status === "RECEIVED" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Iznos refundacije (centi)</label>
                <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Metod refundacije</label>
                <select value={refundMethod} onChange={(e) => setRefundMethod(e.target.value)} className="w-full px-4 py-2 border rounded-xl">
                  <option value="ORIGINAL_PAYMENT">Originalni način plaćanja</option>
                  <option value="BANK_TRANSFER">Bankovna transakcija</option>
                  <option value="STORE_CREDIT">Kredit u prodavnici</option>
                </select>
              </div>
              <button onClick={() => updateStatus("REFUNDED")} className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Procesuj refundaciju
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
