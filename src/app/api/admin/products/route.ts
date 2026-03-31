import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        compareAtPrice: true,
        active: true,
        images: true,
        createdAt: true,
        galleryImages: {
          orderBy: [{ isCover: "desc" }, { order: "asc" }],
          select: {
            media: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      products: products.map((product) => {
        const galleryImages = product.galleryImages.map((image) => image.media.url);
        const images = galleryImages.length > 0 ? galleryImages : product.images;

        return {
          ...product,
          images,
        };
      }),
    });

  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
