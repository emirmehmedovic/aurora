"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Check, ChevronLeft, ChevronRight, Truck, Shield, Clock, Eye } from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import { trackCtaClick, trackViewContent } from "@/lib/analytics";

interface Testimonial {
  name: string;
  age: number;
  location: string;
  quote: string;
  story: string;
  image: string;
  monthsUsing: number;
  favoriteFeature: string;
}

interface Problem {
  text: string;
}

interface Feature {
  text: string;
}

interface SocialProofLandingV2Props {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
  };
  testimonials: Testimonial[];
  heroTitle: string;
  heroSubtitle: string;
  problems: Problem[];
  features: Feature[];
  ctaText: string;
}

export default function SocialProofLandingV2({
  product,
  testimonials,
  heroTitle,
  heroSubtitle,
  problems,
  features,
  ctaText,
}: SocialProofLandingV2Props) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [viewCount, setViewCount] = useState(47);
  const [recentBuyers, setRecentBuyers] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    trackViewContent({ id: product.id, name: product.name, price: product.price });

    const timer = setTimeout(() => setShowFloatingCta(true), 10000);

    const viewInterval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3));
    }, 25000);

    const buyerNames = ["Amira, Sarajevo", "Lejla, Tuzla", "Maja, Mostar", "Selma, Zenica"];
    let buyerIndex = 0;
    const buyerInterval = setInterval(() => {
      setRecentBuyers(prev => {
        const newBuyers = [buyerNames[buyerIndex % buyerNames.length], ...prev].slice(0, 1);
        buyerIndex++;
        return newBuyers;
      });
    }, 50000);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      clearInterval(viewInterval);
      clearInterval(buyerInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [product]);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `social-proof-v2-${product.id}`);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentT = testimonials[currentTestimonial];
  const savings = product.compareAtPrice - product.price;
  const discount = Math.round((savings / product.compareAtPrice) * 100);

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Subtle Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[#E5DDD5] z-[60]">
        <div
          className="h-full bg-[#C19A91] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header - Minimal */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5DDD5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={80}
              height={80}
            />
          </Link>
          <div className="flex items-center gap-6">
            {/* Live viewers - very subtle */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
              <Eye className="w-3.5 h-3.5 text-[#C19A91]" />
              <span>{viewCount}</span>
            </div>
            <button
              onClick={() => scrollToForm("header")}
              className="px-6 py-2.5 bg-[#C19A91] text-white text-sm font-medium rounded-md hover:bg-[#B08981] transition-colors cursor-pointer"
            >
              {product.price} KM
            </button>
          </div>
        </div>
      </header>

      {/* Recent Buyer - Minimal notification */}
      {recentBuyers.length > 0 && (
        <div className="fixed bottom-6 left-6 z-40 animate-fade-in">
          <div className="bg-white rounded-lg shadow-sm border border-[#E5DDD5] px-4 py-2 text-xs text-gray-600">
            <span className="font-medium text-[#C19A91]">✓</span> {recentBuyers[0]} naručila
          </div>
        </div>
      )}

      {/* Floating CTA - Minimal */}
      {showFloatingCta && !showForm && (
        <button
          onClick={() => scrollToForm("floating")}
          className="fixed bottom-6 right-6 z-40 px-5 py-3 bg-[#C19A91] text-white text-sm font-medium rounded-md shadow-lg hover:bg-[#B08981] transition-all cursor-pointer"
        >
          Naruči • {product.price} KM
        </button>
      )}

      {/* HERO - Split Layout (Like the image) */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left - Image */}
            <div className="relative bg-[#F5F1ED] flex items-center justify-center p-12">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <Image
                  src="/novi-landing/hero.png"
                  alt="Ice Cool PRO"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-white">
              {/* Rose gold headline - large serif */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight text-[#C19A91] mb-8">
                Žao mi je što nisam ranije probala.
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Kućni uređaj za dugotrajno glatku kožu s ugrađenim hlađenjem.
              </p>

              {/* Value props - immediate (Clarity optimization) */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#C19A91] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#C19A91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Bez salona. Bez stalnog brijanja.</div>
                    <div className="text-sm text-gray-600">10 minuta sedmično kod kuće.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#C19A91] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#C19A91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Samo {product.price} KM.</div>
                    <div className="text-sm text-gray-600">Vs. 1.200+ KM godišnje na salone i žilete.</div>
                  </div>
                </div>
              </div>

              {/* Social proof - enhanced (Clarity optimization) */}
              <div className="flex flex-wrap items-center gap-6 mb-10 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C19A91] text-[#C19A91]" />
                    ))}
                  </div>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                <span>300+ žena</span>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-[#C19A91] font-medium">7 narudžbi danas</span>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToForm("hero")}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C19A91] text-white text-base font-medium rounded-md hover:bg-[#B08981] transition-colors cursor-pointer"
              >
                Naruči odmah
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> Besplatna dostava
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> plaćanje pouzećem
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> 1-3 dana dostava
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Win Stats - Prominent (Clarity: show value immediately) */}
      <section className="py-16 bg-white border-y border-[#E5DDD5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-serif text-[#C19A91] mb-2">10 min</div>
              <div className="text-sm text-gray-600">sedmično uz seriju</div>
            </div>
            <div>
              <div className="text-5xl font-serif text-[#C19A91] mb-2">1.200 KM</div>
              <div className="text-sm text-gray-600">godišnja ušteda vs. saloni</div>
            </div>
            <div>
              <div className="text-5xl font-serif text-[#C19A91] mb-2">30 dana</div>
              <div className="text-sm text-gray-600">do prvih vidljivih rezultata</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Large Featured */}
      <section className="py-20 px-6 bg-[#F5F1ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">
              Stvarna iskustva
            </h2>
            <p className="text-gray-600">300+ žena iz BiH već koristi Ice Cool PRO</p>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-white rounded-lg overflow-hidden shadow-sm border border-[#E5DDD5]">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[400px] md:h-auto">
                <Image src={currentT.image} alt={currentT.name} fill className="object-cover" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-6xl font-serif text-[#E5DDD5] leading-none mb-4">"</div>

                <blockquote className="text-xl md:text-2xl text-gray-900 mb-6 leading-relaxed">
                  {currentT.quote}
                </blockquote>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {currentT.story}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F1ED] flex items-center justify-center text-[#C19A91] font-semibold">
                    {currentT.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{currentT.name}, {currentT.age}</div>
                    <div className="text-sm text-gray-500">{currentT.location}</div>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C19A91] text-[#C19A91]" />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full border border-[#E5DDD5] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full border border-[#E5DDD5] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentTestimonial ? "w-8 bg-[#C19A91]" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mini CTA after testimonial (Clarity optimization) */}
          <div className="text-center mt-8">
            <button
              onClick={() => scrollToForm("testimonial")}
              className="text-sm text-[#C19A91] hover:text-[#B08981] font-medium cursor-pointer"
            >
              I ja želim ove rezultate →
            </button>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12 text-center">
            Prepoznaješ li ove situacije?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {problems.slice(0, 4).map((problem, i) => (
              <div key={i} className="bg-[#F5F1ED] rounded-lg p-6 border border-[#E5DDD5]">
                <p className="text-gray-700 leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-900 mb-6">
              Riješenje: {product.price} KM umjesto 100+ KM mjesečno.
            </p>
            <button
              onClick={() => scrollToForm("problems")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C19A91] text-white font-medium rounded-md hover:bg-[#B08981] transition-colors cursor-pointer"
            >
              Pokaži mi kako
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#F5F1ED]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12 text-center">
            Kako Ice Cool PRO radi?
          </h2>

          <div className="space-y-6 mb-12">
            {features.slice(0, 5).map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#C19A91] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-gray-700 leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollToForm("features")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C19A91] text-white font-medium rounded-md hover:bg-[#B08981] transition-colors cursor-pointer"
            >
              Naruči za {product.price} KM
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product + Pricing - Clean */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative aspect-square bg-[#F5F1ED] rounded-lg p-8">
              <Image
                src="/novi-landing/product.png"
                alt="Ice Cool PRO"
                fill
                className="object-contain p-8"
              />
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-3xl font-serif text-gray-900 mb-6">Ice Cool PRO™</h3>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-6xl font-serif text-gray-900">{product.price} KM</span>
                <div className="flex flex-col">
                  <span className="text-xl text-gray-400 line-through">{product.compareAtPrice} KM</span>
                  <span className="text-sm text-[#C19A91] font-medium">Ušteda {savings} KM</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToForm("pricing")}
                className="w-full py-4 bg-[#C19A91] text-white text-lg font-medium rounded-md hover:bg-[#B08981] transition-colors cursor-pointer mb-8"
              >
                Naruči odmah
              </button>

              {/* Trust badges */}
              <div className="space-y-3 pt-6 border-t border-[#E5DDD5]">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="w-5 h-5 text-[#C19A91]" />
                  <span>Besplatna dostava 1-3 dana</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-[#C19A91]" />
                  <span>besplatna dostava u BiH</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#C19A91]" />
                  <span>Plaćanje pouzećem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid - Smartphone 9:16 format */}
      <section className="py-20 px-6 bg-[#F5F1ED]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center">
            Još iskustava
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentTestimonial(i);
                  window.scrollTo({ top: 800, behavior: "smooth" });
                }}
                className="bg-white rounded-lg overflow-hidden border border-[#E5DDD5] hover:border-[#C19A91] transition-colors cursor-pointer group"
              >
                {/* 9:16 aspect ratio for smartphone photos */}
                <div className="relative aspect-[9/16]">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#C19A91] text-[#C19A91]" />
                    ))}
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      {showForm && (
        <section id="order-form" className="py-20 px-6 bg-white border-t border-[#E5DDD5] scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F5F1ED] border-l-4 border-[#C19A91] rounded-lg p-6 mb-12">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Već si napravila pravi izbor.</span> Samo završi narudžbu — besplatna dostava, plaćanje pouzećem i besplatna dostava u BiH.
              </p>
            </div>

            <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center">
              Završi narudžbu
            </h2>

            <LandingOrderForm product={product} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-6 bg-[#C19A91] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Koliko još ćeš čekati?
          </h2>
          <p className="text-xl mb-3 opacity-90">
            300+ žena je već reklo "Trebala sam ranije"
          </p>
          <p className="text-lg mb-10 opacity-80">
            Naruči danas i počni vidjeti rezultate za mjesec dana.
          </p>
          <button
            onClick={() => scrollToForm("final")}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#C19A91] text-lg font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Naruči Ice Cool PRO - {product.price} KM
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5DDD5] py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2026 Aurora Shop. Sva prava zadržana.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
