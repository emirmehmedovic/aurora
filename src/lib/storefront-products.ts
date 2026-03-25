import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";

export type StorefrontProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  image: string;
  usageImages: string[];
  shortDescription: string;
  flashes: string;
  levels: string;
  cooling: string;
  weight: string;
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
    image: "/slike/PRO/cover-image.png",
    usageImages: [
      "/slike/PRO/koristenje1.png",
      "/slike/PRO/koristenje2.png",
      "/slike/PRO/koristenje3.png",
      "/slike/PRO/koristenje4.png",
      "/slike/PRO/koristenje5.png",
      "/slike/PRO/koristenje6.png",
      "/slike/PRO/koristenje7.png",
    ],
    shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman",
    flashes: "999,999",
    levels: "5",
    cooling: "Ice Cool™",
    weight: "~300g",
  },
  "ice-cool-pro-max": {
    id: "ice-cool-pro-max-1",
    name: "Ice Cool Max",
    slug: "ice-cool-pro-max",
    price: 190,
    compareAtPrice: 380,
    images: ["/slike/ELITE/cover.png"],
    image: "/slike/ELITE/cover.png",
    usageImages: [
      "/slike/ELITE/koristenje1.png",
      "/slike/ELITE/koristenje2.png",
      "/slike/ELITE/koristenje3.png",
      "/slike/ELITE/koristenje4.png",
      "/slike/ELITE/koristenje5.png",
    ],
    shortDescription: "Premium model sa više nivoa intenziteta i većom površinom tretmana",
    flashes: "999,999",
    levels: "5+",
    cooling: "Ice Cool+™",
    weight: "~350g",
  },
  "ice-cool-lite": {
    id: "ice-cool-lite-1",
    name: "Ice Cool LITE",
    slug: "ice-cool-lite",
    price: 165,
    compareAtPrice: 330,
    images: ["/slike/LITE/cover.png"],
    image: "/slike/LITE/cover.png",
    usageImages: ["/slike/LITE/4.png", "/slike/LITE/5.png", "/slike/LITE/6.png"],
    shortDescription: "Kompaktna verzija idealna za putovanja i brze tretmane",
    flashes: "500,000",
    levels: "3",
    cooling: "Ice Cool™",
    weight: "~200g",
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
        usageImages: {
          orderBy: [{ order: "asc" }],
          select: {
            media: {
              select: {
                url: true,
              },
            },
          },
        },
        galleryImages: {
          orderBy: [
            { isCover: "desc" },
            { order: "asc" },
          ],
          select: {
            media: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    const dbMap = new Map(dbProducts.map((product) => [product.slug, product]));

    return PRODUCT_ORDER.map((slug) => {
      const fallback = PRODUCT_FALLBACKS[slug];
      const dbProduct = dbMap.get(slug);

      if (!dbProduct) return fallback;

      const images =
        dbProduct.galleryImages.length > 0
          ? dbProduct.galleryImages.map((image) => image.media.url)
          : dbProduct.images.length > 0
            ? dbProduct.images
            : fallback.images;

      return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: dbProduct.price / 100,
        compareAtPrice: dbProduct.compareAtPrice
          ? dbProduct.compareAtPrice / 100
          : dbProduct.price / 100,
        images,
        image: images[0] || fallback.image,
        usageImages:
          dbProduct.usageImages.length > 0
            ? dbProduct.usageImages.map((image) => image.media.url)
            : fallback.usageImages,
        shortDescription: dbProduct.shortDescription || fallback.shortDescription,
        flashes: fallback.flashes,
        levels: fallback.levels,
        cooling: fallback.cooling,
        weight: fallback.weight,
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

export async function getStorefrontProductBySlugOrFallback(
  slug: (typeof PRODUCT_ORDER)[number]
): Promise<StorefrontProduct> {
  return (await getStorefrontProductBySlug(slug)) ?? PRODUCT_FALLBACKS[slug];
}
