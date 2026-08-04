'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

// The ghost calendar behind the figure — shows the real current month, and the
// days are clickable: pick one and it fills in, step between months with the
// arrows. Today keeps its ring whichever month you're looking at.
//
// The date is read on the client rather than during render: the page is
// statically prerendered, so a date computed on the server would freeze at
// build time. Mounting after hydration also keeps the two markups identical.

const WEEKDAY_HEADS = ['s', 'm', 't', 'w', 't', 'f', 's'];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function GhostCalendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);
  // Which month is on screen — starts on today's, moves with the arrows.
  const [view, setView] = useState<{ year: number; month: number } | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setSelected(now);
    setView({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  if (!today || !view) return null;

  const { year, month } = view;
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const shiftMonth = (delta: number) =>
    setView((prev) => {
      if (!prev) return prev;
      const d = new Date(prev.year, prev.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  // The heading tracks the selected day while you're on its month, and falls
  // back to naming the month you've navigated to.
  const onSelectedMonth =
    selected && selected.getFullYear() === year && selected.getMonth() === month;

  const heading = onSelectedMonth
    ? `${selected.getDate()} ${selected
        .toLocaleDateString('en-US', { month: 'long' })
        .toLowerCase()}, ${selected
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase()}`
    : `${new Date(year, month, 1)
        .toLocaleDateString('en-US', { month: 'long' })
        .toLowerCase()} ${year}`;

  return (
    <div className={styles.ghostCalendar}>
      <div className={styles.calHeader}>
        <button
          type="button"
          className={styles.calNav}
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className={styles.calTitle}>{heading}</p>
        <button
          type="button"
          className={styles.calNav}
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className={styles.calGrid}>
        {WEEKDAY_HEADS.map((d, i) => (
          <span key={`head-${i}`} className={styles.calHead}>
            {d}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = new Date(year, month, i + 1);
          const isToday = sameDay(day, today);
          const isSelected = !!selected && sameDay(day, selected);
          return (
            <button
              type="button"
              key={i}
              className={`${styles.calDay} ${isToday ? styles.calToday : ''} ${
                isSelected ? styles.calSelected : ''
              }`}
              aria-pressed={isSelected}
              aria-label={day.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              onClick={() => setSelected(day)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
