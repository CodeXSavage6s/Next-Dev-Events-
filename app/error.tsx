'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    // Try the provided reset (App Router). Then ensure a hard reload
    // as a fallback so the page definitely refreshes.
    if (typeof reset === 'function') {
      try {
        reset();
      } catch {
        // ignore and fall through to reload
      }
      // If reset doesn't unmount the error boundary, force a reload shortly after.
      setTimeout(() => {
        try {
          window.location.reload();
        } catch {
          // ignore
        }
      }, 700);
      return;
    }

    // No reset provided: do a hard reload immediately.
    try {
      window.location.reload();
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    const text = error?.digest || error?.message || 'no-id';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const mailto = `mailto:support@example.com?subject=${encodeURIComponent(
    'Error Report'
  )}&body=${encodeURIComponent(`Error: ${error?.message || 'unknown'}\nID: ${
    error?.digest || 'n/a'
  }`)} `;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-white">
      <div className="absolute w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-red-900/40 flex items-center justify-center text-4xl shadow-lg">
          ⚠️
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">Something went wrong</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-300 font-mono mt-1">Error ID: {error.digest}</p>
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

        <div className="w-full h-px bg-[#1e1e1e]" />

        <div className="flex gap-3 w-full">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-4 bg-[#1a1a1a] border border-[#2a2a2a] text-sm font-medium text-gray-300 rounded-xl hover:text-white transition"
          >
            {copied ? 'Copied' : 'Copy Error ID'}
          </button>
          <a
            href={mailto}
            className="flex-1 py-2 px-4 bg-[#7c3aed] text-white text-sm font-medium rounded-xl text-center"
          >
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}