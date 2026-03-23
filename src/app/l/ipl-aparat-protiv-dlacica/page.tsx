import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "ICE COOL PRO™ | IPL Aparat za Trajno Uklanjanje Dlačica | BiH",
  description: "ICE COOL PRO – IPL aparat za trajno uklanjanje dlačica kod kuće. 5 nivoa intenziteta, Ice Cool™ hlađenje, 999k bljeskova. Besplatna dostava u BiH. Naruči danas →",
  keywords: "IPL aparat, IPL epilator, lasersko uklanjanje dlačica kod kuće, IPL aparat cijena BiH, IPL uređaj Bosna, ICE COOL PRO, epilacija kod kuće",
  alternates: {
    canonical: "https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica",
  }
};

const proContent: LandingContent = {
  badge: "Najtraženiji model u BiH",
  heroSubtitle: "Zamisli da više nikad ne moraš brijati noge. Bez bola, bez salona, bez vječitog trošenja.",
  benefits: [
    "Bezbolno — ugrađeno hlađenje štiti kožu dok uređaj radi",
    "Rezultati već nakon 3-4 tretmana — dlačice rastu sporije i tanje",
    "Kupiš jednom, koristiš 10+ godina — bez zamjena i dopuna",
    "Noge, ruke, pazuhe, bikini, lice — jedan uređaj za cijelo tijelo",
  ],
  empathyTitle: "Umorna si od vječitog brijanja?",
  empathySubtitle: "Nisi jedina. I postoji bolji način.",
  empathyParagraph1: "Znaš onaj osjećaj — obriješ se ujutro, a već uveče osjetiš bockanje. Izbjegavaš kratke suknje jer znaš kako ti noge izgledaju do kraja dana. Ili trošiš 50-80 KM mjesečno na vosak koji te ostavlja crvenu i bolnu.",
  empathyParagraph2: "ICE COOL PRO koristi istu tehnologiju koju koriste saloni, ali kod tebe kući. Ugrađeno hlađenje štiti kožu pa ne osjetiš ništa — većina korisnica kaže da je ugodnije od običnog brijanja. A rezultati? Dlačice rastu sporije već nakon 3-4 tretmana.",
  empathyHighlight: "Prestani davati novac za privremena rješenja. 175 KM jednom — i koža ti je glatka godinama.",
  story: {
    title: "'Godinama sam trošila novac na salone. Sad ne mogu vjerovati koliko sam čekala.'",
    text: "Svaki mjesec sam išla na depilaciju voskom — 60-80 KM, plus bol, plus crvenilo. Muž me godinama nagovarao da probam IPL kod kuće, a ja sam se bojala da će boljeti. Kad je Ice Cool PRO stigao, nisam mogla vjerovati — ne boli. Bljesak, hlađenje, i to je to. Nakon četiri tretmana pazuhe su mi bile potpuno glatke. Sada sam na trećem mjesecu i noge brijam možda jednom u 2 sedmice. Za 175 KM imam nešto što će mi trajati godinama. Salone više neću vidjeti.",
    authorName: "Amila H.",
    authorSubtitle: "28 god. · Sarajevo · koristi PRO 3 mjeseca",
  },
  howItWorks: [
    { step: 1, title: "Svjetlosni impuls cilja korijen", desc: "IPL bljesak prolazi kroz kožu i uspavljuje korijen dlačice. Bez boli — hlađenje radi dok uređaj radi." },
    { step: 2, title: "Dlačica prestaje rasti", desc: "Svaki tretman šalje signal folikulu da uspori. Iz sedmice u sedmicu, dlačice su rjeđe, tanje, i manje vidljive." },
    { step: 3, title: "Glatka koža postaje tvoja normala", desc: "Nakon 8-12 sedmica, većina žena prelazi na održavanje jednom mjesečno. Brijanje postaje prošlost." },
  ],
  reviews: [
    { name: "Merjem", age: 26, text: "Najviše me je brinulo da li će boljeti jer imam jako osjetljivu kožu. Ali — ništa. Osjetim laganu toplinu i to je sve. Sada sam na drugom mjesecu i pazuhe više uopšte ne brijam. Noge brijam jednom u 10 dana. Ovo je najboljih 175 KM koje sam ikad potrošila.", date: "Februar 2026", location: "Sarajevo" },
    { name: "Lamija", age: 31, text: "Godinama sam trošila na vosak u salonu. 60 KM svaki put, jednom mjesečno. To je 720 KM godišnje! Ovaj uređaj je došao za manje od 200 KM i nakon 6 sedmica razlika je nevjerovatna. Muž mi kaže da mi je koža ljepša nego ikad.", date: "Januar 2026", location: "Tuzla" },
    { name: "Adna", age: 23, text: "Bila sam skeptična — mislila sam da ove stvari sa interneta ne rade. Ali drugarica mi je pokazala svoje noge nakon 2 mjeseca korištenja i odmah sam naručila. Sada razumijem zašto je toliko oduševljena. Radim tretman nedjeljom uveče uz Netflix, 10 minuta za noge.", date: "Mart 2026", location: "Zenica" },
  ],
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuh, bikini zona, lice" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Za 8 sedmica možeš zaboraviti da žileti postoje.",
  closingText: "Svaki dan koji odgađaš je još jedno jutro sa brijačem u ruci. 14 dana za povrat ako nisi zadovoljna — bez pitanja. Besplatna dostava u cijeloj BiH.",
};

