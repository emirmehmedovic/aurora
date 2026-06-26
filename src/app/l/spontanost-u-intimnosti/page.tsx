import { Metadata } from "next";
import Script from "next/script";
import SpontanostLanding from "@/components/SpontanostLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kad skineš veš, prvo što primijetiš su urasle dlačice | Ice Cool PRO™",
  description: "Ne možeš biti spontana. Moraš planirati intimnost oko termina u salonu. Ice Cool PRO™ ti daje glatku i urednu zonu — kad god poželiš. 175 KM, besplatna dostava.",
  keywords: "Ice Cool PRO, IPL epilator BiH, spontanost intimnost, bikini zona, urasle dlačice, iritacija koža, glatka koža, kućna depilacija",
  alternates: {
    canonical: "https://aurorashop.ba/l/spontanost-u-intimnosti",
  },
  openGraph: {
    title: "Kad skineš veš, prvo što primijetiš su urasle dlačice | Ice Cool PRO™",
    description: "Ne možeš biti spontana. Moraš planirati intimnost oko termina u salonu. Ice Cool PRO™ ti daje glatku i urednu zonu — kad god poželiš.",
    url: "https://aurorashop.ba/l/spontanost-u-intimnosti",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
  },
};

export default async function SpontanostUIntimnostiPage() {
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
    description: "Kućni IPL epilator s Ice Cooling™ tehnologijom za trajno smanjenje dlačica. Glatka i uredna bikini zona bez iritacije i uraslih dlačica.",
    brand: {
      "@type": "Brand",
      name: "Ice Cool",
    },
    offers: {
      "@type": "Offer",
      url: "https://aurorashop.ba/l/spontanost-u-intimnosti",
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
        id="product-jsonld-spontanost-u-intimnosti"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpontanostLanding product={productWithCompare} />
    </>
  );
}
