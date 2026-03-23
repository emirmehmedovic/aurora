import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'CONTENT_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    const [galleryImages, usageImages] = await Promise.all([
      prisma.productGalleryImage.findMany({
        where: { productId: id },
        include: { media: true },
        orderBy: { order: 'asc' }
      }),
      prisma.productUsageImage.findMany({
        where: { productId: id },
        include: { media: true },
        orderBy: { order: 'asc' }
      })
    ]);

    return NextResponse.json({
      galleryImages,
      usageImages
    });

  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
