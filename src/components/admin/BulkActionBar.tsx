"use client";

import { X } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  onCancel: () => void;
  actions: {
    label: string;
    onClick: () => void;
    className?: string;
    icon?: React.ReactNode;
  }[];
}

export default function BulkActionBar({
  selectedCount,
  onCancel,
  actions,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-[#563435] text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-6">
        {/* Selected count */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {selectedCount}
          </div>
          <span className="font-medium">
            {selectedCount} {selectedCount === 1 ? "stavka" : "stavki"} odabrano
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={
                action.className ||
                "px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors flex items-center gap-2"
              }
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors ml-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
