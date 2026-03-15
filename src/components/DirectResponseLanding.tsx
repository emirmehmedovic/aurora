"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, ArrowRight, Sparkles, Zap, ChevronDown, ChevronUp, Banknote, CreditCard } from "lucide-react";
import LandingOrderForm from "@/components/LandingOrderForm";

export interface LandingReview {
  name: string;
  age: number;
  text: string;
  date: string;
  location: string;
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

export interface LandingContent {
  badge: string;
  heroSubtitle: string;
  benefits: string[];
  empathyTitle: string;
  empathySubtitle: string;
  empathyParagraph1: string;
  empathyParagraph2: string;
  empathyHighlight: string;
  story: LandingStory;
  howItWorks: { step: number; title: string; desc: string }[];
  reviews: LandingReview[];
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
  };
  content: LandingContent;
}

export default function DirectResponseLanding({ product, content }: DirectResponseProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(false);

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

  const allModels = [
    { name: "ICE COOL PRO", price: "175 KM", flashes: "999,999", levels: "5", cooling: "Ice Cool™", weight: "~300g", highlight: p.id === "ice-cool-pro" },
    { name: "ICE COOL Max", price: "190 KM", flashes: "999,999", levels: "5+", cooling: "Ice Cool+™", weight: "~350g", highlight: p.id === "ice-cool-pro-max" },
    { name: "ICE COOL LITE", price: "165 KM", flashes: "500,000", levels: "3", cooling: "Ice Cool™", weight: "~200g", highlight: p.id === "ice-cool-lite" },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('naruci-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const UrgencyCTA = () => (
    <div className="flex flex-col items-center mt-8 mb-8 w-full">
      <button 
        onClick={scrollToForm}
        className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Želim glatku kožu — {p.price.toFixed(2)} KM
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
      <div className="mt-4 text-center bg-white/40 backdrop-blur-md text-[#563435] px-6 py-2.5 rounded-xl font-medium text-sm w-full border border-white/30 shadow-sm flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" /> Besplatna dostava u BiH · Plaćanje pouzećem · Isporuka 1-3 dana
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-gray-50/30">
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
            onClick={scrollToForm}
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {p.name} <br/> <span className="text-[#563435] text-3xl md:text-4xl lg:text-5xl">{c.heroSubtitle}</span>
              </h1>
              
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

              {/* Price Card */}
              <div className="mb-6 p-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm">
                <div className="flex flex-wrap items-baseline gap-4 mb-2">
                  <span className="text-5xl font-bold text-[#563435]">{p.price.toFixed(2)} KM</span>
                  <span className="text-2xl text-gray-400 line-through decoration-2">{p.compareAtPrice.toFixed(2)} KM</span>
                </div>
                <p className="text-sm text-[#563435] font-medium">
                  Ušteda {discount}% ({savings.toFixed(0)} KM)
                </p>
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {c.empathyTitle}
                </h2>
                <p className="text-xl text-gray-600">{c.empathySubtitle}</p>
              </div>
              
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">{c.empathyParagraph1}</p>
                <p className="mb-8">{c.empathyParagraph2}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Žene iz BiH dijele svoja iskustva
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

        {/* SECTION 7: Model Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
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
                    <tr key={i} className={`border-b border-gray-100 last:border-0 ${model.highlight ? 'bg-[#563435]/5' : ''}`}>
                      <td className="p-4 font-semibold text-gray-800">
                        {model.name}
                        {model.highlight && <span className="ml-2 text-xs bg-[#563435] text-white px-2 py-0.5 rounded-full">Gledate ovaj</span>}
                      </td>
                      <td className="p-4 text-center font-bold text-[#563435]">{model.price}</td>
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
        <div className="max-w-5xl mx-auto mb-12 scroll-mt-8">
          <LandingOrderForm product={p} />
        </div>

      </div>
    </main>
  );
}
