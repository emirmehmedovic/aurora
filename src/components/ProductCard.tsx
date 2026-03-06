"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    shortDescription?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link href={`/proizvod/${product.slug}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50/30 via-white/40 to-amber-50/30 backdrop-blur-lg border border-white/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-white/30 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-[280px] overflow-hidden p-2 sm:p-3">
          {/* Artisan frame */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/70 via-rose-50/50 to-amber-50/50 border border-white/30" />

          {/* Rounded image wrapper */}
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={product.images[0] || "/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover will-change-transform group-hover:scale-[1.03] transition-transform duration-500 ease-in-out"
            />
            {/* Soft vignette on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Inner ring for handcrafted feel */}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/40" />
          </div>

          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-[#563435] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
              -{discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Subtle top divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#563435]/20 to-transparent mb-3" />

          <h3 className="text-[15px] font-semibold tracking-tight text-gray-800 mb-1.5 line-clamp-2 group-hover:text-gray-900 transition-colors">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none font-bold text-gray-900 tabular-nums">
                {product.price.toFixed(2)} KM
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-gray-600 line-through bg-gray-50/80 border border-gray-200/70 rounded px-1.5 py-0.5">
                  {product.compareAtPrice.toFixed(2)} KM
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-[11px] font-semibold text-[#563435] bg-[#563435]/10 border border-[#563435]/30 rounded-full px-2 py-0.5">
                -{discount}%
              </span>
            )}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 mt-2">
            <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#563435]/30 bg-white/70 hover:bg-white text-[#563435] font-semibold text-sm py-2 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Pogledaj detalje
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
