"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface StatusOption {
  value: string;
  label: string;
  color: string;
  icon: any;
}

interface BulkStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: string) => void;
  selectedCount: number;
  statusOptions: StatusOption[];
  title: string;
  currentStatusConfig: any;
}

export default function BulkStatusModal({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
  statusOptions,
  title,
  currentStatusConfig,
}: BulkStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus);
      setSelectedStatus("");
    }
  };

  const selectedConfig = selectedStatus ? currentStatusConfig[selectedStatus] : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Promjena statusa za {selectedCount} {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Odaberi novi status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Odaberi status...</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {selectedConfig && (
          <div className={`mt-4 p-4 rounded-lg ${selectedConfig.color} flex items-center gap-2`}>
            {selectedConfig.icon && <selectedConfig.icon className="w-5 h-5" />}
            <span className="font-medium">{selectedConfig.label}</span>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Otkaži
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStatus}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
}
