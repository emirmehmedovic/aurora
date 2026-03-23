"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Users, Package, TrendingUp, Home, UserCircle, BarChart3, X } from "lucide-react";

interface Action {
  id: string;
  title: string;
  description: string;
  icon: any;
  action: () => void;
  keywords: string[];
}

export default function QuickActionsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Pregled statistike i grafikona",
      icon: Home,
      action: () => router.push("/admin"),
      keywords: ["dashboard", "home", "pocetna", "statistika"],
    },
    {
      id: "orders",
      title: "Narudžbe",
      description: "Upravljanje narudžbama",
      icon: ShoppingCart,
      action: () => router.push("/admin/orders"),
      keywords: ["narudzbe", "orders", "porudzbine"],
    },
    {
      id: "leads",
      title: "Leadovi",
      description: "Upravljanje leadovima",
      icon: Users,
      action: () => router.push("/admin/leads"),
      keywords: ["leads", "leadovi", "potencijalni"],
    },
    {
      id: "customers",
      title: "Kupci",
      description: "Baza kupaca i istorija",
      icon: UserCircle,
      action: () => router.push("/admin/customers"),
      keywords: ["customers", "kupci", "klijenti"],
    },
    {
      id: "products",
      title: "Proizvodi",
      description: "Upravljanje proizvodima",
      icon: Package,
      action: () => router.push("/admin/products"),
      keywords: ["products", "proizvodi", "artikli"],
    },
    {
      id: "campaigns",
      title: "Kampanje",
      description: "Marketing kampanje",
      icon: TrendingUp,
      action: () => router.push("/admin/campaigns"),
      keywords: ["campaigns", "kampanje", "marketing"],
    },
    {
      id: "analytics",
      title: "Analitika",
      description: "Napredna analitika",
      icon: BarChart3,
      action: () => router.push("/admin/analytics"),
      keywords: ["analytics", "analitika", "statistika"],
    },
  ];

  const filteredActions = actions.filter((action) => {
    const searchLower = search.toLowerCase();
    return (
      action.title.toLowerCase().includes(searchLower) ||
      action.description.toLowerCase().includes(searchLower) ||
      action.keywords.some((kw) => kw.includes(searchLower))
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }

      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredActions[selectedIndex]) {
            filteredActions[selectedIndex].action();
            setIsOpen(false);
            setSearch("");
            setSelectedIndex(0);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openQuickActions", handleOpen);
    return () => window.removeEventListener("openQuickActions", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setSearch("");
          setSelectedIndex(0);
        }}
      />

      {/* Panel */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pretraži akcije... (Ctrl+K)"
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#563435] focus:border-transparent text-gray-800"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearch("");
                  setSelectedIndex(0);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredActions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nema rezultata za "{search}"
              </div>
            ) : (
              <div className="py-2">
                {filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.action();
                        setIsOpen(false);
                        setSearch("");
                        setSelectedIndex(0);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? "bg-[#563435]/10 border-l-4 border-[#563435]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-[#563435] text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{action.title}</div>
                        <div className="text-sm text-gray-500">{action.description}</div>
                      </div>
                      {isSelected && (
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          Enter
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigacija</span>
              <span>Enter za odabir</span>
            </div>
            <span>Esc za zatvaranje</span>
          </div>
        </div>
      </div>
    </>
  );
}
