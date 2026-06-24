import { Metadata } from "next";
import Script from "next/script";
import LjetoLanding from "@/components/LjetoLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Koliko si ljetnih dana provela sjedeći ovako? | Ice Cool PRO™",
  description: "Peškir u krilu. Noge skupljene. Izbjegavaš ustati dok te ne vide. Taj osjećaj ima rješenje — i to trajno. Ice Cool PRO™ kućni IPL epilator s hlađenjem, 175 KM.",
  keywords: "Ice Cool PRO, IPL epilator BiH, ljeto bez brige, glatke noge, bikini zona, pazuhe, kućna depilacija, hlađenje kože, trajno uklanjanje dlačica",
  alternates: {
    canonical: "https://aurorashop.ba/l/ljeto-bez-brige",
  },
  openGraph: {
    title: "Koliko si ljetnih dana provela sjedeći ovako? | Ice Cool PRO™",
    description: "Peškir u krilu. Noge skupljene. Izbjegavaš ustati dok te ne vide. Taj osjećaj ima rješenje — i to trajno.",
    url: "https://aurorashop.ba/l/ljeto-bez-brige",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
  },
};

export default async function LjetoBezBrigePage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  // Ensure compareAtPrice is set for LandingOrderForm
  const productWithCompare = {
    ...product,
    compareAtPrice: product.compareAtPrice || product.price * 2,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Ice Cool PRO™",
    description: "Kućni IPL epilator s Ice Cooling™ tehnologijom za trajno smanjenje dlačica na nogama, pazuhama, bikini zoni i licu.",
    brand: {
      "@type": "Brand",
      name: "Ice Cool",
    },
    offers: {
      "@type": "Offer",
      url: "https://aurorashop.ba/l/ljeto-bez-brige",
      priceCurrency: "BAM",
      price: "175",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
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
        id="product-jsonld-ljeto-bez-brige"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LjetoLanding product={productWithCompare} />
    </>
  );
}
