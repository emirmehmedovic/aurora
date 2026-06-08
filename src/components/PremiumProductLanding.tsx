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
  iceCoolPro: string | boolean;
  philipsLumea: string | boolean;
  salon: string | boolean | null;
}

interface PremiumProductLandingProps {
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

export default function PremiumProductLanding({
  product,
  specifications,
  resultsTimeline,
  reviews,
  comparisonData,
}: PremiumProductLandingProps) {
  const [showForm, setShowForm] = useState(false);
  const savings = product.compareAtPrice - product.price;
  const discount = Math.round((savings / product.compareAtPrice) * 100);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `premium-${product.id}`);
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
    <div className="min-h-screen bg-[#fdfcfa] font-[var(--font-inter)]">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --black: #0c0c0c;
          --white: #fdfcfa;
          --cream: #f7f4ef;
          --rose: #C19A91;
          --rose-pale: #f9eef1;
          --rose-mid: #e8c4cc;
          --gold: #c9a96e;
          --gold-pale: #faf6ee;
          --gray: #888;
          --gray-light: #e8e4de;
          --green: #2d6a4f;
          --green-pale: #eaf4ee;
        }
      `}} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#fdfcfa]/94 backdrop-blur-xl border-b border-[#e8e4de]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <Link href="/">
            <span className="font-[var(--font-playfair)] text-[19px] tracking-wide">
              Ice Cool <span className="text-[#c9a96e]">PRO™</span>
            </span>
          </Link>
          <button
            onClick={() => scrollToForm("nav")}
            className="px-5 py-2 bg-[#0c0c0c] text-white rounded-full text-[13px] font-normal tracking-wide hover:opacity-75 transition-opacity"
          >
            Naruči — {product.price} KM
          </button>
        </div>
      </nav>

      {/* HERO - Split Screen */}
      <section className="grid md:grid-cols-2 min-h-[92vh] bg-[#f7f4ef]">
        {/* Hero Image */}
        <div className="relative overflow-hidden h-[60vw] md:h-auto min-h-[280px]">
          <Image
            src="/novi-landing/product.png"
            alt="Ice Cool PRO™"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f7f4ef]/80 md:to-[#f7f4ef]" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-16 space-y-5">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] font-normal">
            <div className="w-6 h-px bg-[#c9a96e]" />
            Kućni IPL epilator
          </div>

          <h1 className="font-[var(--font-playfair)] text-[36px] md:text-[52px] font-light leading-tight tracking-tight">
            Glatka koža.<br />
            <em className="italic text-[#C19A91]">Trajno.</em>
          </h1>

          <p className="text-[15px] text-gray-600 leading-relaxed font-light max-w-[340px]">
            Profesionalni IPL tretman kod kuće. Bez salona, bez termina, bez ponavljanja svake sedmice.
          </p>

          <div className="flex items-center gap-1.5">
            <div className="flex text-[#c9a96e] text-sm tracking-wider">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c9a96e]" />
              ))}
            </div>
            <span className="text-[13px] text-gray-500 font-light ml-1">4.9 · 300+ korisnica u BiH</span>
          </div>

          <div>
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="font-[var(--font-playfair)] text-[44px] font-normal leading-none">
                {product.price} KM
              </span>
              <span className="text-[18px] text-gray-400 line-through font-light">
                {product.compareAtPrice} KM
              </span>
              <span className="text-xs tracking-wide bg-[#eaf4ee] text-[#2d6a4f] px-2.5 py-1 rounded-full">
                −{discount}%
              </span>
            </div>
            <p className="text-[13px] text-gray-500 font-light">Besplatna dostava · Plaćanje pouzećem</p>
          </div>

          <button
            onClick={() => scrollToForm("hero")}
            className="w-full py-4 bg-[#0c0c0c] text-white rounded-xl text-[15px] font-normal tracking-wider uppercase hover:opacity-80 transition-all hover:-translate-y-0.5"
          >
            Naruči odmah
          </button>

          <div className="flex flex-wrap gap-2">
            {["Plaćanje pouzećem", "14 dana povrat", "12 mj. garancija"].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 font-light bg-white border border-[#e8e4de] px-3 py-1.5 rounded-full"
              >
                <span className="text-[#2d6a4f] text-[11px]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-[#0c0c0c] border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { icon: "❄️", title: "Ice Cooling™", sub: "Hlađenje pri svakom impulsu" },
            { icon: "⚡", title: "999.900 impulsa", sub: "Doživotna upotreba" },
            { icon: "🎯", title: "5 intenziteta", sub: "Za svaki tip kože" },
            { icon: "⏱️", title: "10 min / tretman", sub: "Cijelo tijelo" },
          ].map((feature, i) => (
            <div
              key={i}
              className="px-5 py-6 text-center border-r border-gray-800 last:border-r-0 odd:border-b md:odd:border-b-0 md:border-b-0 border-gray-800"
            >
              <div className="text-[22px] mb-2">{feature.icon}</div>
              <div className="text-[13px] text-white font-normal tracking-wide mb-0.5">{feature.title}</div>
              <div className="text-xs text-gray-400 font-light">{feature.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECS SECTION */}
      <section className="grid md:grid-cols-2 border-b border-[#e8e4de]">
        {/* Specifications */}
        <div className="px-6 md:px-12 py-12 md:py-16 border-r-0 md:border-r border-[#e8e4de]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#c9a96e]" />
            Specifikacije
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-5">
            Sve što<br />trebaš znati
          </h2>

          <div className="space-y-0">
            {specifications.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3.5 border-b border-[#e8e4de] last:border-b-0 text-sm"
              >
                <span className="text-gray-600 font-light">{spec.label}</span>
                <span className="font-normal text-gray-800 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="px-6 md:px-12 py-12 md:py-16 bg-[#f7f4ef]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#c9a96e]" />
            Kako radi
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-5">
            Rezultati koji<br />
            <em className="italic text-[#C19A91]">se vide</em>
          </h2>

          <p className="text-sm text-gray-600 font-light leading-relaxed mb-5">
            IPL svjetlost prodire u folikul dlake i trajno usporava njen rast. Za razliku od brijanja — koje traje dan — ili salona — koji košta svaki mjesec — Ice Cool PRO daje trajne rezultate od kuće.
          </p>

          <div className="space-y-2.5">
            {resultsTimeline.map((result, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e4de] rounded-xl px-4 py-3.5"
              >
                <div className="text-xs tracking-wider uppercase text-[#c9a96e] mb-1 font-normal">
                  {result.period}
                </div>
                <div className="text-sm text-gray-700 font-light">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-[#e8e4de]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#c9a96e]" />
            Recenzije
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            Šta kažu korisnice
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#f7f4ef] border border-[#e8e4de] rounded-[20px] px-6 py-6 hover:border-[#e8c4cc] transition-colors"
              >
                <div className="flex text-[#c9a96e] text-[13px] tracking-wider mb-3">
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
                <span className="inline-block text-[11px] text-gray-500 bg-white px-2.5 py-1 rounded-full border border-[#e8e4de]">
                  {review.zone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-[#f7f4ef] border-b border-[#e8e4de]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#c9a96e]" />
            Usporedba
          </div>
          <h2 className="font-[var(--font-playfair)] text-[26px] md:text-[36px] font-light leading-tight mb-9">
            Ice Cool PRO vs.<br />
            <em className="italic text-[#C19A91]">ostale opcije</em>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-5 py-3.5 text-left font-normal tracking-wide text-[13px] border-b border-[#e8e4de]">
                    Kriterij
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] bg-[#0c0c0c] text-white rounded-t-md border-b border-gray-800">
                    Ice Cool PRO™
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] text-gray-500 border-b border-[#e8e4de]">
                    Philips Lumea
                  </th>
                  <th className="px-5 py-3.5 text-center font-normal tracking-wide text-[13px] text-gray-500 border-b border-[#e8e4de]">
                    Salon
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3 text-gray-700 font-light border-b border-[#e8e4de]">
                      {row.criterion}
                    </td>
                    <td className="px-5 py-3 text-center bg-[#0c0c0c]/5 font-normal text-gray-900 border-b border-[#e8e4de]">
                      {renderComparisonValue(row.iceCoolPro)}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-500 border-b border-[#e8e4de]">
                      {renderComparisonValue(row.philipsLumea)}
                    </td>
                    <td className="px-5 py-3 text-center text-gray-500 border-b border-[#e8e4de]">
                      {renderComparisonValue(row.salon)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ORDER SECTION */}
      <section id="naruci" className="grid md:grid-cols-2 border-b border-[#e8e4de]">
        {/* Order Form */}
        <div className="px-6 md:px-12 py-12 md:py-16 border-r-0 md:border-r border-[#e8e4de]">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] mb-3.5 font-normal">
            <div className="w-5 h-px bg-[#c9a96e]" />
            Narudžba
          </div>
          <h2 className="font-[var(--font-playfair)] text-[32px] font-light leading-tight mb-6">
            Naruči<br />
            <em className="italic text-[#C19A91]">odmah</em>
          </h2>

          {showForm ? (
            <LandingOrderForm product={product} />
          ) : (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 bg-[#0c0c0c] text-white rounded-xl text-sm font-normal tracking-widest uppercase hover:opacity-80 transition-all hover:-translate-y-0.5 mb-2.5"
              >
                Naruči — plaćam pouzećem
              </button>
              <p className="text-xs text-gray-400 font-light text-center mb-5">
                Platiš kuriru kad ti stigne paket. Nema online plaćanja.
              </p>

              <div className="flex items-center gap-3 text-[13px] text-gray-400 font-light my-5">
                <span className="flex-1 h-px bg-[#e8e4de]" />
                <span>ili naruči direktno</span>
                <span className="flex-1 h-px bg-[#e8e4de]" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://wa.me/38761904759?text=Zdravo%2C%20%C5%BEelim%20naru%C4%8Diti%20Ice%20Cool%20PRO%E2%84%A2."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3.5 border border-[#e8e4de] rounded-lg text-[13px] text-gray-800 font-normal tracking-wide bg-white hover:bg-[#f7f4ef] hover:border-gray-400 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="viber://chat?number=%2B38761904759"
                  className="block text-center py-3.5 border border-[#e8e4de] rounded-lg text-[13px] text-gray-800 font-normal tracking-wide bg-white hover:bg-[#f7f4ef] hover:border-gray-400 transition-colors"
                >
                  Viber
                </a>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="px-6 md:px-12 py-12 md:py-16 bg-[#faf6ee]">
          <h3 className="font-[var(--font-playfair)] text-[28px] font-light leading-tight mb-6">
            Sažetak<br />narudžbe
          </h3>

          <div className="space-y-0">
            {[
              { label: "Proizvod", value: "Ice Cool PRO™" },
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
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500 font-light">
        <span className="font-[var(--font-playfair)] text-base font-normal text-gray-900">
          Ice Cool <span className="text-[#c9a96e]">PRO™</span>
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
