import { PrismaClient } from '@prisma/client';
import { copyFileSync, existsSync, mkdirSync, statSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting media migration...\n');

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), 'public/uploads/2026/03');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // 1. Ensure products exist
  console.log('📦 Checking products...');

  const products = [
    {
      slug: 'ice-cool-pro',
      name: 'ICE COOL PRO',
      price: 17500,
      compareAtPrice: 35000,
      shortDescription: 'IPL uređaj za trajno uklanjanje dlačica',
      active: true
    },
    {
      slug: 'ice-cool-lite',
      name: 'ICE COOL LITE',
      price: 16500,
      compareAtPrice: 33000,
      shortDescription: 'Kompaktni IPL uređaj',
      active: true
    },
    {
      slug: 'ice-cool-pro-max',
      name: 'ICE COOL Max',
      price: 19000,
      compareAtPrice: 38000,
      shortDescription: 'Profesionalni IPL epilator',
      active: true
    }
  ];

  for (const productData of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: productData.slug }
    });

    if (!existing) {
      await prisma.product.create({ data: productData });
      console.log(`  ✅ Created product: ${productData.name}`);
    } else {
      console.log(`  ℹ️  Product exists: ${productData.name}`);
    }
  }

  // 2. Migrate PRO images
  console.log('\n📸 Migrating ICE COOL PRO images...');
  const proProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-pro' } });
  if (!proProduct) throw new Error('PRO product not found');

  const proGalleryImages = [
    'cover-image.png',
    'slika2.png',
    'slika3.webp',
    'slika4.png',
    'slika5.png',
    'slika6.webp',
    'slika7.png'
  ];

  const proUsageImages = [
    'koristenje1.png',
    'koristenje2.png',
    'koristenje3.png',
    'koristenje4.png',
    'koristenje5.png',
    'koristenje6.png',
    'koristenje7.png'
  ];

  await migrateProductImages(proProduct.id, 'PRO', proGalleryImages, proUsageImages, 0);

  // 3. Migrate LITE images
  console.log('\n📸 Migrating ICE COOL LITE images...');
  const liteProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-lite' } });
  if (!liteProduct) throw new Error('LITE product not found');

  const liteGalleryImages = [
    'cover.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png'
  ];

  const liteUsageImages = [
    '4.png',
    '5.png',
    '6.png'
  ];

  await migrateProductImages(liteProduct.id, 'LITE', liteGalleryImages, liteUsageImages);

  // 4. Migrate ELITE images
  console.log('\n📸 Migrating ICE COOL Max images...');
  const maxProduct = await prisma.product.findUnique({ where: { slug: 'ice-cool-pro-max' } });
  if (!maxProduct) throw new Error('Max product not found');

  const maxGalleryImages = [
    'cover.png',
    'slika1.png',
    'slika2.png'
  ];

  const maxUsageImages = [
    'koristenje1.png',
    'koristenje2.png',
    'koristenje3.png',
    'koristenje4.png',
    'koristenje5.png'
  ];

  await migrateProductImages(maxProduct.id, 'ELITE', maxGalleryImages, maxUsageImages);

  // 5. Create hero products
  console.log('\n🎯 Creating hero products...');

  // Delete existing hero products
  await prisma.heroProduct.deleteMany({});

  const heroData = [
    { productId: proProduct.id, order: 0, subtitle: 'Zamisli da probudiš ruku po nozi i osjetiš samo svilenkastu kožu. Bez žileta, bez crvenila, bez jutrošnjeg stresa.' },
    { productId: maxProduct.id, order: 1, subtitle: 'Za žene koje nemaju vremena čekati. Veća površina bljeska znači brže tretmane — noge gotove za 10 minuta.' },
    { productId: liteProduct.id, order: 2, subtitle: 'Stane u torbicu, radi posao kao veliki. Idealan za lice, bikini zonu i kad putuješ — glatka koža svuda.' }
  ];

  for (const hero of heroData) {
    // Get the cover image for this product
    const coverImage = await prisma.productGalleryImage.findFirst({
      where: { productId: hero.productId, isCover: true },
      include: { media: true }
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
      console.log(`  ✅ Created hero product ${hero.order + 1}`);
    }
  }

  console.log('\n✨ Migration completed successfully!');
  console.log('\n📊 Summary:');

  const mediaCount = await prisma.media.count();
  const galleryCount = await prisma.productGalleryImage.count();
  const usageCount = await prisma.productUsageImage.count();
  const heroCount = await prisma.heroProduct.count();

  console.log(`  - Media files: ${mediaCount}`);
  console.log(`  - Gallery images: ${galleryCount}`);
  console.log(`  - Usage images: ${usageCount}`);
  console.log(`  - Hero products: ${heroCount}`);
}

async function migrateProductImages(
  productId: string,
  folder: string,
  galleryImages: string[],
  usageImages: string[],
  coverIndex: number = 0
) {
  const sourceDir = path.join(process.cwd(), 'public/slike', folder);
  const targetDir = path.join(process.cwd(), 'public/uploads/2026/03');

  // Migrate gallery images
  for (let i = 0; i < galleryImages.length; i++) {
    const filename = galleryImages[i];
    const sourcePath = path.join(sourceDir, filename);

    if (!existsSync(sourcePath)) {
      console.log(`  ⚠️  File not found: ${filename}`);
      continue;
    }

    const ext = path.extname(filename);
    const newFilename = `${folder.toLowerCase()}-gallery-${i}${ext}`;
    const targetPath = path.join(targetDir, newFilename);
    const url = `/uploads/2026/03/${newFilename}`;

    // Copy file
    copyFileSync(sourcePath, targetPath);

    const stats = statSync(targetPath);

    // Create media record
    const media = await prisma.media.create({
      data: {
        filename: newFilename,
        storagePath: `/public/uploads/2026/03/${newFilename}`,
        url: url,
        thumbnailUrl: url, // Using same URL for now
        mimeType: ext === '.png' ? 'image/png' : 'image/webp',
        size: stats.size,
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
        productId: productId,
        mediaId: media.id,
        order: i,
        isCover: i === coverIndex
      }
    });

    console.log(`  ✅ Migrated gallery: ${filename}`);
  }

  // Migrate usage images
  for (let i = 0; i < usageImages.length; i++) {
    const filename = usageImages[i];
    const sourcePath = path.join(sourceDir, filename);

    if (!existsSync(sourcePath)) {
      console.log(`  ⚠️  File not found: ${filename}`);
      continue;
    }

    const ext = path.extname(filename);
    const newFilename = `${folder.toLowerCase()}-usage-${i}${ext}`;
    const targetPath = path.join(targetDir, newFilename);
    const url = `/uploads/2026/03/${newFilename}`;

    // Copy file
    copyFileSync(sourcePath, targetPath);

    const stats = statSync(targetPath);

    // Create media record
    const media = await prisma.media.create({
      data: {
        filename: newFilename,
        storagePath: `/public/uploads/2026/03/${newFilename}`,
        url: url,
        thumbnailUrl: url,
        mimeType: ext === '.png' ? 'image/png' : 'image/webp',
        size: stats.size,
        width: null,
        height: null,
        alt: `${folder} usage image ${i + 1}`,
        category: 'USAGE',
        tags: []
      }
    });

    // Create usage image link
    await prisma.productUsageImage.create({
      data: {
        productId: productId,
        mediaId: media.id,
        order: i,
        caption: null
      }
    });

    console.log(`  ✅ Migrated usage: ${filename}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
