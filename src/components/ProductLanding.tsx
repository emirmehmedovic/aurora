"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, CreditCard, ChevronDown, ChevronUp } from "lucide-react";

const productData: Record<string, any> = {
  "ice-cool-pro": {
    name: "Ice Cool PRO™",
    tagline: "Glatka koža koja traje sedmicama",
    price: 172.50,
    compareAtPrice: 345.00,
    images: ["/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"],
    hero: {
      title: "Ice Cool PRO™ — glatka koža koja traje sedmicama",
      subtitle: "Bezbolno IPL uklanjanje dlačica iz udobnosti doma. Salon efekat bez salona, bez voska i bez svakodnevnog brijanja."
    },
    benefits: [
      "Nježno i efikasno uklanjanje dlačica kod kuće",
      "Ugrađeno hlađenje za ugodniji tretman",
      "Dugotrajniji rezultati uz redovnu upotrebu",
      "Pogodno za noge, ruke, pazuhe, bikini zonu i lice"
    ],
    features: [
      { title: "IPL Tehnologija", description: "Napredna IPL tehnologija djeluje na korijen dlačice" },
      { title: "Sistem Hlađenja", description: "Ugrađeno hlađenje čini tretman mnogo ugodnijim" },
      { title: "5 Nivoa Intenziteta", description: "Prilagodite tretman vašem tipu kože" },
      { title: "300,000 Impulsa", description: "Dovoljan broj impulsa za godinama upotrebe" }
    ],
    howItWorks: [
      { step: 1, title: "Odaberi nivo intenziteta", description: "Prilagodite intenzitet vašem tipu kože" },
      { step: 2, title: "Prisloni uređaj", description: "Postavite uređaj na područje tretmana" },
      { step: 3, title: "Aktiviraj impuls", description: "Pritisnite dugme i nastavite tretman" },
      { step: 4, title: "Ponavljaj redovno", description: "Pratite preporučeni raspored tretmana" }
    ],
    faq: [
      {
        question: "Da li je tretman bolan?",
        answer: "Većina korisnica tretman opisuje kao blago zagrijavanje ili lagano peckanje. Zahvaljujući ugrađenom sistemu hlađenja, tretman je znatno ugodniji u poređenju s voskom ili epilatorom."
      },
      {
        question: "Kada mogu očekivati rezultate?",
        answer: "Prve promjene se često primijete nakon 3 do 4 tretmana, dok se puniji rezultati obično vide nakon 8 do 12 sedmica redovne upotrebe."
      },
      {
        question: "Koliko dugo traju rezultati?",
        answer: "Uz pravilnu i redovnu upotrebu, rezultati mogu trajati mjesecima, a kasnije su potrebni samo povremeni tretmani održavanja."
      },
      {
        question: "Na kojim dijelovima tijela mogu koristiti uređaj?",
        answer: "Pogodan je za noge, ruke, pazuhe, bikini zonu i lice ispod jagodične kosti, uz poštivanje uputstva proizvođača."
      },
      {
        question: "Koliko često trebam koristiti uređaj?",
        answer: "Na početku se preporučuje nekoliko tretmana sedmično prema uputstvu, a kasnije povremeni tretmani održavanja."
      }
    ],
    testimonials: [
      {
        name: "Derva",
        age: 24,
        content: "Nakon nekoliko tretmana primijetila sam sporiji rast i puno manje iritacija. Najviše mi znači što sve mogu uraditi kod kuće, bez salona i bez stresa.",
        rating: 5
      },
      {
        name: "Samanta",
        age: 31,
        content: "Imam osjetljivu kožu i upravo mi je sistem hlađenja bio presudan. Tretman je mnogo ugodniji nego što sam očekivala, a rezultati su sve bolji iz sedmice u sedmicu.",
        rating: 5
      },
      {
        name: "Amra",
        age: 23,
        content: "Ranije sam trošila mnogo novca na salonske tretmane. Ovaj uređaj mi daje osjećaj kontrole, jer tretman radim kad meni odgovara.",
        rating: 5
      }
    ]
  }
};

interface ProductLandingProps {
  slug: string;
}

export default function ProductLanding({ slug }: ProductLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const product = productData[slug] || productData["ice-cool-pro"];
  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 shadow-lg p-8">
              <div className="relative h-full w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              {discount > 0 && (
                <div className="absolute top-8 left-8 bg-[#563435] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  -{discount}% POPUST
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {product.hero.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.hero.subtitle}
              </p>

              {/* Price */}
              <div className="mb-6 p-6 bg-gradient-to-br from-[#563435]/5 via-white/40 to-[#563435]/10 backdrop-blur-lg border border-white/20 rounded-2xl">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{product.price.toFixed(2)} KM</span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-500 line-through">{product.compareAtPrice.toFixed(2)} KM</span>
                  )}
                </div>
                <div className="inline-block px-3 py-1 bg-[#563435]/10 text-[#563435] text-sm font-semibold rounded-full">
                  Ušteda {discount}% - Ograničena ponuda!
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-violet-100/50">
                  <Truck className="w-5 h-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">Besplatna dostava</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-violet-100/50">
                  <CreditCard className="w-5 h-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">Plaćanje pouzećem</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-violet-100/50">
                  <RotateCcw className="w-5 h-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">14 dana povrat</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-violet-100/50">
                  <Shield className="w-5 h-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">12 mj. garancija</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link 
                href="/naruci"
                className="block w-full py-4 px-8 bg-[#563435] text-white text-center font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Naruči odmah - Iskoristi 50% popusta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50/20 via-white/30 to-purple-50/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
            Zašto korisnice biraju {product.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-violet-100/50">
                <Check className="w-6 h-6 text-[#563435] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Uključi. Prisloni. Zablistaj.
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Prvi vidljivi rezultati često se primijete nakon nekoliko tretmana, a puni efekat dolazi uz kontinuitet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.howItWorks.map((step: any) => (
              <div key={step.step} className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-[#563435] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50/20 via-white/30 to-pink-50/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
            Tehnički detalji
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature: any, index: number) => (
              <div key={index} className="bg-white/50 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
            Šta kažu naše korisnice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.age} godina</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50/20 via-white/30 to-purple-50/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
            Često postavljana pitanja
          </h2>
          <div className="space-y-4">
            {product.faq.map((item: any, index: number) => (
              <div key={index} className="bg-white/50 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-rose-50/30 via-white/40 to-pink-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Spremni za glatku kožu?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Iskoristite specijalnu ponudu i uštedite {discount}% već danas!
          </p>
          <Link 
            href="/naruci"
            className="inline-block py-4 px-12 bg-[#563435] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Naruči odmah - {product.price.toFixed(2)} KM
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Besplatna dostava • Plaćanje pouzećem • 14 dana povrat novca
          </p>
        </div>
      </section>
    </main>
  );
}
