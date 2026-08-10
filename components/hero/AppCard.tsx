'use client';

import styles from './AppCard.module.css';

// Shared shell for the Work / Focus "what is this tool" cards. Each card wears
// the app's own theme (light/dark + a brand accent) and shows: logo + name, a
// one-line description of what it's for, and a small themed widget that evokes
// the product. Content for every app lives in appCards.tsx.

export type AppCardData = {
  name: string;
  tagline: string;
  theme?: 'light' | 'dark';
  brand: string; // accent, exposed to CSS as --brand
  logo: React.ReactNode; // ~30px
  site?: string; // optional "visit" link
  widget: React.ReactNode;
};

export default function AppCard({ titleId, data }: { titleId: string; data: AppCardData }) {
  return (
    <div
      className={`${styles.card} ${data.theme === 'dark' ? styles.dark : ''}`}
      style={{ ['--brand' as string]: data.brand }}
    >
      <div className={styles.head}>
        <span className={styles.logo}>{data.logo}</span>
        <span id={titleId} className={styles.name}>
          {data.name}
        </span>
        {data.site && (
          <a
            className={styles.visit}
            href={data.site}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${data.name}`}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>

      <p className={styles.tagline}>{data.tagline}</p>

      <div className={styles.widget}>{data.widget}</div>
    </div>
  );
}

// ── Reusable widgets ──────────────────────────────────────────────────────

// A single headline metric with a delta and a tiny bar sparkline — the shape
// most of the marketing/analytics tools share (sales, users, clicks, reach…).
export function Spark({
  label,
  value,
  delta,
  up = true,
  bars,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  bars: number[];
}) {
  return (
    <div className={styles.metric}>
      <div className={styles.metricTop}>
        <span className={styles.metricLabel}>{label}</span>
        <span className={`${styles.delta} ${up ? styles.up : styles.down}`}>
          {up ? '▲' : '▼'} {delta}
        </span>
      </div>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.spark} aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
