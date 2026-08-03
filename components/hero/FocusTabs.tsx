'use client';

import styles from './FocusTabs.module.css';
import type { ModeId } from './modes';
import { MODES } from './modes';

// Three mode tabs stacked in one column over the head — styled after the iOS
// Focus sheet: capsule pills, icon left, title + subtitle centred, a "···" on
// the right. Controlled: the parent owns which mode is active, because the
// floating app icons change with it too.

function Glyph({ id }: { id: ModeId }) {
  if (id === 'socials') {
    return (
      <svg viewBox="0 0 22 22" width="19" height="19" aria-hidden="true">
        <circle cx="11" cy="6.6" r="3.1" fill="currentColor" />
        <circle cx="4.6" cy="15.2" r="2.6" fill="currentColor" />
        <circle cx="17.4" cy="15.2" r="2.6" fill="currentColor" />
        <path
          d="M8.4 8.6 6.4 12.9M13.6 8.6l2 4.3M7.2 15.2h7.6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  if (id === 'work') {
    return (
      <svg viewBox="0 0 22 22" width="19" height="19" aria-hidden="true">
        <path
          d="M7.6 5.4V4.5A2.4 2.4 0 0 1 10 2.1h2A2.4 2.4 0 0 1 14.4 4.5v.9h3A2.4 2.4 0 0 1 19.8 7.8v7.2A2.4 2.4 0 0 1 17.4 17.4H4.6A2.4 2.4 0 0 1 2.2 15V7.8A2.4 2.4 0 0 1 4.6 5.4H7.6Zm1.8 0h3.2v-.9a.7.7 0 0 0-.7-.7h-1.8a.7.7 0 0 0-.7.7v.9Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 22 22" width="19" height="19" aria-hidden="true">
      <circle cx="11" cy="11" r="7.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="11" cy="11" r="3.7" className={styles.focusRing} fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="11" cy="11" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function FocusTabs({
  active,
  onChange,
}: {
  active: ModeId;
  onChange: (id: ModeId) => void;
}) {
  return (
    <div className={styles.stack} role="tablist" aria-label="Mode">
      {MODES.map((m) => {
        const on = active === m.id;
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={on}
            aria-label={m.label}
            className={`${styles.tab} ${on ? styles.on : ''}`}
            style={{ ['--accent' as string]: m.accent }}
            onClick={() => onChange(m.id)}
          >
            <span className={`${styles.icon} ${styles[`icon_${m.id}`]}`}>
              <Glyph id={m.id} />
            </span>
            <span className={styles.meta}>
              <span className={styles.label}>{m.label}</span>
              <span className={styles.status}>{m.status}</span>
            </span>
            <span className={styles.dots} aria-hidden="true">···</span>
          </button>
        );
      })}
    </div>
  );
}
