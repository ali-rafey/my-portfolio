'use client';

import styles from './RedditCard.module.css';

// Reddit user card — Snoo + handle, Reddit-orange "View profile".

const PROFILE = {
  user: 'u/alianis15',
  url: 'https://www.reddit.com/user/alianis15/',
};

export default function RedditCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.dp} role="img" aria-label="Ali's Reddit avatar" />
        <span className={styles.who}>
          <span id={titleId} className={styles.user}>
            {PROFILE.user}
          </span>
          <span className={styles.sub}>Redditor</span>
        </span>
      </div>
      <a className={styles.action} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
        View profile
      </a>
    </div>
  );
}
