'use client';

import styles from './PatreonCard.module.css';

// Patreon membership card — creator identity and the coral "Become a member".

const PROFILE = {
  name: 'Ali Anees',
  blurb: 'building web, automation & AI',
  url: 'https://www.patreon.com/cw/AliAnees',
};

export default function PatreonCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.dp} role="img" aria-label={`${PROFILE.name} on Patreon`} />
        <span className={styles.who}>
          <span id={titleId} className={styles.name}>
            {PROFILE.name}
          </span>
          <span className={styles.sub}>{PROFILE.blurb}</span>
        </span>
        <span className={styles.brand} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#FF424D">
            <circle cx="15.2" cy="9.6" r="6.6" />
            <rect x="2.6" y="2.8" width="3.4" height="18.4" />
          </svg>
        </span>
      </div>
      <a className={styles.join} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
        Become a member
      </a>
    </div>
  );
}
