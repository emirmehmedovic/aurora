"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Sparkles, ArrowRight, Check, Truck, Shield, Clock, ChevronLeft, ChevronRight } from "lucide-react";
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

interface SocialProofLandingProps {
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
  problemSection: {
    title: string;
    problems: string[];
  };
  solutionSection: {
    title: string;
    features: string[];
  };
  ctaText: string;
}

export default function SocialProofLanding({
  product,
  testimonials,
  heroTitle,
  heroSubtitle,
  problemSection,
  solutionSection,
  ctaText,
}: SocialProofLandingProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    trackViewContent({ id: product.id, name: product.name, price: product.price });
  }, [product.id, product.name, product.price]);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `social-proof-${product.id}`);
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
  const productImage = product.images?.[0] || product.image || "/slike/PRO/cover-image.png";
  const savings = product.compareAtPrice - product.price;
  const discount = Math.round((savings / product.compareAtPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={48}
              height={48}
              className="rounded-xl"
            />
          </Link>
          <button
            onClick={() => scrollToForm("navbar")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Naruči odmah
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section - Centered with emotion */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="text-pink-600 font-medium text-sm tracking-wide uppercase">
              Ženska iskustva
            </span>
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-pink-900 mb-6 leading-tight font-serif">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-pink-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            {heroSubtitle}
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                    {t.image && (
                      <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover" />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-sm text-pink-700 font-medium">300+ žena već probalo</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm text-pink-700 font-medium">4.9 prosječna ocjena</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToForm("hero")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-6 h-6" />
            {ctaText}
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border-2 border-pink-200 shadow-lg">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-white animate-pulse" />
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white animate-pulse" style={{ animationDelay: "150ms" }} />
            </div>
            <span className="text-sm font-semibold text-pink-900">
              7 žena naručilo u zadnjih 24h
            </span>
          </div>
          <p className="mt-4 text-sm text-pink-600 font-medium">
            175 KM jednokratno • Besplatna dostava • besplatna dostava u BiH
          </p>
        </div>
      </section>

      {/* Featured Testimonial Carousel - Large & Emotional */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-4 font-serif">
              Stvarna iskustva žena iz BiH
            </h2>
            <p className="text-lg text-pink-700">
              Evo što kažu žene koje su se odlučile za promjenu
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl overflow-hidden border border-pink-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image side */}
              <div className="relative h-[400px] md:h-auto">
                <Image
                  src={currentT.image}
                  alt={currentT.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Content side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Quote mark */}
                <div className="text-8xl text-pink-200 font-serif leading-none mb-4">"</div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-pink-900 font-medium mb-6 italic leading-relaxed">
                  {currentT.quote}
                </blockquote>

                {/* Story */}
                <p className="text-pink-700 mb-6 leading-relaxed">
                  {currentT.story}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {currentT.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-pink-900 text-lg">
                      {currentT.name}, {currentT.age} god.
                    </div>
                    <div className="text-pink-600 text-sm">{currentT.location}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-pink-100 rounded-full">
                    <span className="text-pink-700 text-sm font-medium">
                      Koristi {currentT.monthsUsing} mj.
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-purple-100 rounded-full">
                    <span className="text-purple-700 text-sm font-medium">
                      ❤️ {currentT.favoriteFeature}
                    </span>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-pink-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-pink-600" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === currentTestimonial ? "w-8 bg-pink-500" : "bg-pink-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Emotional Connection */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-4 font-serif">
              {problemSection.title}
            </h2>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto">
              Ovi problemi ti oduzimaju više nego što misliš - vrijeme, novac, slobodu i samopouzdanje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {problemSection.problems.map((problem, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                  <p className="text-pink-800 leading-relaxed">{problem}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after problems */}
          <div className="text-center">
            <p className="text-xl text-pink-900 font-semibold mb-6">
              Što ako možeš riješiti sve ovo sa jednim uređajem od 175 KM?
            </p>
            <button
              onClick={() => scrollToForm("problems")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Pokaži mi rješenje
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Solution Section with Product */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src={productImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-6 font-serif">
                {solutionSection.title}
              </h2>

              <div className="space-y-4 mb-8">
                {solutionSection.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-pink-800 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-pink-900">{product.price} KM</span>
                  <span className="text-xl text-gray-400 line-through">{product.compareAtPrice} KM</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
                    -{discount}%
                  </span>
                </div>
                <p className="text-pink-600 text-sm">Jednokratna investicija za dugotrajne rezultate</p>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToForm("solution")}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Da, želim prestati gubiti vrijeme - 175 KM
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                  <span className="text-xs text-pink-700">Besplatna dostava</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                  <span className="text-xs text-pink-700">plaćanje pouzećem</span>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                  <span className="text-xs text-pink-700">1-3 dana dostava</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-12 text-center font-serif">
            Još iskustava koje moraš vidjeti
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="relative h-64">
                  <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-pink-900">{t.name}</p>
                  <p className="text-sm text-pink-600">{t.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      {showForm && (
        <section id="order-form" className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            {/* Pre-form urgency */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 text-lg mb-2">Već si napravila pravi izbor</h3>
                  <p className="text-amber-800 leading-relaxed">
                    Samo završi narudžbu i za mjesec dana ćeš vidjeti zašto 300+ žena kaže "Trebala sam ranije".
                    <span className="font-semibold"> Besplatna dostava, plaćanje pouzećem i besplatna dostava u BiH.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-4 font-serif">
                Završi narudžbu za 175 KM
              </h2>
              <p className="text-lg text-pink-700">
                Popuni podatke i počni svoj put ka dugotrajno glatkoj koži
              </p>
            </div>

            <LandingOrderForm product={product} />

            {/* Trust signals after form */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-pink-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Siguran checkout • SSL enkriptovano • Nema skrivenih troškova</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Ograničena zaliha - ostalo još 19 komada</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
            Koliko još sezona ćeš čekati?
          </h2>
          <p className="text-xl md:text-2xl mb-3 opacity-90 font-medium">
            300+ žena je već reklo "Trebala sam ranije"
          </p>
          <p className="text-lg mb-8 opacity-80">
            Ne budi 301. koja žali što je čekala. Naruči danas i počni vidjeti rezultate za mjesec dana.
          </p>

          <button
            onClick={() => scrollToForm("final")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-pink-600 text-lg font-bold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 cursor-pointer mb-6"
          >
            <Sparkles className="w-6 h-6" />
            Da, želim Ice Cool PRO za 175 KM
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> besplatna dostava u BiH
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> Besplatna dostava 1-3 dana
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> Plaćanje pouzećem
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
