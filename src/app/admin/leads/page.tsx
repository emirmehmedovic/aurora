"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Phone, Mail } from "lucide-react";

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  productInterest: string;
  source: string;
  status: string;
  createdAt: string;
  notes: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

export default function LeadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchLeads();
    }
  }, [session]);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
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
    NEW: "bg-blue-100 text-blue-800",
    CONTACTED: "bg-yellow-100 text-yellow-800",
    QUALIFIED: "bg-purple-100 text-purple-800",
    CONVERTED: "bg-green-100 text-green-800",
    LOST: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    NEW: "Novi",
    CONTACTED: "Kontaktiran",
    QUALIFIED: "Kvalifikovan",
    CONVERTED: "Konvertovan",
    LOST: "Izgubljen",
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Leadovi</h1>
            <p className="text-gray-600">Upravljanje svim leadovima</p>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Nema leadova</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{lead.fullName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString("bs-BA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-sm">Kontakt</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </p>
                      {lead.email && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Lead Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-sm">Informacije</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Proizvod:</span> {lead.productInterest}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Izvor:</span> {lead.source}
                      </p>
                      {lead.utmCampaign && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Kampanja:</span> {lead.utmCampaign}
                        </p>
                      )}
                      {lead.notes && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Napomena:</span> {lead.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2 flex-wrap">
                  {lead.status === "NEW" && (
                    <>
                      <button
                        onClick={() => updateLeadStatus(lead.id, "CONTACTED")}
                        className="px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600"
                      >
                        Označi kao kontaktiran
                      </button>
                      <button
                        onClick={() => updateLeadStatus(lead.id, "QUALIFIED")}
                        className="px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600"
                      >
                        Kvalifikuj
                      </button>
                    </>
                  )}
                  {(lead.status === "CONTACTED" || lead.status === "QUALIFIED") && (
                    <>
                      <button
                        onClick={() => updateLeadStatus(lead.id, "CONVERTED")}
                        className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600"
                      >
                        Konvertuj
                      </button>
                      <button
                        onClick={() => updateLeadStatus(lead.id, "LOST")}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                      >
                        Označi kao izgubljen
                      </button>
                    </>
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
