import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
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
  const product = {
    id: "ice-cool-lite",
    name: "Ice Cool Lite™",
    price: 149.00,
    compareAtPrice: 298.00,
    image: "/slike/1772394601-Screenshot_11.webp"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
