import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Playfair Display — the italic serif that carries the "ali" identity
// (wordmark, ghost lettering, display accents).
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ali — Portfolio',
  description:
    'Personal portfolio of Ali — builder of web platforms, computer-vision experiments, and AI systems.',
};

export const viewport: Viewport = {
  themeColor: '#0A2036',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* The portrait is the hero's largest element, but it's a CSS
            background — the browser can't discover it until the stylesheet is
            parsed. Preloading starts the download alongside the HTML so it
            paints with the rest of the page instead of popping in after it. */}
        <link rel="preload" as="image" href="/ali-222.webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
