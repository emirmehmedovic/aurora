import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ICE COOL LITE | Kompaktni IPL Uređaj za Početnike",
  description: "Uradi svoj prvi korak ka glatkoj koži. ICE COOL LITE je lagan, prenosiv i savršen IPL uređaj za manje regije. Riješi se brijanja već danas.",
  keywords: "kompaktni IPL uređaj, mini IPL aparat, laserski epilator za putovanja, ICE COOL LITE, IPL bikini zona",
  alternates: {
    canonical: "https://icecoolpro.ba/l/kompaktni-ipl-uredjaj",
  }
};

export default function KompaktniIplLandingPage() {
  const product = {
    id: "ice-cool-lite",
    name: "ICE COOL LITE",
    price: 165.00,
    compareAtPrice: 330.00,
    images: [
      "/slike/LITE/cover.png",
      "/slike/LITE/1.png",
      "/slike/LITE/2.png",
      "/slike/LITE/3.png",
      "/slike/LITE/4.png",
      "/slike/LITE/5.png",
      "/slike/LITE/6.png"
    ],
    usageImages: [
      "/slike/LITE/4.png",
      "/slike/LITE/5.png",
      "/slike/LITE/6.png"
    ],
    image: "/slike/LITE/cover.png"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
