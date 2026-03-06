"use client";

import { useState } from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Da li je tretman bolan?",
    answer: "Većina korisnica tretman opisuje kao blago zagrijavanje ili lagano peckanje. Zahvaljujući ugrađenom sistemu hlađenja, tretman je znatno ugodniji u poređenju s voskom ili epilatorom."
  },
  {
    id: 2,
    question: "Kada mogu očekivati rezultate?",
    answer: "Prve promjene se često primijete nakon 3 do 4 tretmana, dok se puniji rezultati obično vide nakon 8 do 12 sedmica redovne upotrebe."
  },
  {
    id: 3,
    question: "Koliko dugo traju rezultati?",
    answer: "Uz pravilnu i redovnu upotrebu, rezultati mogu trajati mjesecima, a kasnije su potrebni samo povremeni tretmani održavanja."
  },
  {
    id: 4,
    question: "Na kojim dijelovima tijela mogu koristiti uređaj?",
    answer: "Pogodan je za noge, ruke, pazuhe, bikini zonu i lice ispod jagodične kosti, uz poštivanje uputstva proizvođača."
  },
  {
    id: 5,
    question: "Koliko često trebam koristiti uređaj?",
    answer: "Na početku se preporučuje nekoliko tretmana sedmično prema uputstvu, a kasnije povremeni tretmani održavanja."
  },
  {
    id: 6,
    question: "Da li je IPL siguran za kućnu upotrebu?",
    answer: "Da, IPL uređaji dizajnirani za kućnu upotrebu su potpuno sigurni kada se koriste prema uputstvima. Imaju ugrađene sigurnosne mehanizme i niže nivoe intenziteta od profesionalnih uređaja."
  },
  {
    id: 7,
    question: "Mogu li koristiti IPL na tamnijoj koži?",
    answer: "IPL najbolje funkcioniše na svjetlijoj koži sa tamnijim dlakama. Za tamnije tonove kože preporučujemo konsultaciju ili testiranje na maloj površini prije potpune upotrebe."
  },
  {
    id: 8,
    question: "Šta je razlika između IPL i laserskog tretmana?",
    answer: "IPL koristi široki spektar svjetlosti dok laser koristi jednu specifičnu talasnu dužinu. Oba su efikasna, ali IPL je pristupačniji za kućnu upotrebu i pokriva veću površinu odjednom."
  },
  {
    id: 9,
    question: "Kako se vrši dostava?",
    answer: "Dostava je besplatna na cijelu BiH i vrši se kurirskom službom. Paket stiže za 2-5 radnih dana. Plaćanje je moguće pouzećem prilikom preuzimanja."
  },
  {
    id: 10,
    question: "Šta ako nisam zadovoljan proizvodom?",
    answer: "Nudimo 14 dana garancije povrata novca. Ako niste zadovoljni, možete vratiti proizvod u originalnom pakovanju i dobiti pun povrat novca."
  },
  {
    id: 11,
    question: "Da li dolazi sa garancijom?",
    answer: "Da, svi naši uređaji dolaze sa 12 mjeseci garancije proizvođača koja pokriva sve proizvodne defekte."
  },
  {
    id: 12,
    question: "Koliko impulsa ima uređaj?",
    answer: "Ice Cool PRO™ ima 300,000 impulsa, što je dovoljno za godinama upotrebe na cijelom tijelu."
  }
];

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Često postavljana pitanja
            </h1>
            <p className="text-lg text-gray-600">
              Pronađite odgovore na najčešća pitanja o našim IPL uređajima
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-[#563435] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-[#563435]/5 via-white/40 to-[#563435]/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Niste pronašli odgovor?
            </h2>
            <p className="text-gray-600 mb-6">
              Kontaktirajte nas i rado ćemo odgovoriti na sva vaša pitanja
            </p>
            <a
              href="/kontakt"
              className="inline-block px-8 py-3 bg-[#563435] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Kontaktirajte nas
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
