"use client";

import Image from "next/image";
import { X, AlertCircle, Clock } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/slike/1772396140-pexels-nuta-sorokina-8514313.webp"
                alt="Problem brijanja"
                fill
                className="object-cover"
              />
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-white text-lg font-medium">
                  "Uvijek ista priča - obrijem se, a sutra već bodu..."
                </p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="hidden md:block absolute -right-6 top-10 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-red-100/50 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-gray-800 font-medium">Urasle dlačice</span>
              </div>
            </div>
            
            <div className="hidden md:block absolute -left-6 bottom-20 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-red-100/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-gray-800 font-medium">Brijanje svaki 2. dan</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">
              Prepoznaješ li se?
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Dosta ti je brijanja <br />
              <span className="text-[#563435]">svaki drugi dan?</span>
            </h2>
            
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Urasle dlačice i iritacije</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Svaki potez brijačem skida sloj kože. Rezultat? Crvenilo, peckanje i urasle dlačice koje ostavljaju tamne mrlje.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Začarani krug brijanja</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Obriješ noge ujutro, a navečer već osjetiš bockanje. Tvojoj koži nikad ne daš priliku da se stvarno oporavi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Skupi salonski tretmani</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Laserski tretmani u salonima koštaju bogatstvo i zahtijevaju stalne odlaske. Zašto ne bi imala iste rezultate kod kuće?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
