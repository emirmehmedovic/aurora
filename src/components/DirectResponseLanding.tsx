"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, ArrowRight, Sparkles, Zap, Flame } from "lucide-react";

interface DirectResponseProps {
  product?: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    images?: string[];
    image?: string;
    usageImages?: string[];
  };
}

export default function DirectResponseLanding({ product }: DirectResponseProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Default to Ice Cool PRO if no product provided
  const p = product || {
    id: "ice-cool-pro",
    name: "ICE COOL PRO",
    price: 175.00,
    compareAtPrice: 350.00,
    images: [
      "/slike/PRO/cover-image.png",
      "/slike/PRO/slika2.png",
      "/slike/PRO/slika3.webp",
      "/slike/PRO/slika4.png",
      "/slike/PRO/slika5.png",
      "/slike/PRO/slika6.webp",
      "/slike/PRO/slika7.png"
    ],
    usageImages: [
      "/slike/PRO/koristenje1.png",
      "/slike/PRO/koristenje2.png",
      "/slike/PRO/koristenje3.png",
      "/slike/PRO/koristenje4.png"
    ]
  };

  const imagesToUse = p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : ["/slike/PRO/cover-image.png"]);
  const activeImage = imagesToUse[activeImageIndex] || imagesToUse[0];
  
  // Fallback usage images if none provided in product prop
  const usageImages = p.usageImages && p.usageImages.length >= 3 
    ? p.usageImages 
    : [
        "/slike/PRO/koristenje1.png",
        "/slike/PRO/koristenje2.png",
        "/slike/PRO/koristenje3.png"
      ];

  const savings = p.compareAtPrice - p.price;
  const discount = Math.round((savings / p.compareAtPrice) * 100);

  const UrgencyCTA = () => (
    <div className="flex flex-col items-center mt-8 mb-8 w-full">
      <Link 
        href="/naruci"
        className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Naruči odmah
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Link>
      <div className="mt-4 text-center bg-white/40 backdrop-blur-md text-[#563435] px-6 py-2.5 rounded-xl font-medium text-sm w-full border border-white/30 shadow-sm flex items-center justify-center gap-2">
        <Flame className="w-4 h-4" /> {discount}% popusta vrijedi do večeras (ostalo je 6 komada)
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-gray-50/30">
      {/* Background Elements (Matching ProductLanding) */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-purple-100/20 to-transparent pointer-events-none" />

      {/* Top Banner */}
      <div className="bg-[#563435] text-white text-center py-2.5 px-4 text-sm font-semibold tracking-wide relative z-20">
        BESPLATNA DOSTAVA ZA NARUDŽBE DANAS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* HERO SECTION (Matching HeroSection / ProductLanding structure) */}
        <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-12 mb-16 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-semibold w-fit mb-6">
                <Zap className="w-4 h-4 fill-[#563435]" />
                <span>Najprodavaniji IPL uređaj</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {p.name} <br/> <span className="text-[#563435] text-3xl md:text-4xl lg:text-5xl">Glatka koža koja traje sedmicama</span>
              </h1>
              
              <div className="space-y-3 mb-8 text-lg text-gray-600">
                {[
                  "Bezbolan način da se osjećate samouvjereno",
                  "Profesionalno uklanjanje dlačica kod kuće",
                  "Glatka koža kao iz salona - bez velike cijene",
                  "Udobno hlađenje susreće snažne IPL rezultate",
                ].map((benefit, i) => (
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
                  🔥 Ušteda {discount}% ({savings.toFixed(0)} KM)
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: <Star className="w-5 h-5 text-amber-500" />, text: "Super Akcija" },
                  { icon: <Truck className="w-5 h-5 text-green-700" />, text: "Dostava 24h" },
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
                  alt={`${p.name} slika ${activeImageIndex + 1}`} 
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
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Empathy & Story with Image (Left/Right Layout) */}
        <div className="max-w-7xl mx-auto mb-20 bg-white/40 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  Uživajte u dugotrajno glatkoj koži
                </h2>
                <p className="text-xl text-gray-600">bez boli, pregleda ili svakodnevnog brijanja.</p>
              </div>
              
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Zamislite da se nikada ne morate požurivati s brijanjem u zadnji čas prije izlaska, nikada se ne morate suočiti s udubljenjima od brijanja, iritacijom ili onim grubim ponovnim rastom samo nekoliko dana kasnije. 
                </p>
                <p className="mb-8">
                  S naprednom IPL tehnologijom i ugrađenom udobnošću hlađenja, ovaj uređaj nježno cilja dlačice u korijenu, a istovremeno održava vašu kožu mirnom i ugodnom. Nema skupih posjeta salonu. Nema bolnih depilacija voskom. 
                </p>
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl border border-white/50">
                  <Sparkles className="w-8 h-8 text-[#563435] flex-shrink-0" />
                  <p className="font-bold text-gray-800">
                    Samo glatka, samouvjerena koža koja traje tjednima - sve iz privatnosti vašeg doma.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Image for Empathy Section */}
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-white/30">
               <Image 
                  src={usageImages[0]} 
                  alt="Korištenje IPL uređaja" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
          </div>
        </div>

        {/* SECTION 3: First Person Story with Image */}
        <div className="max-w-7xl mx-auto mb-20 bg-gradient-to-br from-[#563435]/5 to-[#8b5a5c]/5 backdrop-blur-md border border-[#563435]/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-5 left-10 w-12 h-12 bg-[#563435] text-white rounded-full flex items-center justify-center shadow-lg z-10">
            <span className="text-2xl font-serif">"</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-white/30 order-2 lg:order-1">
               <Image 
                  src={usageImages[1] || usageImages[0]} 
                  alt="Rezultati korištenja" 
                  fill 
                  className="object-cover"
                />
            </div>
            
            {/* Text Right */}
            <div className="order-1 lg:order-2 mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Profesionalno uklanjanje dlačica iz udobnosti vašeg doma
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed italic mb-8">
                Godinama sam se borila s brzim rastom dlačica i stalno sam trošila novac na laserske tretmane u salonu. Brijanje mi je izazivalo iritacije i urasle dlačice, a vosak je uvijek bio bolan. Otkako sam počela koristiti ovaj uređaj, konačno imam rezultate kao iz salona — ali bez bolnih termina i bez izlaska iz kuće. Koža mi je glatka sedmicama, a ja se osjećam samopouzdano i mirno jer znam da imam rješenje koje stvarno djeluje.
              </p>
              
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#563435] to-[#8b5a5c] flex items-center justify-center text-white font-bold text-xl">
                    A
                 </div>
                 <div>
                    <p className="font-bold text-gray-800">Amila H.</p>
                    <p className="text-sm text-gray-600">Zadovoljna korisnica</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Tech Specs / 3 Ways it works (Grid Layout) */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Kako {p.name} zapravo radi?
          </h2>
          
          {/* Top image showing the process if available */}
          {usageImages[2] && (
            <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-lg border border-white/20">
                <Image 
                  src={usageImages[2]} 
                  alt="Kako radi IPL" 
                  fill 
                  className="object-cover"
                />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Svjetlosni impulsi",
                desc: "Cilja korijen dlačice naprednom IPL tehnologijom i usporava njezin ponovni rast."
              },
              {
                step: 2,
                title: "Ugrađeno hlađenje",
                desc: "Smanjuje iritaciju zahvaljujući sistemu hlađenja za gotovo bezbolno iskustvo."
              },
              {
                step: 3,
                title: "Dugotrajni rezultati",
                desc: "Omogućuje dugotrajnu glatkoću kože bez svakodnevnog brijanja i bolnih tretmana."
              }
            ].map((item, i) => (
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

        {/* SECTION 6: Reviews (Matching TestimonialsSection) */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Šta kažu naše korisnice
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
               <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
               <span className="font-bold text-gray-800">4.9/5</span>
               <span>(Preko 4.450+ recenzija)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Derva", age: 24,
                text: "Ovo mi je prvi uređaj koji stvarno daje rezultate, a da me ne boli. Nakon par tretmana rast se vidno usporio. Najviše volim što sve mogu obaviti kod kuće za 10 minuta."
              },
              {
                name: "Samanta", age: 31,
                text: "Imam jako osjetljivu kožu. Kod ovog uređaja me oduševilo hlađenje — tretman je stvarno ugodan. Nakon nekoliko sedmica primijetila sam puno sporiji rast."
              },
              {
                name: "Amra", age: 23,
                text: "Godinama sam trošila novac na laserske tretmane u salonu. Ovaj uređaj mi je doslovno uštedio stotine maraka. Efekat je sličan profesionalnom tretmanu. Prezadovoljna sam."
              }
            ].map((review, i) => (
              <div key={i} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="font-bold text-gray-800">{review.name}</p>
                       <Check className="w-3.5 h-3.5 text-white bg-green-500 rounded-full p-0.5" />
                    </div>
                    <p className="text-sm text-gray-600">{review.age} godina</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#563435] to-[#8b5a5c] flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL PITCH (Matching CTA blocks) */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-[#563435] rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-[#563435]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Vrijeme je za glatku kožu <br className="hidden md:block" /> bez svakodnevnog brijanja.
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Većina žena primijeti sporiji rast već nakon prvih tretmana – a to potvrđujemo s 14-dnevnom garancijom povrata novca.
              </p>

              <Link 
                href="/naruci"
                className="group relative inline-flex items-center gap-3 bg-white text-[#563435] px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Naruči odmah
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-6 font-medium text-white/90">
                👉 Iskoristi 50% popusta do večeras.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

