import { Metadata } from "next";
import Script from "next/script";
import AnonymousConfessionLanding from "@/components/AnonymousConfessionLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Anonimna ispovijest korisnice | Ice Cool Pro",
  description:
    "Anonimno iskustvo korisnice Ice Cool Pro IPL uređaja. Kućni tretman jednom sedmično, bez voska, salona i stalnog brijanja. Besplatna dostava u BiH.",
  keywords:
    "Ice Cool Pro iskustva, IPL uređaj iskustva, kućni IPL tretman, depilacija kod kuće, IPL BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/anonimna-ispovijest",
  },
  openGraph: {
    title: "Anonimna ispovijest korisnice | Ice Cool Pro",
    description:
      "Većina korisnica ne želi javno objaviti iskustvo. Pogledaj anonimnu ispovijest i naruči Ice Cool Pro.",
    url: "https://aurorashop.ba/l/anonimna-ispovijest",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
  },
};

export default async function AnonimnaIspovijestPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      "Kućni IPL uređaj sa Ice Cool hlađenjem za glađu rutinu kod kuće, bez voska i salona.",
    brand: {
      "@type": "Brand",
      name: "Ice Cool Pro",
    },
    image: `https://aurorashop.ba${product.image}`,
    offers: {
      "@type": "Offer",
      url: "https://aurorashop.ba/l/anonimna-ispovijest",
      priceCurrency: "BAM",
      price: product.price.toFixed(2),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
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
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "300",
    },
  };

  return (
    <>
      <Script
        id="product-jsonld-anonimna-ispovijest"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnonymousConfessionLanding product={product} />
    </>
  );
}
