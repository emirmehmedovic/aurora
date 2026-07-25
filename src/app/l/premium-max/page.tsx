import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import PremiumMaxProductLanding from "@/components/PremiumMaxProductLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ice Cool PRO MAX™ — IGBT IPL epilator | Aurora Shop",
  description: "Najbrža IPL tehnologija. IGBT flash 0.8s. Neograničeni impulsi. MAX 19.8J energija. 190 KM - Besplatna dostava - 14 dana povrat.",
  keywords: "Ice Cool PRO MAX, IGBT IPL, laser epilator, trajna depilacija, neograničeni impulsi, bikini zona, epilator BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/premium-max",
  },
};

// Specifikacije proizvoda - AMINZER IGBT
const specifications = [
  { label: "Tehnologija", value: "IGBT (najnovija generacija)" },
  { label: "Broj impulsa", value: "Neograničeno" },
  { label: "Energija", value: "MAX 19.8J" },
  { label: "Vrijeme između bljeskalica", value: "0.8 sekundi" },
  { label: "Modovi", value: "3-in-1 (tijelo, lice, bikini)" },
  { label: "Intenziteti", value: "5 nivoa po modu" },
  { label: "Talasna dužina", value: "600-1200nm crvena svjetlost" },
  { label: "Ekran", value: "HD LCD displej" },
  { label: "Režimi rada", value: "Automatski + ručni" },
  { label: "Garancija", value: "12 mjeseci" },
];

// Timeline rezultata
const resultsTimeline = [
  {
    period: "Sedmica 1–2",
    description: "Sporiji rast dlačica. Sa IGBT tehnologijom tretman cijelog tijela traje samo 10 minuta.",
  },
  {
    period: "Sedmica 3–4",
    description: "Vidljivo prorijeđene dlačice. 19.8J energija prodire dublje u folikul.",
  },
  {
    period: "Sedmica 6–8",
    description: "Trajni rezultati. Dlačice postaju tanke i jedva vidljive. Brijač postaje prošlost.",
  },
];

// Recenzije
const reviews = [
  {
    text: "IGBT tehnologija je stvarno brža. Prije sam gubila 30 minuta na noge, sad mi treba 10. A bikini zona — nula iritacije.",
    author: "Amra",
    location: "Sarajevo",
    zone: "bikini · noge",
  },
  {
    text: "Neograničeni impulsi su bili presudni. Koristimo ga cijela porodica već 3 mjeseca, nema straha da će prestati raditi.",
    author: "Mirela",
    location: "Tuzla",
    zone: "cijelo tijelo · porodična upotreba",
  },
  {
    text: "Energija od 19.8J radi posao. Imam tamnije dlačice i vide se rezultati već nakon mjesec dana redovnog korištenja.",
    author: "Sanela",
    location: "Banja Luka",
    zone: "pazuhe · lice",
  },
];

// Comparison table data
const comparisonData = [
  {
    criterion: "Cijena",
    iceCoolProMax: "190 KM",
    philipsLumea: "1.200–1.500 KM",
    salon: "80–120 KM / mj.",
  },
  {
    criterion: "Tehnologija",
    iceCoolProMax: "IGBT (najnovija)",
    philipsLumea: "IPL standardna",
    salon: "Laser",
  },
  {
    criterion: "Broj impulsa",
    iceCoolProMax: "Neograničeno",
    philipsLumea: "450.000",
    salon: null,
  },
  {
    criterion: "Energija",
    iceCoolProMax: "MAX 19.8J",
    philipsLumea: "do 15J",
    salon: "Varira",
  },
  {
    criterion: "Brzina (vrijeme između)",
    iceCoolProMax: "0.8 sekundi",
    philipsLumea: "1.5+ sekundi",
    salon: null,
  },
  {
    criterion: "3-in-1 modovi",
    iceCoolProMax: true,
    philipsLumea: false,
    salon: null,
  },
  {
    criterion: "Kod kuće",
    iceCoolProMax: true,
    philipsLumea: true,
    salon: false,
  },
  {
    criterion: "Pouzećem",
    iceCoolProMax: true,
    philipsLumea: false,
    salon: null,
  },
  {
    criterion: "14 dana povrat",
    iceCoolProMax: true,
    philipsLumea: "Ovisi od prodavca",
    salon: null,
  },
  {
    criterion: "Trošak godišnje",
    iceCoolProMax: "190 KM (jednokratno)",
    philipsLumea: "1.200–1.500 KM",
    salon: "960–1.440 KM",
  },
];

export default async function PremiumMaxPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro-max");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "IGBT IPL epilator sa neograničenim impulsima i MAX 19.8J energijom za trajnu depilaciju kod kuće",
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: 180,
    },
  };

  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PremiumMaxProductLanding
        product={product}
        specifications={specifications}
        resultsTimeline={resultsTimeline}
        reviews={reviews}
        comparisonData={comparisonData}
      />
    </div>
  );
}
