import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import PremiumProductLanding from "@/components/PremiumProductLanding";
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
  title: "Ice Cool PRO™ — Kućni IPL epilator | Aurora Shop",
  description: "Glatka koža. Trajno. Profesionalni IPL tretman kod kuće. 175 KM - Besplatna dostava - 14 dana povrat.",
  keywords: "Ice Cool PRO, IPL epilator, kućni IPL, trajna depilacija, Ice Cooling, epilator BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/premium",
  },
};

// Specifikacije proizvoda
const specifications = [
  { label: "Tehnologija", value: "IPL (Intense Pulsed Light)" },
  { label: "Broj impulsa", value: "999.900" },
  { label: "Intenziteti", value: "5 nivoa" },
  { label: "Hlađenje", value: "Ice Cooling™ tehnologija" },
  { label: "Zone tretmana", value: "Noge, pazuhe, bikini, lice" },
  { label: "Trajanje tretmana", value: "~10 minuta" },
  { label: "Napajanje", value: "Kabel (uključen)" },
  { label: "Garancija", value: "12 mjeseci" },
];

// Timeline rezultata
const resultsTimeline = [
  {
    period: "Sedmica 1–2",
    description: "Sporiji rast dlačica. Koža glatka duže između brijanja.",
  },
  {
    period: "Sedmica 3–4",
    description: "Primjetan pad gustoće dlačica. Manje iritacije i uraslih.",
  },
  {
    period: "Sedmica 6–8",
    description: "Trajno usporavanje rasta. Brijač postaje rijedak gost.",
  },
];

// Recenzije
const reviews = [
  {
    text: "Koristim 6 sedmica. Pazuhe više uopće ne brijem. Žao mi je što nisam ranije probala.",
    author: "Daniela",
    location: "Zenica",
    zone: "pazuhe · noge",
  },
  {
    text: "Nisam vjerovala da će raditi za bikini zonu. Nula iritacije, nula uraslih. Jedina stvar koja mi je ikad odgovarala.",
    author: "Nikolina",
    location: "Mostar",
    zone: "bikini zona · osjetljiva koža",
  },
  {
    text: "Gledala sam Philips Lumeu ali 1500 KM je previše. Ovo radi isto. Dlačice nestaju isto tako.",
    author: "Lejla",
    location: "Sarajevo",
    zone: "noge",
  },
];

// Comparison table data
const comparisonData = [
  {
    criterion: "Cijena",
    iceCoolPro: "175 KM",
    philipsLumea: "1.200–1.500 KM",
    salon: "80–120 KM / mj.",
  },
  {
    criterion: "Hlađenje",
    iceCoolPro: true,
    philipsLumea: true,
    salon: false,
  },
  {
    criterion: "Kod kuće",
    iceCoolPro: true,
    philipsLumea: true,
    salon: false,
  },
  {
    criterion: "Pouzećem",
    iceCoolPro: true,
    philipsLumea: false,
    salon: null,
  },
  {
    criterion: "14 dana povrat",
    iceCoolPro: true,
    philipsLumea: "Ovisi od prodavca",
    salon: null,
  },
  {
    criterion: "Trošak godišnje",
    iceCoolPro: "175 KM",
    philipsLumea: "1.200–1.500 KM",
    salon: "960–1.440 KM",
  },
];

export default async function PremiumPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kućni IPL epilator sa Ice Cooling™ tehnologijom za trajno glatku kožu",
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 300,
    },
  };

  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PremiumProductLanding
        product={product}
        specifications={specifications}
        resultsTimeline={resultsTimeline}
        reviews={reviews}
        comparisonData={comparisonData}
      />
    </div>
  );
}
