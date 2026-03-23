"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

interface TopProduct {
  name: string;
  count: number;
  revenue: number;
  image: string | null;
}

export default function TopProductsGrid() {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats?endpoint=top-products&limit=5");
      if (response.ok) {
        const result = await response.json();
        setProducts(result);
      }
    } catch (error) {
      console.error("Failed to fetch top products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top proizvodi</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Top proizvodi</h2>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.count} prodato
              </p>
            </div>

            <div className="text-right">
              <div className="font-bold text-gray-800">
                {(product.revenue / 100).toFixed(0)} KM
              </div>
              <div className="text-xs text-gray-500">
                prihod
              </div>
            </div>

            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#563435]/10 flex items-center justify-center">
              <span className="text-sm font-bold text-[#563435]">#{index + 1}</span>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nema podataka
          </div>
        )}
      </div>
    </div>
  );
}
