import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ICE COOL Max | Profesionalni IPL Epilator za Kućnu Upotrebu",
  description: "Zamisli da se briješ samo jednom mjesečno. ICE COOL Max je najnapredniji IPL epilator za brze i trajne rezultate. Naruči svoj danas!",
  keywords: "profesionalni IPL epilator, IPL aparat, lasersko uklanjanje dlačica, trajno uklanjanje dlačica, ICE COOL Max",
  alternates: {
    canonical: "https://icecoolpro.ba/l/profesionalni-ipl-epilator",
  }
};

export default function ProfesionalniIplLandingPage() {
  const product = {
    id: "ice-cool-pro-max",
    name: "ICE COOL Max",
    price: 190.00,
    compareAtPrice: 380.00,
    images: [
      "/slike/ELITE/cover.png",
      "/slike/ELITE/slika1.png",
      "/slike/ELITE/slika2.png",
    ],
    usageImages: [
      "/slike/ELITE/koristenje1.png",
      "/slike/ELITE/koristenje2.png",
      "/slike/ELITE/koristenje3.png",
      "/slike/ELITE/koristenje4.png",
      "/slike/ELITE/koristenje5.png"
    ],
    image: "/slike/ELITE/cover.png"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
