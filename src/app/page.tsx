import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 sm:p-10">
        <HeroSection />
        <FeaturedProducts />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
