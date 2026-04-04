"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, ArrowRight, Sparkles, Zap, ChevronDown, ChevronUp, Banknote, CreditCard } from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";
import useScrollDepth from "@/hooks/useScrollDepth";
import { trackCtaClick, trackViewContent, trackAddToCart } from "@/lib/analytics";

export interface LandingReview {
  name: string;
  age: number;
  text: string;
  date: string;
  location: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface LandingStory {
  title: string;
  text: string;
  authorName: string;
  authorSubtitle: string;
}

export interface LandingSpec {
  label: string;
  value: string;
}

export interface LandingVsRow {
  salon: string;
  ipl: string;
}

export interface LandingContent {
  badge: string;
  heroHeadline?: string;
  heroSubtitle: string;
  heroSubline?: string;
  benefits: string[];
  empathyLabel?: string;
  empathyTitle: string;
  empathySubtitle: string;
  empathyParagraph1: string;
  empathyParagraph2: string;
  empathyParagraph3?: string;
  empathyHighlight: string;
  story: LandingStory;
  howItWorks: { step: number; title: string; desc: string }[];
  urgencySection?: {
    title: string;
    subtitle: string;
  };
  reviews: LandingReview[];
  beforeAfterImages?: {
    image?: string;
    before?: string;
    after?: string;
    label?: string;
  }[];
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
  specs: LandingSpec[];
  closingTitle: string;
  closingText: string;
}

interface DirectResponseProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
    usageImages?: string[];
    flashes?: string;
    levels?: string;
    cooling?: string;
    weight?: string;
  };
  content: LandingContent;
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

