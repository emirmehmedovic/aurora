import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
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

    const heroProducts = await prisma.heroProduct.findMany({
      where: { active: true },
      include: {
        product: true,
        image: true
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ heroProducts });

  } catch (error) {
    console.error('Error fetching hero products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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
    const { heroProducts } = body;

    if (!Array.isArray(heroProducts)) {
      return NextResponse.json(
        { error: 'Invalid request: heroProducts must be an array' },
        { status: 400 }
      );
    }

    // Delete all existing hero products
    await prisma.heroProduct.deleteMany({});

    // Create new hero products
    const createdHeroProducts = await Promise.all(
      heroProducts.map((item: any, index: number) =>
        prisma.heroProduct.create({
          data: {
            productId: item.productId,
            imageId: item.imageId,
            order: index,
            subtitle: item.subtitle || null,
            active: true
          },
          include: {
            product: true,
            image: true
          }
        })
      )
    );

    return NextResponse.json({ heroProducts: createdHeroProducts });

  } catch (error) {
    console.error('Error updating hero products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
