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

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "ice-cool-pro" },
      update: {},
      create: {
        name: "Ice Cool PRO™",
        slug: "ice-cool-pro",
        shortDescription: "Napredna IPL tehnologija sa ugrađenim hlađenjem",
        description: "Napredna IPL tehnologija sa ugrađenim hlađenjem za ugodniji tretman",
        price: 17250, // in cents
        compareAtPrice: 34500,
        active: true,
        images: ["https://placehold.co/600x600/E9D5FF/7C3AED/png?text=Ice+Cool+PRO"],
        seoTitle: "Ice Cool PRO™ - IPL Uklanjanje Dlačica | BiH",
        seoDescription: "Bezbolno IPL uklanjanje dlačica sa ugrađenim hlađenjem. 50% popust, besplatna dostava.",
      },
    }),
    prisma.product.upsert({
      where: { slug: "ice-cool-pro-max" },
      update: {},
      create: {
        name: "Ice Cool PRO™ Max",
        slug: "ice-cool-pro-max",
        shortDescription: "Premium model sa više nivoa intenziteta",
        description: "Premium model sa više nivoa intenziteta i većom površinom tretmana",
        price: 19900,
        compareAtPrice: 39800,
        active: true,
        images: ["https://placehold.co/600x600/FBCFE8/DB2777/png?text=Ice+Cool+PRO+Max"],
        seoTitle: "Ice Cool PRO™ Max - Premium IPL Uređaj | BiH",
        seoDescription: "Premium IPL uređaj sa više nivoa intenziteta. Nježniji kućni IPL tretman.",
      },
    }),
    prisma.product.upsert({
      where: { slug: "ice-cool-lite" },
      update: {},
      create: {
        name: "Ice Cool Lite™",
        slug: "ice-cool-lite",
        shortDescription: "Kompaktna verzija idealna za putovanja",
        description: "Kompaktna verzija idealna za putovanja i brze tretmane",
        price: 14900,
        compareAtPrice: 29800,
        active: true,
        images: ["https://placehold.co/600x600/CCFBF1/14B8A6/png?text=Ice+Cool+Lite"],
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
  const order = await prisma.order.create({
    data: {
      orderNumber: "TEST-001",
      customerId: customer.id,
      status: "NEW",
      totalAmount: 17250, // in cents
      shippingFee: 0,
      source: "direct",
      utmSource: "direct",
      utmMedium: "none",
      utmCampaign: "none",
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 17250,
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
