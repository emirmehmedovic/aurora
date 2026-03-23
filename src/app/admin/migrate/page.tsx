'use client';

import { useState } from 'react';

export default function MigratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runMigration = async () => {
    if (!confirm('Da li si siguran da želiš pokrenuti migraciju? Ovo može potrajati nekoliko minuta.')) {
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/migrate', {
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Migration failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-4">Media Migration</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Upozorenje:</strong> Ova operacija će kopirati sve slike iz /public/slike/ u /public/uploads/
                i kreirati database zapise. Pokreni ovo samo jednom na produkciji.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Šta ova migracija radi?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Kopira sve slike iz /public/slike/ u /public/uploads/</li>
            <li>Kreira Media zapise u bazi</li>
            <li>Povezuje slike sa proizvodima (Gallery & Usage)</li>
            <li>Konfiguriše Hero carousel sa 3 proizvoda</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={runMigration}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Migracija u toku...' : 'Pokreni Migraciju'}
          </button>
        </div>

        {loading && (
          <div className="mt-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Molimo sačekaj, ovo može potrajati nekoliko minuta...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Greška pri migraciji</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {result.message || 'Migracija uspješna!'}
                </h3>
                {result.stats && (
                  <div className="mt-2 text-sm text-green-700">
                    <p>Media fajlova: {result.stats.mediaCount}</p>
                    <p>Gallery slika: {result.stats.galleryCount}</p>
                    <p>Usage slika: {result.stats.usageCount}</p>
                    <p>Hero proizvoda: {result.stats.heroCount}</p>
                  </div>
                )}
                <div className="mt-4">
                  <a
                    href="/admin/media"
                    className="text-green-700 hover:text-green-600 font-medium"
                  >
                    → Idi na Media Library
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
