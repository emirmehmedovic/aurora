import { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import Navbar from "@/components/Navbar";
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
  return (
    <>
      <Navbar />
      <ProductLanding slug="ice-cool-pro" />
      <Footer />
    </>
  );
}
