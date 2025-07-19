'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-brand-darkest text-white rounded-lg hover:bg-brand-cyan transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-brand-cyan hover:text-brand-cyan transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
        {error.digest && (
          <p className="mt-4 text-xs text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}