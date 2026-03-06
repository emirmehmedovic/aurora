import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import OfferSection from "@/components/OfferSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="p-6 sm:p-10 pb-0">
          <HeroSection />
        </div>
        <ProblemSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <OfferSection />
        <div>
          <FeaturedProducts />
        </div>
      </main>
      <Footer />
    </>
  );
}
