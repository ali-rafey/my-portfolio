/* eslint-disable @next/next/no-img-element */
// Content for every Work / Focus tool card: brand theme, a one-line "how Ali
// uses it for business", and a distinct widget that evokes that product's own
// UI. Rendered through <AppCard>.

import type { CardId } from './modes';
import type { AppCardData } from './AppCard';
import { Spark } from './AppCard';
import w from './appWidgets.module.css';

const logo = (src: string) => <img src={src} alt="" width={30} height={30} />;

// Shopify's admin-home sales sparkline (relative bar heights, latest at end).
const SALES = [34, 28, 46, 40, 58, 52, 70, 64, 82, 76, 92, 100];

const PINS = [
  ['30px', 'linear-gradient(135deg,#f8a5c2,#f5576c)'],
  ['42px', 'linear-gradient(135deg,#a1c4fd,#5b86e5)'],
  ['32px', 'linear-gradient(135deg,#fddb92,#d1913c)'],
  ['40px', 'linear-gradient(135deg,#c2e9fb,#a6c0fe)'],
  ['28px', 'linear-gradient(135deg,#fbc2eb,#a18cd1)'],
  ['36px', 'linear-gradient(135deg,#84fab0,#8fd3f4)'],
] as const;

export const APP_DATA: Partial<Record<CardId, AppCardData>> = {
  // ── Work — business tools, each in its own UI ──────────────────────────
  shopify: {
    name: 'Shopify',
    tagline: 'Building & scaling stores that actually sell.',
    brand: '#008060',
    site: 'https://www.shopify.com',
    logo: logo('/icons/shopify-96.png'),
    widget: <Spark label="Total sales" value="$48,290" delta="12%" bars={SALES} />,
  },
  'google-analytics': {
    name: 'Google Analytics',
    tagline: 'Seeing what actually drives growth.',
    brand: '#E8710A',
    site: 'https://analytics.google.com',
    logo: logo('/icons/google-analytics.webp'),
    widget: (
      <div className={w.ga}>
        {(
          [
            ['Organic', 62],
            ['Paid ads', 24],
            ['Social', 14],
          ] as const
        ).map(([label, pct]) => (
          <div className={w.gaRow} key={label}>
            <span className={w.gaLabel}>{label}</span>
            <span className={w.gaTrack}>
              <span className={w.gaFill} style={{ width: `${pct}%` }} />
            </span>
            <span className={w.gaPct}>{pct}%</span>
          </div>
        ))}
      </div>
    ),
  },
  'google-ads': {
    name: 'Google Ads',
    tagline: 'Capturing demand the moment people search.',
    brand: '#1A73E8',
    site: 'https://ads.google.com',
    logo: logo('/icons/google-ads-96.png'),
    widget: (
      <div>
        <div className={w.adTop}>
          <span className={w.adBadge}>Ad</span>
          <span className={w.adUrl}>escaleads.io</span>
        </div>
        <div className={w.adTitle}>Web Development &amp; Automation</div>
        <div className={w.adDesc}>Custom platforms, AI &amp; workflows that ship.</div>
      </div>
    ),
  },
  meta: {
    name: 'Meta',
    tagline: 'Running ads that reach real buyers.',
    brand: '#0866FF',
    site: 'https://business.facebook.com',
    logo: logo('/icons/meta.png'),
    widget: (
      <div>
        <div className={w.metaTop}>
          <span className={w.metaDot} />
          <span className={w.metaName}>Lead Gen · Active</span>
        </div>
        <div className={w.metaStats}>
          <div>
            <b>4.2×</b>
            <span>ROAS</span>
          </div>
          <div>
            <b>312</b>
            <span>Leads</span>
          </div>
          <div>
            <b>1.2M</b>
            <span>Reach</span>
          </div>
        </div>
      </div>
    ),
  },
  'google-business': {
    name: 'Google Business',
    tagline: 'Putting local businesses on the map.',
    brand: '#1A73E8',
    site: 'https://business.google.com',
    logo: logo('/icons/google-business.webp'),
    widget: (
      <div>
        <div className={w.gbRating}>
          <span className={w.gbNum}>4.9</span>
          <span className={w.gbStars}>★★★★★</span>
        </div>
        <div className={w.gbSub}>128 Google reviews · Open now</div>
      </div>
    ),
  },
  'search-console': {
    name: 'Search Console',
    tagline: 'Ranking businesses for what customers Google.',
    brand: '#4285F4',
    site: 'https://search.google.com/search-console',
    logo: logo('/icons/google-search.webp'),
    widget: (
      <div className={w.sc}>
        <div className={w.scRow}>
          <span className={w.scQuery}>web developer near me</span>
          <span className={w.scPos}>#3</span>
        </div>
        <div className={w.scRow}>
          <span className={w.scQuery}>automation agency</span>
          <span className={w.scPos}>#5</span>
        </div>
      </div>
    ),
  },
  pinterest: {
    name: 'Pinterest',
    tagline: 'Turning ideas into visual traffic.',
    brand: '#E60023',
    site: 'https://www.pinterest.com',
    logo: logo('/icons/pinterest.webp'),
    widget: (
      <div>
        <div className={w.pinGrid} aria-hidden="true">
          {PINS.map(([h, bg], i) => (
            <span key={i} style={{ height: h, background: bg }} />
          ))}
        </div>
        <span className={w.pinLabel}>212K monthly views</span>
      </div>
    ),
  },

  // ── Focus — the build stack ────────────────────────────────────────────
  claude: {
    name: 'Claude',
    tagline: 'Shipping AI features & automating busywork.',
    brand: '#D97757',
    site: 'https://claude.ai',
    logo: logo('/icons/claude.webp'),
    widget: (
      <div className={w.chat}>
        <div className={w.chatIn}>Draft my launch email ✨</div>
        <div className={w.chatOut}>On it — here&apos;s a warm, concise draft…</div>
      </div>
    ),
  },
  nextjs: {
    name: 'Next.js',
    tagline: 'Building fast, production-grade web apps.',
    theme: 'dark',
    brand: '#ffffff',
    site: 'https://nextjs.org',
    logo: logo('/icons/nextjs.webp'),
    widget: (
      <div className={w.term}>
        <div className={w.termLine}>
          <span className={w.prompt}>▲</span>next build
        </div>
        <div className={w.termOk}>✓ Compiled · Ready in 1.2s</div>
      </div>
    ),
  },
  github: {
    name: 'GitHub',
    tagline: 'Versioning & shipping every project.',
    theme: 'dark',
    brand: '#2DA44E',
    site: 'https://github.com',
    logo: logo('/icons/github.webp'),
    widget: (
      <div>
        <div className={w.ghGrid} aria-hidden="true">
          {Array.from({ length: 42 }, (_, i) => (
            <span key={i} style={{ opacity: 0.18 + (((i * 7 + 3) % 5) / 4) * 0.82 }} />
          ))}
        </div>
        <span className={w.ghLabel}>1,204 contributions this year</span>
      </div>
    ),
  },
  notion: {
    name: 'Notion',
    tagline: 'Running projects, docs & clients.',
    brand: '#2383E2',
    site: 'https://www.notion.so',
    logo: logo('/icons/notion.webp'),
    widget: (
      <div className={w.notion}>
        <div className={w.nRow}>
          <span className={w.nCheck}>✓</span>
          <span className={w.nDone}>Ship the landing page</span>
        </div>
        <div className={w.nRow}>
          <span className={w.nCheck}>✓</span>
          <span className={w.nDone}>Wire up analytics</span>
        </div>
        <div className={w.nRow}>
          <span className={w.nBox} />
          Write the docs
        </div>
      </div>
    ),
  },
  supabase: {
    name: 'Supabase',
    tagline: 'Standing up backends & databases fast.',
    theme: 'dark',
    brand: '#3ECF8E',
    site: 'https://supabase.com',
    logo: logo('/icons/supabase.webp'),
    widget: (
      <div>
        <div className={w.sbBar}>
          <span className={w.sbDot} /> Postgres · Healthy
        </div>
        <div className={w.sbTable}>
          <div className={`${w.sbRow} ${w.sbHead}`}>
            <span>id</span>
            <span>email</span>
          </div>
          <div className={w.sbRow}>
            <span>1</span>
            <span>ali@escaleads.io</span>
          </div>
        </div>
      </div>
    ),
  },
  gmail: {
    name: 'Gmail',
    tagline: 'Where client conversations happen.',
    brand: '#EA4335',
    site: 'https://mail.google.com',
    logo: logo('/icons/gmail.webp'),
    widget: (
      <div className={w.gmail}>
        <span className={w.gmAvatar}>S</span>
        <div className={w.gmMeta}>
          <div className={w.gmTop}>
            <span className={w.gmFrom}>Stripe</span>
            <span className={w.gmTime}>9:41</span>
          </div>
          <div className={w.gmSub}>Your payout is on the way ✓</div>
        </div>
      </div>
    ),
  },
  n8n: {
    name: 'n8n',
    tagline: 'Automating workflows end to end.',
    brand: '#EA4B71',
    site: 'https://n8n.io',
    logo: logo('/icons/n8n.svg'),
    widget: (
      <div className={w.n8n}>
        <span className={w.node}>Trigger</span>
        <span className={w.wire} />
        <span className={w.node}>Transform</span>
        <span className={w.wire} />
        <span className={w.node}>Send</span>
      </div>
    ),
  },
};
