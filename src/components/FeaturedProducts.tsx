"use client";

import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    name: "ICE COOL PRO",
    slug: "ice-cool-pro",
    price: 175.00,
    compareAtPrice: 350.00,
    images: ["/slike/PRO/cover-image.png"],
    shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman"
  },
  {
    id: "2",
    name: "ICE COOL Max",
    slug: "ice-cool-pro-max",
    price: 190.00,
    compareAtPrice: 380.00,
    images: ["/slike/ELITE/cover.png"],
    shortDescription: "Premium model sa više nivoa intenziteta i većom površinom tretmana"
  },
  {
    id: "3",
    name: "ICE COOL LITE",
    slug: "ice-cool-lite",
    price: 165.00,
    compareAtPrice: 330.00,
    images: ["/slike/LITE/cover.png"],
    shortDescription: "Kompaktna verzija idealna za putovanja i brze tretmane"
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Naši Proizvodi
          </h2>
          <p className="text-lg text-gray-600">
            Odaberite IPL uređaj koji najbolje odgovara vašim potrebama
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
