"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

const carouselImages = [
  "/slike/PRO/slika2.png",
  "/slike/ELITE/slika1.png",
  "/slike/LITE/1.png",
  "/slike/PRO/koristenje1.png",
  "/slike/ELITE/koristenje1.png",
  "/slike/LITE/3.png",
];

export default function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-violet-50/40 via-white/50 to-purple-50/30 backdrop-blur-xl border border-white/30 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
            
            {/* Text Content */}
            <div className="flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-bold w-fit mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Postoji bolji način</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Kako je kad se više nikad ne briješ?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ustaneš ujutro, obučeš šta hoćeš, i izlaziš. Bez žurbe, bez brijanja, bez provjere. Koža ti je glatka danima, sedmicama. To je život sa Ice Cool PRO™.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-white/20 shadow-sm transition-all hover:bg-white/50">
                  <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800">Rezultati već nakon 3-4 tretmana</h4>
                    <p className="text-gray-600 text-sm mt-1">Dlačice rastu sporije, tanje su i rjeđe. Mnoge žene primijete razliku već nakon prvih par sedmica.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-white/20 shadow-sm transition-all hover:bg-white/50">
                  <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800">Bezbolno — obećavamo</h4>
                    <p className="text-gray-600 text-sm mt-1">Ugrađeno Ice Cool™ hlađenje štiti kožu tokom tretmana. Većina korisnica kaže da osjećaju samo blago toplinu.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Carousel Image */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-white/40 shadow-inner group">
              {carouselImages.map((img, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`IPL uređaj Ice Cool PRO™ — rezultati i primjena ${index + 1}`} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
              
              {/* Optional: Small indicators overlayed at the bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {carouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-6 bg-[#563435]" : "w-2 bg-[#563435]/40"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
