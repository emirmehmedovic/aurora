import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import ResultsTimelineSection from "@/components/ResultsTimelineSection";
import USPSection from "@/components/USPSection";
import OfferSection from "@/components/OfferSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="p-6 sm:p-10 pb-0">
          <HeroSection />
        </div>
        <ProblemSection />
        <SolutionSection />
        <div className="py-8">
          <FeaturedProducts />
        </div>
        <BenefitsSection />
        <HowItWorksSection />
        <ResultsTimelineSection />
        <TestimonialsSection />
        <USPSection />
        <OfferSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
