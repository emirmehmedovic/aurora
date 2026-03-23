'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Media {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string | null;
  alt: string | null;
  category: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: string;
}

interface MediaLibraryProps {
  selectionMode?: boolean;
  onSelect?: (media: Media | Media[]) => void;
  multiple?: boolean;
  categoryFilter?: string;
}

export default function MediaLibrary({
  selectionMode = false,
  onSelect,
  multiple = false,
  categoryFilter
}: MediaLibraryProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(categoryFilter || '');
  const [search, setSearch] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMedia();
  }, [page, category, search]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      });

      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const response = await fetch(`/api/admin/media?${params}`);
      const data = await response.json();

      setMedia(data.media);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: Media) => {
    if (!selectionMode || !onSelect) return;

    if (multiple) {
      const newSelected = new Set(selectedMedia);
      if (newSelected.has(item.id)) {
        newSelected.delete(item.id);
      } else {
        newSelected.add(item.id);
      }
      setSelectedMedia(newSelected);
    } else {
      onSelect(item);
    }
  };

  const handleConfirmSelection = () => {
    if (!onSelect || selectedMedia.size === 0) return;

    const selectedItems = media.filter(m => selectedMedia.has(m.id));
    onSelect(selectedItems);
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.usage) {
          alert(`Cannot delete: This media is used in ${data.usage.total} places.`);
        } else {
          alert('Failed to delete media');
        }
        return;
      }

      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    }
  };

  if (loading && media.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading media...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="PRODUCT">Product</option>
          <option value="HERO">Hero</option>
          <option value="BANNER">Banner</option>
          <option value="USAGE">Usage</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer ${
              selectedMedia.has(item.id) ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => handleSelect(item)}
          >
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={item.thumbnailUrl || item.url}
                alt={item.alt || item.filename}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 bg-white">
              <p className="text-xs font-medium truncate">{item.filename}</p>
              <p className="text-xs text-gray-500">
                {item.width}x{item.height}
              </p>
            </div>
            {!selectionMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            )}
            {selectionMode && multiple && selectedMedia.has(item.id) && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      {media.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No media found
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Selection Actions */}
      {selectionMode && multiple && selectedMedia.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-sm mb-2">{selectedMedia.size} selected</p>
          <button
            onClick={handleConfirmSelection}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm Selection
          </button>
        </div>
      )}
    </div>
  );
}
