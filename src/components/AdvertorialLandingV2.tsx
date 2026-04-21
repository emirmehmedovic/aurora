"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  Check, Star, Truck, Shield, RotateCcw, ArrowRight,
  ChevronDown, ChevronUp, Banknote, Clock,
} from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import useScrollDepth from "@/hooks/useScrollDepth";
import { trackCtaClick, trackViewContent, trackAddToCart } from "@/lib/analytics";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import type { LandingSpec, LandingVsRow } from "@/components/DirectResponseLanding";

// ─── Theme system ─────────────────────────────────────────────────────────────
//
// V2 has three STRUCTURALLY different hero layouts:
//   'split'    — 50/50 desktop grid: text left + portrait image right (summer)
//   'band'     — full-width pastel band with centered text, landscape image below (fresh)
//   'centered' — centered big headline, then wide landscape image below it (confident)

export type AdvertorialV2Theme = 'summer' | 'fresh' | 'confident';

interface V2Config {
  heroStyle: 'split' | 'band' | 'centered';
  // Page
  pageBg: string;
  accentBar: string | null;
  // Hero band bg (used only for 'band' style)
  heroBandBg: string;
  // Category badge
  badge: string;
  // Hero image ring color
  heroRing: string;
  // Stats strip
  statsBg: string;
  statValue: string;
  statLabel: string;
  statsDivider: string;
  // Intro paragraph
  introBg: string;
  introBorder: string;
  // Section decoration
  sectionNum: string;        // large decorative number color
  sectionHeading: string;    // h2 classes
  // Pull-quote full-bleed band
  pullBg: string;
  pullText: string;
  pullMark: string;
  // Callout
  calloutHeader: string;
  calloutBorder: string;
  // Closing highlight box (above inline CTA)
  closingBg: string;
  closingText: string;
  // Reviews
  reviewBg: string;
  reviewAvatar: string;
  reviewAvatarText: string;
  reviewBadge: string;
  // Byline avatar
  bylineAvatar: string;
  bylineAvatarText: string;
}

