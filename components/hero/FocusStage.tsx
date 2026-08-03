'use client';

import { useState } from 'react';
import FocusTabs from './FocusTabs';
import { ICON_SETS, ALL_ICON_SRCS, MODES, type ModeId } from './modes';
import styles from './Hero.module.css';

// Owns the active mode, because two things depend on it: the tabs over the head
// and the eight app icons floating around it. Switching a tab swaps the icon
// set in place — the slots (i1…i8) don't move, only their contents change.

const SLOTS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'] as const;

export default function FocusStage() {
  const [mode, setMode] = useState<ModeId>('work');
  const icons = ICON_SETS[mode];
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <>
      {/* Re-keyed so the caption cross-fades when the mode changes. */}
      <p key={mode} className={`${styles.caption} ${styles.captionSwap}`}>
        <strong>{current.caption}</strong>&nbsp;activated
      </p>

      <FocusTabs active={mode} onChange={setMode} />

      {icons.map((icon, i) => (
        <div
          /* keyed by mode so React remounts the chip and replays the swap
             animation whenever the set changes */
          key={`${mode}-${SLOTS[i]}`}
          className={`${styles.iconFloat} ${styles[SLOTS[i]]} ${styles.iconSwap}`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <div className={styles.appChip}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon.src} alt={icon.label} width={30} height={30} />
          </div>
        </div>
      ))}

      {/* Warm the other modes' icons so a tab switch never flashes an empty
          chip. Hidden, never laid out, decode in the background. */}
      <div className={styles.preloadIcons} aria-hidden="true">
        {ALL_ICON_SRCS.map((src) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt="" width={1} height={1} loading="eager" decoding="async" />
        ))}
      </div>
    </>
  );
}
