import type { MetadataRoute } from 'next';

// Emitted at /manifest.webmanifest — installability + how the app looks when
// pinned to a home screen. Colors match the silver-wall / ink identity.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ali Anees — Portfolio',
    short_name: 'Ali Anees',
    description: 'Web platforms, automation, and AI — built to actually ship.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E3E1DC',
    theme_color: '#0A2036',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
