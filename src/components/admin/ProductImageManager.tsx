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
  productName?: string;
}

export default function ProductImageManager({ productId, productName }: ProductImageManagerProps) {
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
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900 mb-1">
          Uređuješ slike za: {productName || "odabrani proizvod"}
        </p>
        <p className="text-sm text-gray-600">
          Ovdje jasno razdvajaš slike po poziciji prikaza na sajtu, tako da ne moraš nagađati koja slika ide gdje.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">Galerija proizvoda</p>
          <p className="text-sm text-blue-800">
            Ove slike se prikazuju na <span className="font-semibold">/proizvod/[slug]</span> stranici i u product galeriji. 
            Slika označena kao <span className="font-semibold">Cover</span> je glavna slika koju kupac prvo vidi.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900 mb-1">Usage / lifestyle slike</p>
          <p className="text-sm text-amber-800">
            Ove slike pokazuju kako se uređaj koristi i pojavljuju se u sekcijama tipa
            <span className="font-semibold"> “kako se koristi”, “rezultati” i lifestyle blokovima</span> na landing stranicama.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 rounded-xl px-4 py-3 font-medium transition-colors ${
              activeTab === 'gallery'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            Gallery Images ({galleryImages.length})
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`flex-1 rounded-xl px-4 py-3 font-medium transition-colors ${
              activeTab === 'usage'
                ? 'bg-amber-50 text-amber-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            Usage Images ({usageImages.length})
          </button>
        </div>
      </div>

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="space-y-4 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Product gallery images shown on product pages
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pozicija: <span className="font-semibold text-blue-600">glavna galerija proizvoda</span>.
                Slika označena kao <span className="font-semibold text-blue-600">Cover</span> je naslovna slika kartice i proizvoda.
              </p>
            </div>
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
                className={`relative group overflow-hidden rounded-2xl border-2 bg-white shadow-sm ${
                  image.isCover ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                {image.isCover && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold z-10 shadow">
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
                <div className="absolute top-3 right-3 bg-white/95 rounded-full px-2.5 py-1 text-xs font-semibold shadow">
                  #{index + 1}
                </div>
                <div className="border-t border-gray-100 px-3 py-2 bg-gray-50/70">
                  <p className="text-xs font-medium text-gray-700 truncate">
                    {image.media.alt || `Gallery image ${index + 1}`}
                  </p>
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
        <div className="space-y-4 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Usage/lifestyle images showing the product in use
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pozicija: <span className="font-semibold text-amber-700">sekcije demonstracije i korištenja</span> na landing pageovima.
                Biraj slike na kojima je jasno prikazan uređaj u ruci ili na koži.
              </p>
            </div>
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
                className="relative group overflow-hidden rounded-2xl border-2 border-amber-100 bg-white shadow-sm"
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
                  <div className="p-3 bg-amber-50/60 border-t border-amber-100">
                    <p className="text-xs text-amber-900">{image.caption}</p>
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
