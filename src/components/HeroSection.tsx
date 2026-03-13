"use client";

import { useState, useEffect } from "react";
import { Sparkles, Zap, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

const products = [
  {
    id: "ice-cool-pro",
    name: "ICE COOL PRO",
    price: 175.00,
    compareAtPrice: 350.00,
    image: "/slike/PRO/cover-image.png",
    subtitle: "Glatka koža uz IPL tretman kod kuće. Sporiji rast dlačica, bez iritacija, bez salona."
  },
  {
    id: "ice-cool-pro-max",
    name: "ICE COOL Max",
    price: 190.00,
    compareAtPrice: 380.00,
    image: "/slike/ELITE/cover.png",
    subtitle: "Premium model sa više nivoa intenziteta i većom površinom tretmana za najbrže rezultate."
  },
  {
    id: "ice-cool-lite",
    name: "ICE COOL LITE",
    price: 165.00,
    compareAtPrice: 330.00,
    image: "/slike/LITE/cover.png",
    subtitle: "Kompaktna verzija idealna za putovanja, brze tretmane i manja područja tijela."
  }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveIndex((current) => (current + 1) % products.length);
  const prevSlide = () => setActiveIndex((current) => (current - 1 + products.length) % products.length);

  const activeProduct = products[activeIndex];
  const discount = Math.round(((activeProduct.compareAtPrice - activeProduct.price) / activeProduct.compareAtPrice) * 100);

  return (
    <div className="relative mb-8 w-full px-4 sm:px-6 lg:px-8">
      {/* Main Hero with Product Image */}
      <div className="relative mb-6 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100/30 backdrop-blur-sm overflow-hidden min-h-[600px] lg:min-h-0">
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#563435] p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#563435] p-2 rounded-full shadow-md backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 h-full">
          {/* Left - Text Content */}
          <div className="flex flex-col justify-center relative z-10">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#563435] to-[#8b5a5c] text-white rounded-full text-sm font-semibold mb-4 w-fit">
              ⚡ Limitirana ponuda - {discount}% popust
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight transition-opacity duration-500">
              <span className="block text-2xl md:text-3xl lg:text-4xl text-[#563435] mb-2">{activeProduct.name}</span>
              Prestani brijati noge svaka 2 dana
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed min-h-[60px]">
              {activeProduct.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/naruci" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#563435] to-[#8b5a5c] hover:from-[#6d4446] hover:to-[#9d6a6c] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Naruči odmah - {activeProduct.price.toFixed(2)} KM
              </Link>
              <Link 
                href={`/proizvod/${activeProduct.id}`} 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/70 hover:bg-white text-gray-800 font-semibold text-lg rounded-full border border-violet-200/70 transition-all duration-200"
              >
                Saznaj više
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
                <div className="text-xs text-gray-600">Dostava</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-sm font-bold text-[#563435]">14 dana</div>
                <div className="text-xs text-gray-600">Povrat</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-sm font-bold text-[#563435]">12 mj.</div>
                <div className="text-xs text-gray-600">Garancija</div>
              </div>
            </div>
          </div>
          
          {/* Right - Product Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mt-8 lg:mt-0">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <NextImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
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
  );
}
