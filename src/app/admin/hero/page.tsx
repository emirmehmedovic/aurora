'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImagePicker from '@/components/admin/ImagePicker';

interface Media {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  alt: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface HeroProduct {
  id?: string;
  productId: string;
  product?: Product;
  imageId: string;
  image?: Media;
  subtitle: string;
  order: number;
}

export default function HeroEditorPage() {
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([
    { productId: '', imageId: '', subtitle: '', order: 0 },
    { productId: '', imageId: '', subtitle: '', order: 1 },
    { productId: '', imageId: '', subtitle: '', order: 2 }
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [heroResponse, productsResponse] = await Promise.all([
        fetch('/api/admin/hero'),
        fetch('/api/admin/products')
      ]);

      const heroData = await heroResponse.json();
      const productsData = await productsResponse.json();

      if (heroData.heroProducts && heroData.heroProducts.length > 0) {
        const sortedHero = heroData.heroProducts.sort((a: any, b: any) => a.order - b.order);
        while (sortedHero.length < 3) {
          sortedHero.push({
            productId: '',
            imageId: '',
            subtitle: '',
            order: sortedHero.length
          });
        }
        setHeroProducts(sortedHero.slice(0, 3));
      }

      setProducts(productsData.products || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const newHeroProducts = [...heroProducts];
    newHeroProducts[index].productId = productId;
    setHeroProducts(newHeroProducts);
  };

  const handleImageSelect = (index: number, media: any) => {
    const newHeroProducts = [...heroProducts];
    newHeroProducts[index].imageId = media.id;
    newHeroProducts[index].image = media;
    setHeroProducts(newHeroProducts);
  };

  const handleSubtitleChange = (index: number, subtitle: string) => {
    const newHeroProducts = [...heroProducts];
    newHeroProducts[index].subtitle = subtitle;
    setHeroProducts(newHeroProducts);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const validHeroProducts = heroProducts.filter(
        hp => hp.productId && hp.imageId
      );

      if (validHeroProducts.length === 0) {
        alert('Please select at least one product and image');
        return;
      }

      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroProducts: validHeroProducts })
      });

      if (!response.ok) {
        throw new Error('Failed to save hero products');
      }

      alert('Hero section updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error saving hero products:', error);
      alert('Failed to save hero section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hero Section Editor</h1>
        <p className="text-gray-600 mt-1">
          Configure the 3 products shown in the hero carousel
        </p>
      </div>

      <div className="space-y-6">
        {heroProducts.map((hero, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              Slot {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product
                </label>
                <select
                  value={hero.productId}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subtitle (optional)
                </label>
                <input
                  type="text"
                  value={hero.subtitle || ''}
                  onChange={(e) => handleSubtitleChange(index, e.target.value)}
                  placeholder="e.g., Professional IPL Device"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Image Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Hero Image
                </label>
                <div className="flex items-start gap-4">
                  {hero.image && (
                    <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                      <Image
                        src={hero.image.thumbnailUrl || hero.image.url}
                        alt={hero.image.alt || 'Hero image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <ImagePicker
                    onSelect={(media) => handleImageSelect(index, media)}
                    categoryFilter="HERO"
                    buttonText={hero.image ? 'Change Image' : 'Select Image'}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium"
        >
          {saving ? 'Saving...' : 'Save Hero Section'}
        </button>
      </div>
    </div>
  );
}
