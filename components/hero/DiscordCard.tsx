'use client';

import { useState } from 'react';
import styles from './DiscordCard.module.css';

// Discord profile popout — blurple banner, avatar with an online dot, dark card.
// Discord has no public per-username URL, so the primary action is to copy the
// username to add him in the app; "Open Discord" is a fallback.

const USERNAME = 'crises_everytime';

export default function DiscordCard({ titleId }: { titleId: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(USERNAME);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <span className={styles.brand} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M20.3 4.5A19.8 19.8 0 0 0 15.4 3l-.24.5a18.3 18.3 0 0 1 4.35 1.36A16.6 16.6 0 0 0 12 4.4a16.6 16.6 0 0 0-7.5.96A18.3 18.3 0 0 1 8.84 3.5L8.6 3A19.8 19.8 0 0 0 3.7 4.5C.9 8.7.14 12.8.5 16.9a19.9 19.9 0 0 0 6.05 3.05l.8-1.34a13 13 0 0 1-2-1l.5-.36a14.2 14.2 0 0 0 12.3 0l.5.36a13 13 0 0 1-2 1l.8 1.34A19.9 19.9 0 0 0 23.5 16.9c.43-4.77-.73-8.84-3.2-12.4ZM8.55 14.6c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2 1.8.9 1.78 2c0 1.1-.79 2-1.78 2Zm6.9 0c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2 1.8.9 1.78 2c0 1.1-.78 2-1.78 2Z" />
          </svg>
        </span>
      </div>
      <span className={styles.dp} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={styles.dpLogo} fill="currentColor">
          <path d="M20.3 4.5A19.8 19.8 0 0 0 15.4 3l-.24.5a18.3 18.3 0 0 1 4.35 1.36A16.6 16.6 0 0 0 12 4.4a16.6 16.6 0 0 0-7.5.96A18.3 18.3 0 0 1 8.84 3.5L8.6 3A19.8 19.8 0 0 0 3.7 4.5C.9 8.7.14 12.8.5 16.9a19.9 19.9 0 0 0 6.05 3.05l.8-1.34a13 13 0 0 1-2-1l.5-.36a14.2 14.2 0 0 0 12.3 0l.5.36a13 13 0 0 1-2 1l.8 1.34A19.9 19.9 0 0 0 23.5 16.9c.43-4.77-.73-8.84-3.2-12.4ZM8.55 14.6c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2 1.8.9 1.78 2c0 1.1-.79 2-1.78 2Zm6.9 0c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2 1.8.9 1.78 2c0 1.1-.78 2-1.78 2Z" />
        </svg>
        <span className={styles.status} />
      </span>
      <div className={styles.body}>
        <span id={titleId} className={styles.name}>
          Ali
        </span>
        <span className={styles.username}>{USERNAME}</span>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy username'}
        </button>
      </div>
    </div>
  );
}
