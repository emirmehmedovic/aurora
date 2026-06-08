"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackCtaClick } from "@/lib/analytics";
import LandingOrderForm from "@/components/LandingOrderForm";

interface Review {
  text: string;
  author: string;
  location: string;
  duration: string;
  zone: string;
}

interface Objection {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  image: string;
  usageImages: string[];
  shortDescription: string;
  flashes: string;
  levels: string;
  cooling: string;
  weight: string;
}

interface JednaOdlukaLandingProps {
  product: Product;
  reviews: Review[];
  objections: Objection[];
}

export default function JednaOdlukaLanding({
  product,
  reviews,
  objections,
}: JednaOdlukaLandingProps) {
  const [showForm, setShowForm] = useState(false);
  const [openObjIndex, setOpenObjIndex] = useState<number | null>(null);

  const scrollToOrder = () => {
    const orderSection = document.getElementById("naruci");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = (location: string) => {
    trackCtaClick("Naruci", location, `jedna-odluka-${product.id}`);
    scrollToOrder();
  };

  return (
    <div className="font-dm-sans bg-[#fdfcfa] text-[#0f0f0f]">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --font-playfair: 'Playfair Display', serif;
          --font-dm-sans: 'DM Sans', sans-serif;
        }
        @keyframes revealLine {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[rgba(253,252,250,0.93)] backdrop-blur-[14px] border-b border-[#e5e0d8] flex justify-between items-center px-6 py-3.5">
        <span className="font-playfair text-[17px] font-normal tracking-[0.02em]">
          Ice Cool PRO™
        </span>
        <button
          onClick={() => handleCtaClick("nav")}
          className="bg-[#0f0f0f] text-[#fdfcfa] border-none px-5 py-2 rounded-full text-[13px] font-medium transition-opacity hover:opacity-75"
        >
          Naruči — 175 KM
        </button>
      </nav>

      {/* HERO - Split Screen */}
      <section className="grid md:grid-cols-2 md:min-h-[92vh] bg-[#f7f4ef]">
        {/* Hero Image */}
        <div className="relative overflow-hidden h-[50vh] md:h-auto md:min-h-[280px]">
          <Image
            src="/novi-landing/product.png"
            alt="Ice Cool PRO™"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f7f4ef] via-[#f7f4ef]/60 to-transparent md:from-transparent md:via-transparent md:to-[#f7f4ef]" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center px-4 md:px-12 py-8 md:py-16 space-y-4 md:space-y-5">
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#c9a96e] font-normal">
            <div className="w-6 h-px bg-[#c9a96e]" />
            Kućni IPL epilator
          </div>

          <h1 className="font-playfair text-[32px] md:text-[52px] font-light leading-tight tracking-tight">
            <span
              className="block opacity-0"
              style={{ animation: 'revealLine 0.7s ease forwards 0.1s' }}
            >
              Nije u genima.
            </span>
            <span
              className="block opacity-0"
              style={{ animation: 'revealLine 0.7s ease forwards 0.3s' }}
            >
              Nije u salonu.
            </span>
            <span
              className="block opacity-0"
              style={{ animation: 'revealLine 0.7s ease forwards 0.5s' }}
            >
              <em className="italic text-[#C19A91]">Jedna odluka.</em>
            </span>
            <span
              className="block opacity-0"
              style={{ animation: 'revealLine 0.7s ease forwards 0.7s' }}
            >
              To je sve.
            </span>
          </h1>

          <div
            className="opacity-0 space-y-4 md:space-y-5"
            style={{ animation: 'revealLine 0.7s ease forwards 0.9s' }}
          >
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light max-w-[340px]">
              Profesionalni IPL tretman kod kuće. Bez salona, bez termina, bez ponavljanja svake sedmice.
            </p>

            <div>
              <div className="flex flex-wrap items-baseline gap-2 md:gap-2.5 mb-1">
                <span className="font-playfair text-[38px] md:text-[44px] font-normal leading-none">
                  {product.price} KM
                </span>
                <span className="text-base md:text-[18px] text-gray-400 line-through font-light">
                  {product.compareAtPrice} KM
                </span>
                <span className="text-[11px] md:text-xs tracking-wide bg-[#eaf4ee] text-[#2d6a4f] px-2 md:px-2.5 py-1 rounded-full">
                  −{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </span>
              </div>
              <p className="text-xs md:text-[13px] text-gray-500 font-light">Besplatna dostava · Plaćanje pouzećem</p>
            </div>

            <button
              onClick={() => handleCtaClick("hero")}
              className="w-full py-3.5 md:py-4 bg-[#C19A91] text-white rounded-xl text-sm md:text-[15px] font-normal tracking-wider uppercase hover:opacity-85 transition-all hover:-translate-y-0.5"
            >
              Naruči odmah
            </button>

            <div className="flex flex-wrap gap-2">
              {["Plaćanje pouzećem", "14 dana povrat", "12 mj. garancija"].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-gray-600 font-light bg-white border border-[#e8e4de] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full"
                >
                  <span className="text-[#2d6a4f] text-[10px] md:text-[11px]">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="py-16 px-6 md:py-16 border-b border-[#e5e0d8] bg-[#f6f3ed]">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Otkriće
          </p>
          <div className="text-[clamp(17px,3.5vw,21px)] leading-[1.75] text-[#333] font-light">
            <p className="mb-4">Možda si i ti gledala skuplje opcije.</p>
            <p className="mb-4">Možda si i ti odlagala.</p>
            <p className="mb-4">
              One koje nisu —<br />
              danas nam pišu da{" "}
              <strong className="font-medium text-[#0f0f0f]">
                ne pamte kada su zadnji put uzele brijač.
              </strong>
            </p>
            <p className="mb-4">
              Nisu otišle na laser. Nisu uzele{" "}
              <em className="not-italic border-b border-[#e8c4cc]">
                Philips Lumeu za 1.500 KM
              </em>
              . Nisu promijenile rutinu.
            </p>
            <p>
              Napravile su jednu odluku.<br />
              175 KM. Pouzećem. I to je bilo to.
            </p>
          </div>

          <div className="mt-8 p-6 bg-[#fdfcfa] rounded-[22px] border border-[#e5e0d8]">
            <div className="font-playfair text-[40px] font-normal leading-none mb-1">
              175 KM
            </div>
            <div className="text-[14px] text-[#888] font-light">
              Ice Cool PRO™ · Besplatna dostava · Plaćanje pouzećem
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 px-6 md:py-16 border-b border-[#e5e0d8]">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Proizvod
          </p>

          <div className="flex flex-col gap-5">
            <h1 className="font-playfair text-[clamp(28px,6vw,42px)] font-normal leading-[1.1]">
              Ice Cool PRO™
            </h1>

            <p className="text-base text-[#555] font-light leading-[1.7] max-w-[400px]">
              Kućni uređaj za trajno smanjenje dlačica sa svjetlosnim impulsima
              i ugrađenim hlađenjem kože.
            </p>

            <p className="text-sm text-[#777] font-light italic">
              Jednom sedmično. Deset minuta. Kod kuće, kad tebi paše.
            </p>

            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="font-playfair text-[44px] font-normal leading-none">
                  175 KM
                </span>
                <span className="text-lg text-[#888] line-through">345 KM</span>
                <span className="text-xs bg-[#eaf4ee] text-[#2d6a4f] px-2.5 py-1 rounded-full font-medium">
                  −49%
                </span>
              </div>
              <p className="text-[13px] text-[#777] font-light mt-1">
                Besplatna dostava · Plaćanje pouzećem
              </p>
            </div>

            <button
              onClick={() => handleCtaClick("product-section")}
              className="block w-full bg-[#0f0f0f] text-[#fdfcfa] border-none px-6 py-4 rounded-[14px] text-[15px] font-medium tracking-[0.04em] uppercase transition-all hover:opacity-80 hover:-translate-y-px"
            >
              Naruči odmah
            </button>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#666] font-light bg-[#f6f3ed] border border-[#e5e0d8] px-3 py-1 rounded-full before:content-['✓'] before:text-[#2d6a4f] before:text-[11px]">
                Plaćanje pouzećem
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#666] font-light bg-[#f6f3ed] border border-[#e5e0d8] px-3 py-1 rounded-full before:content-['✓'] before:text-[#2d6a4f] before:text-[11px]">
                14 dana povrat
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#666] font-light bg-[#f6f3ed] border border-[#e5e0d8] px-3 py-1 rounded-full before:content-['✓'] before:text-[#2d6a4f] before:text-[11px]">
                12 mj. garancija
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 px-6 md:py-16 border-b border-[#e5e0d8]">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Zašto radi
          </p>

          <h2 className="font-playfair text-[clamp(24px,5vw,36px)] font-normal leading-[1.2] mb-6">
            Tri razloga zašto cure
            <br />
            ne odustaju od ovog uređaja.
          </h2>

          <div className="flex flex-col gap-0.5">
            <div className="py-6 border-b border-[#e5e0d8]">
              <h3 className="font-playfair text-[22px] font-normal mb-3 leading-[1.2]">
                <em className="italic text-[#c0546a]">Hlađenje.</em>
              </h3>
              <p className="text-[15px] text-[#555] font-light leading-[1.75]">
                Većina uređaja peče k&apos;o ludo. Ovaj hladi.
                <br />
                Kad te tretman ne muči — radiš ga redovno.
                <br />
                Kad ga radiš redovno —{" "}
                <strong className="font-medium text-[#0f0f0f]">
                  razlika se vidi.
                </strong>
              </p>
            </div>

            <div className="py-6 border-b border-[#e5e0d8]">
              <h3 className="font-playfair text-[22px] font-normal mb-3 leading-[1.2]">
                <em className="italic text-[#c0546a]">Cijena.</em>
              </h3>
              <p className="text-[15px] text-[#555] font-light leading-[1.75]">
                <strong className="font-medium text-[#0f0f0f]">
                  175 KM jednom.
                </strong>
                <br />
                Ne 80 KM svaki mjesec u salonu.
                <br />
                Ne 1.500 KM za ime na kutiji.
                <br />
                Jednom — i gotovo.
              </p>
            </div>

            <div className="py-6">
              <h3 className="font-playfair text-[22px] font-normal mb-3 leading-[1.2]">
                <em className="italic text-[#c0546a]">Nema rizika.</em>
              </h3>
              <p className="text-[15px] text-[#555] font-light leading-[1.75]">
                Platiš kuriru kad stigne na vrata.
                <br />
                Ako nisi zadovoljna —{" "}
                <strong className="font-medium text-[#0f0f0f]">
                  vraćaš za 14 dana, bez ikakvog objašnjavanja.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-6 md:py-16 border-b border-[#e5e0d8] bg-[#f6f3ed]">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Iskustva
          </p>

          <h2 className="font-playfair text-[clamp(24px,5vw,36px)] font-normal leading-[1.2] mb-6">
            Šta pišu cure koje su
            <br />
            napravile tu odluku.
          </h2>

          <p className="text-[15px] text-[#666] font-light italic mb-7">
            Bez uređivanja. Bez filtera. Direktno iz inboxa.
          </p>

          <div className="flex flex-col gap-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#fdfcfa] border border-[#e5e0d8] border-l-[3px] border-l-[#e8c4cc] rounded-r-[14px] px-5 py-5 transition-all hover:border-l-[#c0546a]"
              >
                <div className="text-[#b8924a] text-[13px] tracking-wider mb-2.5">
                  ★★★★★
                </div>
                <p className="font-playfair text-[17px] italic font-normal leading-[1.6] text-[#333] mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <div className="text-[13px] font-medium text-[#0f0f0f]">
                      {review.author}
                    </div>
                    <div className="text-xs text-[#888] font-light">
                      {review.location} · {review.duration}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#888] bg-[#f6f3ed] px-2.5 py-1 rounded-full border border-[#e5e0d8]">
                    {review.zone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objections/FAQ Section */}
      <section className="py-16 px-6 md:py-16 border-b border-[#e5e0d8]">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Pitanja
          </p>

          <h2 className="font-playfair text-[clamp(24px,5vw,36px)] font-normal leading-[1.2] mb-6">
            Tri pitanja koja cure postavljaju
            <br />
            prije nego naruče.
          </h2>

          <div className="flex flex-col gap-2.5">
            {objections.map((obj, index) => (
              <div
                key={index}
                className="border border-[#e5e0d8] rounded-[14px] overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenObjIndex(openObjIndex === index ? null : index)
                  }
                  className="w-full px-5 py-4 text-[15px] font-medium flex justify-between items-center bg-[#fdfcfa] transition-colors hover:bg-[#f6f3ed] text-left"
                >
                  {obj.question}
                  <span
                    className={`text-[20px] text-[#888] font-light transition-transform ${
                      openObjIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`bg-[#f6f3ed] transition-all ${
                    openObjIndex === index
                      ? "max-h-[200px] px-5 py-4"
                      : "max-h-0 px-5 py-0"
                  } overflow-hidden`}
                >
                  <p
                    className="text-sm text-[#555] font-light leading-[1.7]"
                    dangerouslySetInnerHTML={{
                      __html: obj.answer.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-medium text-[#0f0f0f]">$1</strong>'
                      ),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section
        id="naruci"
        className="py-16 px-6 md:py-16 border-b border-[#e5e0d8] bg-[#f6f3ed]"
      >
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8924a] mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-[#b8924a]" />
            Narudžba
          </p>

          <h2 className="font-playfair text-[clamp(24px,5vw,36px)] font-normal mb-1.5">
            Ta jedna odluka.
          </h2>

          <div className="mb-6">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="font-playfair text-[44px] font-normal leading-none">
                175 KM
              </span>
              <span className="text-lg text-[#888] line-through">345 KM</span>
              <span className="text-xs bg-[#eaf4ee] text-[#2d6a4f] px-2.5 py-1 rounded-full font-medium">
                −49%
              </span>
            </div>
            <p className="text-[13px] text-[#777] font-light mt-1">
              Besplatna dostava · Pouzećem · 14 dana povrat · 12 mj. garancija
            </p>
          </div>

          <LandingOrderForm product={product} />

          <p className="text-xs text-[#999] text-center font-light mt-2.5 mb-5">
            Nema online plaćanja. Platiš kuriru kad ti stigne na vrata — i
            gotovo.
          </p>

          <div className="flex items-center gap-3 text-[13px] text-[#aaa] my-5 font-light">
            <div className="flex-1 h-px bg-[#e5e0d8]" />
            ili naruči direktno
            <div className="flex-1 h-px bg-[#e5e0d8]" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://wa.me/38761904759?text=Zdravo%2C%20%C5%BEelim%20naru%C4%8Diti%20Ice%20Cool%20PRO%E2%84%A2."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-4 py-3.5 border border-[#e5e0d8] rounded-[8px] text-sm text-[#0f0f0f] bg-[#fdfcfa] transition-all hover:bg-[#fdfcfa] hover:border-[#bbb]"
            >
              WhatsApp
            </a>
            <a
              href="viber://chat?number=%2B38761904759"
              className="block text-center px-4 py-3.5 border border-[#e5e0d8] rounded-[8px] text-sm text-[#0f0f0f] bg-[#fdfcfa] transition-all hover:bg-[#fdfcfa] hover:border-[#bbb]"
            >
              Viber
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-6 text-center">
            <div className="text-xs text-[#777] leading-[1.5] font-light">
              <span className="text-[22px] block mb-1">🚚</span>
              Besplatna dostava u BiH
            </div>
            <div className="text-xs text-[#777] leading-[1.5] font-light">
              <span className="text-[22px] block mb-1">🔄</span>
              14 dana povrat bez pitanja
            </div>
            <div className="text-xs text-[#777] leading-[1.5] font-light">
              <span className="text-[22px] block mb-1">🏅</span>
              12 mj. garancija
            </div>
          </div>
        </div>
      </section>

      {/* Closer Section */}
      <section className="py-20 px-6 md:px-24 bg-[#0f0f0f] text-center">
        <p className="font-playfair text-[clamp(22px,5vw,36px)] font-normal leading-[1.4] text-[#fdfcfa] mb-2">
          Nije u genima.
          <br />
          Nije u salonu.
          <br />
          <em className="italic text-[#e8c4cc]">175 KM. To je sve.</em>
        </p>
        <p className="text-sm text-[#555] font-light mb-8">
          Besplatna dostava · Plaćanje pouzećem · 14 dana povrat
        </p>
        <button
          onClick={() => handleCtaClick("closer")}
          className="inline-block bg-[#fdfcfa] text-[#0f0f0f] border-none px-10 py-4 rounded-[14px] text-[15px] font-medium tracking-[0.04em] uppercase transition-opacity hover:opacity-85"
        >
          Naruči odmah
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-7 border-t border-[#e5e0d8] flex justify-between items-center flex-wrap gap-3 text-xs text-[#888] font-light">
        <span className="font-playfair text-base text-[#0f0f0f]">
          Ice Cool PRO™
        </span>
        <span>
          © 2026 Aurora Shop ·{" "}
          <a href="#" className="text-[#888] underline">
            Politika privatnosti
          </a>{" "}
          ·{" "}
          <a href="#" className="text-[#888] underline">
            Politika povrata
          </a>
        </span>
        <span>
          <a href="tel:+38761904759" className="text-[#888] underline">
            +387 61 904 759
          </a>
        </span>
      </footer>
    </div>
  );
}
