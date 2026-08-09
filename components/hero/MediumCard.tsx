'use client';

import styles from './MediumCard.module.css';

// Medium author card — the platform's stark black-on-white, a serif name, and
// the signature black "Follow" pill.

const PROFILE = {
  name: 'Ali Anees',
  handle: '@alianees',
  url: 'https://medium.com/@alianees',
};

export default function MediumCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.brand} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#000">
          <path d="M13.5 12a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0zM21 12c0 3.5-1.51 6.35-3.38 6.35S14.25 15.5 14.25 12s1.51-6.35 3.37-6.35S21 8.5 21 12zM24 12c0 3.15-.53 5.7-1.19 5.7-.65 0-1.18-2.55-1.18-5.7s.53-5.7 1.18-5.7S24 8.85 24 12z" />
        </svg>
      </span>
      <span className={styles.dp} role="img" aria-label={`${PROFILE.name} on Medium`} />
      <span id={titleId} className={styles.name}>
        {PROFILE.name}
      </span>
      <span className={styles.handle}>{PROFILE.handle}</span>
      <div className={styles.actions}>
        <a className={styles.follow} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
          Follow
        </a>
        <a className={styles.read} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
          Read
        </a>
      </div>
    </div>
  );
}
