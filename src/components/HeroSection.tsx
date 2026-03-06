"use client";

import { Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

export default function HeroSection() {
  return (
    <div className="relative mb-8 w-full px-4 sm:px-6 lg:px-8">
      {/* Main Hero with Product Image */}
      <div className="mb-6 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100/30 backdrop-blur-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Left - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#563435] to-[#8b5a5c] text-white rounded-full text-sm font-semibold mb-4 w-fit">
              ⚡ Limitirana ponuda - 50% popust
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Prestani brijati noge <span className="text-[#563435]">svaka 2 dana</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Glatka koža uz IPL tretman kod kuće. Sporiji rast dlačica, bez iritacija, bez salona.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/naruci" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#563435] to-[#8b5a5c] hover:from-[#6d4446] hover:to-[#9d6a6c] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Naruči odmah - 172 KM
              </Link>
              <Link 
                href="/proizvod/ice-cool-pro" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/70 hover:bg-white text-gray-800 font-semibold text-lg rounded-full border border-violet-200/70 transition-all duration-200"
              >
                Saznaj više
              </Link>
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50">
                <div className="text-2xl font-bold text-[#563435]">50%</div>
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
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <NextImage
              src="/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"
              alt="Ice Cool PRO™ IPL Device"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
