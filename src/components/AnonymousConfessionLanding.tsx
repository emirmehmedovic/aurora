"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  EyeOff,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import { trackCtaClick, trackViewContent } from "@/lib/analytics";
import { useEffect } from "react";

interface AnonymousConfessionLandingProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    image?: string;
    images?: string[];
  };
}

const benefits = [
  "Kućni IPL tretman jednom sedmično",
  "Bez voska, salona i stalnog brijanja",
  "Ugrađeno Ice Cool hlađenje",
  "Plaćanje pouzećem i besplatna dostava",
];

const proofPoints = [
  {
    icon: MessageCircle,
    title: "Anonimna iskustva",
    text: "Korisnice često ne žele javno objaviti rezultate, ali poruke koje šalju imaju isti obrazac: manje iritacije, više rutine i manje brijanja.",
  },
  {
    icon: Clock,
    title: "Jednom sedmično",
    text: "Tretman radiš kod kuće, kad ti odgovara. Nema zakazivanja, čekanja termina i odlazaka u salon.",
  },
  {
    icon: ShieldCheck,
    title: "Diskretna narudžba",
    text: "Naručuješ direktno, plaćaš kuriru po preuzimanju i dobijaš potvrdu prije slanja.",
  },
];

const testimonials = [
  "Koristim ga već par sedmica i stvarno vidim razliku. Najviše mi znači što mi koža nije iziritirana kao poslije brijanja.",
  "Bila sam skeptična jer sam već probala svašta. Svidjelo mi se što tretman mogu uraditi sama, bez salona i bez neprijatnosti.",
  "Najveća promjena mi je što više ne planiram odjeću prema tome kad sam se zadnji put brijala.",
];

const detailedTestimonials = [
  {
    zone: "Bikini zona",
    quote:
      "Nisam vjerovala da će raditi za bikini zonu. Probala sam sve - vosak, brijanje, epilator. Svaki put ista priča: iritacija, urasle dlake, crvene mrlje. Nakon 6 sedmica sa Ice Cool PRO - kao da se ništa nije ni desilo. Glatko i mirno.",
    initial: "N",
    name: "Nikolina",
    meta: "Mostar · Maj 2026",
  },
  {
    zone: "Pazuhe · Noge",
    quote:
      "Ovo ljeto sam prvi put spontano rekla da idem na bazen. Bez planiranja, bez gledanja kalendara, bez provjere je li sve u redu. Uzela sam peškir i otišla. Zvuči glupo ali za mene je to bila ogromna stvar.",
    initial: "T",
    name: "Tina",
    meta: "Tuzla · Juni 2026",
  },
  {
    zone: "Sve zone",
    quote:
      "Prvih sedam dana - ništa. Druga sedmica - malo sporiji rast. Četvrta sedmica - pazuhe gotovo čiste. Šesta sedmica - noge glatke 10 dana bez brijanja. Koristim 10 minuta sedmično uz seriju. To je sve.",
    initial: "S",
    name: "Selma",
    meta: "Sarajevo · April 2026",
  },
];

const usageSteps = [
  {
    number: "1",
    title: "Obrij zonu",
    text: "Čista, suha koža. 2-3 minute pripreme.",
  },
  {
    number: "2",
    title: "Primijeni tretman",
    text: "Prisloni uređaj, pritisni dugme. Koža se hladi na svakom impulsu - ne osjećaš peckanje čak ni na bikini zoni.",
  },
  {
    number: "3",
    title: "Ponovi jednom sedmično",
    text: "10 minuta dok gledaš seriju. Noge 8 min, pazuhe 2 min, bikini zona 3 min.",
  },
];

const weeklyResults = [
  {
    week: "SEDMICA 1-2",
    text: "Dlake rastu sporije. Možeš brijati rjeđe.",
  },
  {
    week: "SEDMICA 3-4",
    text: "Primjetan pad gustine. Nema više iritacije.",
  },
  {
    week: "SEDMICA 5-6",
    text: "Bikini zona mirna. Noge glatke 10+ dana bez brijanja.",
  },
  {
    week: "SEDMICA 7-8",
    text: "Većina žena prestaje brijati pazuhe i bikini zonu.",
  },
];

