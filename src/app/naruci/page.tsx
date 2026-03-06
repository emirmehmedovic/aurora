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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
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
