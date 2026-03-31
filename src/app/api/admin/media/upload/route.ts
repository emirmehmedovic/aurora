import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/media';

const MAX_FILES_PER_REQUEST = 10;
const MAX_REQUEST_SIZE = 25 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Check role (SUPER_ADMIN or CONTENT_ADMIN)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'CONTENT_ADMIN')) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    const contentLength = Number(request.headers.get('content-length') || '0');
    if (contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Upload request is too large' },
        { status: 413 }
      );
    }

    // 3. Parse FormData
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = (formData.get('category') as string) || 'PRODUCT';
    const alt = formData.get('alt') as string | null;
    const tags = formData.get('tags') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        { error: `Too many files. Maximum per request is ${MAX_FILES_PER_REQUEST}` },
        { status: 400 }
      );
    }

    // 4. Process each file
    const uploadedMedia = [];

    for (const file of files) {
      try {
        // Upload and optimize
        const result = await uploadImage(file);

        // Create Media record
        const media = await prisma.media.create({
          data: {
            filename: result.filename,
            storagePath: result.storagePath,
            url: result.url,
            thumbnailUrl: result.thumbnailUrl,
            mimeType: result.mimeType,
            size: result.size,
            width: result.width,
            height: result.height,
            alt: alt || null,
            category: category as any,
            tags: tags ? tags.split(',').map(t => t.trim()) : [],
            uploadedById: user.id
          }
        });

        uploadedMedia.push(media);
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        // Continue with other files
      }
    }

    if (uploadedMedia.length === 0) {
      return NextResponse.json(
        { error: 'Failed to upload any files' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      media: uploadedMedia
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
