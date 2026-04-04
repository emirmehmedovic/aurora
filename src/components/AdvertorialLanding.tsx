"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  Check, Star, Truck, Shield, RotateCcw, ArrowRight,
  ChevronDown, ChevronUp, Banknote, Clock, Quote
} from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import useScrollDepth from "@/hooks/useScrollDepth";
import { trackCtaClick, trackViewContent, trackAddToCart } from "@/lib/analytics";
import type { LandingReview, LandingSpec, LandingVsRow } from "@/components/DirectResponseLanding";

// ─── Content interfaces ──────────────────────────────────────────────────────

export interface AdvertorialCallout {
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
}

export interface AdvertorialSection {
  heading: string;
  paragraphs: string[];
  /** If true, render the inline product callout after this section */
  calloutAfter?: boolean;
  /** Optional inline quote/highlight text */
  highlight?: string;
  /** Optional image description for placeholder */
  imagePlaceholder?: string;
  /** Optional image path for an actual editorial photo */
  imageSrc?: string;
  imageAlt?: string;
  imageAspect?: "landscape" | "portrait" | "square";
}

export interface AdvertorialContent {
  // Publication header
  publicationLabel: string;   // "Aurora Style · Partnerski sadržaj"
  articleCategory: string;    // "Ljepota & Wellness"

  // Article headline
  articleHeadline: string;
  articleDeck: string;

  // Author
  authorName: string;
  authorTitle: string;   // "31 god. · Sarajevo"
  publishDate: string;   // "28. mart 2026."
  readingTime: string;   // "4 minute čitanja"

  // Opening image / hero collage
  heroImageDesc: string;
  heroImageLeftSrc?: string;
  heroImageLeftAlt?: string;
  heroImageRightSrc?: string;
  heroImageRightAlt?: string;

  // Story intro (bold opening paragraph)
  intro: string;

  // Article body sections
  sections: AdvertorialSection[];

  // Inline product callout
  callout: AdvertorialCallout;

  // Bottom of article recap/highlight before reviews
  articleClosingHighlight: string;

  // Social proof
  reviews: LandingReview[];

  // Standard shared sections
  vsSection?: {
    label: string;
    title: string;
    subtitle: string;
    rows: LandingVsRow[];
  };
  skepticSection?: {
    label: string;
    title: string;
    items: { q: string; a: string }[];
  };
  urgencySection?: {
    title: string;
    subtitle: string;
  };

  specs: LandingSpec[];
  closingTitle: string;
  closingText: string;
  /** Optional disclosure note rendered below the byline */
  disclosure?: string;
}

interface AdvertorialProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
    flashes?: string;
    levels?: string;
    cooling?: string;
    weight?: string;
  };
  content: AdvertorialContent;
  comparisonProducts?: Array<{
    name: string;
    price: number;
    flashes: string;
    levels: string;
    cooling: string;
    weight: string;
    slug?: string;
  }>;
}

// ─── Image placeholder components ────────────────────────────────────────────

function ArticleImgPlaceholder({ desc, aspect = "landscape" }: { desc: string; aspect?: "landscape" | "portrait" | "square" }) {
  const heightClass = aspect === "portrait" ? "h-80" : aspect === "square" ? "h-64" : "h-56";
  return (
    <div className={`w-full ${heightClass} rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 my-6`}>
      <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
      <p className="text-sm text-gray-500 text-center px-6 font-medium">📷 {desc}</p>
    </div>
  );
}

function BeforeAfterPlaceholder({ desc }: { desc: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm my-6">
      <div className="grid grid-cols-2">
        <div className="bg-gray-100 h-48 flex flex-col items-center justify-center gap-2 border-r border-gray-200">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Prije</span>
        </div>
        <div className="bg-emerald-50 h-48 flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Nakon</span>
        </div>
      </div>
      <div className="bg-white px-4 py-2.5 text-center border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">📷 {desc}</p>
      </div>
    </div>
  );
}

function ArticleImage({
  src,
  alt,
  aspect = "landscape",
}: {
  src: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square";
}) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[4/5]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[16/10]";

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm my-6 bg-white ${aspectClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </div>
  );
}

