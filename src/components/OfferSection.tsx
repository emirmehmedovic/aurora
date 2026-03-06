"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ShieldCheck, Truck, Clock } from "lucide-react";

export default function OfferSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image Side */}
          <div className="relative bg-white/20 min-h-[400px] lg:min-h-full">
            <Image
              src="/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"
              alt="Ice Cool PRO Device"
              fill
              className="object-cover p-8"
            />
            <div className="absolute top-6 left-6 bg-[#563435] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              -50% POPUSTA
            </div>
          </div>

          {/* Offer Details Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Ice Cool PRO™
            </h2>
            <p className="text-gray-500 text-lg mb-6">IPL uređaj za trajno uklanjanje dlačica</p>

            {/* Price Block */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-bold text-[#563435]">172 KM</span>
              <span className="text-2xl text-gray-400 line-through mb-2">345 KM</span>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">999,999 bljeskova (traje godinama)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Ice Cool™ tehnologija hlađenja</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">5 nivoa intenziteta</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Auto & Manual mod rada</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              href="/naruci" 
              className="block w-full text-center bg-[#563435] hover:bg-[#6d4446] text-white text-xl font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-8"
            >
              Naruči odmah za 172 KM
            </Link>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="text-center">
                <Truck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500 font-medium block">Besplatna dostava</span>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500 font-medium block">2 god garancije</span>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500 font-medium block">Brza isporuka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
