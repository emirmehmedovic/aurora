import ProductCard from "./ProductCard";
import { getStorefrontProducts } from "@/lib/storefront-products";

export default async function FeaturedProducts() {
  const products = await getStorefrontProducts();

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
