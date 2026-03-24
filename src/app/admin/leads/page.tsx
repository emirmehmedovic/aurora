"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Phone, Mail, Filter, Search, X, Download, Edit, Trash2, UserPlus, PhoneCall, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import BulkActionBar from "@/components/admin/BulkActionBar";
import { exportToExcel, formatLeadsForExport } from "@/lib/excel";
import CommentSection from "@/components/admin/CommentSection";
import BulkStatusModal from "@/components/admin/BulkStatusModal";
import { toast } from "sonner";

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

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Bulk operations
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);

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

  // Bulk operations handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map(l => l.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch("/api/admin/leads/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          leadIds: selectedLeads,
          status: newStatus,
        }),
      });

      if (response.ok) {
        toast.success("Status ažuriran!");
        fetchLeads();
        setSelectedLeads([]);
        setShowStatusModal(false);
      } else {
        toast.error("Greška pri ažuriranju leadova");
      }
    } catch (error) {
      console.error("Bulk status update failed:", error);
      toast.error("Greška pri ažuriranju leadova");
    }
  };

  const handleBulkExport = () => {
    const leadsToExport = leads.filter(l => selectedLeads.includes(l.id));
    const formatted = formatLeadsForExport(leadsToExport);
    exportToExcel(formatted, `leadovi-${new Date().toISOString().split('T')[0]}`);
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Da li ste sigurni da želite obrisati ${selectedLeads.length} leadova?`)) {
      return;
    }

    try {
      const response = await fetch("/api/admin/leads/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          leadIds: selectedLeads,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchLeads();
        setSelectedLeads([]);
      }
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert("Greška pri brisanju leadova");
    }
  };

  // Filter and search logic
  const filteredLeads = leads.filter(lead => {
    // Status filter
    if (statusFilter !== "ALL" && lead.status !== statusFilter) {
      return false;
    }

    // Source filter
    if (sourceFilter !== "ALL" && lead.source !== sourceFilter) {
      return false;
    }

    // Search filter (by name, phone, or email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = lead.fullName.toLowerCase().includes(query);
      const matchesPhone = lead.phone.includes(query);
      const matchesEmail = lead.email?.toLowerCase().includes(query);

      if (!matchesName && !matchesPhone && !matchesEmail) {
        return false;
      }
    }

    // Date range filter
    if (dateFrom) {
      const leadDate = new Date(lead.createdAt);
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (leadDate < fromDate) {
        return false;
      }
    }

    if (dateTo) {
      const leadDate = new Date(lead.createdAt);
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (leadDate > toDate) {
        return false;
      }
    }

    return true;
  });

  const clearFilters = () => {
    setStatusFilter("ALL");
    setSourceFilter("ALL");
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters = statusFilter !== "ALL" || sourceFilter !== "ALL" || searchQuery !== "" || dateFrom !== "" || dateTo !== "";

  // Get unique sources for filter
  const uniqueSources = Array.from(new Set(leads.map(l => l.source)));

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
    CALLED: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    NO_ANSWER: "bg-gray-100 text-gray-800",
    FOLLOW_UP: "bg-orange-100 text-orange-800",
  };

  const statusLabels: Record<string, string> = {
    NEW: "Novi",
    CONTACTED: "Kontaktiran",
    QUALIFIED: "Kvalifikovan",
    CONVERTED: "Konvertovan",
    LOST: "Izgubljen",
    CALLED: "Pozvan",
    CONFIRMED: "Potvrđen",
    CANCELLED: "Otkazan",
    NO_ANSWER: "Bez odgovora",
    FOLLOW_UP: "Praćenje",
  };

  const statusConfig: Record<string, { color: string, label: string, icon: any }> = {
    NEW: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Novi", icon: AlertCircle },
    CALLED: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pozvan", icon: PhoneCall },
    CONFIRMED: { color: "bg-green-100 text-green-800 border-green-200", label: "Potvrđen", icon: CheckCircle },
    CANCELLED: { color: "bg-red-100 text-red-800 border-red-200", label: "Otkazan", icon: XCircle },
    NO_ANSWER: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Bez odgovora", icon: Phone },
    FOLLOW_UP: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Praćenje", icon: Clock },
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Leadovi</h1>
            <p className="text-gray-600">Upravljanje svim leadovima</p>
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
            Filteri {hasActiveFilters && `(${filteredLeads.length})`}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraga
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ime, telefon, email..."
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
                  <option value="NEW">Novi</option>
                  <option value="CONTACTED">Kontaktiran</option>
                  <option value="QUALIFIED">Kvalifikovan</option>
                  <option value="CONVERTED">Konvertovan</option>
                  <option value="LOST">Izgubljen</option>
                </select>
              </div>

              {/* Source Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Izvor
                </label>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#563435] focus:border-transparent"
                >
                  <option value="ALL">Svi izvori</option>
                  {uniqueSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
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
                  <X className="w-4 h-4" />
                  Očisti filtere
                </button>
              </div>
            )}
          </div>
        )}

        {/* Select All checkbox */}
        {filteredLeads.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#563435] focus:ring-[#563435]"
              />
              <span className="text-sm font-medium text-gray-700">
                Odaberi sve ({filteredLeads.length})
              </span>
            </label>
          </div>
        )}

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                {hasActiveFilters ? "Nema rezultata pretrage." : "Nema leadova"}
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
            filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => toggleLeadSelection(lead.id)}
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-[#563435] focus:ring-[#563435]"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-800">{lead.fullName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status]}`}>
                          {statusLabels[lead.status]}
                        </span>
                      </div>
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
                <div className="flex gap-2 flex-wrap mb-4">
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

                {/* Comments Section */}
                <CommentSection leadId={lead.id} />
              </div>
            ))
          )}
        </div>

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedLeads.length}
          onCancel={() => setSelectedLeads([])}
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
          selectedCount={selectedLeads.length}
          statusOptions={Object.entries(statusConfig).map(([value, config]) => ({
            value,
            label: config.label,
            color: config.color,
            icon: config.icon
          }))}
          title="leadove"
          currentStatusConfig={statusConfig}
        />
      </div>
    </div>
  );
}
