import Navbar from '@/components/Navbar'
import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from './providers'
import { PostHogPageView } from './page-view'
import { Suspense } from 'react'
//const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 
  (process.env.NODE_ENV === 'production'
    ? 'https://next-dev-events-sigma.vercel.app'   // ← put your real vercel url here
    : 'http://localhost:3000');

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'EventHub — Discover & Attend World-Class Events',
    template: '%s | EventHub',
  },

  description:
    'EventHub is your go-to platform for discovering, booking, and managing world-class tech events, conferences, workshops, and summits across the globe.',

  keywords: [
    'tech events',
    'developer conferences',
    'workshops',
    'summits',
    'Next.js conf',
    'TypeScript',
    'AI events',
    'cloud native',
    'Kubernetes',
    'online events',
    'hybrid events',
    'event booking',
    'EventHub',
  ],

  authors: [{ name: 'Code X Team', url: BASE_URL }],
  creator: 'CodeXSavage',
  publisher: 'CodeXSavage',

  applicationName: 'EventHub',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Canonical
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'EventHub',
    title: 'EventHub — Discover & Attend World-Class Events',
    description:
      'Discover and book the best tech conferences, workshops, and summits around the world — in-person, hybrid, or online.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EventHub — Discover World-Class Events',
        type: 'image/png',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    site: '@eventhub',
    creator: '@CodeXSavage',
    title: 'EventHub — Discover & Attend World-Class Events',
    description:
      'Discover and book the best tech conferences, workshops, and summits around the world.',
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },

  // Manifest
  //manifest: '/site.webmanifest',

  // Theme
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
    <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}>
      <PostHogProvider>
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
        <Navbar />
        <main className=""> {children}</main>
      </PostHogProvider></body>
    </html>
  );
}
