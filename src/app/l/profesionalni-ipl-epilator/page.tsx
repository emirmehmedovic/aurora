import { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import Navbar from "@/components/Navbar";
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
  return (
    <>
      <Navbar />
      <ProductLanding slug="ice-cool-pro-max" />
      <Footer />
    </>
  );
}
