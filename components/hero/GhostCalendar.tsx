'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

// The ghost calendar behind the figure, showing the real current month.
//
// This reads the date on the client rather than during render: the page is
// statically prerendered, so a date computed on the server would freeze at
// build time and slowly drift out of date. Mounting after hydration also keeps
// the server and client markup identical, so there's no mismatch — it just
// appears a frame later, which is invisible on a faint background element.

const WEEKDAY_HEADS = ['s', 'm', 't', 'w', 't', 'f', 's'];

export default function GhostCalendar() {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => setToday(new Date()), []);

  if (!today) return null;

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // Blank cells so the 1st lands under its real weekday column.
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const title = `${date} ${today
    .toLocaleDateString('en-US', { month: 'long' })
    .toLowerCase()}, ${today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}`;

  return (
    <div className={styles.ghostCalendar} aria-hidden="true">
      <p className={styles.calTitle}>{title}</p>
      <div className={styles.calGrid}>
        {WEEKDAY_HEADS.map((d, i) => (
          <span key={`head-${i}`} className={styles.calHead}>
            {d}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}` } />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <span key={i} className={i + 1 === date ? styles.calToday : undefined}>
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
