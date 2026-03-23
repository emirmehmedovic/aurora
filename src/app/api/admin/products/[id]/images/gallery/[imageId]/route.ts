import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
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

    const { id, imageId } = await params;
    const body = await request.json();
    const { order, isCover } = body;

    const updateData: any = {};

    if (order !== undefined) {
      updateData.order = order;
    }

    if (isCover !== undefined) {
      if (isCover) {
        // Unset all other covers for this product
        await prisma.productGalleryImage.updateMany({
          where: { productId: id, isCover: true },
          data: { isCover: false }
        });
      }
      updateData.isCover = isCover;
    }

    const galleryImage = await prisma.productGalleryImage.update({
      where: { id: imageId },
      data: updateData,
      include: { media: true }
    });

    return NextResponse.json({ galleryImage });

  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
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

    const { imageId } = await params;

    await prisma.productGalleryImage.delete({
      where: { id: imageId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
