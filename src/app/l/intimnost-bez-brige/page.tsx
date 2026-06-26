import { Metadata } from "next";
import Script from "next/script";
import IntimnostLanding from "@/components/IntimnostLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Intimnost bez brige i nelagode | Ice Cool PRO™",
  description: "Urasle dlačice i iritacije na bikini zoni te sprječavaju da uživaš. Kada koža postane glatkija i mirnija, to se primijeti — čak i bez riječi. Ice Cool PRO™ kućni IPL epilator s hlađenjem, 175 KM.",
  keywords: "Ice Cool PRO, IPL epilator BiH, intimnost bez brige, bikini zona, urasle dlačice, iritacija koža, kućna depilacija, hlađenje kože, trajno uklanjanje dlačica",
  alternates: {
    canonical: "https://aurorashop.ba/l/intimnost-bez-brige",
  },
  openGraph: {
    title: "Intimnost bez brige i nelagode | Ice Cool PRO™",
    description: "Urasle dlačice i iritacije na bikini zoni te sprječavaju da uživaš. Kada koža postane glatkija i mirnija, to se primijeti — čak i bez riječi.",
    url: "https://aurorashop.ba/l/intimnost-bez-brige",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
  },
};

export default async function IntimnostBezBrigePage() {
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
    description: "Kućni IPL epilator s Ice Cooling™ tehnologijom za trajno smanjenje dlačica na nogama, pazuhama, bikini zoni i licu. Bez iritacije i uraslih dlačica.",
    brand: {
      "@type": "Brand",
      name: "Ice Cool",
    },
    offers: {
      "@type": "Offer",
      url: "https://aurorashop.ba/l/intimnost-bez-brige",
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
        id="product-jsonld-intimnost-bez-brige"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntimnostLanding product={productWithCompare} />
    </>
  );
}
