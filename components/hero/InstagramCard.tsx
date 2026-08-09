'use client';

import styles from './InstagramCard.module.css';

// Compact quick-action card shown when the Instagram chip is tapped: profile
// picture, handle, and the two actions Ali wanted. "Follow" opens his profile;
// "Message" deep-links into a DM via Instagram's ig.me.

const PROFILE = {
  handle: 'alianees_',
  name: 'Ali Anees',
  profileUrl: 'https://www.instagram.com/alianees_',
  messageUrl: 'https://ig.me/m/alianees_',
};

export default function InstagramCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.dp} role="img" aria-label={`${PROFILE.name} on Instagram`} />
        <span className={styles.who}>
          <span id={titleId} className={styles.handle}>
            {PROFILE.handle}
          </span>
          <span className={styles.name}>{PROFILE.name}</span>
        </span>
      </div>

      <div className={styles.actions}>
        <a
          className={styles.follow}
          href={PROFILE.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Follow
        </a>
        <a
          className={styles.message}
          href={PROFILE.messageUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Message
        </a>
      </div>
    </div>
  );
}
