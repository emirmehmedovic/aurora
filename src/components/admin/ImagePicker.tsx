'use client';

import { useState } from 'react';
import MediaLibrary from './MediaLibrary';

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

interface ImagePickerProps {
  onSelect: (media: Media | Media[]) => void;
  multiple?: boolean;
  categoryFilter?: string;
  buttonText?: string;
  buttonClassName?: string;
}

export default function ImagePicker({
  onSelect,
  multiple = false,
  categoryFilter,
  buttonText = 'Select Image',
  buttonClassName = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
}: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (media: Media | Media[]) => {
    onSelect(media);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Select Image</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <MediaLibrary
              selectionMode={true}
              onSelect={handleSelect}
              multiple={multiple}
              categoryFilter={categoryFilter}
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
