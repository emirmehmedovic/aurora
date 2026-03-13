import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ice Cool PRO™ | Najbolji IPL Aparat Protiv Dlačica",
  description: "Prestani brijati noge svaka 2 dana. Glatka koža uz Ice Cool PRO™ IPL tretman kod kuće. Manje iritacija, trajni rezultati. Naruči odmah sa 50% popusta!",
  keywords: "IPL aparat, IPL epilator, lasersko uklanjanje dlačica kod kuće, IPL aparat cijena, IPL uređaj, Ice Cool PRO",
  alternates: {
    canonical: "https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica",
  }
};

export default function IplAparatLandingPage() {
  const product = {
    id: "ice-cool-pro",
    name: "Ice Cool PRO™",
    price: 172.50,
    compareAtPrice: 345.00,
    image: "/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
