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
  
  const productMeta: Record<string, { title: string; description: string }> = {
    "ice-cool-pro": {
      title: "Ice Cool PRO™ - IPL Uklanjanje Dlačica | BiH",
      description: "Bezbolno IPL uklanjanje dlačica sa ugrađenim hlađenjem. 50% popust, besplatna dostava, plaćanje pouzećem."
    },
    "ice-cool-pro-max": {
      title: "Ice Cool PRO™ Max - Premium IPL Uređaj | BiH",
      description: "Premium IPL uređaj sa više nivoa intenziteta. Nježniji kućni IPL tretman za osjetljivu kožu."
    },
    "ice-cool-lite": {
      title: "Ice Cool Lite™ - Kompaktni IPL Uređaj | BiH",
      description: "Brži kućni tretmani za glatku kožu bez salona. Kompaktna verzija idealna za putovanja."
    }
  };

  return {
    title: productMeta[slug]?.title || "Ice Cool PRO™",
    description: productMeta[slug]?.description || "IPL uklanjanje dlačica kod kuće"
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
