import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ICE COOL PRO | Najbolji IPL Aparat Protiv Dlačica",
  description: "Prestani brijati noge svaka 2 dana. Glatka koža uz ICE COOL PRO IPL tretman kod kuće. Manje iritacija, trajni rezultati. Naruči odmah sa 50% popusta!",
  keywords: "IPL aparat, IPL epilator, lasersko uklanjanje dlačica kod kuće, IPL aparat cijena, IPL uređaj, ICE COOL PRO",
  alternates: {
    canonical: "https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica",
  }
};

export default function IplAparatLandingPage() {
  const product = {
    id: "ice-cool-pro",
    name: "ICE COOL PRO",
    price: 175.00,
    compareAtPrice: 350.00,
    images: [
      "/slike/PRO/cover-image.png",
      "/slike/PRO/slika2.png",
      "/slike/PRO/slika3.webp",
      "/slike/PRO/slika4.png",
      "/slike/PRO/slika5.png",
      "/slike/PRO/slika6.webp",
      "/slike/PRO/slika7.png"
    ],
    usageImages: [
      "/slike/PRO/koristenje1.png",
      "/slike/PRO/koristenje2.png",
      "/slike/PRO/koristenje3.png",
      "/slike/PRO/koristenje4.png",
      "/slike/PRO/koristenje5.png",
      "/slike/PRO/koristenje6.png",
      "/slike/PRO/koristenje7.png"
    ],
    image: "/slike/PRO/cover-image.png"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
