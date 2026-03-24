import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductLanding from "@/components/ProductLanding";

type Props = {
  params: Promise<{ slug: string }>;
};

type ProductData = {
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  images: string[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const productMeta: Record<
    string,
    { title: string; description: string; canonical: string }
  > = {
    "ice-cool-pro": {
      title: "ICE COOL PRO - IPL Epilator za Trajno Uklanjanje Dlačica | 175 KM | BiH",
      description:
        "Bezbolni kućni IPL epilator s Ice Cool hlađenjem. Vidljivi rezultati za 8 sedmica, 999.999 bljeskova i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-pro",
    },
    "ice-cool-pro-max": {
      title: "ICE COOL Max - Najbrži IPL Epilator | Noge za 10 Minuta | BiH",
      description:
        "Najbrži kućni IPL epilator s većom površinom bljeska i dvostrukim hlađenjem. Noge za 10 minuta i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-pro-max",
    },
    "ice-cool-lite": {
      title: "ICE COOL LITE - Kompaktni IPL Epilator za Lice i Putovanja | 165 KM | BiH",
      description:
        "Kompaktni IPL epilator za lice, bikini zonu i putovanja. Precizan tretman, 500.000 bljeskova i besplatna dostava u BiH.",
      canonical: "/proizvod/ice-cool-lite",
    }
  };

  const meta = productMeta[slug];

  return {
    title: meta?.title || "IPL epilator | Aurora Shop",
    description: meta?.description || "IPL uklanjanje dlačica kod kuće",
    alternates: {
      canonical: meta?.canonical || `/proizvod/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <>
      <Navbar />
      <ProductLanding slug={slug} />
      <Footer />
    </>
  );
}
