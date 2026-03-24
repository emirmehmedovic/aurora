import { prisma } from '@/lib/prisma';
import HeroSectionClient from './HeroSectionClient';
import { getStorefrontProducts } from "@/lib/storefront-products";

export default async function HeroSection() {
  let heroProducts: any[] = [];
  let fallbackProducts: any[] = [];

  try {
    heroProducts = await prisma.heroProduct.findMany({
      where: { active: true },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            compareAtPrice: true
          }
        },
        image: {
          select: {
            id: true,
            url: true,
            alt: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });
  } catch (error) {
    console.error('Error fetching hero products:', error);
  }

  if (heroProducts.length === 0) {
    const products = await getStorefrontProducts();
    const subtitles: Record<string, string> = {
      "ice-cool-pro": "Zamisli da probudiš ruku po nozi i osjetiš samo svilenkastu kožu. Bez žileta, bez crvenila, bez jutrošnjeg stresa.",
      "ice-cool-pro-max": "Za žene koje nemaju vremena čekati. Veća površina bljeska znači brže tretmane — noge gotove za 10 minuta.",
      "ice-cool-lite": "Stane u torbicu, radi posao kao veliki. Idealan za lice, bikini zonu i kad putuješ — glatka koža svuda.",
    };

    fallbackProducts = products.map((product) => ({
      id: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0],
      subtitle: subtitles[product.slug] || "",
    }));
  }

  return <HeroSectionClient heroProducts={heroProducts} fallbackProducts={fallbackProducts} />;
}
