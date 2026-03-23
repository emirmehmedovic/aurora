import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PUT(
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
    const { imageIds } = body;

    if (!Array.isArray(imageIds)) {
      return NextResponse.json(
        { error: 'Invalid request: imageIds must be an array' },
        { status: 400 }
      );
    }

    // Update order for each image
    await Promise.all(
      imageIds.map((imageId: string, index: number) =>
        prisma.productGalleryImage.update({
          where: { id: imageId },
          data: { order: index }
        })
      )
    );

    const updatedImages = await prisma.productGalleryImage.findMany({
      where: { productId: id },
      include: { media: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ galleryImages: updatedImages });

  } catch (error) {
    console.error('Error reordering gallery images:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
