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
  title: "IPL Depilacija Bikini Zone Kod Kuće | Aurora ICE COOL",
  description: "Trajno ukloni dlačice u bikini zoni — kod kuće, u svom tempu. ICE COOL epilator: precizan, nježan, bez salona i bez neugode.",
  keywords: "IPL bikini zona, depilacija bikini zone kod kuće, ICE COOL LITE bikini, trajno uklanjanje dlačica intimna zona, IPL za bikini BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/ipl-za-bikini-zonu",
  },
};

const bikiniContent: LandingContent = {
  badge: "Privatnost, preciznost, trajni rezultati",
  heroSubtitle: "Bez termina. Bez nepoznatih. Samo ti, kod kuće, u miru — i rezultati koji traju.",
  benefits: [
    "Privatnost koja se podrazumijeva — tretman sama, bez tuđih pogleda, bez žurbe",
    "Ice cooling — nema bola voska, nema iritacije brijanja, nema crvenila",
    "Trajni rezultati — nakon 8 tretmana bikini zona ostaje glatka bez intervencije",
    "Ti odlučuješ kada — subota, usred sedmice, u 22h, bez termina",
  ],
  empathyTitle: "Bikini zona — tvoja, u tvom tempu",
  empathySubtitle: "Kućni IPL je odgovor koji su mnoge žene čekale — i nije kompromis u rezultatima.",
  empathyParagraph1: "Salon za bikini zonu depilaciju je neugodna priča za mnoge žene. Razotkrivanje pred nepoznatom osobom, hladni vosak, bolni trzaji, i na kraju crvenilo koje te prati cijeli dan. A to se ponavlja svaki mjesec, za 40–60 KM po tretmanu.",
  empathyParagraph2: "Kućni IPL mijenja tu jednadžbu potpuno. Radiš sama, u svom prostoru, u svom tempu. ICE COOL hlađenje rashladuje kožu pri svakom bljeskaju — nema trzanja, nema urastanja dlačica, nema crvenila. I rezultati ostaju — ne moraš ponavljati svake 3–4 sedmice.",
  empathyHighlight: "165 KM jednom. Više nema svjesnog 'je sam li se obrijala' pred plažu — zona je glatka i gotovo.",
  story: {
    title: "'Više ne trebam brinuti o 'je sam li se obrijala' pred plažu.'",
    text: "Nisam mogla vjerovati da je to moguće raditi kod kuće — i biti zadovoljna rezultatima. Uvijek sam imala problem s ingvinalnim urastanjima od brijanja — to je nestalo potpuno. Nakon 6 sedmica, zone koje su uvijek bile problem praktički su nestale. Sad ne mislim na to — nema potrebe. Jednom sam kupila LITE, i to je bio jedini trošak.",
    authorName: "Maja S.",
    authorSubtitle: "29 god. · Mostar · koristi LITE 3 mjeseca",
  },
  howItWorks: [
    {
      step: 1,
      title: "Tretman kod kuće — potpuna privatnost",
      desc: "Uzmeš uređaj, radiš kada ti odgovara — u 22h, u pidžami, dok gledaš seriju. Nema zakazivanja, nema čekaonice, nema neugode pred stranom osobom.",
    },
    {
      step: 2,
      title: "Ice cooling — nula iritacije, nula urastanja",
      desc: "Ice cooling tehnologija rashladuje kožu pri svakom bljeskaju. Nema trzanja, nema urastanja dlačica, nema crvenila. Daleko, daleko ugodnije od voska.",
    },
    {
      step: 3,
      title: "8 tretmana — i zona ostaje glatka",
      desc: "Prvih 8 sedmica jednom sedmično. Nakon toga, jedan tretman svakih 4–8 sedmica za održavanje — ili potpuna sloboda. Mnoge korisnice ne trebaju ni to.",
    },
  ],
  reviews: [
    {
      name: "Maja",
      age: 29,
      text: "Nisam mogla vjerovati da je to moguće raditi kod kuće — i biti zadovoljna rezultatima. Nakon 6 sedmica, zone koje su uvijek bile problem praktički su nestale. Više ne trebam brinuti o 'je sam li se obrijala' pred plažu.",
      date: "Februar 2026",
      location: "Mostar",
    },
    {
      name: "Nikolina",
      age: 33,
      text: "Kupila sam PRO model jer sam htjela koristiti i za noge. Za bikini zonu — nevjerovatno ugodno. Hlađenje je sve. Nikad više salon.",
      date: "Januar 2026",
      location: "Banja Luka",
    },
    {
      name: "Azra",
      age: 27,
      text: "Moja prijateljica mi je preporučila i bila sam skeptična. Tri sedmice poslije — imam rezultate koje inače nisam vidjela ni od voska. I nema urastanja! To je bilo uvijek moj najveći problem.",
      date: "Mart 2026",
      location: "Zenica",
    },
  ],
  specs: [
    { label: "Napajanje", value: "USB-C (adapter uključen)" },
    { label: "Broj bljeskova", value: "500,000" },
    { label: "Nivoi intenziteta", value: "3" },
    { label: "Površina bljeska", value: "Kompaktna — idealna za precizne zone" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ aktivno hlađenje" },
    { label: "Težina", value: "~200g" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Bikini zona, lice, pazuhe, noge, ruke" },
    { label: "Tip kože", value: "Fitzpatrick I-IV (svijetla do maslinasta)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, USB-C kabel, naočale, nastavci, priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Bikini zona bez kompromisa. 165 KM jednom.",
  closingText: "Manje od dva salona. Tretman u udobnosti tvog doma. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
};

export default async function IplZaBikiniZonuPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-lite"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kompaktni IPL epilator za bikini zonu — privatno, nježno, trajno. Ice cooling tehnologija.",
    brand: { "@type": "Brand", name: "Ice Cool PRO™" },
    image: `https://aurorashop.ba${product.image}`,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
      url: "https://aurorashop.ba/l/ipl-za-bikini-zonu",
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
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "28" },
  };

  return (
    <>
      <Script
        id="product-jsonld-bikini"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding
        product={product}
        content={bikiniContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
