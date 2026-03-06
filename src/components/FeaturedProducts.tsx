"use client";

import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    name: "Ice Cool PRO™",
    slug: "ice-cool-pro",
    price: 172.50,
    compareAtPrice: 345.00,
    images: ["/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"],
    shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman"
  },
  {
    id: "2",
    name: "Ice Cool PRO™ Max",
    slug: "ice-cool-pro-max",
    price: 199.00,
    compareAtPrice: 398.00,
    images: ["/1772394407-81HeC9oEkKL.webp"],
    shortDescription: "Premium model sa više nivoa intenziteta i većom površinom tretmana"
  },
  {
    id: "3",
    name: "Ice Cool Lite™",
    slug: "ice-cool-lite",
    price: 149.00,
    compareAtPrice: 298.00,
    images: ["/1772394601-Screenshot_11.webp"],
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