export default async function IplAparatLandingPage() {
  // Fetch product with images from database
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug: "ice-cool-pro" },
      include: {
        galleryImages: {
          include: { media: true },
          orderBy: { order: 'asc' }
        },
        usageImages: {
          include: { media: true },
          orderBy: { order: 'asc' }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  // Map database product to component props with fallback to hardcoded
  const product = dbProduct ? {
    id: dbProduct.slug,
    name: dbProduct.name,
    price: dbProduct.price / 100,
    compareAtPrice: dbProduct.compareAtPrice ? dbProduct.compareAtPrice / 100 : dbProduct.price / 100,
    images: dbProduct.galleryImages.length > 0
      ? dbProduct.galleryImages.map(gi => gi.media.url)
      : [
          "/slike/PRO/cover-image.png",
          "/slike/PRO/slika2.png",
          "/slike/PRO/slika3.webp",
          "/slike/PRO/slika4.png",
          "/slike/PRO/slika5.png",
          "/slike/PRO/slika6.webp",
          "/slike/PRO/slika7.png"
        ],
    usageImages: dbProduct.usageImages.length > 0
      ? dbProduct.usageImages.map(ui => ui.media.url)
      : [
          "/slike/PRO/koristenje1.png",
          "/slike/PRO/koristenje2.png",
          "/slike/PRO/koristenje3.png",
          "/slike/PRO/koristenje4.png",
          "/slike/PRO/koristenje5.png",
          "/slike/PRO/koristenje6.png",
          "/slike/PRO/koristenje7.png"
        ],
    image: dbProduct.galleryImages[0]?.media.url || "/slike/PRO/cover-image.png"
  } : {
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
      "/slike/PRO/koristenje4.png",
      "/slike/PRO/koristenje5.png",
      "/slike/PRO/koristenje6.png",
      "/slike/PRO/koristenje7.png"
    ],
    image: "/slike/PRO/cover-image.png"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ICE COOL PRO",
    "description": "IPL uređaj za trajno uklanjanje dlačica kod kuće sa Ice Cool™ hlađenjem",
    "brand": { "@type": "Brand", "name": "Ice Cool PRO™" },
    "image": "https://aurorashop.ba/slike/PRO/cover-image.png",
    "offers": {
      "@type": "Offer",
      "price": "175.00",
      "priceCurrency": "BAM",
      "availability": "https://schema.org/InStock",
      "url": "https://aurorashop.ba/l/ipl-aparat-protiv-dlacica",
      "priceValidUntil": "2026-12-31",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "BAM"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "BA"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "BA",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    }
  };

  return (
    <>
      <Script
        id="product-jsonld-pro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding product={product} content={proContent} />
      <Footer />
    </>
  );
}
