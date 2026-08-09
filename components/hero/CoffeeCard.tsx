'use client';

import styles from './CoffeeCard.module.css';

// Buy Me a Coffee — a warm little support card in BMC yellow.

const PROFILE = {
  url: 'https://buymeacoffee.com/alirafey16z',
};

export default function CoffeeCard({ titleId }: { titleId: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.cup} aria-hidden="true">
        ☕
      </span>
      <span id={titleId} className={styles.title}>
        Buy me a coffee
      </span>
      <span className={styles.sub}>Enjoying my work? Fuel the next build.</span>
      <a className={styles.buy} href={PROFILE.url} target="_blank" rel="noreferrer noopener">
        <span aria-hidden="true">☕</span> Buy me a coffee
      </a>
    </div>
  );
}
