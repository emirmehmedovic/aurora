"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingOrderForm from "@/components/LandingOrderForm";
import { trackCtaClick } from "@/lib/analytics";

interface WhatsAppMessage {
  name: string;
  location: string;
  time: string;
  message: string;
  zone: string;
}

interface Objection {
  question: string;
  answer: string;
}

interface RetargetingLandingProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
  };
  whatsappMessages: WhatsAppMessage[];
  customerPhotos: string[];
  objections: Objection[];
}

export default function RetargetingLanding({
  product,
  whatsappMessages,
  customerPhotos,
  objections,
}: RetargetingLandingProps) {
  const [showForm, setShowForm] = useState(false);
  const savings = product.compareAtPrice - product.price;

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `retargeting-${product.id}`);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("naruci")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] font-[var(--font-dm-sans)]">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --black: #0f0f0f;
          --white: #fafaf8;
          --cream: #f5f3ee;
          --rose: #c8556a;
          --rose-light: #fdf0f2;
          --rose-mid: #f2d0d6;
          --green-ok: #2d6a4f;
          --green-bg: #eaf4ee;
          --amber: #b5651d;
          --amber-bg: #fdf3e7;
          --gray-mid: #888;
          --gray-light: #e8e6e1;
        }
      `}} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#fafaf8]/92 backdrop-blur-xl border-b border-[#e8e6e1]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/">
            <span className="font-[var(--font-playfair)] text-[17px] tracking-wide">Ice Cool PRO™</span>
          </Link>
          <button
            onClick={() => scrollToForm("nav")}
            className="px-5 py-2 bg-[#0f0f0f] text-white rounded-full text-[13px] font-medium hover:opacity-80 transition-opacity"
          >
            Naruči — {product.price} KM
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#f5f3ee] px-6 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-[#f2d0d6] rounded-full opacity-35 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#f2d0d6] text-[#c8556a] text-xs font-medium px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8556a] animate-pulse" />
            Već si nas vidjela
          </div>

          <h1 className="font-[var(--font-playfair)] text-[28px] md:text-[38px] leading-tight mb-4">
            One koje su naručile prošle sedmice<br />
            već pišu <em className="italic text-[#c8556a]">&quot;vrh radi, žao mi je što nisam ranije.&quot;</em>
          </h1>

          <p className="text-[15px] text-gray-700 leading-relaxed mb-2 max-w-lg">
            Gledala si. Razmišljala si. I otišla.<br />
            Normalno — to rade sve žene koje ne kupuju impulsivno.
          </p>

          <p className="text-[15px] text-gray-700 leading-relaxed mb-4 max-w-lg">
            Ali ovdje su <strong>stvarne poruke žena koje su se odlučile</strong>. Bez filtera, bez uređivanja.
          </p>

          <p className="text-[13px] text-gray-500 italic mb-6">
            Scrollaj — ovo nije oglas. Ovo su screenshoti iz WhatsAppa.
          </p>

          <div className="flex items-center gap-1.5 mb-6">
            <div className="flex text-[#d4a017] text-base tracking-wider">★★★★★</div>
            <span className="text-[13px] text-gray-500 ml-1">4.9 · 300+ korisnica u BiH</span>
          </div>

          <button
            onClick={() => scrollToForm("hero")}
            className="w-full md:w-auto px-8 py-4 bg-[#0f0f0f] text-white rounded-xl text-base font-medium hover:opacity-85 transition-opacity mb-3"
          >
            Naruči odmah — {product.price} KM
          </button>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500 mt-3">
            <span className="flex items-center gap-1">
              <span className="text-[#2d6a4f]">✓</span> Plaćanje pouzećem
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#2d6a4f]">✓</span> Besplatna dostava
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#2d6a4f]">✓</span> 14 dana povrat
            </span>
          </div>
        </div>
      </section>

      {/* WHATSAPP WALL */}
      <section className="px-6 py-11 border-b border-[#e8e6e1]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8556a] mb-3">
            Direktno iz WhatsAppa
          </p>
          <h2 className="font-[var(--font-playfair)] text-[22px] md:text-[28px] leading-tight mb-2">
            Šta nam pišu žene koje su naručile
          </h2>
          <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
            Nismo uređivali. Nismo birali samo dobre. Ovo je inbox.
          </p>

          <div className="space-y-3">
            {whatsappMessages.map((msg, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e6e1] border-l-[3px] border-l-[#25d366] rounded-r-xl px-4 py-4 hover:border-l-[#128c7e] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[13px] font-medium text-[#128c7e]">
                    {msg.name}, {msg.location}
                  </span>
                  <span className="text-[11px] text-gray-500">{msg.time}</span>
                </div>
                <p className="text-[14px] text-gray-800 leading-relaxed mb-2.5">
                  {msg.message.split(/(\bvrh radi\b|\bradi isto\b|\bodlično radi\b|\bvrh\b|\bako da ih nema\b|\bnula iritacije, nula uraslih\b|\bko svila\b)/gi).map((part, idx) => {
                    const lowerPart = part.toLowerCase();
                    if (
                      lowerPart === 'vrh radi' ||
                      lowerPart === 'radi isto' ||
                      lowerPart === 'odlično radi' ||
                      lowerPart === 'vrh' ||
                      lowerPart === 'kao da ih nema' ||
                      lowerPart === 'nula iritacije, nula uraslih' ||
                      lowerPart === 'ko svila'
                    ) {
                      return <strong key={idx} className="font-medium text-black">{part}</strong>;
                    }
                    return part;
                  })}
                </p>
                <span className="inline-block text-[11px] text-gray-500 bg-[#f5f3ee] px-2.5 py-0.5 rounded-full border border-[#e8e6e1]">
                  {msg.zone}
                </span>
              </div>
            ))}
          </div>

          {/* PHOTO GRID */}
          <p className="text-[13px] text-gray-600 italic mt-7 mb-3">
            Slike koje su nam poslale korisnice
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {customerPhotos.map((photo, i) => (
              <div key={i} className="relative aspect-[9/16] rounded-lg overflow-hidden bg-[#f5f3ee]">
                <Image
                  src={photo}
                  alt={`Korisnica ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATH SECTION */}
      <section className="px-6 py-11 border-b border-[#e8e6e1]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8556a] mb-3">
            Realnost
          </p>
          <h2 className="font-[var(--font-playfair)] text-[22px] md:text-[28px] leading-tight mb-2">
            Šta se dešava ako ne naručiš danas
          </h2>
          <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
            Nije pritisak. Samo matematika.
          </p>

          <div className="bg-[#f5f3ee] rounded-[22px] p-6">
            <div className="grid md:grid-cols-2 gap-3 mb-3.5">
              <div className="bg-[#fdecea] border border-[#f5c6c6] rounded-xl p-4">
                <div className="text-[11px] font-medium tracking-wider uppercase text-[#a33] mb-2 opacity-70">
                  Bez uređaja
                </div>
                <p className="text-[13px] text-[#722] leading-relaxed">
                  Brijač svaki dan ili dva. Salon svaki mjesec. 80–120 KM stalno. Iritacija. Urasle dlačice. Planiranje plaže danima unaprijed.
                </p>
              </div>

              <div className="bg-[#eaf4ee] border border-[#b7dfc8] rounded-xl p-4">
                <div className="text-[11px] font-medium tracking-wider uppercase text-[#2d6a4f] mb-2 opacity-70">
                  Sa Ice Cool PRO
                </div>
                <p className="text-[13px] text-[#1a4a32] leading-relaxed">
                  {product.price} KM jednom. 10 minuta sedmično. Nakon mjesec dana — sporiji rast. Nakon dva — skoro pa ništa.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e8e6e1] text-[14px] text-gray-700 leading-relaxed">
              Za godinu dana salon = <strong className="text-black font-medium">960–1.440 KM</strong>.<br />
              Ice Cool PRO = <strong className="text-black font-medium">{product.price} KM jednom</strong>.<br />
              Razlika ostaje u tvom džepu.
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="px-6 py-11 border-b border-[#e8e6e1]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8556a] mb-3">
            Prigovori
          </p>
          <h2 className="font-[var(--font-playfair)] text-[22px] md:text-[28px] leading-tight mb-6">
            Šta te još zaustavlja — iskreno
          </h2>

          <div className="space-y-2.5">
            {objections.map((obj, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e6e1] rounded-xl px-4 py-4 hover:border-[#f2d0d6] transition-colors"
              >
                <p className="text-[14px] font-medium text-black mb-2">{obj.question}</p>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  {obj.answer.split(/(\b14 dana povrat, bez pitanja\b|\bHlađenje je tu upravo zbog toga\b|\bPopuniš ime, telefon i adresu. To je sve\b|\bNije instant, ali je stvarno\b|\bIPL tehnologija je ista\b)/gi).map((part, idx) => {
                    const lowerPart = part.toLowerCase();
                    if (
                      lowerPart.includes('14 dana povrat') ||
                      lowerPart.includes('hlađenje je tu') ||
                      lowerPart.includes('popuniš ime') ||
                      lowerPart.includes('nije instant') ||
                      lowerPart.includes('ipl tehnologija')
                    ) {
                      return <strong key={idx} className="font-medium text-black">{part}</strong>;
                    }
                    return part;
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCY BAR */}
      <div className="bg-[#fdf3e7] border-y border-[#e8c99a] px-6 py-3.5">
        <div className="max-w-3xl mx-auto flex items-center gap-2.5">
          <span className="text-xl flex-shrink-0">🔥</span>
          <p className="text-[13px] text-[#b5651d] leading-relaxed">
            Samo <strong className="font-medium">19 komada</strong> na stanju · Dostava <strong className="font-medium">1–2 radna dana</strong> u cijeloj BiH
          </p>
        </div>
      </div>

      {/* ORDER SECTION */}
      <section id="naruci" className="px-6 py-11 bg-[#f5f3ee]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8556a] mb-6 text-center">
            Naruči odmah
          </p>

          <div className="mb-7 text-center">
            <div className="flex items-baseline justify-center gap-2.5 flex-wrap mb-1.5">
              <span className="font-[var(--font-playfair)] text-[42px] text-black leading-none">
                {product.price} KM
              </span>
              <span className="text-[18px] text-gray-500 line-through">{product.compareAtPrice} KM</span>
              <span className="bg-[#eaf4ee] text-[#2d6a4f] text-xs font-medium px-2.5 py-1 rounded-full border border-[#b7dfc8]">
                Ušteda {savings} KM
              </span>
            </div>
            <p className="text-[13px] text-gray-600">
              Plaćanje pouzećem · Besplatna dostava · 14 dana povrat
            </p>
          </div>

          {showForm ? (
            <LandingOrderForm product={product} />
          ) : (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 bg-[#0f0f0f] text-white rounded-xl text-base font-medium hover:opacity-85 transition-opacity mb-2.5"
              >
                Naruči — plaćam pouzećem na vrata
              </button>
              <p className="text-xs text-gray-500 text-center mb-5">
                Nema online plaćanja. Platiš kuriru kad ti stigne paket.
              </p>
            </>
          )}

          <div className="flex items-center gap-3 text-[13px] text-gray-500 mb-4 justify-center">
            <span className="flex-1 h-px bg-[#e8e6e1]" />
            <span>ili naruči direktno</span>
            <span className="flex-1 h-px bg-[#e8e6e1]" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <a
              href="https://wa.me/38761904759?text=Zdravo%2C%20%C5%BEelim%20naru%C4%8Diti%20Ice%20Cool%20PRO%E2%84%A2."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3.5 border border-[#e8e6e1] rounded-lg bg-white text-[14px] text-black hover:bg-[#f5f3ee] hover:border-gray-300 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="viber://chat?number=%2B38761904759"
              className="block text-center py-3.5 border border-[#e8e6e1] rounded-lg bg-white text-[14px] text-black hover:bg-[#f5f3ee] hover:border-gray-300 transition-colors"
            >
              Viber
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center text-xs text-gray-600">
            <div>
              <span className="text-[22px] block mb-1">🚚</span>
              Besplatna dostava u BiH
            </div>
            <div>
              <span className="text-[22px] block mb-1">🔄</span>
              14 dana povrat bez pitanja
            </div>
            <div>
              <span className="text-[22px] block mb-1">🏅</span>
              12 mj. garancija
            </div>
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="px-6 py-10 bg-[#0f0f0f] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-[var(--font-playfair)] text-[18px] md:text-[22px] leading-relaxed mb-7">
            Stotine žena iz BiH je prošlo kroz isti moment kolebanja koji ti prolaziš sada.
            <br /><br />
            Većina kaže isto:
            <br />
            <em className="italic text-[#f2d0d6]">&quot;Žao mi je što nisam ranije.&quot;</em>
          </p>
          <button
            onClick={() => scrollToForm("closer")}
            className="px-8 py-4 bg-white text-black rounded-xl text-base font-medium hover:opacity-85 transition-opacity"
          >
            {product.price} KM · Pouzećem · 14 dana povrat
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8e6e1] px-6 py-6 text-center text-xs text-gray-500 leading-relaxed">
        <p>
          © 2026 Ice Cool PRO™ · <a href="https://aurorashop.ba/politika-privatnosti" className="underline hover:text-gray-700">Politika privatnosti</a> · <a href="https://aurorashop.ba/politika-povrata" className="underline hover:text-gray-700">Politika povrata</a>
        </p>
        <p className="mt-2">
          <a href="tel:+38761904759" className="underline hover:text-gray-700">+387 61 904 759</a> · <a href="mailto:info@icecoolpro.ba" className="underline hover:text-gray-700">info@icecoolpro.ba</a>
        </p>
      </footer>
    </div>
  );
}