const V2: Record<AdvertorialV2Theme, V2Config> = {
  // ── summer ──────────────────────────────────────────────────────────────────
  // Split hero. Nježni breskva/bež/blush — toplina bez jarkih tonova.
  summer: {
    heroStyle: 'split',
    pageBg: 'bg-gradient-to-br from-rose-50/60 via-pink-50/20 to-white',
    accentBar: 'h-[2px] bg-gradient-to-r from-rose-200 via-pink-200 to-rose-100',
    heroBandBg: '',
    badge: 'bg-rose-100/80 text-rose-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full',
    heroRing: 'ring-2 ring-rose-100',
    statsBg: 'bg-rose-50/80 border-y border-rose-100',
    statValue: 'text-3xl md:text-4xl font-bold text-rose-400',
    statLabel: 'text-rose-300 text-xs uppercase tracking-wide mt-1',
    statsDivider: 'border-rose-100',
    introBg: 'bg-rose-50/60',
    introBorder: 'border-l-[4px] border-rose-200',
    sectionNum: 'text-rose-150',
    sectionHeading: 'text-xl md:text-2xl font-bold text-gray-800',
    pullBg: 'bg-rose-50',
    pullText: 'text-rose-700 text-xl md:text-2xl font-semibold italic leading-relaxed',
    pullMark: 'text-rose-200',
    calloutHeader: 'bg-rose-200',
    calloutBorder: 'border border-rose-100',
    closingBg: 'bg-rose-50/70 border border-rose-100',
    closingText: 'text-rose-800',
    reviewBg: 'bg-white border border-rose-100 shadow-sm',
    reviewAvatar: 'from-rose-200/40 to-pink-100/30',
    reviewAvatarText: 'text-rose-400',
    reviewBadge: 'bg-rose-50 text-rose-400',
    bylineAvatar: 'bg-rose-100/70',
    bylineAvatarText: 'text-rose-400',
  },

  // ── fresh ────────────────────────────────────────────────────────────────────
  // Band hero. Nježna lavanda — pastelno, umirujuće, ženstveno.
  fresh: {
    heroStyle: 'band',
    pageBg: 'bg-gradient-to-br from-purple-50/40 via-violet-50/20 to-white',
    accentBar: 'h-[2px] bg-gradient-to-r from-purple-200 via-violet-200 to-purple-100',
    heroBandBg: 'bg-gradient-to-r from-purple-50/70 via-violet-50/40 to-purple-50/70',
    badge: 'bg-purple-100/80 text-purple-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full',
    heroRing: 'ring-2 ring-purple-100',
    statsBg: 'bg-purple-50/70 border-y border-purple-100',
    statValue: 'text-3xl md:text-4xl font-bold text-purple-400',
    statLabel: 'text-purple-300 text-xs uppercase tracking-wide mt-1',
    statsDivider: 'border-purple-100',
    introBg: 'bg-purple-50/50',
    introBorder: 'border-l-[4px] border-purple-200',
    sectionNum: 'text-purple-200',
    sectionHeading: 'text-xl md:text-2xl font-bold text-gray-800',
    pullBg: 'bg-purple-50',
    pullText: 'text-purple-700 text-lg md:text-xl font-medium italic leading-relaxed',
    pullMark: 'text-purple-200',
    calloutHeader: 'bg-purple-200',
    calloutBorder: 'border border-purple-100',
    closingBg: 'bg-purple-50/70 border-l-4 border-purple-200 border border-purple-100',
    closingText: 'text-purple-800',
    reviewBg: 'bg-white border-l-[3px] border-purple-200 border border-purple-50 shadow-sm',
    reviewAvatar: 'from-purple-200/40 to-violet-100/30',
    reviewAvatarText: 'text-purple-400',
    reviewBadge: 'bg-purple-50 text-purple-400',
    bylineAvatar: 'bg-purple-100/70',
    bylineAvatarText: 'text-purple-400',
  },

  // ── confident ────────────────────────────────────────────────────────────────
  // Centered hero. Nježna mauve/nude — elegantno, sofisticirano, ženstveno.
  confident: {
    heroStyle: 'centered',
    pageBg: 'bg-gradient-to-br from-pink-50/50 via-fuchsia-50/10 to-white',
    accentBar: 'h-[2px] bg-gradient-to-r from-pink-200 via-fuchsia-200 to-pink-100',
    heroBandBg: '',
    badge: 'text-pink-400 text-xs font-semibold uppercase tracking-[0.2em] border border-pink-200 rounded-full px-3 py-1',
    heroRing: 'ring-2 ring-pink-100',
    statsBg: 'bg-pink-50/80 border-y border-pink-100',
    statValue: 'text-3xl md:text-4xl font-bold text-pink-400',
    statLabel: 'text-pink-300 text-xs uppercase tracking-wide mt-1',
    statsDivider: 'border-pink-100',
    introBg: 'bg-pink-50/50',
    introBorder: 'border-t border-b border-pink-200',
    sectionNum: 'text-pink-200',
    sectionHeading: 'text-xl md:text-2xl font-bold text-gray-800',
    pullBg: 'bg-pink-50',
    pullText: 'text-pink-700 text-xl md:text-2xl font-semibold italic leading-snug',
    pullMark: 'text-pink-200',
    calloutHeader: 'bg-pink-200',
    calloutBorder: 'border border-pink-100',
    closingBg: 'bg-pink-50/70 border border-pink-100',
    closingText: 'text-pink-800',
    reviewBg: 'bg-white border border-pink-100 shadow-sm',
    reviewAvatar: 'from-pink-200/40 to-fuchsia-100/20',
    reviewAvatarText: 'text-pink-400',
    reviewBadge: 'bg-pink-50 text-pink-400',
    bylineAvatar: 'bg-pink-100/70',
    bylineAvatarText: 'text-pink-400',
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdvertorialV2Props {
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
  theme: AdvertorialV2Theme;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function Img({
  src,
  alt,
  aspect = "landscape",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square";
  className?: string;
}) {
  const aspectCls =
    aspect === "portrait" ? "aspect-[4/5]" : aspect === "square" ? "aspect-square" : "aspect-[16/10]";
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-gray-100 ${aspectCls} ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdvertorialLandingV2({ product, content, comparisonProducts, theme }: AdvertorialV2Props) {
  const t = V2[theme];
  const WHATSAPP_PHONE = "38761904759";
  const VIBER_PHONE = "%2B38761904759";

  const [specsOpen, setSpecsOpen] = useState(false);
  const [stockCount] = useState(19);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCalloutImageIndex, setActiveCalloutImageIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

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

  useEffect(() => {
    trackViewContent({ id: p.id, name: p.name, price: p.price });
  }, [p.id, p.name, p.price]);

  useScrollDepth(`advertorial-v2-${p.id}`);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("v2-hero-anchor");
      if (el) setShowStickyBar(el.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (ctaLocation: string) => {
    trackCtaClick("Naruci", ctaLocation, `advertorial-v2-${p.id}`);
    trackAddToCart({ id: p.id, name: p.name, price: p.price });
    const el = document.getElementById("naruci-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Shared inline CTA ──────────────────────────────────────────────────────
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
          onClick={() => trackCtaClick("WhatsApp", location, `advertorial-v2-${p.id}`)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-100 hover:shadow-md"
        >
          <WhatsAppIcon />
          <span>WhatsApp narudžba</span>
        </a>
        <a
          href={`viber://chat?number=${VIBER_PHONE}`}
          onClick={() => trackCtaClick("Viber", location, `advertorial-v2-${p.id}`)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:bg-violet-100 hover:shadow-md"
        >
          <ViberIcon />
          <span>Viber narudžba</span>
        </a>
      </div>
    </div>
  );

  // ── Byline snippet ────────────────────────────────────────────────────────
  const Byline = ({ align = "left" }: { align?: "left" | "center" }) => (
    <div className={`flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 ${align === "center" ? "justify-center" : ""}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${t.bylineAvatar}`}>
        <span className={`font-bold text-sm ${t.bylineAvatarText}`}>
          {c.authorName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
      </div>
      <div className={align === "center" ? "text-left" : ""}>
        <p className="font-semibold text-sm text-gray-800">{c.authorName}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          {c.authorTitle}
          <span className="opacity-40">·</span>
          <Clock className="w-3 h-3" />
          {c.readingTime}
        </p>
      </div>
      {align === "left" && (
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-400">{c.publishDate}</p>
        </div>
      )}
    </div>
  );

  // ── Highlights / stats ─────────────────────────────────────────────────────
  const defaultHighlights = [
    { value: "6–8", label: "sedmica do rezultata" },
    { value: "70–80%", label: "smanjenje dlačica" },
    { value: "jednom", label: "plaćanje za godinu" },
  ];
  const highlights = c.highlights && c.highlights.length > 0 ? c.highlights : defaultHighlights;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <main className={`min-h-screen pb-24 relative overflow-hidden ${t.pageBg}`}>

      {/* ── Accent bar ─────────────────────────────────────────────────────── */}
      {t.accentBar && <div className={`w-full ${t.accentBar}`} />}

      {/* ── Sticky nav ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Aurora"
              width={54}
              height={54}
              className="rounded-xl"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-gray-500 font-medium">{c.publicationLabel}</span>
            <button
              onClick={() => scrollToForm("navbar")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#563435] text-white font-semibold rounded-full shadow-md hover:bg-[#6d4446] hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
            >
              Naruči — {p.price.toFixed(2)} KM
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — three distinct layouts
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── SPLIT hero (summer) ─────────────────────────────────────────────
          Desktop: text left 50% / portrait image right 50%
          Mobile:  image on top, text below
      ──────────────────────────────────────────────────────────────────── */}
      {t.heroStyle === "split" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16" id="v2-hero-anchor">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text column */}
            <div className="order-2 md:order-1">
              <span className={t.badge}>{c.articleCategory}</span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight">
                {c.articleHeadline}
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                {c.articleDeck}
              </p>
              <Byline />
            </div>
            {/* Image column */}
            <div className="order-1 md:order-2 flex items-center justify-center">
              {(c.heroImageRightSrc || c.heroImageLeftSrc) ? (
                <div className={`relative w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-2xl ${t.heroRing}`}
                  style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={c.heroImageRightSrc || c.heroImageLeftSrc || ""}
                    alt={c.heroImageRightAlt || c.heroImageDesc}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 420px"
                    priority
                  />
                </div>
              ) : (
                <div className={`w-full max-w-sm mx-auto rounded-3xl bg-amber-100 shadow-xl ${t.heroRing}`}
                  style={{ aspectRatio: "4/5" }} />
              )}
            </div>
          </div>
          {/* Second hero image (left) shown below on both mobile and desktop, smaller */}
          {c.heroImageLeftSrc && c.heroImageRightSrc && (
            <div className="mt-6 md:flex md:justify-start">
              <div className={`relative w-full md:w-72 h-52 rounded-2xl overflow-hidden shadow-md ${t.heroRing}`}>
                <Image
                  src={c.heroImageLeftSrc}
                  alt={c.heroImageLeftAlt || c.heroImageDesc}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 288px"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── BAND hero (fresh) ───────────────────────────────────────────────
          Full-width soft-green band with centered text.
          Landscape image breaks out below the band.
      ──────────────────────────────────────────────────────────────────── */}
      {t.heroStyle === "band" && (
        <>
          <div className={`w-full ${t.heroBandBg} py-12 md:py-20`} id="v2-hero-anchor">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <span className={t.badge}>{c.articleCategory}</span>
              <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {c.articleHeadline}
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {c.articleDeck}
              </p>
              <Byline align="center" />
            </div>
          </div>
          {/* Hero image slides out below the band */}
          {(c.heroImageRightSrc || c.heroImageLeftSrc) && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
              <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl ${t.heroRing}`}
                style={{ aspectRatio: "16/9" }}>
                <Image
                  src={c.heroImageRightSrc || c.heroImageLeftSrc || ""}
                  alt={c.heroImageRightAlt || c.heroImageDesc}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* ── CENTERED hero (confident) ───────────────────────────────────────
          Big centered headline. Then a wide panoramic image below.
      ──────────────────────────────────────────────────────────────────── */}
      {t.heroStyle === "centered" && (
        <>
          <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 pb-10 text-center" id="v2-hero-anchor">
            <span className={t.badge}>{c.articleCategory}</span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {c.articleHeadline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {c.articleDeck}
            </p>
            <Byline align="center" />
          </div>
          {/* Wide panoramic hero image */}
          {(c.heroImageRightSrc || c.heroImageLeftSrc) && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-4">
              <div className={`relative w-full rounded-3xl overflow-hidden shadow-2xl ${t.heroRing}`}
                style={{ aspectRatio: "21/9" }}>
                <Image
                  src={c.heroImageRightSrc || c.heroImageLeftSrc || ""}
                  alt={c.heroImageRightAlt || c.heroImageDesc}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          STATS STRIP — three visual data points
          This section doesn't exist in V1 at all.
      ══════════════════════════════════════════════════════════════════════ */}
      <div className={`w-full ${t.statsBg}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 divide-x">
            {highlights.map((h, i) => (
              <div key={i} className={`flex flex-col items-center justify-center py-6 px-4 text-center ${i > 0 ? `border-l ${t.statsDivider}` : ""}`}>
                <span className={t.statValue}>{h.value}</span>
                <span className={t.statLabel}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ARTICLE CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-4">

        {/* Disclosure */}
        {c.disclosure && (
          <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Napomena: </span>{c.disclosure}
          </div>
        )}

        {/* ── Intro paragraph ─────────────────────────────────────────────── */}
        <div className={`rounded-r-2xl px-6 py-5 mb-8 ${t.introBg} ${t.introBorder}`}>
          <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
            {c.intro}
          </p>
        </div>

        {/* ── Article sections ─────────────────────────────────────────────── */}
        {c.sections.map((section, si) => {
          const hasImage = !!(section.imageSrc);
          // Alternate image side: even → image on right, odd → image on left
          const imageOnRight = si % 2 === 0;

          return (
            <div key={si} className="mb-10">
              {hasImage ? (
                /* Two-column layout when image present */
                <div className={`grid md:grid-cols-2 gap-6 md:gap-8 items-start ${!imageOnRight ? "md:[&>:first-child]:order-2 md:[&>:last-child]:order-1" : ""}`}>
                  {/* Text side */}
                  <div>
                    {/* Section heading with decorative number */}
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`text-5xl font-bold leading-none select-none flex-shrink-0 -mt-1 ${t.sectionNum}`} aria-hidden>
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <h2 className={`pt-1 ${t.sectionHeading}`}>{section.heading}</h2>
                    </div>
                    {section.paragraphs.map((para, pi) => (
                      <p key={pi} className="text-gray-700 leading-relaxed mb-4 text-base md:text-[1.05rem]">{para}</p>
                    ))}
                  </div>
                  {/* Image side */}
                  <div>
                    <Img
                      src={section.imageSrc!}
                      alt={section.imageAlt || section.heading}
                      aspect={section.imageAspect || "portrait"}
                      className={`shadow-lg ${t.heroRing.replace("ring-4", "ring-2")}`}
                    />
                  </div>
                </div>
              ) : (
                /* Full-width layout when no image */
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`text-5xl font-bold leading-none select-none flex-shrink-0 -mt-1 ${t.sectionNum}`} aria-hidden>
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h2 className={`pt-1 ${t.sectionHeading}`}>{section.heading}</h2>
                  </div>
                  {section.paragraphs.map((para, pi) => (
                    <p key={pi} className="text-gray-700 leading-relaxed mb-4 text-base md:text-[1.05rem]">{para}</p>
                  ))}
                </div>
              )}

              {/* ── Full-bleed pull quote ───────────────────────────────────
                  Breaks out of the 3xl container using negative margins.
                  V1 shows these as inline bordered boxes — here they are full-width color bands.
              ─────────────────────────────────────────────────────────── */}
              {section.highlight && (
                <div className={`-mx-4 sm:-mx-6 my-8 px-6 sm:px-12 py-10 ${t.pullBg}`}>
                  <div className="max-w-2xl mx-auto relative">
                    <span className={`absolute -top-6 -left-2 text-7xl leading-none font-serif select-none ${t.pullMark}`} aria-hidden>"</span>
                    <p className={`pl-6 ${t.pullText}`}>{section.highlight}</p>
                    <span className={`absolute -bottom-4 -right-2 text-7xl leading-none font-serif select-none rotate-180 ${t.pullMark}`} aria-hidden>"</span>
                  </div>
                </div>
              )}

              {/* ── Inline product callout ─────────────────────────────── */}
              {section.calloutAfter && (
                <div className={`my-8 rounded-3xl overflow-hidden shadow-lg bg-white ${t.calloutBorder}`}>
                  <div className={`${t.calloutHeader} px-6 py-4`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                      {c.callout.badge}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Product image */}
                      <div className="w-full md:w-52 flex-shrink-0">
                        <div className="md:hidden -mx-1 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3">
                          <div className="flex gap-3 px-1">
                            {productImages.map((image, idx) => (
                              <button
                                key={`${image}-${idx}`}
                                type="button"
                                onClick={() => setActiveCalloutImageIndex(idx)}
                                className="relative min-w-[85%] snap-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                              >
                                <div className="relative h-72">
                                  <Image src={image} alt={`${p.name} slika ${idx + 1}`} fill className="object-cover" sizes="85vw" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="hidden md:block relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100">
                          <Image src={productImage} alt={p.name} fill className="object-cover" sizes="208px" />
                        </div>
                        {productImages.length > 1 && (
                          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                            {productImages.map((image, idx) => (
                              <button
                                key={`${image}-thumb-${idx}`}
                                type="button"
                                onClick={() => setActiveCalloutImageIndex(idx)}
                                className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                                  activeCalloutImageIndex === idx ? "border-[#563435] shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"
                                }`}
                              >
                                <Image src={image} alt={`thumb ${idx + 1}`} fill className="object-cover" sizes="56px" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
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
                          <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-{discount}%</span>
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
          );
        })}

        {/* ── Article closing highlight ─────────────────────────────────────── */}
        <div className={`my-8 p-6 rounded-2xl ${t.closingBg}`}>
          <p className={`text-base md:text-lg font-semibold leading-relaxed ${t.closingText}`}>
            {c.articleClosingHighlight}
          </p>
        </div>

        <InlineCTA location="article-close" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FULL-WIDTH SECTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">

        {/* ── Reviews — large quote-mark style cards ──────────────────────── */}
        {c.reviews.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${t.reviewBadge}`}>
                Čitaoci pišu
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Šta kažu žene koje su probale</h2>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-gray-500">4.9 · 30+ recenzija</span>
              </div>
            </div>

            {/* Review cards: 2-col grid with different styling from V1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.reviews.map((review, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${t.reviewBg}`}>
                  {review.imageSrc && (
                    <div className="relative aspect-[4/5] w-full bg-gray-100">
                      <Image src={review.imageSrc} alt={review.imageAlt || `${review.name} testimonial`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  )}
                  <div className="p-6 relative">
                    {/* Large decorative quote mark — different from V1's small Quote icon */}
                    <span className={`absolute top-3 right-5 text-6xl leading-none font-serif select-none opacity-20 ${t.reviewAvatarText}`} aria-hidden>"</span>
                    <div className="flex items-center gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 relative z-10">{review.text}</p>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${t.reviewAvatar}`}>
                        <span className={`text-xs font-bold ${t.reviewAvatarText}`}>{review.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-xs">{review.name}, {review.age} god.</p>
                        <p className="text-xs text-gray-400">{review.location} · {review.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VS Comparison table ────────────────────────────────────────── */}
        {c.vsSection && (
          <div className="mb-16">
            <div className="text-center mb-8">
              {c.vsSection.label && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${t.reviewBadge}`}>
                  {c.vsSection.label}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{c.vsSection.title}</h2>
              <p className="text-gray-500 max-w-lg mx-auto">{c.vsSection.subtitle}</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_auto_auto] text-sm">
                <div className="p-4 font-semibold text-gray-400 border-b border-gray-100" />
                <div className="p-4 text-center font-bold text-gray-500 border-b border-gray-100 border-l border-gray-100">Salon / vosak</div>
                <div className="p-4 text-center font-bold text-[#563435] border-b border-gray-100 border-l border-gray-100 bg-[#563435]/5">{p.name}</div>
                {c.vsSection.rows.map((row, i) => (
                  <Fragment key={i}>
                    <div className="p-4 text-gray-700 border-b border-gray-50 last:border-0">{row.salon.split("|")[0]}</div>
                    <div className="p-4 text-center text-red-500 border-b border-gray-50 border-l border-gray-100 last:border-0">{row.salon.split("|")[1] || "✗"}</div>
                    <div className="p-4 text-center text-emerald-600 font-medium border-b border-gray-50 border-l border-gray-100 bg-[#563435]/3 last:border-0">{row.ipl}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        {c.skepticSection && (
          <div className="mb-16">
            <div className="text-center mb-8">
              {c.skepticSection.label && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${t.reviewBadge}`}>
                  {c.skepticSection.label}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{c.skepticSection.title}</h2>
            </div>
            <div className="space-y-3">
              {c.skepticSection.items.map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
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

        {/* ── Urgency section ──────────────────────────────────────────── */}
        {c.urgencySection && (
          <div className="mb-16">
            <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#563435]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#563435]">{c.urgencySection.title}</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">{c.urgencySection.subtitle}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#563435]/20 text-[#563435] text-sm font-semibold mb-8">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Samo {stockCount} komada na stanju
                </div>
                <div className="max-w-md mx-auto"><InlineCTA location="urgency" /></div>
              </div>
            </div>
          </div>
        )}

        {/* ── Specs accordion ──────────────────────────────────────────── */}
        {c.specs.length > 0 && (
          <div className="mb-16">
            <button
              onClick={() => setSpecsOpen(!specsOpen)}
              className="w-full flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer"
            >
              <span className="font-semibold text-gray-800">Tehničke specifikacije — {p.name}</span>
              {specsOpen ? <ChevronUp className="w-5 h-5 text-[#563435]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {specsOpen && (
              <div className="mt-2 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {c.specs.map((spec, i) => (
                  <div key={i} className={`grid grid-cols-2 p-4 ${i % 2 === 0 ? "bg-gray-50/50" : ""} border-b border-gray-100 last:border-0`}>
                    <span className="text-sm text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-sm text-gray-800 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Closing CTA block ─────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="bg-[#563435] rounded-[3rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{c.closingTitle}</h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-4">{c.closingText}</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Besplatna dostava</span>
                <span className="flex items-center gap-1.5"><Banknote className="w-4 h-4" /> Plaćanje pouzećem</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> 14 dana povrat</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 12 mj. garancija</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Order form ───────────────────────────────────────────────── */}
        <div className="mb-12 scroll-mt-8" id="naruci-form">
          <LandingOrderForm product={p} />
        </div>

        {/* ── Model comparison ─────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Koji model je pravi za tebe?</h2>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
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
                        {model.highlight && <span className="ml-2 text-xs bg-[#563435] text-white px-2 py-0.5 rounded-full">Gledate ovaj</span>}
                      </td>
                      <td className="p-4 text-center font-bold text-[#563435]">{model.price.toFixed(2)} KM</td>
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

      {/* ── Sticky bottom bar ──────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-2xl transform transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-gray-800 text-sm">{p.name}</span>
            <span className="text-xs text-gray-500">Samo još {stockCount} na stanju · Dostava 1–2 dana</span>
          </div>
          <button
            onClick={() => scrollToForm("sticky-bottom")}
            className="flex-1 sm:flex-none py-3 px-8 bg-[#563435] hover:bg-[#6d4446] text-white font-bold text-base rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            Naruči odmah — {p.price.toFixed(2)} KM
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