export default function DirectResponseLanding({ product, content, comparisonProducts }: DirectResponseProps) {
  const WHATSAPP_PHONE = "38761904759";
  const VIBER_PHONE = "%2B38761904759";
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 47, s: 12 });
  const [stockCount, setStockCount] = useState(23);

  const p = product;
  const c = content;

  const imagesToUse = p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : ["/slike/PRO/cover-image.png"]);
  const activeImage = imagesToUse[activeImageIndex] || imagesToUse[0];
  
  const usageImages = p.usageImages && p.usageImages.length >= 3 
    ? p.usageImages 
    : [
        "/slike/PRO/koristenje1.png",
        "/slike/PRO/koristenje2.png",
        "/slike/PRO/koristenje3.png"
      ];

  const savings = p.compareAtPrice - p.price;
  const discount = Math.round((savings / p.compareAtPrice) * 100);

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

  // Track ViewContent when page loads
  useEffect(() => {
    trackViewContent({
      id: p.id,
      name: p.name,
      price: p.price
    });
  }, [p.id, p.name, p.price]);

  useScrollDepth(`landing-${p.id}`);

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
      setStockCount(prev => prev > 7 ? prev - 1 : prev);
    }, 150000);
    return () => { clearInterval(timer); clearInterval(stockTimer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToForm = (ctaLocation: string) => {
    trackCtaClick('Naruci', ctaLocation, `landing-${p.id}`);
    trackAddToCart({ id: p.id, name: p.name, price: p.price });
    const el = document.getElementById('naruci-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const UrgencyCTA = () => (
    <div className="flex flex-col items-center mt-8 mb-8 w-full">
      <button 
        onClick={() => scrollToForm('urgency-cta')}
        className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Želim glatku kožu — {p.price.toFixed(2)} KM
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
      <div className="mt-4 text-center bg-white/40 backdrop-blur-md text-[#563435] px-6 py-2.5 rounded-xl font-medium text-sm w-full border border-white/30 shadow-sm flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" /> Naruči do 15h — šalje se danas · Plaćanje pouzećem · 14 dana povrat
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Zdravo, želim naručiti ${p.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick("WhatsApp", "landing-contact", `landing-${p.id}`)}
          className="flex items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-100 hover:shadow-md"
        >
          <WhatsAppIcon />
          <span>Naruči preko WhatsApp-a</span>
        </a>
        <a
          href={`viber://chat?number=${VIBER_PHONE}`}
          onClick={() => trackCtaClick("Viber", "landing-contact", `landing-${p.id}`)}
          className="flex items-center justify-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3.5 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:bg-violet-100 hover:shadow-md"
        >
          <ViberIcon />
          <span>Naruči preko Viber-a</span>
        </a>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pb-24 lg:pb-0 relative overflow-hidden bg-gray-50/30">
      {/* Sticky Mobile Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
        <button
          onClick={() => scrollToForm('sticky-bottom')}
          className="w-full py-4 bg-[#563435] hover:bg-[#6d4446] text-white font-bold text-lg rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          Naruči odmah — {p.price.toFixed(2)} KM
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-purple-100/20 to-transparent pointer-events-none" />

      {/* Simplified Landing Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Ice Cool PRO™"
              width={70}
              height={70}
              className="rounded-xl"
            />
          </Link>
          <button 
            onClick={() => scrollToForm('navbar')}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#563435] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            Želim glatku kožu
          </button>
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-[#563435] text-white text-center py-2.5 px-4 text-sm font-semibold tracking-wide relative z-20">
        BESPLATNA DOSTAVA U BIH — PLAĆANJE POUZEĆEM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-12 mb-16 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-semibold w-fit mb-6">
                <Zap className="w-4 h-4 fill-[#563435]" />
                <span>{c.badge}</span>
              </div>
              
              {c.heroHeadline ? (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                  {c.heroHeadline}
                </h1>
              ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  {p.name} <br/> <span className="text-[#563435] text-3xl md:text-4xl lg:text-5xl">{c.heroSubtitle}</span>
                </h1>
              )}
              {c.heroSubline && (
                <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-xl">{c.heroSubline}</p>
              )}
              
              <div className="space-y-3 mb-8 text-lg text-gray-600">
                {c.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#563435]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#563435]" strokeWidth={3} />
                    </div>
                    <p className="leading-tight">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: <Truck className="w-5 h-5 text-green-700" />, text: "Dostava u BiH 1-3 dana" },
                  { icon: <Banknote className="w-5 h-5 text-amber-600" />, text: "Plaćanje pouzećem" },
                  { icon: <RotateCcw className="w-5 h-5 text-purple-700" />, text: "14 dana povrat" },
                  { icon: <Shield className="w-5 h-5 text-blue-700" />, text: "12 mj. garancija" }
                ].map((badge, i) => (
                  <div key={i} className="text-center p-3 bg-white/50 rounded-xl border border-violet-100/50 flex flex-col items-center gap-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">{badge.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">{badge.text}</div>
                  </div>
                ))}
              </div>

              <UrgencyCTA />
            </div>
            
            {/* Right - Product Image Gallery */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[550px] rounded-3xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/30 shadow-inner group">
                <Image 
                  src={activeImage} 
                  alt={`${p.name} IPL uređaj za uklanjanje dlačica`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-6 left-6 bg-[#563435] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                  -{discount}% POPUST
                </div>
              </div>
              
              {/* Thumbnails Row */}
              {imagesToUse.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {imagesToUse.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx 
                          ? "border-[#563435] shadow-md scale-105" 
                          : "border-white/50 hover:border-[#563435]/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${p.name} slika ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Empathy & Story */}
        <div className="max-w-7xl mx-auto mb-20 bg-white/40 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                {c.empathyLabel && (
                  <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">{c.empathyLabel}</div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {c.empathyTitle}
                </h2>
                <p className="text-xl text-gray-600">{c.empathySubtitle}</p>
              </div>
              
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">{c.empathyParagraph1}</p>
                <p className="mb-6">{c.empathyParagraph2}</p>
                {c.empathyParagraph3 && <p className="mb-8">{c.empathyParagraph3}</p>}
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl border border-white/50">
                  <Sparkles className="w-8 h-8 text-[#563435] flex-shrink-0" />
                  <p className="font-bold text-gray-800">{c.empathyHighlight}</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-white/30">
               <Image 
                  src={usageImages[0]} 
                  alt={`Korištenje ${p.name} IPL uređaja`}
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
          </div>
        </div>

        {/* SECTION 2b: Before / After Results */}
        {c.beforeAfterImages && c.beforeAfterImages.length > 0 && (
          <div className="max-w-7xl mx-auto mb-20">
            <div className="text-center mb-10">
              <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">Stvarni rezultati</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Pogledaj razliku
              </h2>
              <p className="text-gray-500 text-lg">Fotografije pravih kupica iz BiH — bez filtera, bez retuša.</p>
            </div>

            <div className={`grid gap-6 ${c.beforeAfterImages.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : c.beforeAfterImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {c.beforeAfterImages.map((pair, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-sm">
                  {pair.image ? (
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={pair.image}
                        alt={pair.label || `Rezultat kupice ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  ) : pair.before && pair.after ? (
                    <div className="grid grid-cols-2 gap-0">
                      {/* BEFORE */}
                      <div className="relative">
                        <div className="relative h-64 md:h-80 bg-gray-100">
                          <Image
                            src={pair.before}
                            alt="Prije tretmana — stanje dlačica"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-gray-700/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                            PRIJE
                          </div>
                        </div>
                      </div>
                      {/* AFTER */}
                      <div className="relative border-l-2 border-white">
                        <div className="relative h-64 md:h-80 bg-gray-100">
                          <Image
                            src={pair.after}
                            alt="Poslije tretmana — glatka koža"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-[#563435]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                            POSLIJE
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {pair.label && (
                    <div className="px-5 py-3 text-center text-sm text-gray-600 font-medium border-t border-gray-100">
                      {pair.label}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-2xl mx-auto text-center">
              <UrgencyCTA />
            </div>
          </div>
        )}

        {/* SECTION 3: First Person Story */}
        <div className="max-w-7xl mx-auto mb-20 bg-gradient-to-br from-[#563435]/5 to-[#8b5a5c]/5 backdrop-blur-md border border-[#563435]/10 rounded-[2.5rem] p-8 md:p-12 pt-14 relative">
          <div className="absolute top-4 left-10 w-10 h-10 bg-[#563435] text-white rounded-full flex items-center justify-center shadow-lg z-10">
            <span className="text-xl font-serif leading-none">&ldquo;</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-white/30 order-2 lg:order-1">
               <Image 
                  src={usageImages[1] || usageImages[0]} 
                  alt={`Rezultati korištenja ${p.name}`}
                  fill 
                  className="object-cover"
                />
            </div>
            
            <div className="order-1 lg:order-2 mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {c.story.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed italic mb-8">
                {c.story.text}
              </p>
              
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#563435] to-[#8b5a5c] flex items-center justify-center text-white font-bold text-xl">
                    {c.story.authorName[0]}
                 </div>
                 <div>
                    <p className="font-bold text-gray-800">{c.story.authorName}</p>
                    <p className="text-sm text-gray-600">{c.story.authorSubtitle}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: How it works */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Lakše nego što misliš
          </h2>
          
          {usageImages[2] && (
            <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-lg border border-white/20">
                <Image 
                  src={usageImages[2]} 
                  alt={`Kako radi ${p.name} IPL uređaj`}
                  fill 
                  className="object-cover"
                />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.howItWorks.map((item, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/50 transition-colors shadow-sm">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 shadow-sm text-[#563435] text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto text-center">
             <UrgencyCTA />
          </div>
        </div>

        {/* URGENCY BAND */}
        {c.urgencySection && (
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#563435]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-bold mb-2">{c.urgencySection.title}</p>
                <p className="text-sm text-gray-400 mb-8">{c.urgencySection.subtitle}</p>
                <div className="flex justify-center items-start gap-2 md:gap-4 mb-8">
                  {[
                    { val: String(timeLeft.h).padStart(2, '0'), label: 'SATI' },
                    { sep: true },
                    { val: String(timeLeft.m).padStart(2, '0'), label: 'MINUTA' },
                    { sep: true },
                    { val: String(timeLeft.s).padStart(2, '0'), label: 'SEKUNDI' },
                  ].map((item, i) =>
                    'sep' in item ? (
                      <span key={i} className="text-4xl font-bold text-[#563435] mt-1">:</span>
                    ) : (
                      <div key={i} className="text-center">
                        <span className="block bg-[#563435] text-white text-3xl md:text-4xl font-bold font-mono px-4 py-2 rounded-xl min-w-[60px] tabular-nums">
                          {item.val}
                        </span>
                        <span className="block text-xs text-gray-500 mt-2 tracking-wider">{item.label}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-yellow-400/30 rounded-full px-5 py-3 text-sm text-yellow-400 font-semibold">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse flex-shrink-0" />
                  Preostalo na akcijskoj cijeni: <strong>{stockCount}</strong> kom.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Technical Specifications */}
        <div className="max-w-3xl mx-auto mb-20">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center justify-between hover:bg-white/50 transition-colors shadow-sm"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Tehničke specifikacije — {p.name}
            </h2>
            {specsOpen ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
          </button>
          {specsOpen && (
            <div className="mt-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
              {c.specs.map((spec, i) => (
                <div key={i} className={`flex items-center justify-between px-6 py-4 ${i !== c.specs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-gray-600 font-medium">{spec.label}</span>
                  <span className="text-gray-800 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 6: Reviews */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">Šta kažu kupice</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Žene iz BiH koje su prestale ići u salon
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
               <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
               <span className="font-bold text-gray-800">4.9/5</span>
               <span>na osnovu recenzija kupaca</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.reviews.map((review, i) => (
              <div key={i} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="font-bold text-gray-800">{review.name}</p>
                       <Check className="w-3.5 h-3.5 text-white bg-green-500 rounded-full p-0.5" />
                    </div>
                    <p className="text-sm text-gray-500">{review.age} godina · {review.location}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#563435] to-[#8b5a5c] flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VS TABLE — Salon vs. Ice Cool PRO */}
        {c.vsSection && (
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-8">
              <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">{c.vsSection.label}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{c.vsSection.title}</h2>
              <p className="text-gray-500">{c.vsSection.subtitle}</p>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-4 text-center text-white font-bold bg-gray-600 text-sm w-1/2">💸 Salon / Vosak</th>
                      <th className="p-4 text-center text-white font-bold bg-[#563435] text-sm w-1/2">✅ Ice Cool PRO™</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.vsSection.rows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="p-4 text-center text-sm text-red-600 bg-red-50/30">{row.salon}</td>
                        <td className="p-4 text-center text-sm text-green-700 font-semibold bg-green-50/30">{row.ipl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SKEPTIC Q&A */}
        {c.skepticSection && (
          <div className="max-w-3xl mx-auto mb-20">
            <div className="text-center mb-8">
              <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">{c.skepticSection.label}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{c.skepticSection.title}</h2>
            </div>
            <div className="space-y-4">
              {c.skepticSection.items.map((item, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-sm hover:bg-white/50 transition-colors">
                  <p className="font-bold text-gray-800 mb-3 text-lg">{item.q}</p>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <UrgencyCTA />
            </div>
          </div>
        )}

        {/* CLOSING MESSAGE */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-[#563435] rounded-[3rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-[#563435]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {c.closingTitle}
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                {c.closingText}
              </p>
            </div>
          </div>
        </div>

        {/* INLINE ORDER FORM */}
        <div className="max-w-5xl mx-auto mb-12 scroll-mt-8" id="naruci-form">
          <LandingOrderForm product={p} />
        </div>

        {/* SECTION 7: Model Comparison Table — ispod forme da ne remeti odluku */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-center text-sm text-gray-500 mb-4">Nisi sigurna koji model odabrati?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Usporedi sve modele
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
                    <tr key={i} className={`border-b border-gray-100 last:border-0 ${model.highlight ? 'bg-[#563435]/5' : ''}`}>
                      <td className="p-4 font-semibold text-gray-800">
                        {model.name}
                        {model.highlight && <span className="ml-2 text-xs bg-[#563435] text-white px-2 py-0.5 rounded-full">Ovaj model</span>}
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
    </main>
  );
}

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
