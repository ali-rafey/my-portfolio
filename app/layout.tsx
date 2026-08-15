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

// One source of truth for the production origin. Every absolute URL the SEO
// layer emits — canonical, Open Graph, sitemap, robots — is built from this,
// so a domain change is a one-line edit (or a NEXT_PUBLIC_SITE_URL override).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alianees.online';
const SITE_NAME = 'Ali Anees — Portfolio';
const TITLE = 'Ali Anees — Business Tech Partner';
const DESCRIPTION =
  'Ali Anees — your business technology partner, helping businesses step into the tech world.';
// Shorter line for the social-share cards (Open Graph / Twitter / the OG image).
const SHARE_DESCRIPTION = 'Your business tech partner — helping businesses step into the tech world.';

export const metadata: Metadata = {
  // Resolves every relative URL below (canonical "/", the file-based OG image)
  // to an absolute one — required for Open Graph and canonical tags.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · Ali Anees',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Ali Anees', url: SITE_URL }],
  creator: 'Ali Anees',
  publisher: 'Ali Anees',
  keywords: [
    'Ali Anees',
    'Ali Anees portfolio',
    'business tech partner',
    'business technology partner',
    'web developer',
    'Next.js developer',
    'full-stack developer',
    'automation engineer',
    'AI developer',
    'AI systems',
    'web platforms',
    'Escaleads',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SHARE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A2036',
  width: 'device-width',
  initialScale: 1,
};

// JSON-LD — tells search engines this page is about a specific person (an
// entity), which is what makes rich results / knowledge-panel eligibility
// possible. The WebSite node names the site itself.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Ali Anees',
      url: SITE_URL,
      image: `${SITE_URL}/ali-222.webp`,
      jobTitle: 'Business Technology Partner',
      description: DESCRIPTION,
      knowsAbout: [
        'Web Development',
        'Next.js',
        'Automation',
        'Artificial Intelligence',
        'Search Engine Optimization',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Escaleads',
        url: 'https://escaleadsagency.vercel.app',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* The portrait is the hero's largest element, but it's a CSS
            background — the browser can't discover it until the stylesheet is
            parsed. Preloading starts the download alongside the HTML so it
            paints with the rest of the page instead of popping in after it. */}
        <link
          rel="preload"
          as="image"
          href="/ali-222.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
