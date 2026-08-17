import { Metadata } from "next";
import Script from "next/script";
import IceCoolProMaxLanding from "@/components/IceCoolProMaxLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ice Cool Pro Max | IPL uređaj za kućnu upotrebu",
  description: "Intimnost ne bi trebala čekati da se koža smiri. Ice Cool Pro Max IPL uređaj — tretman kod kuće, bez salona i bez stalnog brijanja. Za bikini zonu, noge, ruke i pazuhe.",
  keywords: "Ice Cool Pro Max, IPL uređaj, kućna depilacija, bikini zona, intimnost, IPL epilator BiH, hlađenje kože, trajno uklanjanje dlačica",
  alternates: {
    canonical: "https://aurorashop.ba/l/intimnost-ne-ceka",
  },
  openGraph: {
    title: "Ice Cool Pro Max | IPL uređaj za kućnu upotrebu",
    description: "Intimnost ne bi trebala čekati da se koža smiri. Ice Cool Pro Max IPL uređaj — tretman kod kuće, bez salona i bez stalnog brijanja.",
    url: "https://aurorashop.ba/l/intimnost-ne-ceka",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
  },
};

export default async function IntimnostNeCekaPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro-max");

  const productWithCompare = {
    ...product,
    compareAtPrice: product.compareAtPrice || product.price * 2,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Ice Cool Pro Max",
    description: "IPL uređaj za kućnu upotrebu s Ice Cool+™ dvostrukim hlađenjem. Za bikini zonu, noge, ruke i pazuhe. Bez voska, salona i stalnog brijanja.",
    brand: {
      "@type": "Brand",
      name: "Ice Cool",
    },
    image: `https://aurorashop.ba${product.image}`,
    offers: {
      "@type": "Offer",
      url: "https://aurorashop.ba/l/intimnost-ne-ceka",
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
        id="product-jsonld-intimnost-ne-ceka"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IceCoolProMaxLanding product={productWithCompare} />
    </>
  );
}
