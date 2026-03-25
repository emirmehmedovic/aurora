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
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
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

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-800 mb-1">
          Kako koristiti Media Library
        </p>
        <p className="text-sm text-gray-600">
          Ovdje samo uploaduješ i organizuješ slike. Koja slika ide u <span className="font-medium text-gray-800">hero</span>,
          <span className="font-medium text-gray-800"> gallery</span> ili <span className="font-medium text-gray-800">usage</span> dio
          određuješ u odgovarajućem editoru proizvoda ili hero sekcije.
        </p>
      </div>

      <MediaLibrary key={refreshKey} />

      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
      </div>
    </div>
  );
}