// ─── WhatsApp / Viber icons ───────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M19.11 17.41c-.28-.14-1.64-.81-1.9-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01-.18 0-.49.07-.74.35-.25.28-.97.95-.97 2.31s.99 2.69 1.13 2.88c.14.18 1.95 2.97 4.72 4.16.66.28 1.18.45 1.59.57.67.21 1.29.18 1.77.11.54-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.25-.19-.53-.33Z" />
      <path d="M16.01 3.2c-7.07 0-12.8 5.71-12.8 12.75 0 2.25.59 4.45 1.72 6.38L3.1 28.8l6.65-1.73a12.85 12.85 0 0 0 6.26 1.61h.01c7.06 0 12.79-5.71 12.79-12.75 0-3.41-1.33-6.62-3.76-9.03a12.8 12.8 0 0 0-9.04-3.7Zm0 23.31h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.95 1.03 1.05-3.85-.25-.4a10.55 10.55 0 0 1-1.64-5.62c0-5.86 4.79-10.63 10.68-10.63 2.85 0 5.53 1.1 7.54 3.09a10.52 10.52 0 0 1 3.14 7.54c0 5.86-4.8 10.63-10.72 10.63Z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.4 3 15.05c0 3.45 1.56 6.55 4.05 8.73V29l5.11-2.8c1.2.33 2.49.5 3.84.5 7.18 0 13-5.4 13-12.05S23.18 3 16 3Zm6.52 17.38c-.3.84-1.76 1.56-2.43 1.6-.64.04-1.46.12-4.71-1.08-3.92-1.45-6.44-5.03-6.63-5.28-.18-.25-1.6-2.11-1.6-4.03s1.01-2.85 1.37-3.23c.36-.38.78-.47 1.05-.47h.76c.24 0 .56-.09.88.67.33.79 1.12 2.74 1.22 2.94.1.2.16.43.03.68-.12.25-.19.4-.37.61-.18.21-.38.47-.54.63-.18.18-.37.37-.16.72.21.35.95 1.56 2.03 2.53 1.4 1.25 2.57 1.64 2.93 1.83.37.18.58.16.79-.1.21-.25.91-1.04 1.15-1.39.24-.35.48-.29.81-.18.33.11 2.09.97 2.45 1.15.36.18.6.27.69.42.09.14.09.81-.21 1.64Z" />
      <path d="M17.56 8.22c2.82.19 5.08 2.3 5.34 5.06.03.34.32.6.66.57a.61.61 0 0 0 .57-.66c-.31-3.37-3.07-5.98-6.49-6.22a.63.63 0 0 0-.67.57c-.03.34.23.65.59.68Zm-1.02 2.45c1.48.11 2.66 1.21 2.83 2.63.04.34.34.58.69.54.34-.04.58-.35.54-.69-.24-2-1.9-3.55-3.96-3.69a.62.62 0 1 0-.1 1.24Zm-.06 2.52a.62.62 0 0 0-.09 1.24c.18.01.33.15.35.32a.62.62 0 1 0 1.23-.13 1.92 1.92 0 0 0-1.49-1.43Z" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdvertorialLanding({ product, content, comparisonProducts }: AdvertorialProps) {
  const WHATSAPP_PHONE = "38761904759";
  const VIBER_PHONE = "%2B38761904759";

  const [specsOpen, setSpecsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 47, s: 12 });
  const [stockCount, setStockCount] = useState(19);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCalloutImageIndex, setActiveCalloutImageIndex] = useState(0);

  const p = product;
  const c = content;

  const savings = p.compareAtPrice - p.price;
  const discount = Math.round((savings / p.compareAtPrice) * 100);

  const productImages =
    p.images && p.images.length > 0 ? p.images : [p.image || "/slike/PRO/cover-image.png"];
  const productImage = productImages[activeCalloutImageIndex] || productImages[0];

  const allModels = (comparisonProducts && comparisonProducts.length > 0
    ? comparisonProducts
    : [
        { name: "ICE COOL PRO", price: 175, flashes: "999,999", levels: "5", cooling: "Ice Cool™", weight: "~300g", slug: "ice-cool-pro" },
        { name: "ICE COOL Max", price: 190, flashes: "999,999", levels: "5+", cooling: "Ice Cool+™", weight: "~350g", slug: "ice-cool-pro-max" },
        { name: "ICE COOL LITE", price: 165, flashes: "500,000", levels: "3", cooling: "Ice Cool™", weight: "~200g", slug: "ice-cool-lite" },
      ]).map((model) => ({
        ...model,
        highlight: (model.slug || p.id) === p.id,
      }));

  // Pixel tracking
  useEffect(() => {
    trackViewContent({ id: p.id, name: p.name, price: p.price });
  }, [p.id, p.name, p.price]);

  useScrollDepth(`advertorial-${p.id}`);

  // Countdown timer
  useEffect(() => {
    if (!c.urgencySection) return;
    const endTime = Date.now() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const diff = endTime - Date.now();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    const stockTimer = setInterval(() => {
      setStockCount(prev => prev > 5 ? prev - 1 : prev);
    }, 180000);
    return () => { clearInterval(timer); clearInterval(stockTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToForm = (ctaLocation: string) => {
    trackCtaClick("Naruci", ctaLocation, `advertorial-${p.id}`);
    trackAddToCart({ id: p.id, name: p.name, price: p.price });
    const el = document.getElementById("naruci-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Inline CTA used in multiple spots ──────────────────────────────────────
  const InlineCTA = ({ location }: { location: string }) => (
    <div className="my-8 flex flex-col gap-3">
      <button
        onClick={() => scrollToForm(location)}
        className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Želim glatku kožu — {p.price.toFixed(2)} KM
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
      <div className="text-center bg-white/60 text-[#563435] px-5 py-2.5 rounded-xl font-medium text-sm border border-[#563435]/15 flex items-center justify-center gap-2 shadow-sm">
        <Truck className="w-4 h-4" /> Besplatna dostava · Plaćanje pouzećem · 14 dana povrat
      </div>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Zdravo, želim naručiti ${p.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick("WhatsApp", location, `advertorial-${p.id}`)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-100 hover:shadow-md"
        >
          <WhatsAppIcon />
          <span>WhatsApp narudžba</span>
        </a>
        <a
          href={`viber://chat?number=${VIBER_PHONE}`}
          onClick={() => trackCtaClick("Viber", location, `advertorial-${p.id}`)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:bg-violet-100 hover:shadow-md"
        >
          <ViberIcon />
          <span>Viber narudžba</span>
        </a>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pb-24 bg-gray-50/30 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-amber-50/20 to-transparent pointer-events-none" />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Ice Cool PRO™"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </Link>
          <button
            onClick={() => scrollToForm("navbar")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#563435] text-white font-semibold rounded-full shadow-md hover:bg-[#6d4446] hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
          >
            Naruči — {p.price.toFixed(2)} KM
          </button>
        </div>
      </div>

      {/* ── Publication masthead ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              {c.publicationLabel}
            </span>
          </div>
          <span className="text-xs text-gray-400">{c.publishDate}</span>
        </div>
      </div>

      {/* ── Article wrapper ────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4 relative z-10">

        {/* Category breadcrumb */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#563435] px-3 py-1 bg-[#563435]/8 rounded-full">
            {c.articleCategory}
          </span>
        </div>

        {/* ── Article headline ──────────────────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {c.articleHeadline}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 font-normal">
          {c.articleDeck}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-4 py-5 border-t border-b border-gray-200 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#563435]/20 to-[#563435]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-[#563435]">
              {c.authorName.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">{c.authorName}</p>
            <p className="text-xs text-gray-500">{c.authorTitle}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3" />
              {c.readingTime}
            </p>
          </div>
        </div>

        {/* Disclosure note */}
        {c.disclosure && (
          <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Napomena: </span>{c.disclosure}
          </div>
        )}

        {/* Hero article image */}
        {c.heroImageLeftSrc || c.heroImageRightSrc ? (
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.heroImageLeftSrc ? (
              <ArticleImage
                src={c.heroImageLeftSrc}
                alt={c.heroImageLeftAlt || c.heroImageDesc}
                aspect="portrait"
              />
            ) : null}
            {c.heroImageRightSrc ? (
              <ArticleImage
                src={c.heroImageRightSrc}
                alt={c.heroImageRightAlt || c.heroImageDesc}
                aspect="portrait"
              />
            ) : null}
          </div>
        ) : (
          <BeforeAfterPlaceholder desc={c.heroImageDesc} />
        )}

        {/* ── Article intro ─────────────────────────────────────────────────── */}
        <p className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed mb-6 border-l-4 border-[#563435] pl-5">
          {c.intro}
        </p>

        {/* ── Article body sections ─────────────────────────────────────────── */}
        {c.sections.map((section, si) => (
          <div key={si}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-8 mb-4">
              {section.heading}
            </h2>
            {section.paragraphs.map((para, pi) => (
              <p key={pi} className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                {para}
              </p>
            ))}

            {/* Optional image placeholder */}
            {section.imageSrc ? (
              <ArticleImage
                src={section.imageSrc}
                alt={section.imageAlt || section.imagePlaceholder || section.heading}
                aspect={section.imageAspect || "landscape"}
              />
            ) : section.imagePlaceholder ? (
              <ArticleImgPlaceholder desc={section.imagePlaceholder} />
            ) : null}

            {/* Optional inline highlight/pull-quote */}
            {section.highlight && (
              <div className="my-6 p-5 rounded-2xl bg-[#563435]/5 border-l-4 border-[#563435] relative">
                <Quote className="w-5 h-5 text-[#563435]/40 absolute top-4 left-4" />
                <p className="text-lg font-semibold text-[#563435] pl-6 leading-snug italic">
                  {section.highlight}
                </p>
              </div>
            )}

            {/* Inline product callout after designated section */}
            {section.calloutAfter && (
              <div className="my-8 rounded-3xl overflow-hidden border border-[#563435]/20 shadow-lg bg-white">
                {/* Callout header */}
                <div className="bg-[#563435] px-6 py-4 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    {c.callout.badge}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Product image */}
                    <div className="w-full md:w-56 flex-shrink-0">
                      <div className="md:hidden -mx-1 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3">
                        <div className="flex gap-3 px-1">
                          {productImages.map((image, idx) => (
                            <button
                              key={`${image}-${idx}`}
                              type="button"
                              onClick={() => setActiveCalloutImageIndex(idx)}
                              className="relative min-w-[85%] snap-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm"
                            >
                              <div className="relative h-80">
                                <Image
                                  src={image}
                                  alt={`${p.name} slika ${idx + 1}`}
                                  fill
                                  className="object-cover object-center"
                                  sizes="85vw"
                                />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:block relative w-full h-72 rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                          src={productImage}
                          alt={p.name}
                          fill
                          className="object-cover object-center"
                          sizes="224px"
                        />
                      </div>

                      {productImages.length > 1 && (
                        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                          {productImages.map((image, idx) => (
                            <button
                              key={`${image}-thumb-${idx}`}
                              type="button"
                              onClick={() => setActiveCalloutImageIndex(idx)}
                              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                                activeCalloutImageIndex === idx
                                  ? "border-[#563435] shadow-md"
                                  : "border-gray-200 opacity-80 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`${p.name} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                        {p.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">{c.callout.subtitle}</p>
                      <ul className="space-y-2 mb-5">
                        {c.callout.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-2.5 text-gray-700 text-sm">
                            <div className="w-5 h-5 rounded-full bg-[#563435]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#563435]" strokeWidth={3} />
                            </div>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-bold text-[#563435]">{p.price.toFixed(2)} KM</span>
                        <span className="text-lg text-gray-400 line-through">{p.compareAtPrice.toFixed(2)} KM</span>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          -{discount}%
                        </span>
                      </div>
                      <button
                        onClick={() => scrollToForm("callout")}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#563435] hover:bg-[#6d4446] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                      >
                        Naruči odmah <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ── Article closing highlight ─────────────────────────────────────── */}
        <div className="my-8 p-6 rounded-2xl bg-amber-50 border border-amber-200">
          <p className="text-base md:text-lg font-semibold text-amber-900 leading-relaxed">
            {c.articleClosingHighlight}
          </p>
        </div>

        <InlineCTA location="article-close" />
      </div>

      {/* ── Full-width sections ─────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 relative z-10">

        {/* ── Reviews ─────────────────────────────────────────────────────────── */}
        {c.reviews.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
                Čitatelji pišu
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Šta kažu žene koje su probale
              </h2>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-gray-500">4.9 · 30+ recenzija</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.reviews.map((review, i) => (
                <div
                  key={i}
                  className="overflow-hidden bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm"
                >
                  {review.imageSrc ? (
                    <div className="relative aspect-[4/5] w-full bg-gray-100">
                      <Image
                        src={review.imageSrc}
                        alt={review.imageAlt || `${review.name} testimonial`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#563435]/20 to-[#563435]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#563435]">{review.name[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                          <span className="text-xs text-gray-400">{review.age} god.</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs text-gray-400">{review.location} · {review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VS Comparison Table ──────────────────────────────────────────────── */}
        {c.vsSection && (
          <div className="mb-16">
            <div className="text-center mb-8">
              {c.vsSection.label && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#563435]/8 text-[#563435] text-xs font-bold uppercase tracking-widest mb-3">
                  {c.vsSection.label}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {c.vsSection.title}
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">{c.vsSection.subtitle}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_auto_auto] text-sm">
                <div className="p-4 font-semibold text-gray-500 border-b border-gray-100" />
                <div className="p-4 text-center font-bold text-gray-500 border-b border-gray-100 border-l border-gray-100">
                  Salon / vosak
                </div>
                <div className="p-4 text-center font-bold text-[#563435] border-b border-gray-100 border-l border-gray-100 bg-[#563435]/5">
                  {p.name}
                </div>
                {c.vsSection.rows.map((row, i) => (
                  <Fragment key={i}>
                    <div className="p-4 text-gray-700 border-b border-gray-50 last:border-0">
                      {row.salon.split("|")[0]}
                    </div>
                    <div className="p-4 text-center text-red-500 border-b border-gray-50 border-l border-gray-100 last:border-0">
                      {row.salon.split("|")[1] || "✗"}
                    </div>
                    <div className="p-4 text-center text-emerald-600 font-medium border-b border-gray-50 border-l border-gray-100 bg-[#563435]/3 last:border-0">
                      {row.ipl}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FAQ / Skeptic Section ─────────────────────────────────────────── */}
        {c.skepticSection && (
          <div className="mb-16">
            <div className="text-center mb-8">
              {c.skepticSection.label && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#563435]/8 text-[#563435] text-xs font-bold uppercase tracking-widest mb-3">
                  {c.skepticSection.label}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {c.skepticSection.title}
              </h2>
            </div>
            <div className="space-y-3">
              {c.skepticSection.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-5 h-5 text-[#563435] flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Urgency / Timer Section ───────────────────────────────────────── */}
        {c.urgencySection && (
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-sm border border-[#563435]/15">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#563435]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#563435]">
                  {c.urgencySection.title}
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">{c.urgencySection.subtitle}</p>

                {/* Timer */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  {[
                    { val: timeLeft.h, label: "sati" },
                    { val: timeLeft.m, label: "min" },
                    { val: timeLeft.s, label: "sek" },
                  ].map(({ val, label }, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white/80 border border-[#563435]/20 rounded-2xl flex items-center justify-center shadow-sm">
                        <span className="text-3xl md:text-4xl font-bold text-[#563435] tabular-nums">
                          {String(val).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1.5 uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Stock badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-[#563435]/20 text-[#563435] text-sm font-semibold mb-8">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Samo {stockCount} komada na stanju
                </div>

                <div className="max-w-md mx-auto">
                  <InlineCTA location="urgency" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Specs accordion ───────────────────────────────────────────────── */}
        {c.specs.length > 0 && (
          <div className="mb-16">
            <button
              onClick={() => setSpecsOpen(!specsOpen)}
              className="w-full flex items-center justify-between p-5 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm cursor-pointer"
            >
              <span className="font-semibold text-gray-800">Tehničke specifikacije — {p.name}</span>
              {specsOpen
                ? <ChevronUp className="w-5 h-5 text-[#563435]" />
                : <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </button>
            {specsOpen && (
              <div className="mt-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
                {c.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 p-4 ${i % 2 === 0 ? "bg-white/30" : ""} border-b border-gray-100 last:border-0`}
                  >
                    <span className="text-sm text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-sm text-gray-800 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Closing CTA Block ─────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="bg-[#563435] rounded-[3rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {c.closingTitle}
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-4">
                {c.closingText}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Besplatna dostava</span>
                <span className="flex items-center gap-1.5"><Banknote className="w-4 h-4" /> Plaćanje pouzećem</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> 14 dana povrat</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 12 mj. garancija</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Order form ────────────────────────────────────────────────────── */}
        <div className="mb-12 scroll-mt-8" id="naruci-form">
          <LandingOrderForm product={p} />
        </div>

        {/* ── Model comparison table ────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Koji model je pravi za tebe?
          </h2>
          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200/50">
                    <th className="text-left p-4 text-gray-500 font-medium">Model</th>
                    <th className="text-center p-4 text-gray-500 font-medium">Cijena</th>
                    <th className="text-center p-4 text-gray-500 font-medium">Bljeskovi</th>
                    <th className="text-center p-4 text-gray-500 font-medium">Nivoi</th>
                    <th className="text-center p-4 text-gray-500 font-medium">Hlađenje</th>
                  </tr>
                </thead>
                <tbody>
                  {allModels.map((model, i) => (
                    <tr key={i} className={`border-b border-gray-100 last:border-0 ${model.highlight ? "bg-[#563435]/5" : ""}`}>
                      <td className="p-4 font-semibold text-gray-800">
                        {model.name}
                        {model.highlight && (
                          <span className="ml-2 text-xs bg-[#563435] text-white px-2 py-0.5 rounded-full">
                            Gledate ovaj
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center font-bold text-[#563435]">
                        {model.price.toFixed(2)} KM
                      </td>
                      <td className="p-4 text-center text-gray-700">{model.flashes}</td>
                      <td className="p-4 text-center text-gray-700">{model.levels}</td>
                      <td className="p-4 text-center text-gray-700">{model.cooling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Svi modeli dolaze s besplatnom dostavom u BiH, 12 mjeseci garancije i 14 dana prava na povrat.
          </p>
        </div>

      </div>
    </main>
  );
}
