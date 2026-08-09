// The three modes and the app icons each one puts on the wall. Switching a tab
// swaps the whole icon set — the eight slots (i1…i8) stay put, only what sits
// in them changes.

export type ModeId = 'socials' | 'work' | 'focus';

// `accent` lights up the tab's glyph while it's the active mode; `caption` is
// the line that reads "<caption> activated" above the head.
export type Mode = {
  id: ModeId;
  label: string;
  status: string;
  accent: string;
  caption: string;
};

// Some icons are "live": clicking them opens a little card instead of just
// sitting on the wall. `card` names which one — for now only Instagram has it;
// the others get theirs later. An icon without `card` stays a static chip.
export type CardId =
  | 'instagram'
  | 'whatsapp'
  | 'reddit'
  | 'linkedin'
  | 'medium'
  | 'discord'
  | 'patreon'
  | 'coffee';

export type Icon = { label: string; src: string; card?: CardId };

export const MODES: Mode[] = [
  {
    id: 'socials',
    label: 'Socials',
    status: 'Where I hang out',
    accent: '#FF6E8A',
    caption: 'Social mode',
  },
  {
    id: 'work',
    label: 'Work',
    status: 'Get things done',
    accent: '#F5A03C',
    caption: 'Work mode',
  },
  {
    id: 'focus',
    label: 'Focus',
    status: 'Deep work · 24:59',
    accent: '#3FD6A8',
    caption: 'Focus mode',
  },
];

export const ICON_SETS: Record<ModeId, Icon[]> = {
  socials: [
    { label: 'Instagram', src: '/icons/instagram.svg', card: 'instagram' },
    { label: 'WhatsApp', src: '/icons/whatsapp.webp', card: 'whatsapp' },
    { label: 'Reddit', src: '/icons/reddit.webp', card: 'reddit' },
    { label: 'LinkedIn', src: '/icons/linkedin.webp', card: 'linkedin' },
    { label: 'Medium', src: '/icons/medium.webp', card: 'medium' },
    { label: 'Discord', src: '/icons/discord.webp', card: 'discord' },
    { label: 'Patreon', src: '/icons/patreon.webp', card: 'patreon' },
    { label: 'Buy Me a Coffee', src: '/icons/coffee.webp', card: 'coffee' },
  ],
  work: [
    { label: 'Google Business', src: '/icons/google-business.webp' },
    { label: 'Meta', src: '/icons/meta.png' },
    { label: 'Claude', src: '/icons/claude.webp' },
    { label: 'Google Ads', src: '/icons/google-ads-96.png' },
    { label: 'Shopify', src: '/icons/shopify-96.png' },
    { label: 'Google Analytics', src: '/icons/google-analytics.webp' },
    { label: 'Search Console', src: '/icons/google-search.webp' },
    { label: 'Pinterest', src: '/icons/pinterest.webp' },
  ],
  focus: [
    { label: 'Next.js', src: '/icons/nextjs.webp' },
    { label: 'GitHub', src: '/icons/github.webp' },
    { label: 'Notion', src: '/icons/notion.webp' },
    { label: 'Supabase', src: '/icons/supabase.webp' },
    { label: 'Gmail', src: '/icons/gmail.webp' },
    { label: 'n8n', src: '/icons/n8n.svg' },
    { label: 'Search Console', src: '/icons/google-search.webp' },
    { label: 'Meta', src: '/icons/meta.png' },
  ],
};

// Every icon across all three modes, for preloading — so switching tabs never
// shows a blank chip while an image downloads.
export const ALL_ICON_SRCS = Array.from(
  new Set(Object.values(ICON_SETS).flatMap((set) => set.map((i) => i.src))),
);