const whyIceCool = [
  "999.999 bljeskova - ne mijenjaš lampicu godinama, traje cijelu porodicu",
  "Ice Cooling™ hlađenje - koža se hladi na svakom impulsu, bez peckanja i crvenila",
  "Isti IPL efekat kao Philips Lumea - samo 8 puta jeftinije (175 KM vs 1.200 KM)",
  "Tretman uveče kod kuće - bez zakazivanja, bez vožnje, bez neugodnih poza u salonu",
];

export default function AnonymousConfessionLanding({ product }: AnonymousConfessionLandingProps) {
  const productImage = product.image || product.images?.[0] || "/slike/PRO/cover-image.png";

  useEffect(() => {
    trackViewContent({ id: product.id, name: product.name, price: product.price });
  }, [product]);

  const scrollToOrder = (location: string) => {
    trackCtaClick("Naruci", location, `anonymous-confession-${product.id}`);
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#FDF9F3] text-[#3F2E2A]">
      <header className="sticky top-0 z-40 border-b border-[#EDE4D8] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={64}
              height={64}
              className="h-10 w-10 object-contain"
            />
            <span className="text-sm font-bold text-[#3F2E2A]">Ice Cool Pro</span>
          </Link>
          <button
            onClick={() => scrollToOrder("header")}
            className="inline-flex items-center gap-2 rounded-full bg-[#A65D6B] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#A65D6B]/20 transition hover:bg-[#8F4E5B]"
          >
            {product.price.toFixed(0)} KM
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_0.86fr] md:px-6 md:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#EDE4D8] bg-white px-3 py-1.5 text-xs font-bold uppercase text-[#A65D6B] shadow-sm">
            <EyeOff className="h-4 w-4" />
            Anonimna ispovijest korisnice
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] text-[#3F2E2A] md:text-6xl">
            "Nisam htjela javno, ali moram vam reći..."
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6B5C52] md:text-xl">
            Većina korisnica ne želi javno objaviti svoje iskustvo, i to potpuno razumijemo. Ali poruke koje dobijamo imaju jednu zajedničku stvar: žene su umorne od stalnog brijanja, iritacija i kratkotrajnog osjećaja glatke kože.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToOrder("hero")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A65D6B] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#A65D6B]/25 transition hover:-translate-y-0.5 hover:bg-[#8F4E5B]"
            >
              Naruči Ice Cool Pro
              <ChevronRight className="h-5 w-5" />
            </button>
            <a
              href="#objasnjenje-specifikacije"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A28F]/45 bg-white px-6 py-4 text-sm font-black text-[#3F2E2A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#A65D6B]/45 hover:bg-[#FFFAF7]"
            >
              Objašnjenje i specifikacije
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EDE4D8] bg-white px-4 py-3 text-sm font-bold text-[#3F2E2A] shadow-sm">
              <Truck className="h-4 w-4 text-[#C9A28F]" />
              Besplatna dostava u BiH
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["4.9/5 ocjena", "300+ korisnica", "plaćanje pouzećem"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#EDE4D8] bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
                <div className="flex items-center gap-1 text-[#C9A28F]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="mt-1 text-sm font-bold text-[#3F2E2A]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <AdMockup productName={product.name} productImage={productImage} />
      </section>

      <section className="border-y border-[#EDE4D8] bg-[#F8F4ED]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-10 md:grid-cols-3 md:px-6">
          {proofPoints.map((point) => (
            <article key={point.title} className="rounded-2xl border border-[#C9A28F]/35 bg-[#FDF9F3]/70 p-6 shadow-lg shadow-[#3F2E2A]/5 backdrop-blur">
              <point.icon className="h-7 w-7 text-[#A65D6B]" />
              <h2 className="mt-4 text-lg font-black text-[#3F2E2A]">{point.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6B5C52]">{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#A65D6B]">Šta korisnice pišu</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              "Bila sam skeptična, ali drago mi je da sam probala."
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6B5C52]">
              Ovaj LP je napravljen oko testimonial ugla iz mockupa: privatnost, realan ton i dovoljno konkretnih informacija da korisnica odmah razumije zašto Ice Cool Pro ulazi u rutinu.
            </p>
          </div>

          <div className="space-y-4">
            {testimonials.map((quote, index) => (
              <blockquote key={quote} className="rounded-2xl border border-[#EDE4D8] bg-white/75 p-5 shadow-lg shadow-[#3F2E2A]/5 backdrop-blur">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0D8D8]">
                    <EyeOff className="h-4 w-4 text-[#A65D6B]" />
                  </div>
                  <div>
                    <div className="h-3 w-28 rounded-full bg-[#E5D8CC] blur-[1px]" />
                    <p className="mt-1 text-xs text-[#9B7A62]">Ime sakriveno zbog privatnosti</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-[#3F2E2A]">"{quote}"</p>
                <p className="mt-3 text-xs font-bold text-[#A65D6B]">Anonimno iskustvo #{index + 1}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#3F2E2A] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_0.9fr] md:px-6">
          <div>
            <Sparkles className="h-8 w-8 text-[#EDD9B8]" />
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              Kućni IPL tretman za glađu rutinu, bez voska i salona.
            </h2>
            <p className="mt-4 max-w-2xl text-[#EDE4D8]">
              Ice Cool Pro koristi svjetlosne impulse koji ciljaju folikul dlačice. Vremenom dlačice rastu sporije i rjeđe, a tretman se uklapa u sedmičnu rutinu kod kuće.
            </p>
          </div>
          <div className="grid gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <Check className="h-5 w-5 flex-shrink-0 text-[#EDD9B8]" />
                <span className="font-bold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order-form" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-7 text-center">
          <p className="text-sm font-black uppercase text-[#A65D6B]">Naruči diskretno</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Popuni podatke i plaćaš kuriru po preuzimanju</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#6B5C52]">
            Nakon slanja narudžbe kontaktiramo te radi potvrde. Dostava je besplatna na teritoriji BiH.
          </p>
        </div>
        <LandingOrderForm product={product} />
        <p className="mt-5 text-center text-xs text-[#9B7A62]">
          Ime korisnice u testimonial porukama je sakriveno zbog privatnosti. Rezultati se mogu razlikovati od osobe do osobe.
        </p>
      </section>

      <section id="objasnjenje-specifikacije" className="scroll-mt-24 border-t border-[#EDE4D8] bg-[#FFFAF7]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase text-[#A65D6B]">Kako funkcioniše Ice Cool PRO</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#3F2E2A] md:text-4xl">
              Korištenje od 10 minuta sedmično, uz rezultate koji se grade iz sedmice u sedmicu
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-[#C9A28F]/35 bg-[#FDF9F3]/80 p-6 shadow-lg shadow-[#3F2E2A]/5 backdrop-blur">
              <h3 className="text-xl font-black text-[#3F2E2A]">Korištenje - 10 minuta sedmično</h3>
              <div className="mt-5 space-y-4">
                {usageSteps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#A65D6B] text-sm font-black text-white">
                      {step.number}
                    </div>
                    <div>
                      <p className="font-black text-[#3F2E2A]">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6B5C52]">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#C9A28F]/35 bg-white/80 p-6 shadow-lg shadow-[#3F2E2A]/5 backdrop-blur">
              <h3 className="text-xl font-black text-[#3F2E2A]">Rezultati - sedmica po sedmica</h3>
              <div className="mt-5 space-y-3">
                {weeklyResults.map((result) => (
                  <div key={result.week} className="rounded-xl border border-[#EDE4D8] bg-[#F8F4ED] p-4">
                    <p className="text-xs font-black text-[#A65D6B]">{result.week}</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-[#3F2E2A]">{result.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#C9A28F]/35 bg-[#3F2E2A] p-6 text-white shadow-xl shadow-[#3F2E2A]/10">
            <h3 className="text-xl font-black">Zašto Ice Cool PRO</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {whyIceCool.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#EDD9B8]" />
                  <p className="text-sm font-semibold leading-relaxed text-[#FDF9F3]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EDE4D8] bg-[#F8F4ED]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase text-[#A65D6B]">Iskustva korisnica</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#3F2E2A] md:text-4xl">
              Šta žene primijete nakon nekoliko sedmica korištenja
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {detailedTestimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex h-full flex-col rounded-2xl border border-[#C9A28F]/35 bg-[#FDF9F3]/80 p-6 shadow-lg shadow-[#3F2E2A]/5 backdrop-blur"
              >
                <div className="mb-4 inline-flex w-fit rounded-full bg-[#F0D8D8] px-3 py-1 text-xs font-black text-[#A65D6B]">
                  {testimonial.zone}
                </div>
                <p className="flex-1 text-[15px] leading-relaxed text-[#3F2E2A]">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-[#EDE4D8] pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A65D6B] text-sm font-black text-white">
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="font-black text-[#3F2E2A]">{testimonial.name}</p>
                    <p className="text-xs text-[#9B7A62]">{testimonial.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AdMockup({
  productName,
  productImage,
}: {
  productName: string;
  productImage: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[24px] border border-[#C9A28F]/25 bg-[#FFFAF7]/70 p-4 shadow-2xl shadow-[#3F2E2A]/10 backdrop-blur md:p-6">
      <div className="overflow-hidden rounded-[22px] border border-[#EDE4D8] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EDE4D8] p-4">
          <div className="h-11 w-11 rounded-full border border-[#C9A28F]/45 bg-gradient-to-br from-[#F0D8D8] to-[#FFFAF7]" />
          <div>
            <div className="text-[15px] font-black">Ice Cool Pro</div>
            <div className="text-xs text-[#9B7A62]">Sponsored</div>
          </div>
        </div>

        <div className="p-4">
          <p className="mb-4 text-sm leading-relaxed text-[#6B5C52]">
            Većina korisnica ne želi javno objaviti svoje iskustvo. Ali poruke koje dobijamo imaju jednu zajedničku stvar...
          </p>

          <div className="flex min-h-[470px] flex-col justify-between rounded-[18px] border border-[#EDE4D8] bg-gradient-to-b from-[#FDF9F3] to-white p-5">
            <div>
              <div className="mb-3 text-xs font-black uppercase text-[#A65D6B]">
                Anonimno iskustvo korisnice
              </div>
              <div className="mb-5 text-2xl font-black leading-tight text-[#3F2E2A]">
                "Nisam očekivala da će mi se ovoliko svidjeti."
              </div>

              <div className="rounded-[18px] border border-[#EDE4D8] bg-white p-4 shadow-lg shadow-[#3F2E2A]/5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#F0D8D8]" />
                  <div>
                    <div className="h-3 w-28 rounded-full bg-[#E5D8CC] blur-[2px]" />
                    <div className="mt-1 text-xs text-[#9B7A62]">Ime sakriveno zbog privatnosti</div>
                  </div>
                </div>
                <div className="rounded-2xl rounded-bl bg-[#F8F4ED] p-3 text-[15px] leading-relaxed text-[#3F2E2A]">
                  "Koristim ga već par sedmica i stvarno vidim razliku. Najviše mi znači što mi koža nije iziritirana kao poslije brijanja."
                </div>
              </div>

              <div className="mt-5 grid grid-cols-[92px_1fr] items-center gap-4">
                <div className="relative h-[122px] overflow-hidden rounded-3xl border border-[#C9A28F]/40 bg-gradient-to-br from-[#F8F4ED] to-white">
                  <Image src={productImage} alt={productName} fill className="object-contain p-2" />
                </div>
                <ul className="space-y-1.5 text-sm font-semibold text-[#6B5C52]">
                  <li>✓ Kućni IPL tretman</li>
                  <li>✓ Koristi se jednom sedmično</li>
                  <li>✓ Bez voska i salona</li>
                  <li>✓ Za glađu rutinu kod kuće</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-[14px] bg-[#A65D6B] p-3 text-center text-sm font-black text-white shadow-lg shadow-[#A65D6B]/20">
              Pogledajte iskustva korisnica
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#EDE4D8] bg-[#FFFAF7] p-4">
          <div>
            <div className="text-sm font-black text-[#3F2E2A]">Iskustva korisnica govore sama za sebe</div>
            <div className="text-xs text-[#9B7A62]">{productName} kućni IPL uređaj</div>
          </div>
          <div className="whitespace-nowrap rounded-md bg-[#C9A28F] px-3 py-2 text-xs font-black text-white">
            Shop Now
          </div>
        </div>
      </div>
    </div>
  );
}
