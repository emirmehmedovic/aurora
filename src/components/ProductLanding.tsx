"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, CreditCard, ChevronDown, ChevronUp, ShoppingCart, ArrowRight } from "lucide-react";

const productData: Record<string, any> = {
  "ice-cool-pro": {
    name: "ICE COOL PRO",
    tagline: "Glatka koža koja traje sedmicama",
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
      "/slike/PRO/koristenje4.png",
      "/slike/PRO/koristenje5.png",
      "/slike/PRO/koristenje6.png",
      "/slike/PRO/koristenje7.png"
    ],
    hero: {
      title: "ICE COOL PRO — glatka koža koja traje sedmicama",
      subtitle: "Bezbolno IPL uklanjanje dlačica iz udobnosti doma. Salon efekat bez salona, bez voska i bez svakodnevnog brijanja."
    },
    benefits: [
      "Nježno i efikasno uklanjanje dlačica kod kuće",
      "Ugrađeno hlađenje za ugodniji tretman",
      "Dugotrajniji rezultati uz redovnu upotrebu",
      "Pogodno za noge, ruke, pazuhe, bikini zonu i lice"
    ],
    features: [
      { title: "IPL Tehnologija", description: "Napredna IPL tehnologija djeluje na korijen dlačice" },
      { title: "Sistem Hlađenja", description: "Ugrađeno hlađenje čini tretman mnogo ugodnijim" },
      { title: "5 Nivoa Intenziteta", description: "Prilagodite tretman vašem tipu kože" },
      { title: "300,000 Impulsa", description: "Dovoljan broj impulsa za godinama upotrebe" }
    ],
    howItWorks: [
      { step: 1, title: "Odaberi nivo intenziteta", description: "Prilagodite intenzitet vašem tipu kože" },
      { step: 2, title: "Prisloni uređaj", description: "Postavite uređaj na područje tretmana" },
      { step: 3, title: "Aktiviraj impuls", description: "Pritisnite dugme i nastavite tretman" },
      { step: 4, title: "Ponavljaj redovno", description: "Pratite preporučeni raspored tretmana" }
    ],
    faq: [
      {
        question: "Da li je tretman bolan?",
        answer: "Većina korisnica tretman opisuje kao blago zagrijavanje ili lagano peckanje. Zahvaljujući ugrađenom sistemu hlađenja, tretman je znatno ugodniji u poređenju s voskom ili epilatorom."
      },
      {
        question: "Kada mogu očekivati rezultate?",
        answer: "Prve promjene se često primijete nakon 3 do 4 tretmana, dok se puniji rezultati obično vide nakon 8 do 12 sedmica redovne upotrebe."
      },
      {
        question: "Koliko dugo traju rezultati?",
        answer: "Uz pravilnu i redovnu upotrebu, rezultati mogu trajati mjesecima, a kasnije su potrebni samo povremeni tretmani održavanja."
      },
      {
        question: "Na kojim dijelovima tijela mogu koristiti uređaj?",
        answer: "Pogodan je za noge, ruke, pazuhe, bikini zonu i lice ispod jagodične kosti, uz poštivanje uputstva proizvođača."
      },
      {
        question: "Koliko često trebam koristiti uređaj?",
        answer: "Na početku se preporučuje nekoliko tretmana sedmično prema uputstvu, a kasnije povremeni tretmani održavanja."
      }
    ],
    testimonials: [
      {
        name: "Derva",
        age: 24,
        content: "Nakon nekoliko tretmana primijetila sam sporiji rast i puno manje iritacija. Najviše mi znači što sve mogu uraditi kod kuće, bez salona i bez stresa.",
        rating: 5
      },
      {
        name: "Samanta",
        age: 31,
        content: "Imam osjetljivu kožu i upravo mi je sistem hlađenja bio presudan. Tretman je mnogo ugodniji nego što sam očekivala, a rezultati su sve bolji iz sedmice u sedmicu.",
        rating: 5
      },
      {
        name: "Amra",
        age: 23,
        content: "Ranije sam trošila mnogo novca na salonske tretmane. Ovaj uređaj mi daje osjećaj kontrole, jer tretman radim kad meni odgovara.",
        rating: 5
      }
    ]
  },
  "ice-cool-pro-max": {
    name: "ICE COOL Max",
    tagline: "Maksimalna snaga za najbrže rezultate",
    price: 190.00,
    compareAtPrice: 380.00,
    images: [
      "/slike/ELITE/cover.png",
      "/slike/ELITE/slika1.png",
      "/slike/ELITE/slika2.png",
      "/slike/ELITE/koristenje1.png",
      "/slike/ELITE/koristenje2.png",
      "/slike/ELITE/koristenje3.png",
      "/slike/ELITE/koristenje4.png",
      "/slike/ELITE/koristenje5.png"
    ],
    usageImages: [
      "/slike/ELITE/koristenje1.png",
      "/slike/ELITE/koristenje2.png",
      "/slike/ELITE/koristenje3.png",
      "/slike/ELITE/koristenje4.png",
      "/slike/ELITE/koristenje5.png"
    ],
    hero: {
      title: "ICE COOL Max — Salon u vašem domu",
      subtitle: "Naš najjači model sa većom površinom bljeska za brže tretmane cijelog tijela."
    },
    benefits: [
      "Veća površina tretmana za brži rad",
      "Pojačano hlađenje za maksimalnu ugodnost",
      "Automatski senzor boje kože",
      "Ergonomski dizajn za lakše rukovanje"
    ],
    features: [
      { title: "Max Snaga", description: "Do 20% jači intenzitet od standardnog modela" },
      { title: "Ice Cool+™", description: "Napredni sistem dvostrukog hlađenja" },
      { title: "Brži Bljeskovi", description: "Manje čekanja između impulsa" },
      { title: "999,999 Impulsa", description: "Praktično neograničen vijek trajanja" }
    ],
    howItWorks: [
      { step: 1, title: "Pripremi kožu", description: "Obrij i očisti područje tretmana" },
      { step: 2, title: "Odaberi Auto/Manual", description: "Koristi automatski mod za veće površine" },
      { step: 3, title: "Tretman", description: "Klizi uređajem po koži dok bljeska" },
      { step: 4, title: "Hidratacija", description: "Nakon tretmana nanesi losion za tijelo" }
    ],
    faq: [
      {
        question: "Po čemu se Max razlikuje od Pro modela?",
        answer: "Max model ima veću površinu bljeska, brže punjenje između bljeskova i napredniji sistem hlađenja, što tretmane čini bržim i ugodnijim."
      },
       {
        question: "Da li je tretman bolan?",
        answer: "Zahvaljujući Ice Cool+™ tehnologiji, osjećaj toplote je minimalan, čak i na višim nivoima intenziteta."
      }
    ],
    testimonials: [
      {
        name: "Emina",
        age: 29,
        content: "Prešla sam sa običnog modela na Max i razlika je ogromna. Noge završim za 10 minuta!",
        rating: 5
      },
       {
        name: "Jasmina",
        age: 35,
        content: "Vrijedi svake marke. Kvalitet izrade je vrhunski, a rezultati su brži nego što sam očekivala.",
        rating: 5
      }
    ]
  },
  "ice-cool-lite": {
    name: "ICE COOL LITE",
    tagline: "Kompaktan, lagan i efikasan",
    price: 165.00,
    compareAtPrice: 330.00,
    images: [
      "/slike/LITE/cover.png",
      "/slike/LITE/1.png",
      "/slike/LITE/2.png",
      "/slike/LITE/3.png",
      "/slike/LITE/4.png",
      "/slike/LITE/5.png",
      "/slike/LITE/6.png"
    ],
    usageImages: [
      "/slike/LITE/4.png",
      "/slike/LITE/5.png",
      "/slike/LITE/6.png"
    ],
    hero: {
      title: "ICE COOL LITE — Vaš saputnik za glatku kožu",
      subtitle: "Idealan za početnice i putovanja. Mali, lagan, ali moćan saveznik u borbi protiv dlačica."
    },
    benefits: [
      "Kompaktan dizajn idealan za putovanja",
      "Jednostavan za korištenje",
      "Precizan nastavak za lice",
      "Pristupačna cijena uz vrhunske rezultate"
    ],
    features: [
      { title: "Prijenosan", description: "Lako staje u svaku torbu" },
      { title: "Precizan", description: "Odličan za manje površine i lice" },
      { title: "Siguran", description: "Ugrađen senzor dodira kože" },
      { title: "500,000 Impulsa", description: "Dugotrajan rad bez zamjene lampi" }
    ],
    howItWorks: [
      { step: 1, title: "Priključi", description: "Spoji uređaj na napajanje" },
      { step: 2, title: "Podesi", description: "Odaberi jedan od 5 nivoa jačine" },
      { step: 3, title: "Tretiraj", description: "Prisloni i pritisni dugme" },
      { step: 4, title: "Završi", description: "Isključi uređaj i spakuj ga" }
    ],
    faq: [
      {
        question: "Da li je dovoljno jak kao veći modeli?",
        answer: "Da, Lite model koristi istu IPL tehnologiju, samo u manjem kućištu i sa nešto manjom površinom bljeska, što ga čini idealnim za precizne tretmane."
      }
    ],
    testimonials: [
      {
        name: "Sara",
        age: 22,
        content: "Kupila sam ga jer puno putujem. Odličan je! Stane u neseser, a radi posao savršeno.",
        rating: 5
      }
    ]
  }
};

