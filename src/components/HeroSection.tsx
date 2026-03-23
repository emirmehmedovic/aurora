import { prisma } from '@/lib/prisma';
import HeroSectionClient from './HeroSectionClient';

export default async function HeroSection() {
  let heroProducts: any[] = [];

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
    // Will use fallback data in client component
  }

  return <HeroSectionClient heroProducts={heroProducts} />;
}
