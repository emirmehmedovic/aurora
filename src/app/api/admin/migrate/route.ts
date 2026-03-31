import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { copyFileSync, existsSync, mkdirSync, statSync } from 'fs';
import path from 'path';

export const maxDuration = 300; // 5 minutes timeout for migration

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Only SUPER_ADMIN can run migrations' },
        { status: 403 }
      );
    }

    // Check if migration already done
    const existingMediaCount = await prisma.media.count();
    if (existingMediaCount > 0) {
      return NextResponse.json({
        success: true,
        message: 'Migration already completed',
        stats: {
          mediaCount: existingMediaCount,
          galleryCount: await prisma.productGalleryImage.count(),
          usageCount: await prisma.productUsageImage.count(),
          heroCount: await prisma.heroProduct.count()
        }
      });
    }

    // Run migration
    const result = await runMigration();

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      stats: result
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed' },
      { status: 500 }
    );
  }
}

async function runMigration() {
  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), 'public/uploads/2026/03');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Migration logic (same as migrate-media.ts but simplified)
  const products = [
    { slug: 'ice-cool-pro', folder: 'PRO' },
    { slug: 'ice-cool-lite', folder: 'LITE' },
    { slug: 'ice-cool-pro-max', folder: 'ELITE' }
  ];

  const stats = {
    mediaCount: 0,
    galleryCount: 0,
    usageCount: 0,
    heroCount: 0
  };

  for (const { slug, folder } of products) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) continue;

    const sourceDir = path.join(process.cwd(), 'public/slike', folder);
    if (!existsSync(sourceDir)) continue;

    // Define image sets based on folder
    const imageSets = getImageSetsForFolder(folder);

    // Migrate gallery images
    for (let i = 0; i < imageSets.gallery.length; i++) {
      const filename = imageSets.gallery[i];
      const sourcePath = path.join(sourceDir, filename);

      if (!existsSync(sourcePath)) continue;

      const ext = path.extname(filename);
      const newFilename = `${folder.toLowerCase()}-gallery-${i}${ext}`;
      const targetPath = path.join(uploadDir, newFilename);
      const url = `/uploads/2026/03/${newFilename}`;

      // Copy file
      copyFileSync(sourcePath, targetPath);
      const stats_file = statSync(targetPath);

      // Create media record
      const media = await prisma.media.create({
        data: {
          filename: newFilename,
          storagePath: `/public/uploads/2026/03/${newFilename}`,
          url: url,
          thumbnailUrl: url,
          mimeType: ext === '.png' ? 'image/png' : 'image/webp',
          size: stats_file.size,
          width: null,
          height: null,
          alt: `${folder} gallery image ${i + 1}`,
          category: 'PRODUCT',
          tags: []
        }
      });

      // Create gallery image link
      await prisma.productGalleryImage.create({
        data: {
          productId: product.id,
          mediaId: media.id,
          order: i,
          isCover: i === 0
        }
      });

      stats.mediaCount++;
      stats.galleryCount++;
    }

    // Migrate usage images
    for (let i = 0; i < imageSets.usage.length; i++) {
      const filename = imageSets.usage[i];
      const sourcePath = path.join(sourceDir, filename);

      if (!existsSync(sourcePath)) continue;

      const ext = path.extname(filename);
      const newFilename = `${folder.toLowerCase()}-usage-${i}${ext}`;
      const targetPath = path.join(uploadDir, newFilename);
      const url = `/uploads/2026/03/${newFilename}`;

      copyFileSync(sourcePath, targetPath);
      const stats_file = statSync(targetPath);

      const media = await prisma.media.create({
        data: {
          filename: newFilename,
          storagePath: `/public/uploads/2026/03/${newFilename}`,
          url: url,
          thumbnailUrl: url,
          mimeType: ext === '.png' ? 'image/png' : 'image/webp',
          size: stats_file.size,
          width: null,
          height: null,
          alt: `${folder} usage image ${i + 1}`,
          category: 'USAGE',
          tags: []
        }
      });

      await prisma.productUsageImage.create({
        data: {
          productId: product.id,
          mediaId: media.id,
          order: i,
          caption: null
        }
      });

      stats.mediaCount++;
      stats.usageCount++;
    }
  }

  // Create hero products
  const proProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-pro' } });
  const maxProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-pro-max' } });
  const liteProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-lite' } });

  if (proProduct && maxProduct && liteProduct) {
    const heroData = [
      { productId: proProduct.id, order: 0, subtitle: 'Zamisli da probudiš ruku po nozi i osjetiš samo svilenkastu kožu. Bez žileta, bez crvenila, bez jutrošnjeg stresa.' },
      { productId: maxProduct.id, order: 1, subtitle: 'Za žene koje nemaju vremena čekati. Veća površina bljeska znači brže tretmane — noge gotove za 10 minuta.' },
      { productId: liteProduct.id, order: 2, subtitle: 'Stane u torbicu, radi posao kao veliki. Idealan za lice, bikini zonu i kad putuješ — glatka koža svuda.' }
    ];

    for (const hero of heroData) {
      const coverImage = await prisma.productGalleryImage.findFirst({
        where: { productId: hero.productId, isCover: true }
      });

      if (coverImage) {
        await prisma.heroProduct.create({
          data: {
            productId: hero.productId,
            imageId: coverImage.mediaId,
            order: hero.order,
            subtitle: hero.subtitle,
            active: true
          }
        });
        stats.heroCount++;
      }
    }
  }

  return stats;
}

function getImageSetsForFolder(folder: string) {
  if (folder === 'PRO') {
    return {
      gallery: ['cover-image.png', 'slika2.png', 'slika3.webp', 'slika4.png', 'slika5.png', 'slika6.webp', 'slika7.png'],
      usage: ['koristenje1.png', 'koristenje2.png', 'koristenje3.png', 'koristenje4.png', 'koristenje5.png', 'koristenje6.png', 'koristenje7.png']
    };
  } else if (folder === 'LITE') {
    return {
      gallery: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
      usage: ['4.png', '5.png', '6.png']
    };
  } else if (folder === 'ELITE') {
    return {
      gallery: ['cover.png', 'slika1.png', 'slika2.png'],
      usage: ['koristenje1.png', 'koristenje2.png', 'koristenje3.png', 'koristenje4.png', 'koristenje5.png']
    };
  }
  return { gallery: [], usage: [] };
}
