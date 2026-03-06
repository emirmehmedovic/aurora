"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Zašto žene biraju Ice Cool PRO™?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Traditional Shaving */}
          <div className="bg-red-50/30 backdrop-blur-md rounded-3xl p-8 border border-red-100/50 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-900">Obično brijanje</h3>
              <p className="text-red-600 mt-2">Stara metoda koja donosi probleme</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Brijanje svaka 2-3 dana</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Česte iritacije i crvenilo</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Urasle dlačice i mrlje</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Bockanje već sljedećeg dana</span>
              </li>
              <li className="flex items-center gap-3 text-red-800">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Dugoročno trošenje na žilete</span>
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
              <h3 className="text-2xl font-bold text-[#563435]">Ice Cool PRO™ IPL</h3>
              <p className="text-[#563435]/80 mt-2">Revolucija u uklanjanju dlačica</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Tretman jednom sedmično</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Glatka koža bez iritacija</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Rješenje za urasle dlačice</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Dugotrajni rezultati</span>
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0" />
                <span className="font-medium">Jednokratna investicija</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
