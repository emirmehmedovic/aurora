'use client';

import { useState } from 'react';
import MediaLibrary from '@/components/admin/MediaLibrary';
import ImageUploadModal from '@/components/admin/ImageUploadModal';

export default function MediaPage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-gray-600 mt-1">
            Manage your images and media assets
          </p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          + Upload Images
        </button>
      </div>

      <MediaLibrary key={refreshKey} />

      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
