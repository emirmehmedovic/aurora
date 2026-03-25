import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductLanding from "@/components/ProductLanding";
import { getStorefrontProductBySlug } from "@/lib/storefront-products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  const productMeta: Record<string, { description: string; canonical: string }> = {
    "ice-cool-pro": {
      description:
        "Bezbolni kućni IPL epilator s Ice Cool hlađenjem. Vidljivi rezultati za 8 sedmica, 999.999 bljeskova i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-pro",
    },
    "ice-cool-pro-max": {
      description:
        "Najbrži kućni IPL epilator s većom površinom bljeska i dvostrukim hlađenjem. Noge za 10 minuta i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-pro-max",
    },
    "ice-cool-lite": {
      description:
        "Kompaktni IPL epilator za lice, bikini zonu i putovanja. Precizan tretman, 500.000 bljeskova i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-lite",
    },
  };

  const meta = productMeta[slug];
  const liveTitle = product
    ? `${product.name} - IPL Epilator | ${product.price.toFixed(2)} KM | BiH`
    : undefined;

  return {
    title: liveTitle || "IPL epilator | Aurora Shop",
    description: meta?.description || "IPL uklanjanje dlačica kod kuće",
    alternates: {
      canonical: meta?.canonical || `/proizvod/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);
  
  return (
    <>
      <Navbar />
      <ProductLanding slug={slug} product={product ?? undefined} />
      <Footer />
    </>
  );
}
