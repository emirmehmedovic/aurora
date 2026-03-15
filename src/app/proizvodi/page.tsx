import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "IPL Uređaji za Uklanjanje Dlačica | Ice Cool PRO™, Max i LITE | BiH",
  description: "Uporedite 3 modela IPL uređaja za trajno uklanjanje dlačica: PRO, Max i LITE. Besplatna dostava u BiH, 14 dana povrat, 12 mj. garancija.",
};

const products = [
  {
    id: "1",
    name: "Ice Cool PRO™",
    slug: "ice-cool-pro",
    price: 175.00,
    compareAtPrice: 350.00,
    images: ["/slike/PRO/cover-image.png"],
    shortDescription: "Naš najpopularniji model — bezbolno, efikasno, za cijelo tijelo"
  },
  {
    id: "2",
    name: "Ice Cool Max",
    slug: "ice-cool-pro-max",
    price: 190.00,
    compareAtPrice: 380.00,
    images: ["/slike/ELITE/cover.png"],
    shortDescription: "Noge gotove za 10 min — najjači bljesak, najugodniji tretman"
  },
  {
    id: "3",
    name: "Ice Cool LITE",
    slug: "ice-cool-lite",
    price: 165.00,
    compareAtPrice: 330.00,
    images: ["/slike/LITE/cover.png"],
    shortDescription: "Stane u torbicu — savršen za lice, bikini i putovanja"
  }
];

export default function ProizvodiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Odaberi model koji odgovara tvom životu
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sva tri modela daju iste rezultate. Razlika je u brzini tretmana i veličini uređaja. Besplatna dostava u BiH, 14 dana za povrat.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#563435] mb-1">50%</div>
              <div className="text-xs text-gray-600">Popust</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-sm font-bold text-[#563435] mb-1">Besplatna</div>
              <div className="text-xs text-gray-600">Dostava u BiH</div>
            </div>
            <div className="bg-gradient-to-br from-rose-50/30 via-white/40 to-pink-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-sm font-bold text-[#563435] mb-1">14 dana</div>
              <div className="text-xs text-gray-600">Povrat</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50/30 via-white/40 to-orange-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-sm font-bold text-[#563435] mb-1">12 mj.</div>
              <div className="text-xs text-gray-600">Garancija</div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Zašto hiljade žena u BiH biraju Ice Cool PRO™?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Salon rezultati kod kuće</h3>
                  <p className="text-sm text-gray-600">Ista IPL tehnologija koju koriste saloni — bez zakazivanja, čekanja i velikih računa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Bezbolno — obećavamo</h3>
                  <p className="text-sm text-gray-600">Ugrađeno hlađenje štiti kožu. Većina korisnica kaže da osjete samo blagu toplinu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Rezultati već za 3-4 sedmice</h3>
                  <p className="text-sm text-gray-600">Dlačice rastu sporije i tanje. Nakon 8 sedmica — sloboda od brijanja</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Probaš bez rizika</h3>
                  <p className="text-sm text-gray-600">14 dana za povrat ako nisi zadovoljna. Besplatna dostava u cijeloj BiH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
