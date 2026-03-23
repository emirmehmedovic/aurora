import sharp from 'sharp';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = '/public/uploads';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_DIMENSIONS = 2000;
const THUMBNAIL_SIZE = 300;
const WEBP_QUALITY = 90;

export interface UploadResult {
  filename: string;
  storagePath: string;
  url: string;
  thumbnailUrl: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  // 1. Validate file type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`);
  }

  // 2. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  // 3. Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 4. Get image metadata
  const metadata = await sharp(buffer).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image file');
  }

  // 5. Generate unique filename
  const timestamp = Date.now();
  const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
  const filename = `${timestamp}-${hash}.webp`;

  // 6. Create directory structure (YYYY/MM)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const relativePath = `${year}/${month}`;
  const uploadPath = path.join(process.cwd(), UPLOAD_DIR, relativePath);

  if (!existsSync(uploadPath)) {
    await mkdir(uploadPath, { recursive: true });
  }

  // 7. Optimize and resize image
  let imageBuffer = sharp(buffer);

  // Resize if larger than max dimensions
  if (metadata.width > MAX_DIMENSIONS || metadata.height > MAX_DIMENSIONS) {
    imageBuffer = imageBuffer.resize(MAX_DIMENSIONS, MAX_DIMENSIONS, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  // Convert to WebP
  const optimizedBuffer = await imageBuffer
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  // Get optimized image metadata
  const optimizedMetadata = await sharp(optimizedBuffer).metadata();

  // 8. Generate thumbnail
  const thumbnailBuffer = await sharp(buffer)
    .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const thumbnailFilename = `${timestamp}-${hash}-thumb.webp`;

  // 9. Save files
  const imagePath = path.join(uploadPath, filename);
  const thumbnailPath = path.join(uploadPath, thumbnailFilename);

  await writeFile(imagePath, optimizedBuffer);
  await writeFile(thumbnailPath, thumbnailBuffer);

  // 10. Return metadata
  const storagePath = `${UPLOAD_DIR}/${relativePath}/${filename}`;
  const url = `/uploads/${relativePath}/${filename}`;
  const thumbnailUrl = `/uploads/${relativePath}/${thumbnailFilename}`;

  return {
    filename,
    storagePath,
    url,
    thumbnailUrl,
    mimeType: 'image/webp',
    size: optimizedBuffer.length,
    width: optimizedMetadata.width || 0,
    height: optimizedMetadata.height || 0
  };
}

export async function deleteImage(storagePath: string, thumbnailUrl?: string): Promise<void> {
  try {
    // Delete main image
    const mainPath = path.join(process.cwd(), storagePath);
    if (existsSync(mainPath)) {
      await unlink(mainPath);
    }

    // Delete thumbnail if exists
    if (thumbnailUrl) {
      const thumbnailPath = path.join(process.cwd(), 'public', thumbnailUrl);
      if (existsSync(thumbnailPath)) {
        await unlink(thumbnailPath);
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image files');
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: PNG, JPG, JPEG, WebP`
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  return { valid: true };
}
