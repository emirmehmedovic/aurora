"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Da li je tretman bolan?",
      answer: "Ne. Zahvaljujući ugrađenom Ice Cool™ sistemu hlađenja, većina korisnica osjeti samo blago zagrijavanje. Tretman je znatno ugodniji u poređenju s voskom, šećernom pastom ili klasičnim epilatorom."
    },
    {
      question: "Koliko često trebam koristiti uređaj?",
      answer: "Preporučujemo korištenje 1-2 puta sedmično tokom prvih 8 do 12 sedmica. Nakon što primijetite značajno smanjenje dlačica, prelazite na tretmane održavanja (jednom mjesečno ili rjeđe, po potrebi)."
    },
    {
      question: "Kada ću vidjeti prve rezultate?",
      answer: "Većina korisnica primijeti sporiji rast i rjeđe dlačice već nakon 3 do 4 tretmana. Za optimalne i dugotrajne rezultate potrebno je proći puni ciklus od 8-12 sedmica."
    },
    {
      question: "Na kojim dijelovima tijela mogu koristiti IPL?",
      answer: "Uređaj je siguran za upotrebu na cijelom tijelu: noge, ruke, pazuh, leđa, stomak, bikini zona, te na licu (isključivo ispod jagodične kosti - nausnice, brada). Ne koristiti oko očiju."
    },
    {
      question: "Da li IPL radi na svim bojama dlačica i kože?",
      answer: "IPL je najefikasniji na tamnim dlačicama i svijetloj do srednje tamnoj koži. Nije efikasan na jako svijetlim, sijedim ili crvenim dlačicama, kao ni na izrazito tamnoj koži."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Često postavljana pitanja
          </h2>
          <p className="text-xl text-gray-600">
            Sve što trebate znati o IPL tretmanima kod kuće.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${openFaq === index ? 'ring-2 ring-[#563435]/20' : ''}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-gray-800 text-lg pr-8">{item.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === index ? 'bg-[#563435] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed border-t border-gray-200/50 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
