"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, CreditCard, ChevronDown, ChevronUp, ShoppingCart, ArrowRight } from "lucide-react";

const productData: Record<string, any> = {
  "ice-cool-pro": {
    name: "ICE COOL PRO",
    tagline: "Zaboravi na žilete. Zauvijek.",
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
      title: "ICE COOL PRO — zaboravi na žilete. Zauvijek.",
      subtitle: "Zamisli da više nikad ne moraš brijati noge. Bez bola, bez salona, bez vječitog trošenja na žilete."
    },
    benefits: [
      "Bezbolno — ugrađeno hlađenje štiti kožu dok uređaj radi",
      "Rezultati već nakon 3-4 tretmana — dlačice rastu sporije i tanje",
      "Kupiš jednom, koristiš 10+ godina — bez zamjena i dopuna",
      "Noge, ruke, pazuhe, bikini, lice — jedan uređaj za sve"
    ],
    features: [
      { title: "Salon rezultati kod kuće", description: "Ista IPL tehnologija koju koriste saloni — bez zakazivanja i čekanja" },
      { title: "Bezbolno — zaista", description: "Hlađenje štiti kožu pa većina žena osjeti samo blagu toplinu" },
      { title: "Prilagodi svom tijelu", description: "5 nivoa — blaži za lice i bikini, jači za noge" },
      { title: "Traje 10+ godina", description: "999,999 bljeskova — nikad ne trebaš kupovati zamjene" }
    ],
    howItWorks: [
      { step: 1, title: "Pripremi kožu (2 min)", description: "Obrij i očisti područje. Bez voska, bez traka, bez nereda." },
      { step: 2, title: "Tretman (5-10 min)", description: "Prisloni uređaj i pritisni tipku. Hlađenje štiti kožu — ne osjetiš ništa." },
      { step: 3, title: "Ponovi 1x sedmično", description: "10 minuta sedmično. Nakon 8 sedmica prelaziš na održavanje jednom mjesečno." },
      { step: 4, title: "Uživaj u rezultatima", description: "Glatka koža bez brijanja. Obučeš šta hoćeš i izlaziš." }
    ],
    faq: [
      {
        question: "Boli li? Iskreno.",
        answer: "Ne. Većina korisnica kaže da osjete blagu toplinu, kao kad sunce grije kožu. Hlađenje radi dok uređaj radi pa nema crvenila ni peckanja. Ako si radila vosak — ovo je nebo i zemlja."
      },
      {
        question: "Kada ću vidjeti da radi?",
        answer: "Već nakon 3-4 tretmana primijetiš sporiji rast. Nakon 6-8 sedmica većina žena noge brije jednom sedmično ili rjeđe. Puni rezultat nakon 12 sedmica."
      },
      {
        question: "Mogu li ga koristiti na bikini zoni i licu?",
        answer: "Da! Noge, ruke, pazuhe, stomak, bikini zona i lice (ispod jagodica). Većina žena ga najviše voli baš za bikini zonu jer su rezultati brzi."
      },
      {
        question: "Šta ako ne bude radilo za mene?",
        answer: "Imaš 14 dana da ga probaš. Ako nisi zadovoljna, vrati ga i dobiješ novac nazad. Bez pitanja, bez komplikacija."
      },
      {
        question: "Koliko često moram raditi tretman?",
        answer: "Jednom sedmično, 10-15 minuta. Manje vremena nego jedno brijanje. Nakon 8-12 sedmica prelaziš na održavanje jednom mjesečno."
      }
    ],
    testimonials: [
      {
        name: "Derva",
        age: 24,
        location: "Sarajevo",
        date: "Mart 2026",
        content: "Godinama sam imala problem sa urasljim dlačicama na nogama. Nakon 5 tretmana koža mi je čista kao nikad. Prošlo ljeto sam prvi put nosila kratku suknju bez da sam se brinula.",
        rating: 5
      },
      {
        name: "Samanta",
        age: 31,
        location: "Zenica",
        date: "Februar 2026",
        content: "Imam osjetljivu kožu i bojala sam se da će boljeti. Ali hlađenje je nevjerovatno — ne osjetim ništa. Već nakon mjesec dana pazuhe ne brijam uopšte, a noge jednom u 10 dana.",
        rating: 5
      },
      {
        name: "Amra",
        age: 23,
        location: "Tuzla",
        date: "Januar 2026",
        content: "Trošila sam 60 KM mjesečno na vosak u salonu. To je 720 KM godišnje! Za 175 KM imam svoj uređaj koji će trajati godinama. Radim tretman nedjeljom uveče uz Netflix, 10 minuta za noge.",
        rating: 5
      }
    ]
  },
  "ice-cool-pro-max": {
    name: "ICE COOL Max",
    tagline: "Noge gotove za 10 minuta. Salon rezultati kod kuće.",
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
      title: "ICE COOL Max — najjači model za žene koje neće čekati",
      subtitle: "Noge gotove za 10 minuta. Najjači bljesak, najugodniji tretman. Salon rezultati — bez salona."
    },
    benefits: [
      "Noge za 10 min — veća površina bljeska pokriva više kože odjednom",
      "Najugodniji tretman — dvostruko hlađenje ne pušta ni na punoj snazi",
      "Vidljivi rezultati za 2-3 sedmice — brže nego bilo koji drugi model",
      "Cijelo tijelo uključujući bikini i leđa — bez ograničenja"
    ],
    features: [
      { title: "Brži tretman", description: "Veća površina bljeska — noge završiš za 10 minuta umjesto 20" },
      { title: "Dvostruko hlađenje", description: "Ice Cool+™ hladi prije i poslije bljeska — čak i na punoj snazi ne boli" },
      { title: "Brži rezultati", description: "Pojačana snaga znači da folikuli reaguju brže — razlika za 2-3 sedmice" },
      { title: "Traje 10+ godina", description: "999,999 bljeskova — kupiš jednom, koristiš godinama" }
    ],
    howItWorks: [
      { step: 1, title: "Priprema (2 min)", description: "Obrij i očisti kožu. Bez voska, bez traka, bez nereda." },
      { step: 2, title: "Tretman (10 min za noge)", description: "Klizi uređajem po koži. Veći bljesak = brže gotovo. Hlađenje štiti kožu." },
      { step: 3, title: "Ponovi 1x sedmično", description: "Manje od 15 minuta za cijelo tijelo. Nakon 8 sedmica — jednom mjesečno." },
      { step: 4, title: "Rezultati za 2-3 sedmice", description: "Pojačana snaga znači brže rezultate. Brijanje postaje prošlost." }
    ],
    faq: [
      {
        question: "Zašto Max umjesto Pro modela?",
        answer: "Ako želiš brže tretmane i brže rezultate. Max ima veću površinu bljeska pa noge završiš za 10 min umjesto 20, plus dvostruko hlađenje za maksimalnu ugodnost."
      },
      {
        question: "Boli li na punoj snazi?",
        answer: "Ne. Ice Cool+™ dvostruko hlađenje radi prije i poslije svakog bljeska. Čak i na najjačem nivou osjetiš samo blagu toplinu."
      },
      {
        question: "Šta ako ne bude radilo za mene?",
        answer: "Imaš 14 dana da ga probaš. Ako nisi zadovoljna, vrati ga i dobiješ novac nazad. Bez pitanja."
      }
    ],
    testimonials: [
      {
        name: "Emina",
        age: 29,
        location: "Mostar",
        date: "Mart 2026",
        content: "Imam dvoje djece i posao — nemam vremena za salone. Max mi treba 10 minuta nedjeljom uveče i to je to. Već nakon trećeg tretmana pazuhe su mi bile glatke. Za 190 KM dobila sam nešto što bi me u salonu koštalo 1.500+ KM.",
        rating: 5
      },
      {
        name: "Jasmina",
        age: 35,
        location: "Banja Luka",
        date: "Februar 2026",
        content: "Išla sam na profesionalni laser 2 godine. Max daje iste rezultate — ali kod kuće, kad meni odgovara, i ne dajem 100 KM svaki mjesec. Noge ne brijam već 3 sedmice.",
        rating: 5
      },
      {
        name: "Nina",
        age: 27,
        location: "Sarajevo",
        date: "Januar 2026",
        content: "Kupila sam jeftiniji IPL prošle godine i nije uradio ništa. Max je potpuno druga priča — osjetiš da ima snage. Ali hlađenje je tako dobro da ne boli. Bikini zona mi je sada čista bez problema.",
        rating: 5
      }
    ]
  },
  "ice-cool-lite": {
    name: "ICE COOL LITE",
    tagline: "Stane u torbicu. Radi posao kao veliki.",
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
      title: "ICE COOL LITE — glatka koža za 165 KM",
      subtitle: "Stane u torbicu, radi posao kao veliki. Savršen za lice, bikini zonu i žene u pokretu."
    },
    benefits: [
      "Najniža cijena u liniji — a rezultati su isti kao kod većih modela",
      "Precizan nastavak za lice, gornju usnu i bikini zonu",
      "Lagan i kompaktan — ponesi na more, vikendicu, putovanje",
      "Savršen ako ti je ovo prvi IPL — jednostavan za korištenje"
    ],
    features: [
      { title: "Ponesi svuda", description: "Stane u neseser — savršen za more, vikendicu, putovanje" },
      { title: "Precizan za lice", description: "Mali nastavak tačno cilja gornju usnu, bradu i bikini zonu" },
      { title: "Bezbolno", description: "Ugrađeno hlađenje štiti čak i najosjetljiviju kožu" },
      { title: "Traje godinama", description: "500,000 bljeskova — dovoljan za godine redovne upotrebe" }
    ],
    howItWorks: [
      { step: 1, title: "Priprema (2 min)", description: "Obrij i očisti kožu. Jednostavno i brzo." },
      { step: 2, title: "Tretman (5 min)", description: "Prisloni precizan nastavak i pritisni tipku. Hlađenje štiti kožu." },
      { step: 3, title: "Ponovi 1x sedmično", description: "5-10 minuta. Manje nego jedno brijanje." },
      { step: 4, title: "Rezultati za 3-4 sedmice", description: "Dlačice rastu sporije, tanje su. Sloboda od brijanja." }
    ],
    faq: [
      {
        question: "Radi li kao veći modeli?",
        answer: "Da! Koristi istu IPL tehnologiju. Razlika je u veličini — LITE ima manji bljesak, što ga čini savršenim za lice i bikini zonu. Za noge radi odlično, samo treba malo više vremena."
      },
      {
        question: "Boli li na licu i bikini zoni?",
        answer: "Ne. Hlađenje radi dok uređaj radi. Većina korisnica kaže da osjete samo blagu toplinu, čak i na osjetljivim područjima."
      },
      {
        question: "Šta ako ne bude radilo za mene?",
        answer: "14 dana za povrat. Probaš ga bez rizika — ako nisi zadovoljna, vratiš ga i dobiješ novac nazad."
      }
    ],
    testimonials: [
      {
        name: "Sara",
        age: 22,
        location: "Sarajevo",
        date: "Mart 2026",
        content: "Kupila sam LITE samo za gornju usnu — to mi je bio najveći kompleks. Već nakon 3 sedmice potpuno čista. Precizan nastavak je genijalan. Za 165 KM ovo je dar od Boga.",
        rating: 5
      },
      {
        name: "Aida",
        age: 28,
        location: "Tuzla",
        date: "Februar 2026",
        content: "Puno putujem i LITE mi je savršen jer ga nosim svuda. Koristim ga za pazuhe i bikini zonu — već nakon mjesec dana skoro da nema ništa. Prijateljice su sve pitale šta koristim.",
        rating: 5
      },
      {
        name: "Hana",
        age: 22,
        location: "Bihać",
        date: "Januar 2026",
        content: "Ovo mi je prvi IPL ikad i bila sam nervozna. Ali LITE je tako jednostavan da sam ga koristila bez uputstva. Noge brijam upola rjeđe već nakon mjesec dana.",
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

  const orderProductId = product.id || slug || "ice-cool-pro";
  const orderHref = `/naruci?product=${orderProductId}`;

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
                    alt={`${product.name} IPL uređaj za trajno uklanjanje dlačica — slika ${activeImageIndex + 1}`}
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
                        <Image src={img} alt={`${product.name} detalj ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-semibold w-fit mb-6">
                  <Star className="w-4 h-4 fill-[#563435]" />
                  <span>Hiljade zadovoljnih korisnica u BiH</span>
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
                    Ušteda {discount}% — besplatna dostava u BiH
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Truck className="w-5 h-5 text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Dostava u BiH 1-3 dana</span>
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
                  href={orderHref}
                  className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Želim glatku kožu →
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Besplatna dostava u BiH · Isporuka za 1-3 radna dana
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
            Zašto žene biraju {product.name}?
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
              Lakše nego što misliš
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Cijeli tretman traje kraće od jedne epizode serije.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={usageImages[0] || product.images[0]}
                  alt={`Priprema kože za ${product.name} IPL tretman`}
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
                  alt={`${product.name} IPL tretman u primjeni`}
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
                  alt={`Rezultati korištenja ${product.name} IPL uređaja`}
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
            Šta dobiješ sa {product.name}?
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
            Žene iz BiH dijele svoja iskustva
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
                    <p className="text-sm text-gray-500">{testimonial.age} godina{testimonial.location ? ` · ${testimonial.location}` : ''}</p>
                    {testimonial.date && <p className="text-xs text-gray-400">{testimonial.date}</p>}
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
            Imaš pitanja? Imamo odgovore.
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
            href={orderHref}
            className="flex-1 sm:flex-none sm:w-auto bg-[#563435] hover:bg-[#6d4446] text-white font-bold py-3 px-8 rounded-full shadow-lg text-center flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Želim glatku kožu
          </Link>
        </div>
      </div>
    </main>
  );
}
