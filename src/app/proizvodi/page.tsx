import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Proizvodi - Ice Cool PRO™ | IPL Uređaji",
  description: "Pregledajte našu kompletnu ponudu IPL uređaja za uklanjanje dlačica. Ice Cool PRO™, Max i Lite modeli sa besplatnom dostavom.",
};

const products = [
  {
    id: "1",
    name: "Ice Cool PRO™",
    slug: "ice-cool-pro",
    price: 172.50,
    compareAtPrice: 345.00,
    images: ["/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"],
    shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman"
  },
  {
    id: "2",
    name: "Ice Cool PRO™ Max",
    slug: "ice-cool-pro-max",
    price: 199.00,
    compareAtPrice: 398.00,
    images: ["/slike/1772394407-81HeC9oEkKL.webp"],
    shortDescription: "Premium model sa više nivoa intenziteta i većom površinom tretmana"
  },
  {
    id: "3",
    name: "Ice Cool Lite™",
    slug: "ice-cool-lite",
    price: 149.00,
    compareAtPrice: 298.00,
    images: ["/slike/1772394601-Screenshot_11.webp"],
    shortDescription: "Kompaktna verzija idealna za putovanja i brze tretmane"
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
              Naši IPL Uređaji
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Odaberite IPL uređaj koji najbolje odgovara vašim potrebama. Svi modeli dolaze sa besplatnom dostavom i 14 dana garancije povrata novca.
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
              <div className="text-xs text-gray-600">Dostava</div>
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
              Zašto odabrati Ice Cool PRO™?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Profesionalna IPL tehnologija</h3>
                  <p className="text-sm text-gray-600">Ista tehnologija koja se koristi u salonima, sada dostupna kod kuće</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Ugrađeno hlađenje</h3>
                  <p className="text-sm text-gray-600">Tretman je mnogo ugodniji zahvaljujući sistemu hlađenja</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dugotrajni rezultati</h3>
                  <p className="text-sm text-gray-600">Uz redovnu upotrebu, rezultati mogu trajati mjesecima</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#563435] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Besplatna dostava i povrat</h3>
                  <p className="text-sm text-gray-600">Dostava na cijelu BiH i 14 dana za povrat novca</p>
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
