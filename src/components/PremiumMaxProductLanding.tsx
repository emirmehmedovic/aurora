"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import { trackCtaClick } from "@/lib/analytics";

interface Specification {
  label: string;
  value: string;
}

interface ResultsTimeline {
  period: string;
  description: string;
}

interface Review {
  text: string;
  author: string;
  location: string;
  zone: string;
}

interface ComparisonRow {
  criterion: string;
  iceCoolProMax: string | boolean;
  philipsLumea: string | boolean;
  salon: string | boolean | null;
}

interface PremiumMaxProductLandingProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
  };
  specifications: Specification[];
  resultsTimeline: ResultsTimeline[];
  reviews: Review[];
  comparisonData: ComparisonRow[];
}

export default function PremiumMaxProductLanding({
  product,
  specifications,
  resultsTimeline,
  reviews,
  comparisonData,
}: PremiumMaxProductLandingProps) {
  const [showForm, setShowForm] = useState(false);
  const savings = product.compareAtPrice - product.price;
  const discount = Math.round((savings / product.compareAtPrice) * 100);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `premium-max-${product.id}`);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("naruci")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const renderComparisonValue = (value: string | boolean | null) => {
    if (value === true) return <span className="text-[#2d6a4f] text-base">✓</span>;
    if (value === false) return <span className="text-gray-300 text-base">✗</span>;
    if (value === null) return <span className="text-gray-300 text-base">—</span>;
    return <span className="font-normal text-gray-700">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] font-[var(--font-inter)]">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --black: #0c0c0c;
          --white: #faf9f7;
          --cream: #f4f2ed;
          --copper: #B87333;
          --copper-pale: #f9f3ed;
          --copper-mid: #d4a574;
          --gold: #8B7355;
          --gold-pale: #f7f4ef;
          --gray: #888;
          --gray-light: #e5e2dc;
          --green: #2d6a4f;
          --green-pale: #eaf4ee;
          --dark: #1a1614;
        }
      `}} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#faf9f7]/94 backdrop-blur-xl border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <Link href="/">
            <span className="font-[var(--font-playfair)] text-[19px] tracking-wide">
              Ice Cool <span className="text-[#B87333]">PRO MAX™</span>
            </span>
          </Link>
          <button
            onClick={() => scrollToForm("nav")}
            className="px-5 py-2 bg-[#1a1614] text-white rounded-full text-[13px] font-normal tracking-wide hover:bg-[#B87333] transition-colors"
          >
            Naruči — {product.price} KM
          </button>
        </div>
      </nav>

      {/* HERO - Split Screen */}
      <section className="grid md:grid-cols-2 md:min-h-[92vh] bg-[#f4f2ed]">
        {/* Hero Image */}
        <div className="relative overflow-hidden h-[50vh] md:h-auto md:min-h-[280px]">
          <Image
            src="/slike/ELITE/cover.png"
            alt="Ice Cool PRO MAX™"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f4f2ed] via-[#f4f2ed]/60 to-transparent md:from-transparent md:via-transparent md:to-[#f4f2ed]" />

          {/* IGBT Badge */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#1a1614] text-white px-3 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-medium">
            IGBT Tehnologija
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center px-4 md:px-12 py-8 md:py-16 space-y-4 md:space-y-5">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] font-normal">
            <div className="w-6 h-px bg-[#B87333]" />
            Najbrži IPL na tržištu
          </div>

          <h1 className="font-[var(--font-playfair)] text-[32px] md:text-[52px] font-light leading-tight tracking-tight">
            Neograničeno.<br />
            <em className="italic text-[#B87333]">Zauvijek.</em>
          </h1>

          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light max-w-[360px]">
            IGBT tehnologija. Flash svakih 0.8 sekundi. MAX 19.8J energija. Neograničeni impulsi za cijelu porodicu — doživotno.
          </p>

          <div className="flex items-center gap-1.5">
            <div className="flex text-[#B87333] text-sm tracking-wider">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#B87333]" />
              ))}
            </div>
            <span className="text-xs md:text-[13px] text-gray-500 font-light ml-1">4.8 · 180+ korisnika u BiH</span>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-2 md:gap-2.5 mb-1">
              <span className="font-[var(--font-playfair)] text-[38px] md:text-[44px] font-normal leading-none">
                {product.price} KM
              </span>
              <span className="text-base md:text-[18px] text-gray-400 line-through font-light">
                {product.compareAtPrice} KM
              </span>
              <span className="text-[11px] md:text-xs tracking-wide bg-[#eaf4ee] text-[#2d6a4f] px-2 md:px-2.5 py-1 rounded-full">
                −{discount}%
              </span>
            </div>
            <p className="text-xs md:text-[13px] text-gray-500 font-light">Besplatna dostava · Plaćanje pouzećem</p>
          </div>

          <button
            onClick={() => scrollToForm("hero")}
            className="w-full py-3.5 md:py-4 bg-[#1a1614] text-white rounded-xl text-sm md:text-[15px] font-normal tracking-wider uppercase hover:bg-[#B87333] transition-colors hover:-translate-y-0.5"
          >
            Naruči odmah
          </button>

          <div className="flex flex-wrap gap-2">
            {["Neograničeni impulsi", "14 dana povrat", "12 mj. garancija"].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-gray-600 font-light bg-white border border-[#e5e2dc] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full"
              >
                <span className="text-[#2d6a4f] text-[10px] md:text-[11px]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BAR - IGBT highlights */}
      <section className="bg-[#1a1614] text-white">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { icon: "⚡", title: "0.8s flash", sub: "Najbrža IGBT tehnologija" },
            { icon: "∞", title: "Neograničeno", sub: "Impulsi za cijelu porodicu" },
            { icon: "🔋", title: "19.8J energija", sub: "Maksimalna snaga" },
            { icon: "🎯", title: "3-in-1 modovi", sub: "Tijelo · Lice · Bikini" },
          ].map((feature, i) => (
            <div
              key={i}
              className="px-5 py-6 text-center border-r border-[#333] last:border-r-0 odd:border-b md:odd:border-b-0 md:border-b-0 border-[#333]"
            >
              <div className="text-[22px] mb-2">{feature.icon}</div>
              <div className="text-[13px] text-[#B87333] font-medium tracking-wide mb-0.5">{feature.title}</div>
              <div className="text-xs text-gray-400 font-light">{feature.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IGBT SECTION */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-[#e5e2dc]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Zašto IGBT
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            IGBT nije marketinški trik.<br />
            <em className="italic text-[#B87333]">To je razlika.</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#f4f2ed] border border-[#e5e2dc] rounded-[20px] px-6 py-6">
              <div className="text-[32px] mb-3">⚡</div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">Flash svakih 0.8s</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Standardni IPL čeka 2-3 sekunde između bljeskalica. IGBT to skraćuje na 0.8 sekundi — tretman cijelog tijela za 10 minuta.
              </p>
            </div>

            <div className="bg-[#f4f2ed] border border-[#e5e2dc] rounded-[20px] px-6 py-6">
              <div className="text-[32px] mb-3">🔬</div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">600-1200nm talasna dužina</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Crvena svjetlost ispod 590nm ne uklanja dlačice efikasno. IGBT koristi optimalni spektar 600-1200nm za bolje rezultate.
              </p>
            </div>

            <div className="bg-[#f4f2ed] border border-[#e5e2dc] rounded-[20px] px-6 py-6">
              <div className="text-[32px] mb-3">💪</div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">MAX 19.8J energija</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Više energije = dublje prodiranje u folikul. Većina uređaja ima do 15J. Ice Cool PRO MAX ide do 19.8J za tvrdokorne dlačice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS SECTION */}
      <section className="grid md:grid-cols-2 border-b border-[#e5e2dc]">
        {/* Specifications */}
        <div className="px-6 md:px-12 py-12 md:py-16 border-r-0 md:border-r border-[#e5e2dc]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Specifikacije
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-5">
            Sve što<br />trebaš znati
          </h2>

          <div className="space-y-0">
            {specifications.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3.5 border-b border-[#e5e2dc] last:border-b-0 text-sm"
              >
                <span className="text-gray-600 font-light">{spec.label}</span>
                <span className="font-normal text-gray-800 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="px-6 md:px-12 py-12 md:py-16 bg-[#f4f2ed]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Rezultati
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-5">
            Brže vidljivo.<br />
            <em className="italic text-[#B87333]">Trajno.</em>
          </h2>

          <p className="text-sm text-gray-600 font-light leading-relaxed mb-5">
            IGBT tehnologija sa 19.8J energijom prodire dublje u folikul dlake. Rezultat: brži i trajniji učinak od standardnog IPL-a.
          </p>

          <div className="space-y-2.5">
            {resultsTimeline.map((result, i) => (
              <div
                key={i}
                className="bg-white border border-[#e5e2dc] rounded-xl px-4 py-3.5"
              >
                <div className="text-xs tracking-wider uppercase text-[#B87333] mb-1 font-normal">
                  {result.period}
                </div>
                <div className="text-sm text-gray-700 font-light">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-IN-1 MODES */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-[#e5e2dc] bg-[#faf9f7]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            3-in-1 Modovi
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            Jedan uređaj.<br />
            <em className="italic text-[#B87333]">Tri specijalizirana moda.</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#e5e2dc] rounded-[20px] px-6 py-6 hover:border-[#B87333] transition-colors">
              <div className="w-12 h-12 bg-[#f4f2ed] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🦵</span>
              </div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">Body Mode</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Za veće površine: noge, ruke, leđa, stomak. 5 nivoa energije do 19.8J za efikasan tretman većih zona.
              </p>
            </div>

            <div className="bg-white border border-[#e5e2dc] rounded-[20px] px-6 py-6 hover:border-[#B87333] transition-colors">
              <div className="w-12 h-12 bg-[#f4f2ed] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">Face Mode</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Prilagođen za osjetljivu kožu lica. Precizniji impulsi za gornju usnu, bradu i obraze bez iritacije.
              </p>
            </div>

            <div className="bg-white border border-[#e5e2dc] rounded-[20px] px-6 py-6 hover:border-[#B87333] transition-colors">
              <div className="w-12 h-12 bg-[#f4f2ed] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">💎</span>
              </div>
              <h3 className="font-[var(--font-playfair)] text-lg mb-2">Bikini Mode</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Posebno optimizovan za intimnu zonu. Nježniji impulsi sa kontroliranom energijom za maksimalnu udobnost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-[#e5e2dc]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Recenzije
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            Šta kažu korisnici
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#f4f2ed] border border-[#e5e2dc] rounded-[20px] px-6 py-6 hover:border-[#B87333] transition-colors"
              >
                <div className="flex text-[#B87333] text-[13px] tracking-wider mb-3">
                  {[...Array(5)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="font-[var(--font-playfair)] italic text-base text-gray-700 leading-relaxed mb-4">
                  &quot;{review.text}&quot;
                </p>
                <div className="text-xs tracking-wide text-gray-500 mb-1.5">
                  {review.author}, {review.location}
                </div>
                <span className="inline-block text-[11px] text-gray-500 bg-white px-2.5 py-1 rounded-full border border-[#e5e2dc]">
                  {review.zone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-[#f4f2ed] border-b border-[#e5e2dc]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Usporedba
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            Ice Cool PRO MAX vs.<br />
            <em className="italic text-[#B87333]">ostale opcije</em>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-5 py-3.5 text-left font-normal tracking-wide text-[13px] border-b border-[#e5e2dc]">
                    Kriterij
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] bg-[#1a1614] text-white rounded-t-md border-b border-[#1a1614]">
                    Ice Cool PRO MAX™
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] text-gray-500 border-b border-[#e5e2dc]">
                    Philips Lumea
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] text-gray-500 border-b border-[#e5e2dc]">
                    Salon
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3 text-gray-700 font-light border-b border-[#e5e2dc]">
                      {row.criterion}
                    </td>
                    <td className="px-5 py-3 text-center bg-[#f9f3ed] font-normal text-gray-900 border-b border-[#e5e2dc]">
                      {renderComparisonValue(row.iceCoolProMax)}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-500 border-b border-[#e5e2dc]">
                      {renderComparisonValue(row.philipsLumea)}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-500 border-b border-[#e5e2dc]">
                      {renderComparisonValue(row.salon)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* UNLIMITED FLASHES HIGHLIGHT */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-[#1a1614] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[48px] md:text-[72px] mb-4">∞</div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[42px] font-light leading-tight mb-5">
            Neograničeni impulsi.<br />
            <em className="italic text-[#B87333]">Za cijelu porodicu. Doživotno.</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-400 font-light leading-relaxed max-w-[600px] mx-auto mb-8">
            Većina IPL uređaja ima ograničen broj impulsa (300.000-500.000). Kad ih potrošiš — uređaj je beskoristan. Ice Cool PRO MAX ima neograničene impulse. Koristi ga cijela porodica, godinama, bez straha da će prestati raditi.
          </p>
          <button
            onClick={() => scrollToForm("unlimited")}
            className="px-8 py-4 bg-[#B87333] text-white rounded-xl text-[15px] font-normal tracking-wider uppercase hover:bg-[#a06229] transition-colors"
          >
            Naruči za {product.price} KM
          </button>
        </div>
      </section>

      {/* ORDER SECTION */}
      <section id="naruci" className="grid md:grid-cols-2 border-b border-[#e5e2dc]">
        {/* Order Form */}
        <div className="px-6 md:px-12 py-12 md:py-16 border-r-0 md:border-r border-[#e5e2dc]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#B87333] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#B87333]" />
            Narudžba
          </div>
          <h2 className="font-[var(--font-playfair)] text-[32px] font-light leading-tight mb-6">
            Naruči<br />
            <em className="italic text-[#B87333]">odmah</em>
          </h2>

          {showForm ? (
            <LandingOrderForm product={product} />
          ) : (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 bg-[#1a1614] text-white rounded-xl text-sm font-normal tracking-widest uppercase hover:bg-[#B87333] transition-colors hover:-translate-y-0.5 mb-2.5"
              >
                Naruči — plaćam pouzećem
              </button>
              <p className="text-xs text-gray-400 font-light text-center mb-5">
                Platiš kuriru kad ti stigne paket. Nema online plaćanja.
              </p>

              <div className="flex items-center gap-3 text-[13px] text-gray-400 font-light my-5">
                <span className="flex-1 h-px bg-[#e5e2dc]" />
                <span>ili naruči direktno</span>
                <span className="flex-1 h-px bg-[#e5e2dc]" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://wa.me/38761904759?text=Zdravo%2C%20%C5%BEelim%20naru%C4%8Diti%20Ice%20Cool%20PRO%20MAX%E2%84%A2."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3.5 border border-[#e5e2dc] rounded-lg text-[13px] text-gray-800 font-normal tracking-wide bg-white hover:bg-[#f4f2ed] hover:border-gray-400 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="viber://chat?number=%2B38761904759"
                  className="block text-center py-3.5 border border-[#e5e2dc] rounded-lg text-[13px] text-gray-800 font-normal tracking-wide bg-white hover:bg-[#f4f2ed] hover:border-gray-400 transition-colors"
                >
                  Viber
                </a>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="px-6 md:px-12 py-12 md:py-16 bg-[#f4f2ed]">
          <h3 className="font-[var(--font-playfair)] text-[28px] font-light leading-tight mb-6">
            Sažetak<br />narudžbe
          </h3>

          <div className="space-y-0">
            {[
              { label: "Proizvod", value: "Ice Cool PRO MAX™" },
              { label: "Tehnologija", value: "IGBT (najnovija)" },
              { label: "Impulsi", value: "Neograničeno", highlight: true },
              { label: "Dostava", value: "Besplatno", highlight: true },
              { label: "Plaćanje", value: "Pouzećem na vrata" },
              { label: "Rok dostave", value: "1–2 radna dana" },
              { label: "Povrat", value: "14 dana bez pitanja" },
              { label: "Garancija", value: "12 mjeseci" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-[#e0d8cc] text-sm font-light"
              >
                <span className="text-gray-600">{item.label}</span>
                <span className={item.highlight ? "text-[#2d6a4f] font-normal" : "font-normal text-gray-800"}>
                  {item.value}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-4">
              <span className="font-normal">Ukupno</span>
              <span className="font-[var(--font-playfair)] text-[28px] font-normal leading-none">
                {product.price} KM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500 font-light bg-[#faf9f7]">
        <span className="font-[var(--font-playfair)] text-base font-normal text-gray-900">
          Ice Cool <span className="text-[#B87333]">PRO MAX™</span>
        </span>
        <span>
          © 2026 Aurora Shop ·{" "}
          <a href="https://aurorashop.ba/politika-privatnosti" className="underline hover:text-gray-700">
            Politika privatnosti
          </a>{" "}
          ·{" "}
          <a href="https://aurorashop.ba/politika-povrata" className="underline hover:text-gray-700">
            Politika povrata
          </a>
        </span>
        <span>
          <a href="tel:+38761904759" className="underline hover:text-gray-700">
            +387 61 904 759
          </a>
        </span>
      </footer>
    </div>
  );
}
