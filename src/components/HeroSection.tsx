"use client";

import { Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative mb-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Column - Main Hero */}
        <div className="md:w-2/3 flex flex-col gap-3">
          {/* Main Hero Card - Soft Violet */}
          <div className="flex-1 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/20 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-violet-100/30 backdrop-blur-sm">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col h-full min-h-[500px]">
              <div className="mb-6">
                <div className="inline-flex p-3 rounded-2xl bg-violet-100/50 mb-4">
                  <Sparkles className="h-8 w-8 text-violet-600" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  Ice Cool PRO™
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">
                  Glatka koža koja traje sedmicama
                </p>
                <p className="text-base md:text-lg text-gray-600 mb-8">
                  Bezbolno IPL uklanjanje dlačica iz udobnosti doma.<br />
                  Salon efekat bez salona, bez voska i bez svakodnevnog brijanja.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/naruci" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#563435] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    Naruči odmah
                  </Link>
                  <Link 
                    href="/proizvod/ice-cool-pro" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/70 hover:bg-white text-gray-800 font-semibold text-lg rounded-full border border-violet-200/70 transition-all duration-200"
                  >
                    Saznaj više
                  </Link>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </div>

        {/* Right Column - Stacked Cards */}
        <div className="md:w-1/3 flex flex-col gap-3">
          {/* Benefits Card - Soft Rose */}
          <div className="flex-1 bg-gradient-to-br from-rose-50/30 via-white to-pink-50/20 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-rose-100/30 backdrop-blur-sm">
            <div className="p-6 h-full min-h-[240px]">
              <div className="inline-flex p-2 rounded-xl bg-rose-100/50 mb-4">
                <Zap className="h-6 w-6 text-rose-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Zašto Ice Cool PRO™?</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Manje potrebe za čestim brijanjem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Glađa koža uz manje iritacija</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Tretman iz privatnosti doma</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Bez čekanja termina</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Special Offer Card - Soft Teal */}
          <div className="flex-1 bg-gradient-to-br from-teal-50/30 via-white to-cyan-50/20 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-teal-100/30 backdrop-blur-sm">
            <div className="p-6 h-full min-h-[240px]">
              <div className="inline-flex p-2 rounded-xl bg-teal-100/50 mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Specijalna ponuda</h2>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">172,50 KM</span>
                  <span className="text-lg text-gray-500 line-through">345,00 KM</span>
                </div>
                <div className="inline-block mt-2 px-3 py-1 bg-[#563435]/10 text-[#563435] text-sm font-semibold rounded-full">
                  Ušteda 50%
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Ograničena količina po akcijskoj cijeni!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
