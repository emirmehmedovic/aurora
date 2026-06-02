"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
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
}

interface CleanSocialProofProps {
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
  features: string[];
  ctaText: string;
}

export default function CleanSocialProof({
  product,
  testimonials,
  heroTitle,
  heroSubtitle,
  features,
  ctaText,
}: CleanSocialProofProps) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    trackViewContent({ id: product.id, name: product.name, price: product.price });
  }, [product.id, product.name, product.price]);

  const scrollToForm = (location: string) => {
    trackCtaClick("Naruci", location, `clean-social-${product.id}`);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>
          <button
            onClick={() => scrollToForm("header")}
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Naruči - {product.price} KM
          </button>
        </div>
      </header>

      {/* Hero - Clean & Minimal */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {heroSubtitle}
        </p>

        {/* Simple Stats */}
        <div className="flex items-center justify-center gap-8 mb-12 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900" />
              ))}
            </div>
            <span>4.9/5</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <span>300+ korisnica</span>
        </div>

        <button
          onClick={() => scrollToForm("hero")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {ctaText}
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Testimonials - Simple Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
          Stvarna iskustva
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors">
              <div className="relative h-80">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <p className="text-gray-900 font-medium mb-4 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features - Clean List */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Zašto Ice Cool PRO?
        </h2>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4 p-4">
              <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing - Simple */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>

          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-5xl font-bold text-gray-900">{product.price} KM</span>
            <span className="text-xl text-gray-400 line-through">{product.compareAtPrice} KM</span>
          </div>

          <button
            onClick={() => scrollToForm("pricing")}
            className="w-full py-4 bg-gray-900 text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer mb-6"
          >
            Naruči odmah
          </button>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Besplatna dostava 1-3 dana</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>14 dana garancija povrata</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Plaćanje pouzećem</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials - Simple Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Svi komentari
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t.name}, {t.age}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">"{t.story}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form */}
      {showForm && (
        <section id="order-form" className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Završi narudžbu
          </h2>
          <LandingOrderForm product={product} />
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2026 Aurora Shop. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  );
}
