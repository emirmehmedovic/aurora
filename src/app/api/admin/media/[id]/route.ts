import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/media';

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
    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: { name: true, email: true }
        },
        productGalleries: {
          include: {
            product: {
              select: { id: true, name: true, slug: true }
            }
          }
        },
        productUsageImages: {
          include: {
            product: {
              select: { id: true, name: true, slug: true }
            }
          }
        },
        heroProducts: {
          include: {
            product: {
              select: { id: true, name: true, slug: true }
            }
          }
        }
      }
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Calculate usage info
    const usage = {
      productGalleries: media.productGalleries.length,
      productUsageImages: media.productUsageImages.length,
      heroProducts: media.heroProducts.length,
      total: media.productGalleries.length + media.productUsageImages.length + media.heroProducts.length
    };

    return NextResponse.json({
      media,
      usage
    });

  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
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

    const body = await request.json();
    const { alt, tags, category } = body;

    const { id } = await params;
    const media = await prisma.media.update({
      where: { id },
      data: {
        alt: alt !== undefined ? alt : undefined,
        tags: tags !== undefined ? tags : undefined,
        category: category !== undefined ? category : undefined
      }
    });

    return NextResponse.json({ media });

  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
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

    // Check if media is in use
    const { id } = await params;
    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        productGalleries: true,
        productUsageImages: true,
        heroProducts: true
      }
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    const usageCount =
      media.productGalleries.length +
      media.productUsageImages.length +
      media.heroProducts.length;

    if (usageCount > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete media that is currently in use',
          usage: {
            productGalleries: media.productGalleries.length,
            productUsageImages: media.productUsageImages.length,
            heroProducts: media.heroProducts.length,
            total: usageCount
          }
        },
        { status: 400 }
      );
    }

    // Delete from filesystem
    await deleteImage(media.storagePath, media.thumbnailUrl || undefined);

    // Delete from database
    await prisma.media.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
