import { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ice Cool Lite™ | Kompaktni IPL Uređaj za Početnike",
  description: "Uradi svoj prvi korak ka glatkoj koži. Ice Cool Lite™ je lagan, prenosiv i savršen IPL uređaj za manje regije. Riješi se brijanja već danas.",
  keywords: "kompaktni IPL uređaj, mini IPL aparat, laserski epilator za putovanja, Ice Cool Lite, IPL bikini zona",
  alternates: {
    canonical: "https://icecoolpro.ba/l/kompaktni-ipl-uredjaj",
  }
};

export default function KompaktniIplLandingPage() {
  return (
    <>
      <Navbar />
      <ProductLanding slug="ice-cool-lite" />
      <Footer />
    </>
  );
}
