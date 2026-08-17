"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, CreditCard, ChevronDown, ChevronUp, ShoppingCart, ArrowRight, Banknote } from "lucide-react";
import { trackViewContent, trackAddToCart, trackCtaClick } from "@/lib/analytics";

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
        answer: "Možeš nas kontaktirati prije narudžbe ako nisi sigurna koji model odgovara tvojoj koži i zoni tretmana. Dostava je besplatna, a plaćaš pouzećem."
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
      },
      {
        name: "Lejla",
        age: 28,
        location: "Mostar",
        date: "Mart 2026",
        content: "Nisam vjerovala da može biti bezbolno dok nisam probala. Ovo je čudo. Noge brijam svake dvije sedmice umjesto svaki drugi dan. Za ljeto sam spremna bez stresa.",
        rating: 5
      },
      {
        name: "Selma",
        age: 34,
        location: "Banja Luka",
        date: "Februar 2026",
        content: "Muž mi je kupio za rođendan i bila sam skeptična. Sad mu govorim da je to bio poklon decenije. Pazuhe su mi savršene, bikini zona riješena. Preporučila sam svim prijateljicama.",
        rating: 5
      },
      {
        name: "Nadia",
        age: 26,
        location: "Sarajevo",
        date: "Januar 2026",
        content: "Radila sam laser u klinici, platila 800 KM za noge i rezultati su bili isti kao ovdje. Za 175 KM sam dobila isti uređaj koji mogu koristiti gdje god hoću. Žao mi je što nisam ranije.",
        rating: 5
      }
    ],
    vsTable: [
      { salon: "60–120 KM po posjeti", ipl: "175 KM jednom zauvijek" },
      { salon: "Zakazivanje tjedan unaprijed", ipl: "Tretman kada tebi odgovara" },
      { salon: "Bol od voskanja i laserа", ipl: "Bezbolno — hlađenje štiti kožu" },
      { salon: "Ponavljaš svake 4–6 sedmica", ipl: "Jednom sedmično, pa jednom mjesečno" },
      { salon: "700–1.200 KM godišnje", ipl: "0 KM u narednim godinama" },
      { salon: "Zavisiš od termina i radnog vremena", ipl: "Noge za 10 min — u pidžami, kod kuće" },
    ],
    beforeAfterImages: [
      { image: "/testimonials/before-after/pro1.png", label: "Ivana, 24 god. · Banja Luka · 8 sedmica tretmana" },
      { image: "/testimonials/before-after/pro2.png", label: "Marina, 31 god. · Mostar · 6 sedmica tretmana" },
      { image: "/testimonials/before-after/pro3.png", label: "Amra, 23 god. · Tuzla · 10 sedmica tretmana" },
    ],
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
        answer: "Možeš nas kontaktirati prije narudžbe ako nisi sigurna koji model odgovara tvojoj koži i zoni tretmana. Dostava je besplatna, a plaćaš pouzećem."
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
      },
      {
        name: "Amra",
        age: 31,
        location: "Zenica",
        date: "Mart 2026",
        content: "Max je onaj model koji sam tražila. Veći bljesak znači da noge završim za 10 minuta — ne 20 kao sa manjim uređajem. Hlađenje radi savršeno čak i na nivou 5. Preporučujem svima.",
        rating: 5
      },
      {
        name: "Lejla",
        age: 26,
        location: "Tuzla",
        date: "Februar 2026",
        content: "Godinama sam išla na vosak i trošila 80 KM mjesečno. Sad imam Max i ne pamtim kad sam zadnji put bila u salonu. Leđa i bikini zona su konačno riješene — jednom zauvijek.",
        rating: 5
      },
      {
        name: "Sabina",
        age: 38,
        location: "Sarajevo",
        date: "Januar 2026",
        content: "U mojim 38 sam mislila da je prekasno. Nije. Nakon 8 sedmica sa Maxom dlačice su rijetke i tanke. Koža mi je glatka kao kad sam imala 20. Žao mi je što nisam ranije znala za ovo.",
        rating: 5
      }
    ],
    vsTable: [
      { salon: "100 KM po laserskom tretmanu", ipl: "190 KM jednom zauvijek" },
      { salon: "Noge za 30–45 minuta u salonu", ipl: "Noge za 10 minuta kod kuće" },
      { salon: "Rezultati za 6–8 tretmana (6+ mj.)", ipl: "Vidljivi rezultati za 2–3 sedmice" },
      { salon: "Zakazivanje i čekanje", ipl: "Tretman kad tebi odgovara" },
      { salon: "Bol na osjetljivim zonama", ipl: "Dvostruko hlađenje — ni na nivou 5 ne boli" },
      { salon: "1.200–2.000 KM godišnje za laser", ipl: "0 KM u svim narednim godinama" },
    ],
    beforeAfterImages: [
      { image: "/testimonials/before-after/max1.png", label: "Emina, 29 god. · Mostar · 8 sedmica tretmana" },
      { image: "/testimonials/before-after/max2.png", label: "Jasmina, 35 god. · Banja Luka · 6 sedmica tretmana" },
      { image: "/testimonials/before-after/max3.png", label: "Nina, 27 god. · Sarajevo · 10 sedmica tretmana" },
    ],
  },
  "ice-cool-lite": {
    name: "ICE COOL LITE",
    tagline: "Gornja usna. Brada. Bikini. Jednom zauvijek.",
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
      title: "Gornja usna, brada, bikini — glatko zauvijek. 165 KM.",
      subtitle: "Precizni IPL tretman za zone koje te muče svake 3 sedmice. Threading, vosak, depilatorske kreme — to je prošlost."
    },
    benefits: [
      "Gornja usna i brada čiste za 4–5 sedmica — bez threading bola",
      "Bikini zona bez uraslih dlačica i iritacije — jednom zauvijek",
      "999.999 bljeskova — ista snaga kao PRO, samo precizniji",
      "Bezbolno Ice Cool™ hlađenje — štiti i najosjetljiviju kožu lica"
    ],
    features: [
      { title: "Precizan za lice i bikini", description: "Poseban nastavak cilja tačno gornju usnu, bradu i bikini liniju — zone koje threading i vosak nikad zaista ne riješe" },
      { title: "Bezbolno — zaista", description: "Ice Cool™ hlađenje radi tokom svakog bljeska. Čak i na licu i bikini zoni — blaga toplina, ništa više" },
      { title: "999.999 bljeskova", description: "Isti broj kao PRO model — dovoljan za 15+ godina tretmana lica i bikini zone" },
      { title: "Rezultati za 3–4 sedmice", description: "Na licu i manjim zonama promjene su vidljive brže nego na nogama. Gornja usna — 4 sedmice" }
    ],
    howItWorks: [
      { step: 1, title: "Precizan nastavak — cilja gdje treba", description: "Poseban nastavak za lice i bikini zonu pokriva tačno to malo, osjetljivo područje. Gornja usna, brada, bikini linija — bez promašaja." },
      { step: 2, title: "Bezbolno hlađenje na licu", description: "Ice Cool™ hlađenje radi tokom svakog bljeska. Na licu i bikini zoni — ugodan tretman bez crvenila ili iritacije." },
      { step: 3, title: "5 minuta sedmično — kompleks nestaje", description: "Jednom sedmično, 5 minuta. Nakon 3–4 sedmice primijeti razliku. Nakon 8–10 sedmica — gornja usna i bikini zona trajna su prošlost." },
      { step: 4, title: "Sloboda koja traje", description: "Bez zakazivanja, bez threading bola, bez uraslih dlačica. Jednom zauvijek riješiš kompleks koji si godinama nosila." }
    ],
    faq: [
      {
        question: "Boli li na gornjoj usni i bikini zoni — iskreno?",
        answer: "Ne. Ice Cool™ hlađenje radi tokom svakog bljeska. 9 od 10 kupica kaže da osjetile blagu toplinu — ništa više. Čak i na gornjoj usni i bikini liniji gdje je koža najtanja i najosjetljivija. Daleko ugodnije od threading-a ili voskа."
      },
      {
        question: "Je li LITE zaista isti kao PRO ili je slabiji?",
        answer: "Ista IPL tehnologija, iste Ice Cool™ hlađenje, isti broj bljeskova (999.999). Razlika je samo u veličini glave — LITE ima precizniji, manji nastavak koji je savršen za lice i bikini zonu. Za noge treba nešto više vremena nego PRO."
      },
      {
        question: "Koliko dugo do rezultata na gornjoj usni?",
        answer: "Na gornjoj usni i bradi — promjene vidljive nakon 3–4 tretmana (3–4 sedmice). Bikini zona — vidljivo nakon 4–5 tretmana. Potpun rezultat za 8–10 sedmica redovnih tretmana jednom sedmično, 5 minuta."
      },
      {
        question: "Šta ako ne bude radilo za mene?",
        answer: "Ako nisi sigurna da li LITE odgovara tvom tipu kože, dlačicama ili zoni tretmana, piši nam prije narudžbe. Dostava je besplatna u BiH, a plaćanje je pouzećem."
      }
    ],
    testimonials: [
      {
        name: "Amira",
        age: 32,
        location: "Sarajevo",
        date: "Mart 2026",
        content: "Godinama sam se stidila gornje usne. Threading svake 3 sedmice — bolno, skupo, iscrpljujuće. Kupila sam LITE sa skeptičnošću. Nakon 4 tretmana gornja usna mi je bila 80% čista. Sada, 4 mjeseca kasnije — nema ništa. Eliminisala sam kompleks koji me mučio 15 godina.",
        rating: 5
      },
      {
        name: "Merjem",
        age: 25,
        location: "Mostar",
        date: "Mart 2026",
        content: "Imam mediteranski tip kože i tamne dlačice na licu od puberteta. LITE mi je promijenio život. Precizan nastavak radi savršeno za gornju usnu i bradu. Nakon 5 sedmica razlika je nevjerovatna. Sad ne izlazim iz kuće bez samopouzdanja.",
        rating: 5
      },
      {
        name: "Lejla",
        age: 27,
        location: "Tuzla",
        date: "Februar 2026",
        content: "Bikini zona je bila moj najveći problem — urasle dlačice i iritacija svaki put. Sa LITE-om — glatko bez iritacije, bez bola, bez uraslih. Tretiram 5 minuta jednom sedmično. Ne mogu zamisliti da sam godinama prolazila kroz onu torturu.",
        rating: 5
      },
      {
        name: "Sara",
        age: 22,
        location: "Sarajevo",
        date: "Februar 2026",
        content: "Kupila sam LITE samo za gornju usnu — to mi je bio najveći kompleks od tinejdžerskih dana. Već nakon 3 sedmice potpuno čista. Precizan nastavak pokriva tačno to malo područje. Za 165 KM ovo je dar od Boga.",
        rating: 5
      },
      {
        name: "Aida",
        age: 28,
        location: "Zenica",
        date: "Januar 2026",
        content: "Imam osjetljivu kožu lica i bila sam sigurna da će iritirati. Ne — Ice Cool™ hlađenje je tako nježno. Gornja usna i brada su mi čiste već 2 mjeseca bez ikakvog tretmana. Nikad više threading.",
        rating: 5
      },
      {
        name: "Emina",
        age: 19,
        location: "Sarajevo",
        date: "Januar 2026",
        content: "Mama mi je kupila LITE za 18. rođendan. Imam tamnu dlaku i gornju usnu sam mrzila od kad pamtim. Sada, 2 mjeseca kasnije — ne vidim ništa. Preporučila sam svim drugaricama.",
        rating: 5
      }
    ],
    vsTable: [
      { salon: "40–70 KM/mj. za threading lica i bikini vosak", ipl: "165 KM — jednom zauvijek" },
      { salon: "Bol threading-a — suzne oči svaki put", ipl: "Bezbolno — Ice Cool™ hlađenje štiti lice" },
      { salon: "Urasle dlačice i iritacija na bikini zoni", ipl: "Glatko bez iritacije, bez uraslih dlačica" },
      { salon: "Ponavljaš svake 3 sedmice — bez kraja", ipl: "Tretman po tretman — sve manje, sve rjeđe" },
      { salon: "480–840 KM godišnje samo za lice i bikini", ipl: "0 KM u svim narednim godinama" },
      { salon: "Zakazivanje, čekanje, vožnja u salon", ipl: "5 minuta kod kuće, jednom sedmično" },
    ],
    beforeAfterImages: [
      { image: "/testimonials/before-after/lite1.png", label: "Sara, 22 god. · Sarajevo · gornja usna · 5 sedmica" },
      { image: "/testimonials/before-after/lite2.png", label: "Aida, 28 god. · Tuzla · bikini zona · 6 sedmica" },
      { image: "/testimonials/before-after/lite3.png", label: "Hana, 22 god. · Bihać · noge · 8 sedmica" },
    ],
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
  const [activeResultIndex, setActiveResultIndex] = useState(0);

  const baseProduct = slug ? productData[slug] : productData["ice-cool-pro"];
  const product = customProduct
    ? {
        ...baseProduct,
        ...customProduct,
        hero: customProduct.hero ?? baseProduct?.hero,
        benefits: customProduct.benefits ?? baseProduct?.benefits,
        features: customProduct.features ?? baseProduct?.features,
        howItWorks: customProduct.howItWorks ?? baseProduct?.howItWorks,
        faq: customProduct.faq ?? baseProduct?.faq,
        testimonials: customProduct.testimonials ?? baseProduct?.testimonials,
      }
    : baseProduct;

  if (!product) return null;

  const orderProductId = product.slug || slug || product.id || "ice-cool-pro";
  const orderHref = `/naruci?product=${orderProductId}`;

  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  // Set default usage images if none exist
  const usageImages = product.usageImages || [
    "/slike/PRO/koristenje1.png",
    "/slike/PRO/koristenje2.png",
    "/slike/PRO/koristenje3.png"
  ];

  // Track ViewContent on mount
  useEffect(() => {
    trackViewContent({ id: orderProductId, name: product.name, price: product.price });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    <span className="text-sm font-medium text-gray-700">Besplatna dostava</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Shield className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">detaljno uputstvo</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={orderHref}
                  onClick={() => {
                    trackAddToCart({ id: orderProductId, name: product.name, price: product.price });
                    trackCtaClick('Naruci', 'hero', orderProductId);
                  }}
                  className="group relative w-full py-5 px-8 bg-[#563435] hover:bg-[#6d4446] text-white text-center font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Želim glatku kožu — {product.price.toFixed(2)} KM
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-3">
                  <Truck className="w-4 h-4" /> Besplatna dostava u BiH · Plaćanje pouzećem · Detaljno uputstvo
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

      {/* Before / After */}
      {product.beforeAfterImages && product.beforeAfterImages.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">Stvarni rezultati</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Pogledaj razliku</h2>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-[2rem] overflow-hidden shadow-sm">
              {product.beforeAfterImages[activeResultIndex]?.image ? (
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={product.beforeAfterImages[activeResultIndex].image}
                    alt={product.beforeAfterImages[activeResultIndex].label || `Rezultat kupice ${activeResultIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1100px"
                  />
                </div>
              ) : product.beforeAfterImages[activeResultIndex]?.before && product.beforeAfterImages[activeResultIndex]?.after ? (
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <div className="relative h-72 md:h-[28rem] bg-gray-100">
                      <Image
                        src={product.beforeAfterImages[activeResultIndex].before}
                        alt="Prije tretmana"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-gray-700/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">PRIJE</div>
                    </div>
                  </div>
                  <div className="relative border-l-2 border-white">
                    <div className="relative h-72 md:h-[28rem] bg-gray-100">
                      <Image
                        src={product.beforeAfterImages[activeResultIndex].after}
                        alt="Poslije tretmana"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#563435]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">POSLIJE</div>
                    </div>
                  </div>
                </div>
              ) : null}

              {product.beforeAfterImages[activeResultIndex]?.label && (
                <div className="px-6 py-4 text-center text-base text-gray-700 font-medium border-t border-gray-100">
                  {product.beforeAfterImages[activeResultIndex].label}
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {product.beforeAfterImages.map((pair: any, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveResultIndex(i)}
                  className={`relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeResultIndex === i
                      ? "border-[#563435] shadow-md scale-105"
                      : "border-white/50 hover:border-[#563435]/50 opacity-75 hover:opacity-100"
                  }`}
                >
                  {pair.image ? (
                    <Image
                      src={pair.image}
                      alt={pair.label || `Rezultat ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : pair.after ? (
                    <Image
                      src={pair.after}
                      alt={pair.label || `Rezultat ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            {product.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <Check className="w-3.5 h-3.5 text-white bg-green-500 rounded-full p-0.5" />
                    </div>
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

      {/* VS Table */}
      {product.vsTable && product.vsTable.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-xs font-bold tracking-widest uppercase text-[#563435] mb-3">Usporedba</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Salon vs. {product.name}</h2>
              <p className="text-gray-500">Jednom platiš, zauvijek uštediš.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-4 text-center text-white font-bold bg-gray-600 text-sm w-1/2">💸 Salon / Vosak</th>
                      <th className="p-4 text-center text-white font-bold bg-[#563435] text-sm w-1/2">✅ {product.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.vsTable.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="p-4 text-center text-sm text-red-600 bg-red-50/30">{row.salon}</td>
                        <td className="p-4 text-center text-sm text-green-700 font-semibold bg-green-50/30">{row.ipl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href={orderHref}
                onClick={() => {
                  trackAddToCart({ id: orderProductId, name: product.name, price: product.price });
                  trackCtaClick('Naruci', 'vs-table', orderProductId);
                }}
                className="inline-flex items-center gap-2 bg-[#563435] hover:bg-[#6d4446] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-lg"
              >
                Naruči {product.name} — {product.price.toFixed(2)} KM <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-3 text-sm text-gray-500 flex items-center justify-center gap-3">
                <Banknote className="w-4 h-4" /> Plaćanje pouzećem · Besplatna dostava · Detaljno uputstvo
              </p>
            </div>
          </div>
        </section>
      )}

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
            onClick={() => {
              trackAddToCart({ id: orderProductId, name: product.name, price: product.price });
              trackCtaClick('Naruci', 'sticky-bar', orderProductId);
            }}
            className="flex-1 sm:flex-none sm:w-auto bg-[#563435] hover:bg-[#6d4446] text-white font-bold py-3 px-8 rounded-full shadow-lg text-center flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Naruči — {product.price.toFixed(2)} KM
          </Link>
        </div>
      </div>
    </main>
  );
}
