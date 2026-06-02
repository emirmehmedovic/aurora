"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Star, Heart, ChevronLeft, ChevronRight, Truck, Shield, Clock } from "lucide-react";
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

interface ElegantSocialProofProps {
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

export default function ElegantSocialProof({
  product,
  testimonials,
  heroTitle,
  heroSubtitle,
  problems,
  features,
  ctaText,
}: ElegantSocialProofProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    trackViewContent({ id: product.id, name: product.name, price: product.price });
  }, [product.id, product.name, product.price]);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `elegant-social-${product.id}`);
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
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
      {/* Header - Elegant & Simple with backdrop blur */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8DCC8]/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={96}
              height={96}
            />
          </Link>
          <button
            onClick={() => scrollToForm("header")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#5C4A3A] to-[#5A5147] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Naruči - {product.price} KM
          </button>
        </div>
      </header>

      {/* Hero - Full Width Image with Text Below */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Image - Full Width with luxury effects */}
        <div className="relative w-full mb-12 group">
          {/* Subtle glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961]/20 via-[#F4C2C2]/20 to-[#C9A961]/20 blur-3xl opacity-50" />

          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-[#E8DCC8] shadow-2xl group-hover:shadow-[#C9A961]/20 transition-all duration-500">
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#5C4A3A]/10 via-transparent to-transparent z-10" />

            <Image
              src="/novi-landing/hero.png"
              alt="Ice Cool PRO uređaj"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* Hero Text - Centered Below Image */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-[#C9A961]" />
            <span className="text-[#C9A961] text-sm font-medium tracking-wide uppercase">Ženska iskustva</span>
            <Heart className="w-4 h-4 text-[#C9A961]" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5C4A3A] mb-6 leading-tight">
            {heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-[#6B5D4F] mb-10 leading-relaxed">
            {heroSubtitle}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-[#6B5D4F]">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                ))}
              </div>
              <span>4.9/5</span>
            </div>
            <div className="w-px h-4 bg-[#E8DCC8]" />
            <span>300+ zadovoljnih korisnica</span>
          </div>

          <button
            onClick={() => scrollToForm("hero")}
            className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#C9A961]/40 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            <span className="relative z-10">{ctaText}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-4 text-sm text-[#6B5D4F]">
            175 KM • Besplatna dostava • 14 dana povrat
          </p>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4A3A] mb-3">
              Stvarna iskustva žena iz BiH
            </h2>
            <p className="text-lg text-[#6B5D4F]">
              Evo što kažu žene koje su se odlučile za promjenu
            </p>
          </div>

          {/* Testimonial Card with luxury effects */}
          <div className="relative bg-gradient-to-br from-white via-[#FAF8F5] to-white rounded-3xl overflow-hidden border-2 border-[#E8DCC8] shadow-xl hover:shadow-2xl transition-shadow duration-500">
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9A961]/10 to-transparent rounded-bl-full" />

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] md:h-auto">
                <Image
                  src={currentT.image}
                  alt={currentT.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="text-6xl text-[#E8DCC8] font-serif leading-none mb-4">"</div>

                <blockquote className="text-xl md:text-2xl text-[#5C4A3A] font-medium mb-6 leading-relaxed">
                  {currentT.quote}
                </blockquote>

                <p className="text-[#6B5D4F] mb-6 leading-relaxed">
                  {currentT.story}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#F4C2C2] flex items-center justify-center text-[#5C4A3A] text-xl font-bold">
                    {currentT.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[#5C4A3A]">
                      {currentT.name}, {currentT.age} god.
                    </div>
                    <div className="text-[#6B5D4F] text-sm">{currentT.location}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-[#FAF8F5] rounded-full border border-[#E8DCC8]">
                    <span className="text-[#6B5D4F] text-sm">Koristi {currentT.monthsUsing} mj.</span>
                  </div>
                  <div className="px-4 py-2 bg-[#FAF8F5] rounded-full border border-[#E8DCC8]">
                    <span className="text-[#6B5D4F] text-sm">♡ {currentT.favoriteFeature}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-[#E8DCC8] flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#5C4A3A]" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-[#E8DCC8] flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#5C4A3A]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentTestimonial ? "w-8 bg-[#C9A961]" : "w-2 bg-[#E8DCC8]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4A3A] mb-4">
              Koliko puta si rekla sebi ovo?
            </h2>
            <p className="text-lg text-[#6B5D4F]">
              Ovi problemi ti oduzimaju više nego što misliš
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, i) => (
              <div key={i} className="group bg-white rounded-2xl p-7 border border-[#E8DCC8] hover:border-[#C9A961]/30 hover:shadow-lg hover:shadow-[#F4C2C2]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#5C4A3A] leading-relaxed pt-1">{problem.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after problems */}
          <div className="text-center mt-12">
            <p className="text-xl text-[#5C4A3A] font-medium mb-6">
              Što ako možeš riješiti sve ovo sa jednim uređajem od 175 KM?
            </p>
            <button
              onClick={() => scrollToForm("problems")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A961] text-white text-lg font-medium rounded-lg hover:bg-[#B8960F] transition-colors cursor-pointer"
            >
              Pokaži mi rješenje
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4A3A] mb-4">
              Rješenje zbog kojeg 300+ žena kaže: "Trebala sam ranije"
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg text-[#5C4A3A]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Product Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4A3A] mb-4">
              Ice Cool PRO™
            </h2>
            <p className="text-lg text-[#6B5D4F]">
              Tvoje rješenje za dugotrajno glatku kožu
            </p>
          </div>

          {/* Glow effect behind showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961]/10 via-[#F4C2C2]/10 to-[#C9A961]/10 blur-3xl" />

            <div className="relative bg-gradient-to-br from-white via-[#FAF8F5] to-white rounded-3xl overflow-hidden border-2 border-[#E8DCC8] shadow-2xl">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#C9A961]/20 rounded-tl-3xl z-10" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#C9A961]/20 rounded-br-3xl z-10" />

              <div className="grid md:grid-cols-2 gap-0">
                {/* Product Images Showcase - Left Side */}
                <div className="p-8 md:p-12 bg-gradient-to-br from-[#FAF8F5] to-white">
                  {/* Main product image */}
                  <div className="relative mb-6 group">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#E8DCC8] shadow-lg group-hover:shadow-xl transition-shadow">
                      <Image
                        src="/novi-landing/product.png"
                        alt="Ice Cool PRO uređaj"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Additional product images - 2 column grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-[#E8DCC8] hover:border-[#C9A961]/50 transition-colors group">
                      <Image
                        src="/novi-landing/product2.png"
                        alt="Ice Cool PRO detalj"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-[#E8DCC8] hover:border-[#C9A961]/50 transition-colors group">
                      <Image
                        src="/novi-landing/product3.png"
                        alt="Ice Cool PRO upotreba"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Info - Right Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-3xl font-serif font-bold text-[#5C4A3A] mb-6">{product.name}</h3>

                  {/* Price display */}
                  <div className="flex items-baseline justify-center md:justify-start gap-4 mb-8">
                    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#5C4A3A] to-[#6B5D4F] bg-clip-text text-transparent">
                      {product.price} KM
                    </span>
                    <div className="flex flex-col items-start">
                      <span className="text-xl text-[#9B8B7E] line-through">{product.compareAtPrice} KM</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-[#F4C2C2] to-[#FFD4D4] text-[#5C4A3A] font-bold rounded-full text-xs shadow-md">
                        -{discount}%
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => scrollToForm("pricing")}
                    className="group relative w-full py-5 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white text-xl font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#C9A961]/40 transition-all duration-300 cursor-pointer overflow-hidden mb-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <span className="relative z-10">Naruči odmah</span>
                  </button>

                  {/* Trust badges */}
                  <div className="space-y-3 pt-8 border-t-2 border-[#E8DCC8]">
                    <div className="flex items-center gap-3 justify-center md:justify-start group">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#6B5D4F] font-medium">Besplatna dostava</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start group">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#6B5D4F] font-medium">14 dana povrat novca</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start group">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#6B5D4F] font-medium">1-3 dana dostava</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-[#FAF8F5] to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C4A3A] mb-4">
              Kako radi Ice Cool PRO?
            </h2>
            <p className="text-lg text-[#6B5D4F] max-w-2xl mx-auto">
              Samo 3 jednostavna koraka do dugotrajno glatke kože
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8DCC8] to-transparent" />

            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 text-center border-2 border-[#E8DCC8] hover:border-[#C9A961]/30 hover:shadow-xl transition-all duration-300">
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A961] to-[#D4AF37] flex items-center justify-center shadow-lg z-10">
                  <span className="text-white text-xl font-bold">1</span>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 mt-4 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#5C4A3A] mb-3">
                  Pripremi kožu
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  Obrij područje koje želiš tretirati. Koža mora biti čista i suva prije korištenja.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 text-center border-2 border-[#E8DCC8] hover:border-[#C9A961]/30 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A961] to-[#D4AF37] flex items-center justify-center shadow-lg z-10">
                  <span className="text-white text-xl font-bold">2</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 mt-4 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#5C4A3A] mb-3">
                  Primijeni tretman
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  Prisloni uređaj na kožu i aktiviraj svjetlosni impuls. Hlađenje radi automatski. 10 minuta za noge.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 text-center border-2 border-[#E8DCC8] hover:border-[#C9A961]/30 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A961] to-[#D4AF37] flex items-center justify-center shadow-lg z-10">
                  <span className="text-white text-xl font-bold">3</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 mt-4 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFD4D4] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#5C4A3A] mb-3">
                  Uživaj u rezultatima
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  Ponavljaj tretman 1x sedmično. Nakon mjesec dana vidiš rezultate - dlačice rjeđe i tanje.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-[#5C4A3A] font-medium mb-6">
              Jednostavno kao 1-2-3. Bez bola, bez salona, bez čekanja.
            </p>
            <button
              onClick={() => scrollToForm("how-it-works")}
              className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#C9A961]/40 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative z-10">Želim probati Ice Cool PRO</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Order Form */}
      {showForm && (
        <section id="order-form" className="py-16 px-6 bg-[#FAF8F5] scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#5C4A3A] mb-12 text-center">
              Završi narudžbu
            </h2>
            <LandingOrderForm product={product} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#C9A961] to-[#B8960F]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Ne odgađaj više. Probaj danas.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Pridruži se stotinama zadovoljnih žena
          </p>
          <button
            onClick={() => scrollToForm("final")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#5C4A3A] text-lg font-bold rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            Naruči Ice Cool PRO - 175 KM
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DCC8] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#6B5D4F]">
          <p>© 2026 Aurora Shop. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  );
}
