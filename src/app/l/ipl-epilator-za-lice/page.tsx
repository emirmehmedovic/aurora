import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IPL Epilator za Lice | Aurora ICE COOL LITE (50 znakova)",
  description: "Trajno ukloni dlačice s lica kod kuće. ICE COOL LITE je mali, precizan i nježan — idealan za gornju usnu, bradu i zalistke.",
  keywords: "IPL epilator za lice, depilacija lica kod kuće, ICE COOL LITE, gornja usna depilacija, IPL brada zalisci, trajno uklanjanje dlačica lice BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/ipl-epilator-za-lice",
  },
};

const liceContent: LandingContent = {
  badge: "Idealan za gornju usnu, bradu i zalistke",
  heroSubtitle: "Dovoljno mali za torbicu, dovoljno precizan za gornju usnu. Hladan na dodir. Bez iritacije. Bez salona.",
  benefits: [
    "Preciznost koja prati svaku konturu — gornja usna, brada, linija vilice, lako",
    "Ice cooling = nula iritacije čak i na najosetljivijoj zoni na tijelu",
    "Vidljivi rezultati za 3–4 tretmana — dlačice postaju rjeđe i tanje",
    "500.000 bljeskova = 10+ godina tretmana lica bez zamjenskih dijelova",
  ],
  empathyTitle: "Dlačice na licu — jednom i zauvijek",
  empathySubtitle: "LITE je kompaktan i lagan točno toliko da precizan rad na malom licu ima smisla.",
  empathyParagraph1: "Svaki put kad se pogledaš u ogledalo — jutros, pred izlaz, usput u liftu — primijetiš ih. Te par dlačica na gornjoj usni. Mala brada koja se uvijek pojavi u najgorem trenutku. Zalisci koje nitko drugi ne primjećuje, a ti uvijek.",
  empathyParagraph2: "Brijanje lica? Ne, hvala — crvenilo, osjećaj kao da si grebala papyrom, i za tri dana isto iznova. Salon depilacija voskom? Bolna, skupa, i uvijek nekako vidljivo crveniš sat-dva poslije. Postoji razlog zašto sve više žena bira kućni IPL za lice — i nije samo cijena.",
  empathyHighlight: "ICE COOL LITE. 165 KM jednom. Gornja usna, brada, zalisci — za 5 minuta, u miru tvog kupaonice.",
  story: {
    title: "'Srela me prijateljica i pitala jel sam nešto radila na licu — nisam joj rekla šta.'",
    text: "Koristim LITE samo za gornju usnu i postoji, bukvalno. Nakon 5 tretmana više nema potrebe da svako jutro provjeravam. Uvijek sam se stresirala oko tog jednog detalja — i sad toga nema. Uređaj stoji u ladici, uzmem ga jednom tjedno, gotovo. Kao da taj problem više ne postoji. Hlađenje je presudno — nema uopće neugode, čak ni na gornjoj usni koja mi je uvijek bila najosjetljivija zona.",
    authorName: "Amra D.",
    authorSubtitle: "28 god. · Sarajevo · koristi LITE 2 mjeseca",
  },
  howItWorks: [
    {
      step: 1,
      title: "Kompaktno — precizan rad na svakoj zoni lica",
      desc: "LITE je kompaktan i lagčan točno toliko da precizan rad na malom licu ima smisla. Gornja usna, brada, linija vilice — lako. Stane u ladicu, torbicu, kofer. Malen kao šminkarska spužvica — ali radi posao koji salon naplaćuje 400+ KM.",
    },
    {
      step: 2,
      title: "Ice cooling štiti lice od iritacije",
      desc: "Lice je najosjetljivija zona. Svaki bljesak LITE-a prethodi kratko hlađenje — koža je rashladjena prije tretmana, ne gori, ne crvi. Korisnice opisuju osjećaj kao blagi topli trzaj — ne bol.",
    },
    {
      step: 3,
      title: "Rezultati za 3–4 tretmana",
      desc: "Gornja usna je manja zona, pa se rezultati primijete brže. Tipično: 3–4 tretmana za vidljivo stanjivanje, 8 tretmana za trajno uklanjanje. Tretman jedne zone traje 3–5 minuta.",
    },
  ],
  reviews: [
    {
      name: "Amra",
      age: 28,
      text: "Koristim ga samo za gornju usnu i postoji, bukvalno. Nakon 5 tretmana više nema potrebe da svako jutro provjeravam. Srela sam prijateljicu koja me pitala jel sam 'nešto radila' — nisam rekla šta.",
      date: "Februar 2026",
      location: "Sarajevo",
    },
    {
      name: "Lejla",
      age: 31,
      text: "Bila sam skeptična prema IPL-u za lice jer mislim da je koža lica drugačija. Ali hlađenje je presudno — nema uopće neugode, čak ni na gornjoj usni koja mi je uvijek bila najosjetljivija zona.",
      date: "Januar 2026",
      location: "Tuzla",
    },
    {
      name: "Maja",
      age: 25,
      text: "Tražila sam nešto za zalistke i bradu. LITE je savršen — mali, precizan, ne reže se, ne crvi. Nakon 4 tretmana brada je skoro potpuno čista. Nikad se nisam osjećala bolje.",
      date: "Mart 2026",
      location: "Mostar",
    },
  ],
  specs: [
    { label: "Napajanje", value: "USB-C (adapter uključen)" },
    { label: "Broj bljeskova", value: "500,000" },
    { label: "Nivoi intenziteta", value: "3" },
    { label: "Površina bljeska", value: "Kompaktna (pogodna za lice)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ aktivno hlađenje" },
    { label: "Težina", value: "~200g" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Lice, gornja usna, brada, zalisci, bikini zona, pazuhe" },
    { label: "Tip kože", value: "Fitzpatrick I-IV (svijetla do maslinasta)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, USB-C kabel, naočale, nastavak za lice, priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Lice bez dlačica. 165 KM jednom — zauvijek.",
  closingText: "Manje od jednog salona. Tretman u ladici. Uzmeš kad trebaš — LITE je uvijek tu. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
};

export default async function IplEpilatorZaLicePage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-lite"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kompaktni IPL epilator za lice — gornja usna, brada, zalisci. Ice cooling tehnologija.",
    brand: { "@type": "Brand", name: "Ice Cool PRO™" },
    image: `https://aurorashop.ba${product.image}`,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
      url: "https://aurorashop.ba/l/ipl-epilator-za-lice",
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
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "24" },
  };

  return (
    <>
      <Script
        id="product-jsonld-lice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding
        product={product}
        content={liceContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
