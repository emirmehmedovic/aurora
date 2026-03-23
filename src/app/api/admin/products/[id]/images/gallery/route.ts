import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(
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
    const body = await request.json();
    const { mediaId, isCover } = body;

    // Get current max order
    const maxOrder = await prisma.productGalleryImage.findFirst({
      where: { productId: id },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const order = (maxOrder?.order ?? -1) + 1;

    // If setting as cover, unset all other covers
    if (isCover) {
      await prisma.productGalleryImage.updateMany({
        where: { productId: id, isCover: true },
        data: { isCover: false }
      });
    }

    const galleryImage = await prisma.productGalleryImage.create({
      data: {
        productId: id,
        mediaId,
        order,
        isCover: isCover || false
      },
      include: { media: true }
    });

    return NextResponse.json({ galleryImage });

  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
