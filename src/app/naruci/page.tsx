import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naruči Ice Cool PRO™ | Checkout",
  description: "Završite narudžbu za Ice Cool PRO™ IPL uređaj. Besplatna dostava, plaćanje pouzećem."
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Završite vašu narudžbu
            </h1>
            <p className="text-lg text-gray-600">
              Popunite formu ispod i naš tim će vas kontaktirati u najkraćem roku
            </p>
          </div>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
