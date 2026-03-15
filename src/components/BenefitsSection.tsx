"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Koliko te zapravo košta brijanje?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Većina žena potroši preko 1.000 KM na žilete i vosak u samo 5 godina. Ice Cool PRO™ se isplati već nakon 2 mjeseca.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Traditional Shaving */}
          <div className="bg-red-50/30 backdrop-blur-md rounded-3xl p-8 border border-red-100/50 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-900">Žileti + vosak</h3>
              <p className="text-red-600 mt-2">600-1.500+ KM kroz 5 godina</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Brijanje svaka 2 dana, zauvijek</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Crvenilo i iritacije nakon svakog brijanja</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Urasle dlačice koje ostavljaju ožiljke</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Bockanje već iste večeri</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Nikad ne završava — ponavljanje do kraja života</span>
              </li>
            </ul>
          </div>

          {/* IPL Solution */}
          <div className="bg-[#563435]/5 backdrop-blur-md rounded-3xl p-8 border border-[#563435]/10 relative shadow-lg">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#563435] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
              PAMETNIJE RJEŠENJE
            </div>

            <div className="text-center mb-8 pt-4">
              <h3 className="text-2xl font-bold text-[#563435]">Ice Cool PRO™</h3>
              <p className="text-[#563435]/80 mt-2">Jednokratno 175 KM — rezultati za cijeli život</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">10 min sedmično umjesto 15 min svaki dan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Glatka koža bez crvenila i tačkica</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Urasle dlačice nestaju već nakon par tretmana</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Rezultati vidljivi za 3-4 sedmice</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Platiš jednom, koristiš godinama</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
