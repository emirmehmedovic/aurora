import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "ICE COOL LITE™ | Kompaktni IPL Uređaj za Putovanja i Lice | BiH",
  description: "ICE COOL LITE – kompaktni IPL uređaj idealan za putovanja i tretmane lica. Lagan, prenosiv, 500k bljeskova. Besplatna dostava u BiH. Naruči danas →",
  keywords: "kompaktni IPL uređaj, mini IPL aparat, laserski epilator za putovanja, ICE COOL LITE, IPL bikini zona, IPL za lice BiH",
  alternates: {
    canonical: "https://icecoolpro.ba/l/kompaktni-ipl-uredjaj",
  }
};

const liteContent: LandingContent = {
  badge: "Savršen prvi korak u IPL depilaciji",
  heroSubtitle: "Manji od telefona. Radi isti posao. Idealan za lice, bikini zonu i sve putnice.",
  benefits: [
    "Precizan nastavak za lice, gornju usnu i bikini — baš gdje ti treba",
    "Lagan i kompaktan — stane u torbicu, ponesi na more, vikendicu, putovanje",
    "Jednostavan za korištenje — savršen ako ti je ovo prvi IPL",
    "500.000 bljeskova = 10+ godina tretmana lica i manjih zona",
  ],
  empathyTitle: "Hoćeš probati IPL, ali ne znaš odakle početi?",
  empathySubtitle: "LITE je napravljen baš za tebe.",
  empathyParagraph1: "Možda ti se čini da je IPL kompliciran ili skup. Ili se pitaš: 'Hoće li uopšte raditi za mene?' LITE je savršen odgovor — jednostavan za korištenje, precizan za lice i bikini zonu, a dovoljno kompaktan da ga poneseš svuda.",
  empathyParagraph2: "Sa preciznim nastavkom za lice i bikini zonu, LITE je idealan za područja koja zahtijevaju pažljiviji pristup. A ako putuješ — stane u neseser. Nema više brijanja u hotelskim sobama niti panike prije plaže.",
  empathyHighlight: "165 KM za uređaj koji će ti trajati godinama. Manje od 3 posjeta salonu za vosak. Radi računicu.",
  story: {
    title: "'Nisam bila sigurna da li IPL radi. LITE me potpuno uvjerio.'",
    text: "Dugo sam razmišljala o IPL-u, ali nisam bila sigurna je li to za mene. LITE mi je bio savršen prvi korak — precizan nastavak za gornju usnu i bikini zonu, i dovoljno mali da ga nosim svuda. Već nakon trećeg tretmana gornja usna mi je bila potpuno čista. Sada ga nosim i kad idem na more — stane u torbicu, lakši je od šminke. Za 165 KM ovo je apsolutno najbolji poklon koji sam sebi kupila.",
    authorName: "Dina M.",
    authorSubtitle: "25 god. · Sarajevo · koristi LITE 3 mjeseca",
  },
  howItWorks: [
    { step: 1, title: "Precizan bljesak za osjetljiva područja", desc: "Mali nastavak cilja tačno tamo gdje treba — gornja usna, brada, bikini, pazuhe. Bez straha da ćeš pogađati pogrešno mjesto." },
    { step: 2, title: "Hlađenje štiti i najosjetljiviju kožu", desc: "Ice Cool™ hlađenje radi tokom svakog bljeska. Čak i na bikini zoni i licu — ugodan tretman, bez crvenila." },
    { step: 3, title: "Ponesi ga svuda sa sobom", desc: "Stane u neseser, lagan je i ne zauzima mjesto. Glatka koža na moru, vikendici, putovanju — bez kompromisa." },
  ],
  reviews: [
    { name: "Sara", age: 24, text: "Kupila sam LITE samo za gornju usnu i bradu — to mi je bio najveći kompleks. Već nakon 3 sedmice gornja usna mi je potpuno čista. Precizan nastavak je genijalan, pokriva tačno to malo područje. Hlađenje je super, ne osjetiš ništa. Za 165 KM ovo je dar od Boga.", date: "Mart 2026", location: "Sarajevo" },
    { name: "Aida", age: 28, text: "Puno putujem zbog posla i LITE mi je savršen jer ga nosim svuda. Stane u torbicu, lakši je od fena. Koristim ga za pazuhe i bikini zonu — već nakon mjesec dana skoro da nema ništa. Prijateljice su sve pitale šta koristim.", date: "Februar 2026", location: "Tuzla" },
    { name: "Hana", age: 22, text: "Ovo mi je prvi IPL ikad i bila sam nervozna. Ali LITE je tako jednostavan da sam ga koristila bez ikakvog uputstva. Mali je, ugodan, i ne plaši me. Noge brijam upola rjeđe već nakon mjesec dana. Sljedeći korak — naručim drugarici za rođendan.", date: "Januar 2026", location: "Bihać" },
  ],
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "500,000" },
    { label: "Nivoi intenziteta", value: "3" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Dizajn", value: "Ultra-kompaktan, prenosiv" },
    { label: "Posebni nastavci", value: "Precizan nastavak za lice i bikini zonu" },
    { label: "Pogodno za", value: "Lice, gornja usna, pazuh, bikini zona, manja područja" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, precizan nastavak, korisnički priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Glatka koža za 165 KM. Ozbiljno.",
  closingText: "To je manje od 3 posjeta salonu. LITE radi isti posao — samo stane u torbicu. 14 dana za povrat ako nisi zadovoljna. Besplatna dostava u BiH.",
};

export default async function KompaktniIplLandingPage() {
  // Fetch product with images from database
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug: "ice-cool-lite" },
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

  // Map database product to component props with fallback
  const product = dbProduct ? {
    id: dbProduct.slug,
    name: dbProduct.name,
    price: dbProduct.price / 100,
    compareAtPrice: dbProduct.compareAtPrice ? dbProduct.compareAtPrice / 100 : dbProduct.price / 100,
    images: dbProduct.galleryImages.length > 0
      ? dbProduct.galleryImages.map(gi => gi.media.url)
      : [
          "/slike/LITE/cover.png",
          "/slike/LITE/1.png",
          "/slike/LITE/2.png",
          "/slike/LITE/3.png",
          "/slike/LITE/4.png",
          "/slike/LITE/5.png",
          "/slike/LITE/6.png"
        ],
    usageImages: dbProduct.usageImages.length > 0
      ? dbProduct.usageImages.map(ui => ui.media.url)
      : [
          "/slike/LITE/4.png",
          "/slike/LITE/5.png",
          "/slike/LITE/6.png"
        ],
    image: dbProduct.galleryImages[0]?.media.url || "/slike/LITE/cover.png"
  } : {
    id: "ice-cool-lite",
    name: "ICE COOL LITE",
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
    image: "/slike/LITE/cover.png"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ICE COOL LITE",
    "description": "Kompaktni IPL uređaj idealan za putovanja, lice i osjetljive zone",
    "brand": { "@type": "Brand", "name": "Ice Cool PRO™" },
    "image": "https://aurorashop.ba/slike/LITE/cover.png",
    "offers": {
      "@type": "Offer",
      "price": "165.00",
      "priceCurrency": "BAM",
      "availability": "https://schema.org/InStock",
      "url": "https://aurorashop.ba/l/kompaktni-ipl-uredjaj",
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
      "reviewCount": "28"
    }
  };

  return (
    <>
      <Script
        id="product-jsonld-lite"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding product={product} content={liteContent} />
      <Footer />
    </>
  );
}
