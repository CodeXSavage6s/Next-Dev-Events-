'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch {
      // If reset fails, force a hard reload
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-white">
      <div className="absolute w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-red-900/40 flex items-center justify-center text-4xl shadow-lg">
          ⚠️
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-700 font-mono mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="w-full h-px bg-[#1e1e1e]" />

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 px-6 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 py-2.5 px-6 bg-[#1a1a1a] border border-[#2a2a2a] text-sm font-medium text-gray-400 rounded-xl hover:text-white hover:border-gray-600 transition text-center"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}