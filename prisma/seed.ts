import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@icecoolpro.ba" },
    update: {},
    create: {
      email: "admin@icecoolpro.ba",
      password: hashedPassword,
      name: "Admin",
      role: "SUPER_ADMIN",
    },
  });

  console.log("Created admin user:", admin.email);

  // Create products with specific IDs
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "ice-cool-pro" },
      update: {
        id: "ice-cool-pro-1",
        images: ["/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"],
      },
      create: {
        id: "ice-cool-pro-1",
        name: "Ice Cool PRO™",
        slug: "ice-cool-pro",
        shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem",
        description: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman",
        price: 17250,
        compareAtPrice: 34500,
        active: true,
        images: ["/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"],
        seoTitle: "Ice Cool PRO™ - IPL Uklanjanje Dlačica | BiH",
        seoDescription: "Bezbolno IPL uklanjanje dlačica sa ugrađenim hlađenjem. 50% popust, besplatna dostava.",
      },
    }),
    prisma.product.upsert({
      where: { slug: "ice-cool-pro-max" },
      update: {
        id: "ice-cool-pro-max-1",
        images: ["/slike/1772394407-81HeC9oEkKL.webp"],
      },
      create: {
        id: "ice-cool-pro-max-1",
        name: "Ice Cool PRO™ Max",
        slug: "ice-cool-pro-max",
        shortDescription: "Premium model sa više nivoa intenziteta",
        description: "Premium model sa više nivoa intenziteta i većom površinom tretmana",
        price: 19900,
        compareAtPrice: 39800,
        active: true,
        images: ["/slike/1772394407-81HeC9oEkKL.webp"],
        seoTitle: "Ice Cool PRO™ Max - Premium IPL Uređaj | BiH",
        seoDescription: "Premium IPL uređaj sa više nivoa intenziteta. Nježniji kućni IPL tretman.",
      },
    }),
    prisma.product.upsert({
      where: { slug: "ice-cool-lite" },
      update: {
        id: "ice-cool-lite-1",
        images: ["/slike/1772394601-Screenshot_11.webp"],
      },
      create: {
        id: "ice-cool-lite-1",
        name: "Ice Cool Lite™",
        slug: "ice-cool-lite",
        shortDescription: "Kompaktna verzija idealna za putovanja",
        description: "Kompaktna verzija idealna za putovanja i brze tretmane",
        price: 14900,
        compareAtPrice: 29800,
        active: true,
        images: ["/slike/1772394601-Screenshot_11.webp"],
        seoTitle: "Ice Cool Lite™ - Kompaktni IPL Uređaj | BiH",
        seoDescription: "Brži kućni tretmani za glatku kožu bez salona. Kompaktna verzija idealna za putovanja.",
      },
    }),
  ]);

  console.log("Created products:", products.length);

  // Create sample customer
  const customer = await prisma.customer.create({
    data: {
      fullName: "Test Kupac",
      phone: "+387 61 123 456",
      email: "test@example.com",
      address: "Testna ulica 123",
      city: "Sarajevo",
      zipCode: "71000",
    },
  });

  console.log("Created sample customer:", customer.fullName);

  // Create sample lead
  const lead = await prisma.lead.create({
    data: {
      fullName: "Test Lead",
      phone: "+387 62 123 456",
      email: "lead@example.com",
      productId: products[0].id,
      source: "direct",
      status: "NEW",
      utmSource: "direct",
      utmMedium: "none",
      utmCampaign: "none",
    },
  });

  console.log("Created sample lead:", lead.fullName);

  // Create sample order
  const order = await prisma.order.upsert({
    where: { orderNumber: "ORD-2024-001" },
    update: {},
    create: {
      orderNumber: "ORD-2024-001",
      customerId: customer.id,
      status: "NEW",
      totalAmount: products[0].price,
      items: {
        create: [
          {
            product: {
              connect: { id: products[0].id }
            },
            quantity: 1,
            price: products[0].price,
          },
        ],
      },
    },
  });

  console.log("Created sample order:", order.id);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
