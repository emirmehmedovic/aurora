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
    const { mediaId, caption } = body;

    // Get current max order
    const maxOrder = await prisma.productUsageImage.findFirst({
      where: { productId: id },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const order = (maxOrder?.order ?? -1) + 1;

    const usageImage = await prisma.productUsageImage.create({
      data: {
        productId: id,
        mediaId,
        order,
        caption: caption || null
      },
      include: { media: true }
    });

    return NextResponse.json({ usageImage });

  } catch (error) {
    console.error('Error adding usage image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
