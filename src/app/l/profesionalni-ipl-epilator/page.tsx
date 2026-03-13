import { Metadata } from "next";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ice Cool PRO™ Max | Profesionalni IPL Epilator za Kućnu Upotrebu",
  description: "Zamisli da se briješ samo jednom mjesečno. Ice Cool PRO™ Max je najnapredniji IPL epilator za brze i trajne rezultate. Naruči svoj danas!",
  keywords: "profesionalni IPL epilator, IPL aparat, lasersko uklanjanje dlačica, trajno uklanjanje dlačica, Ice Cool PRO Max",
  alternates: {
    canonical: "https://icecoolpro.ba/l/profesionalni-ipl-epilator",
  }
};

export default function ProfesionalniIplLandingPage() {
  const product = {
    id: "ice-cool-pro-max",
    name: "Ice Cool PRO™ Max",
    price: 199.00,
    compareAtPrice: 398.00,
    image: "/slike/1772394407-81HeC9oEkKL.webp"
  };

  return (
    <>
      <DirectResponseLanding product={product} />
      <Footer />
    </>
  );
}
