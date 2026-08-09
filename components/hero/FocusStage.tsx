'use client';

import { useRef, useState } from 'react';
import FocusTabs from './FocusTabs';
import Popover from './Popover';
import InstagramCard from './InstagramCard';
import WhatsAppCard from './WhatsAppCard';
import RedditCard from './RedditCard';
import LinkedInCard from './LinkedInCard';
import MediumCard from './MediumCard';
import DiscordCard from './DiscordCard';
import PatreonCard from './PatreonCard';
import CoffeeCard from './CoffeeCard';
import { ICON_SETS, ALL_ICON_SRCS, MODES, type CardId, type ModeId } from './modes';
import styles from './Hero.module.css';

// Each live icon maps to the card its chip opens.
const CARDS: Record<CardId, React.ComponentType<{ titleId: string }>> = {
  instagram: InstagramCard,
  whatsapp: WhatsAppCard,
  reddit: RedditCard,
  linkedin: LinkedInCard,
  medium: MediumCard,
  discord: DiscordCard,
  patreon: PatreonCard,
  coffee: CoffeeCard,
};

// Owns the active mode, because two things depend on it: the tabs over the head
// and the eight app icons floating around it. Switching a tab swaps the icon
// set in place — the slots (i1…i8) don't move, only their contents change.
//
// It also owns which social card is open. Most icons are static chips; an icon
// carrying a `card` (Instagram, WhatsApp) renders as a button that opens its
// popover. Room for the rest to gain their own cards later.

const SLOTS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'] as const;
const CARD_TITLE_ID = 'social-card-title';

export default function FocusStage() {
  const [mode, setMode] = useState<ModeId>('work');
  const [card, setCard] = useState<CardId | null>(null);
  // Keep the last opened card's content mounted while the popover plays its
  // close animation — `card` is already null by then, so we render from here.
  const shownCard = useRef<CardId | null>(null);
  if (card) shownCard.current = card;
  const ShownCard = shownCard.current ? CARDS[shownCard.current] : null;
  // The tapped chip's on-screen box, so the popover can anchor to it and grow
  // out of it rather than materialising in the middle.
  const [anchor, setAnchor] = useState<
    { x: number; y: number; width: number; height: number } | null
  >(null);
  const icons = ICON_SETS[mode];
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <>
      {/* Re-keyed so the caption cross-fades when the mode changes. */}
      <p key={mode} className={`${styles.caption} ${styles.captionSwap}`}>
        <strong>{current.caption}</strong>&nbsp;activated
      </p>

      <FocusTabs active={mode} onChange={setMode} />

      {icons.map((icon, i) => {
        // keyed by mode so React remounts the chip and replays the swap
        // animation whenever the set changes
        const key = `${mode}-${SLOTS[i]}`;
        const className = `${styles.iconFloat} ${styles[SLOTS[i]]} ${styles.iconSwap}`;
        const style = { animationDelay: `${i * 40}ms` };

        const chip = (
          <div className={styles.appChip}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon.src} alt={icon.label} width={30} height={30} />
          </div>
        );

        // A "live" icon opens its card; the rest stay decorative chips.
        if (icon.card) {
          return (
            <button
              key={key}
              type="button"
              data-chip
              className={`${className} ${styles.iconButton}`}
              style={style}
              aria-haspopup="dialog"
              aria-expanded={card === icon.card}
              aria-label={`${icon.label} — say hi`}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setAnchor({ x: r.left, y: r.top, width: r.width, height: r.height });
                setCard((prev) => (prev === icon.card ? null : icon.card!));
              }}
            >
              {chip}
            </button>
          );
        }

        return (
          <div key={key} className={className} style={style}>
            {chip}
          </div>
        );
      })}

      {/* Warm the other modes' icons so a tab switch never flashes an empty
          chip. Hidden, never laid out, decode in the background. */}
      <div className={styles.preloadIcons} aria-hidden="true">
        {ALL_ICON_SRCS.map((src) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt="" width={1} height={1} loading="eager" decoding="async" />
        ))}
      </div>

      <Popover
        open={card !== null}
        onClose={() => setCard(null)}
        labelledBy={CARD_TITLE_ID}
        anchor={anchor}
      >
        {ShownCard && <ShownCard titleId={CARD_TITLE_ID} />}
      </Popover>
    </>
  );
}
