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
                alt="Problemi svakodnevnog brijanja — iritacije, urasle dlačice, crvenilo"
                fill
                className="object-cover"
              />
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-white text-lg font-medium">
                  "Izbjegavam kratke suknje jer znam da ću do večeri imati bockanje..."
                </p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="hidden md:block absolute -right-6 top-10 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-red-100/50 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-gray-800 font-medium">Tamne tačkice na nogama</span>
              </div>
            </div>
            
            <div className="hidden md:block absolute -left-6 bottom-20 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-red-100/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-gray-800 font-medium">Svaki dan isti ritual</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">
              Zvuči li ti poznato?
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Umorna si od <br />
              <span className="text-[#563435]">vječitog brijanja?</span>
            </h2>
            
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Urasle dlačice i tamne tačkice</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Isprobaš novu šuknju, pogledaš noge i vidiš tamne tačkice i urasle dlačice. Brišeš i brišeš, a koža nikad ne izgleda čisto.
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
                  <h3 className="text-xl font-bold text-gray-900">Obriješ se ujutro, bode navečer</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Provedeš 15 minuta pod tušem brijeći se, a već uveče osjetiš bockanje. Na izlasku izbjegavaš da te neko dotakne po nozi. Taj osjećaj ti je predobro poznat.
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
                  <h3 className="text-xl font-bold text-gray-900">Računi koji se gomilaju</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Žileti svaki mjesec: 10-15 KM. Vosak u salonu: 50-80 KM. Laser: 1.500+ KM za puni ciklus. Godinama daješ novac za privremena rješenja koja te ostavljaju na početku.
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
