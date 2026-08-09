'use client';

import styles from './LinkedInCard.module.css';

// LinkedIn profile card — banner, overlapping avatar, name + headline, and the
// Connect / View-profile actions, all in LinkedIn blue.

const PROFILE = {
  name: 'Ali Anees',
  headline: 'Web · Automation · AI Developer',
  url: 'https://www.linkedin.com/in/muhammadali1655/',
};

export default function LinkedInCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <span className={styles.brand} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </span>
      </div>
      <span className={styles.dp} role="img" aria-label={`${PROFILE.name} on LinkedIn`} />
      <div className={styles.body}>
        <span id={titleId} className={styles.name}>
          {PROFILE.name}
        </span>
        <span className={styles.headline}>{PROFILE.headline}</span>
        <div className={styles.actions}>
          <a className={styles.connect} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
            Connect
          </a>
          <a className={styles.view} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
            View profile
          </a>
        </div>
      </div>
    </div>
  );
}
