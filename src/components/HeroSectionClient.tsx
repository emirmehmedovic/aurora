"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

interface HeroProductData {
  id: string;
  productId: string;
  imageId: string;
  subtitle: string | null;
  order: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice: number | null;
  };
  image: {
    id: string;
    url: string;
    alt: string | null;
  };
}

interface HeroSectionClientProps {
  heroProducts: HeroProductData[];
  fallbackProducts: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    image: string;
    subtitle: string;
  }[];
}

export default function HeroSectionClient({ heroProducts, fallbackProducts }: HeroSectionClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback to hardcoded data if no hero products in DB
  const products = heroProducts.length > 0 ? heroProducts.map(hp => ({
    id: hp.product.slug,
    name: hp.product.name,
    price: hp.product.price / 100,
    compareAtPrice: hp.product.compareAtPrice ? hp.product.compareAtPrice / 100 : hp.product.price / 100,
    image: hp.image.url,
    subtitle: hp.subtitle || ""
  })) : fallbackProducts;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => setActiveIndex((current) => (current + 1) % products.length);
  const prevSlide = () => setActiveIndex((current) => (current - 1 + products.length) % products.length);

  const activeProduct = products[activeIndex];
  const discount = Math.round(((activeProduct.compareAtPrice - activeProduct.price) / activeProduct.compareAtPrice) * 100);

  return (
    <div className="relative mb-8 w-full px-4 sm:px-6 lg:px-8">
      {/* Main Hero with Product Image */}
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-6 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100/30 backdrop-blur-sm overflow-hidden min-h-[600px] lg:min-h-0">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 h-full">
          {/* Left - Text Content */}
          <div className="flex flex-col justify-center relative z-10 order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#563435] to-[#8b5a5c] text-white rounded-full text-sm font-semibold mb-4 w-fit">
              Prestani trošiti na salone — počni od danas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight transition-opacity duration-500">
              <span className="block text-2xl md:text-3xl lg:text-4xl text-[#563435] mb-2">{activeProduct.name}</span>
              Zaboravi na žilete. Zauvijek.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed min-h-[60px]">
              {activeProduct.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/proizvodi"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#563435] to-[#8b5a5c] hover:from-[#6d4446] hover:to-[#9d6a6c] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Želim glatku kožu →
              </Link>
              <Link
                href={`/proizvod/${activeProduct.id}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/70 hover:bg-white text-gray-800 font-semibold text-lg rounded-full border border-violet-200/70 transition-all duration-200"
              >
                Kako funkcioniše?
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-2xl font-bold text-[#563435]">{discount}%</div>
                <div className="text-xs text-gray-600">Popust</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-sm font-bold text-[#563435]">Besplatna</div>
                <div className="text-xs text-gray-600">Dostava u BiH</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-sm font-bold text-[#563435]">Pouzećem</div>
                <div className="text-xs text-gray-600">Plaćanje</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-sm font-bold text-[#563435]">Podrška</div>
                <div className="text-xs text-gray-600">Prije kupovine</div>
              </div>
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-1 lg:order-2">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#563435] p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#563435] p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Link
                  href={`/proizvod/${product.id}`}
                  className="block w-full h-full"
                  aria-label={`Pogledaj ${product.name}`}
                >
                  <NextImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    priority={index === 0}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#563435] w-8" : "bg-[#563435]/30 hover:bg-[#563435]/50"
              }`}
              aria-label={`Prikaži slajd ${index + 1}`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
