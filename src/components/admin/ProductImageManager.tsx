'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImagePicker from './ImagePicker';

interface Media {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  alt: string | null;
}

interface GalleryImage {
  id: string;
  mediaId: string;
  media: Media;
  order: number;
  isCover: boolean;
}

interface UsageImage {
  id: string;
  mediaId: string;
  media: Media;
  order: number;
  caption: string | null;
}

interface ProductImageManagerProps {
  productId: string;
}

export default function ProductImageManager({ productId }: ProductImageManagerProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'usage'>('gallery');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [usageImages, setUsageImages] = useState<UsageImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [productId]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/images`);
      const data = await response.json();
      setGalleryImages(data.galleryImages || []);
      setUsageImages(data.usageImages || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGalleryImage = async (media: any) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/images/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: media.id, isCover: galleryImages.length === 0 })
      });

      if (!response.ok) throw new Error('Failed to add image');

      fetchImages();
    } catch (error) {
      console.error('Error adding gallery image:', error);
      alert('Failed to add image');
    }
  };

  const handleAddUsageImage = async (media: any) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/images/usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: media.id })
      });

      if (!response.ok) throw new Error('Failed to add image');

      fetchImages();
    } catch (error) {
      console.error('Error adding usage image:', error);
      alert('Failed to add image');
    }
  };

  const handleSetCover = async (imageId: string) => {
    try {
      const response = await fetch(
        `/api/admin/products/${productId}/images/gallery/${imageId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isCover: true })
        }
      );

      if (!response.ok) throw new Error('Failed to set cover');

      fetchImages();
    } catch (error) {
      console.error('Error setting cover:', error);
      alert('Failed to set cover image');
    }
  };

  const handleDeleteGalleryImage = async (imageId: string) => {
    if (!confirm('Remove this image from gallery?')) return;

    try {
      const response = await fetch(
        `/api/admin/products/${productId}/images/gallery/${imageId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete image');

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleReorderGallery = async (startIndex: number, endIndex: number) => {
    const newGallery = [...galleryImages];
    const [removed] = newGallery.splice(startIndex, 1);
    newGallery.splice(endIndex, 0, removed);

    setGalleryImages(newGallery);

    try {
      const imageIds = newGallery.map(img => img.id);
      const response = await fetch(
        `/api/admin/products/${productId}/images/gallery/reorder`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageIds })
        }
      );

      if (!response.ok) throw new Error('Failed to reorder');
    } catch (error) {
      console.error('Error reordering images:', error);
      fetchImages(); // Revert on error
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading images...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === 'gallery'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Gallery Images ({galleryImages.length})
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === 'usage'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Usage Images ({usageImages.length})
          </button>
        </div>
      </div>

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Product gallery images shown on product pages
            </p>
            <ImagePicker
              onSelect={handleAddGalleryImage}
              categoryFilter="PRODUCT"
              buttonText="+ Add Image"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group border-2 rounded-lg overflow-hidden"
              >
                {image.isCover && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-10">
                    Cover
                  </div>
                )}
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={image.media.thumbnailUrl || image.media.url}
                    alt={image.media.alt || 'Gallery image'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2">
                  <div className="flex gap-2 justify-end">
                    {!image.isCover && (
                      <button
                        onClick={() => handleSetCover(image.id)}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                      >
                        Set Cover
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteGalleryImage(image.id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded px-2 py-1 text-xs">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {galleryImages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No gallery images yet. Click "Add Image" to get started.
            </div>
          )}
        </div>
      )}

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Usage/lifestyle images showing the product in use
            </p>
            <ImagePicker
              onSelect={handleAddUsageImage}
              categoryFilter="USAGE"
              buttonText="+ Add Image"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {usageImages.map((image) => (
              <div
                key={image.id}
                className="relative group border-2 rounded-lg overflow-hidden"
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={image.media.thumbnailUrl || image.media.url}
                    alt={image.media.alt || 'Usage image'}
                    fill
                    className="object-cover"
                  />
                </div>
                {image.caption && (
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {usageImages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No usage images yet. Click "Add Image" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