interface ProductLandingProps {
  slug?: string;
  product?: any; // Allow passing a full product object directly for custom landing pages
}

export default function ProductLanding({ slug, product: customProduct }: ProductLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Use custom product if provided, otherwise fallback to looking up by slug
  const product = customProduct || (slug ? productData[slug] : productData["ice-cool-pro"]);
  
  if (!product) return null;

  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  // Set default usage images if none exist
  const usageImages = product.usageImages || [
    "/slike/PRO/koristenje1.png",
    "/slike/PRO/koristenje2.png",
    "/slike/PRO/koristenje3.png"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowStickyBar(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-purple-100/20 to-transparent pointer-events-none" />

      {/* Hero Section */}
      <section id="hero-section" className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Glass Card Container */}
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image Gallery */}
              <div className="flex flex-col gap-4">
                <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/30 shadow-inner group">
                  <Image
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} - slika ${activeImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  {discount > 0 && (
                    <div className="absolute top-6 left-6 bg-[#563435] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                      -{discount}% POPUST
                    </div>
                  )}
                </div>
                
                {/* Thumbnails Row */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                    {product.images.map((img: string, idx: number) => (
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

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-semibold w-fit mb-6">
                  <Star className="w-4 h-4 fill-[#563435]" />
                  <span>Najprodavaniji IPL uređaj</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  {product.hero.title}
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {product.hero.subtitle}
                </p>

                {/* Price Card */}
                <div className="mb-8 p-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm">
                  <div className="flex flex-wrap items-baseline gap-4 mb-2">
                    <span className="text-5xl font-bold text-[#563435]">{product.price.toFixed(2)} KM</span>
                    {product.compareAtPrice && (
                      <span className="text-2xl text-gray-400 line-through decoration-2">{product.compareAtPrice.toFixed(2)} KM</span>
                    )}
                  </div>
                  <p className="text-sm text-[#563435] font-medium">
                    🔥 Ušteda {discount}% • Ograničene količine
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Truck className="w-5 h-5 text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Besplatna dostava</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Plaćanje pouzećem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <RotateCcw className="w-5 h-5 text-purple-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">14 dana povrat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Shield className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">12 mj. garancija</span>
                  </div>
                </div>

                {/* CTA Button */}
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
                <p className="text-center text-xs text-gray-500 mt-3">
                  *Brza dostava u roku 24/48h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Zašto odabrati {product.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#563435]/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-[#563435]" />
                </div>
                <span className="text-lg text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">Proces</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-800">
              Uključi. Prisloni. Zablistaj.
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Jednostavan proces u 3 koraka do savršeno glatke kože.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={usageImages[0] || product.images[0]}
                  alt="Priprema kože"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 shadow-sm text-[#563435] text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Priprema</h3>
                <p className="text-gray-600 leading-relaxed">
                  Obrij područje koje želiš tretirati i očisti kožu. Uređaj radi najbolje na čistoj, suhoj koži.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={usageImages[1] || product.images[1] || product.images[0]}
                  alt="IPL tretman"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 shadow-sm text-[#563435] text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Tretman</h3>
                <p className="text-gray-600 leading-relaxed">
                  Postavi uređaj na kožu i aktiviraj IPL bljesak. Pomjeraj ga polako preko tretiranog područja.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={usageImages[2] || product.images[2] || product.images[0]}
                  alt="Rezultati tretmana"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 shadow-sm text-[#563435] text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Rezultati</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ponavljaj tretman 1-2 puta sedmično. Prvi rezultati vidljivi već nakon 3-4 tretmana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Tehničke specifikacije
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature: any, index: number) => (
              <div key={index} className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/40 transition-colors">
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Šta kažu naše korisnice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.age} godina</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#563435] to-[#8b5a5c] flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Često postavljana pitanja
          </h2>
          <div className="space-y-4">
            {product.faq.map((item: any, index: number) => (
              <div key={index} className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden transition-all hover:bg-white/50">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800 text-lg pr-4">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100/50 pt-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 shadow-lg transform transition-transform duration-300 z-50 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4">
             <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
               <Image src={product.images[activeImageIndex] || product.images[0]} alt={product.name} fill className="object-cover" />
             </div>
             <div>
               <p className="font-bold text-gray-800">{product.name}</p>
               <p className="text-sm text-gray-500">{product.price.toFixed(2)} KM</p>
             </div>
          </div>
          <Link 
            href="/naruci"
            className="flex-1 sm:flex-none sm:w-auto bg-[#563435] hover:bg-[#6d4446] text-white font-bold py-3 px-8 rounded-full shadow-lg text-center flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Naruči odmah
          </Link>
        </div>
      </div>
    </main>
  );
}
