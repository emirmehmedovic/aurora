import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";

export type StorefrontProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  shortDescription: string;
};

const PRODUCT_ORDER = [
  "ice-cool-pro",
  "ice-cool-pro-max",
  "ice-cool-lite",
] as const;

const PRODUCT_FALLBACKS: Record<(typeof PRODUCT_ORDER)[number], StorefrontProduct> = {
  "ice-cool-pro": {
    id: "ice-cool-pro-1",
    name: "Ice Cool PRO™",
    slug: "ice-cool-pro",
    price: 175,
    compareAtPrice: 350,
    images: ["/slike/PRO/cover-image.png"],
    shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman",
  },
  "ice-cool-pro-max": {
    id: "ice-cool-pro-max-1",
    name: "Ice Cool Max",
    slug: "ice-cool-pro-max",
    price: 190,
    compareAtPrice: 380,
    images: ["/slike/ELITE/cover.png"],
    shortDescription: "Premium model sa više nivoa intenziteta i većom površinom tretmana",
  },
  "ice-cool-lite": {
    id: "ice-cool-lite-1",
    name: "Ice Cool LITE",
    slug: "ice-cool-lite",
    price: 165,
    compareAtPrice: 330,
    images: ["/slike/LITE/cover.png"],
    shortDescription: "Kompaktna verzija idealna za putovanja i brze tretmane",
  },
};

export async function getStorefrontProducts(): Promise<StorefrontProduct[]> {
  noStore();

  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        slug: { in: [...PRODUCT_ORDER] },
        active: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        compareAtPrice: true,
        images: true,
        shortDescription: true,
      },
    });

    const dbMap = new Map(dbProducts.map((product) => [product.slug, product]));

    return PRODUCT_ORDER.map((slug) => {
      const fallback = PRODUCT_FALLBACKS[slug];
      const dbProduct = dbMap.get(slug);

      if (!dbProduct) return fallback;

      return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: dbProduct.price / 100,
        compareAtPrice: dbProduct.compareAtPrice
          ? dbProduct.compareAtPrice / 100
          : dbProduct.price / 100,
        images: dbProduct.images.length > 0 ? dbProduct.images : fallback.images,
        shortDescription: dbProduct.shortDescription || fallback.shortDescription,
      };
    });
  } catch (error) {
    console.error("Error fetching storefront products:", error);
    return PRODUCT_ORDER.map((slug) => PRODUCT_FALLBACKS[slug]);
  }
}

export async function getStorefrontProductBySlug(slug: string) {
  const products = await getStorefrontProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
