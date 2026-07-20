'use client';

import { useState } from 'react';
import styles from './FocusTabs.module.css';

// Three Focus tabs stacked in one column over the head — styled after the iOS
// Focus sheet: capsule pills, icon left, title + subtitle centred, a "···" on
// the right. Exactly one is active; the active pill lights up with a glowing
// rainbow edge and plays its own little icon animation.
type Mode = { id: string; label: string; status: string };

const MODES: Mode[] = [
  { id: 'dnd', label: 'Do Not Disturb', status: 'Silence all notifications' },
  { id: 'work', label: 'Work', status: 'Get things done' },
  { id: 'focus', label: 'Focus', status: 'Deep work · 24:59' },
];

function Glyph({ id }: { id: string }) {
  if (id === 'dnd') {
    return (
      <svg viewBox="0 0 22 22" width="19" height="19" aria-hidden="true">
        <path d="M18 13.6A7.2 7.2 0 0 1 8.4 4a7.2 7.2 0 1 0 9.6 9.6Z" fill="currentColor" />
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

export default function FocusTabs() {
  const [active, setActive] = useState('work');

  return (
    <div className={styles.stack} role="tablist" aria-label="Focus mode">
      {MODES.map((m) => {
        const on = active === m.id;
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={on}
            aria-label={m.label}
            className={`${styles.tab} ${on ? styles.on : ''}`}
            onClick={() => setActive(m.id)}
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
