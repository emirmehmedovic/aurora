"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Boli li? Iskreno mi reci.",
      answer: "Iskreno — ne. Većina korisnica kaže da osjete blago toplinu, kao kad sunce grije kožu. Ice Cool™ hlađenje radi dok uređaj radi, pa nema crvenila ni peckanja. Ako si ikad radila vosak, ovo je nebo i zemlja."
    },
    {
      question: "Koliko često moram koristiti uređaj?",
      answer: "Na početku: jednom sedmično, 10-15 minuta. To je manje vremena nego jedno brijanje. Nakon 8-12 sedmica, kad vidiš da dlačice skoro ne rastu, prelaziš na održavanje — jednom mjesečno ili rjeđe."
    },
    {
      question: "Kada ću vidjeti da zaista radi?",
      answer: "Već nakon 3-4 tretmana primijetiš da dlačice rastu sporije i tanje. Nakon 6-8 sedmica većina žena kaže da noge brije jednom sedmično ili rjeđe. Puni rezultat vidiš nakon 12 sedmica — i onda samo održavaš."
    },
    {
      question: "Mogu li ga koristiti na bikini zoni i licu?",
      answer: "Da! Koristi ga na nogama, rukama, pazusima, stomaku, bikini zoni i licu (ispod jagodica — nausnice, brada). Jedino ga ne koristi oko očiju. Većina žena ga najviše voli baš za bikini zonu jer su rezultati brzi."
    },
    {
      question: "Hoće li raditi na mom tipu kože?",
      answer: "IPL najbolje radi na tamnim dlačicama i svijetloj do srednje tamnoj koži — što pokriva većinu žena u BiH. Nije efikasan na sijedim, crvenim ili potpuno svijetlim dlačicama. Ako nisi sigurna, piši nam na WhatsApp — pomoći ćemo ti."
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
            Imaš pitanja? Imamo odgovore.
          </h2>
          <p className="text-xl text-gray-600">
            Ovo su pitanja koja nam žene najčešće postavljaju prije nego što se odluče.
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
