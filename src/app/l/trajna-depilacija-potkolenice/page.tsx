import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trajna Depilacija Nogu Kod Kuće | Aurora IPL",
  description: "Prestani brijati noge svaka 3 dana. ICE COOL PRO epilator — 8 sedmica tretmana i godinama bez brijanja. Dostava u BiH danas.",
  keywords: "trajna depilacija nogu, IPL epilator noge, prestani brijati noge, ICE COOL PRO, trajno uklanjanje dlačica potkolenice, IPL noge BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/trajna-depilacija-potkolenice",
  },
};

const nogeContent: LandingContent = {
  badge: "Za žene koje su umorne od brijanja",
  heroSubtitle: "8 sedmica. Jednom tjedno. Nakon toga — briji se samo ako poželiš. ICE COOL PRO za trajno glatke noge kod kuće.",
  benefits: [
    "Brži od svakog drugog kućnog uređaja — obje noge za 20–25 minuta",
    "Ice cooling — noge bez crvenila, bez nadražaja folikula, bez urastanja",
    "Nema urastanja — IPL uništava folikul iznutra, dlačice ne rastu kao bodlja",
    "175 KM jednom vs. 200 KM godišnje zauvijek na žilete i pjenu",
  ],
  empathyTitle: "Zadnji put ćeš se brijati kada kupiš ovo",
  empathySubtitle: "ICE COOL PRO za trajno glatke noge. 8 sedmica. Jednom tjedno. Nakon toga — sloboda.",
  empathyParagraph1: "Razmisli koliko si puta u životu brijala noge. Svaka 2–3 dana, da ne ostavljamo dlačice koje su odmah vidljive. Pet minuta po sesiji, 2–3 puta tjedno — to je oko 600–700 minuta godišnje. Više od 10 sati godišnje samo na brijanje nogu.",
  empathyParagraph2: "A da ne govorimo o novcu. Žilet, pjena, zamjenske britvice — recimo skromnih 15–20 KM mjesečno. To je 180–240 KM godišnje na nešto što napravi razliku na 72 sata. ICE COOL PRO košta 175 KM jednom. Koristiš 10+ godina. Plan je brutalno jednostavan.",
  empathyHighlight: "175 KM jednom. Sedmice 1–8: jednom tjedno. Sedmice 9+: zaboravelaš da se brijaš — jer nema potrebe.",
  story: {
    title: "'Nisam se brijala noge 6 sedmica. Nije slučajno — jednostavno nije trebalo.'",
    text: "Jednom sam stigla u kratkim pantalonama u ured i koleginica me pitala 'dal si u salonu bila'. Nisam. Bila sam u fotelji s ICE COOL-om i netflixom. Uvijek sam imala problem s urastanjem dlačica na nogama — pogotovo na potkoljenicama. Od kada koristim ICE COOL, toga više nema. To mi je vredelo samo po sebi, čak i bez svega ostalog.",
    authorName: "Selma R.",
    authorSubtitle: "34 god. · Sarajevo · koristi PRO 5 mjeseci",
  },
  howItWorks: [
    {
      step: 1,
      title: "Sedmice 1–8: jednom tjedno, 20–25 minuta",
      desc: "PRO model pokriva veće površine brže zahvaljujući većoj glavi i optimiziranom bljeskanju. Obje noge za 20–25 minuta. Radiš to jednom nedjeljno — manje vremena nego jedan brijanje.",
    },
    {
      step: 2,
      title: "Ice cooling — noge bez crvenila i urastanja",
      desc: "Klasično brijanje prati sitno crvenilo i nadražaj folikula. IPL s hlađenjem ne — koža ostaje glatka i mirna. Brijanje reže dlačicu i čini je tvrdom — IPL uništava folikul iznutra. Nema urastanja.",
    },
    {
      step: 3,
      title: "Sedmice 9+: zaboravljaš da se brijaš",
      desc: "Primjećuješ da si se zaboravila brijati — jer nema potrebe. Povremeni tretman jednom u par mjeseci za održavanje, ili potpuna sloboda. Većina korisnica ne treba ni to.",
    },
  ],
  reviews: [
    {
      name: "Selma",
      age: 34,
      text: "Nisam se brijala noge 6 sedmica. Nisam zaboravila — jednostavno nije trebalo. Jednom sam stigla u kratkim pantalonama u ured i koleginica me pitala 'dal si u salonu bila'. Nisam. Bila sam u fotelji s ICE COOL-om i netflixom.",
      date: "Mart 2026",
      location: "Sarajevo",
    },
    {
      name: "Dijana",
      age: 29,
      text: "Uvijek sam imala problem s urastanjem dlačica na nogama — pogotovo na potkoljenicama. Od kada koristim ICE COOL, toga više nema. To mi je vredelo samo po sebi.",
      date: "Februar 2026",
      location: "Tuzla",
    },
    {
      name: "Tamara",
      age: 32,
      text: "Skeptična sam bila jer sam mislila da treba ići u salon za prave rezultate. Nakon 8 sedmica sam gotovo zaboravila na brijanje. Ozbiljno.",
      date: "Januar 2026",
      location: "Banja Luka",
    },
  ],
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Površina bljeska", value: "Standardna (brža pokrivenost velikih zona)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ aktivno hlađenje" },
    { label: "Brzina impulsa", value: "Automatski mod za brže tretmane" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuhe, bikini zona, lice" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, nastavci, priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Noge bez brijanja. 175 KM jednom — zauvijek.",
  closingText: "Svaki žilet, svaka pjena — novac koji više ne moraš davati. PRO se isplati već nakon prve godine. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
};

export default async function TrajnaDepilacijaPotkoleniePage() {
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug: "ice-cool-pro" },
      include: {
        galleryImages: { include: { media: true }, orderBy: { order: "asc" } },
        usageImages: { include: { media: true }, orderBy: { order: "asc" } },
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  const product = dbProduct
    ? {
        id: dbProduct.slug,
        name: dbProduct.name,
        price: dbProduct.price / 100,
        compareAtPrice: dbProduct.compareAtPrice
          ? dbProduct.compareAtPrice / 100
          : dbProduct.price / 100,
        images:
          dbProduct.galleryImages.length > 0
            ? dbProduct.galleryImages.map((gi) => gi.media.url)
            : [
                "/slike/PRO/cover-image.png",
                "/slike/PRO/slika2.png",
                "/slike/PRO/slika3.webp",
                "/slike/PRO/slika4.png",
              ],
        usageImages:
          dbProduct.usageImages.length > 0
            ? dbProduct.usageImages.map((ui) => ui.media.url)
            : [
                "/slike/PRO/koristenje1.png",
                "/slike/PRO/koristenje2.png",
                "/slike/PRO/koristenje3.png",
              ],
        image: dbProduct.galleryImages[0]?.media.url || "/slike/PRO/cover-image.png",
      }
    : {
        id: "ice-cool-pro",
        name: "ICE COOL PRO",
        price: 175.0,
        compareAtPrice: 350.0,
        images: [
          "/slike/PRO/cover-image.png",
          "/slike/PRO/slika2.png",
          "/slike/PRO/slika3.webp",
          "/slike/PRO/slika4.png",
        ],
        usageImages: [
          "/slike/PRO/koristenje1.png",
          "/slike/PRO/koristenje2.png",
          "/slike/PRO/koristenje3.png",
        ],
        image: "/slike/PRO/cover-image.png",
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ICE COOL PRO",
    description: "IPL epilator za trajnu depilaciju nogu kod kuće — 8 sedmica do slobode od brijanja.",
    brand: { "@type": "Brand", name: "Ice Cool PRO™" },
    image: "https://aurorashop.ba/slike/PRO/cover-image.png",
    offers: {
      "@type": "Offer",
      price: "175.00",
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
      url: "https://aurorashop.ba/l/trajna-depilacija-potkolenice",
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "BAM" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "BA" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BA",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "41" },
  };

  return (
    <>
      <Script
        id="product-jsonld-noge"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding product={product} content={nogeContent} />
      <Footer />
    </>
  );
}
