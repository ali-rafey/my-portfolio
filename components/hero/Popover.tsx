'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popover.module.css';

// A small card that pops out of the chip that opened it and floats over the page
// — no dimming, no takeover. It's portaled to <body> (so the hero's transformed,
// overflow-clipped artboard can't trap or clip it) and positioned next to the
// anchor icon, flipping above / clamping to the viewport when there isn't room.
// Dismisses on Escape, an outside click, or a scroll/resize.

type Anchor = { x: number; y: number; width: number; height: number };

type PopoverProps = {
  open: boolean;
  onClose: () => void;
  anchor: Anchor | null;
  labelledBy?: string;
  children: React.ReactNode;
};

const EXIT_MS = 170;
const GAP = 12;
const MARGIN = 12;

function place(a: Anchor, w: number, h: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = a.x + a.width / 2;

  let left = cx - w / 2;
  left = Math.max(MARGIN, Math.min(left, vw - w - MARGIN));

  let top = a.y + a.height + GAP;
  let below = true;
  if (top + h > vh - MARGIN) {
    const above = a.y - GAP - h;
    if (above >= MARGIN) {
      top = above;
      below = false;
    } else {
      top = Math.max(MARGIN, Math.min(top, vh - h - MARGIN));
    }
  }

  // Grow from the edge nearest the icon, and horizontally from over the icon.
  const ox = Math.max(0, Math.min(100, ((cx - left) / w) * 100));
  const oy = below ? 0 : 100;
  return { top, left, ox, oy };
}

export default function Popover({ open, onClose, anchor, labelledBy, children }: PopoverProps) {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const [entered, setEntered] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; ox: number; oy: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Mount on open; on close, play the exit then unmount.
  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setRender(true);
      return;
    }
    setEntered(false);
    const t = setTimeout(() => {
      setRender(false);
      setPos(null);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);

  // Measure the card and place it against the anchor. A ResizeObserver re-places
  // whenever the card's real size settles — covering async styles/fonts in dev
  // and the card growing as you type — so it never overflows the viewport.
  useLayoutEffect(() => {
    if (!render || !anchor) return;
    const el = cardRef.current;
    if (!el) return;
    // offsetWidth/Height are the layout size — unaffected by the enter/exit
    // scale transform, unlike getBoundingClientRect, so placement is correct
    // even while the card is mid-animation.
    const reposition = () => {
      setPos(place(anchor, el.offsetWidth, el.offsetHeight));
    };
    reposition();
    const ro = new ResizeObserver(reposition);
    ro.observe(el);
    return () => ro.disconnect();
  }, [render, anchor]);

  // Once positioned, flip to the entered state next frame so the grow animates.
  useEffect(() => {
    if (render && pos && !entered) {
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
  }, [render, pos, entered]);

  // Drop focus onto the first action when it opens; hand it back on close.
  useEffect(() => {
    if (render && entered) {
      // First control in the card — the composer input if there is one, else the
      // first link/button. preventScroll so focusing it doesn't fire a scroll,
      // which our own scroll-to-dismiss listener would read as "close me".
      cardRef.current
        ?.querySelector<HTMLElement>('input, textarea, a[href], button')
        ?.focus({ preventScroll: true });
    }
  }, [render, entered]);

  useEffect(() => {
    if (!render && restoreRef.current) {
      restoreRef.current.focus();
      restoreRef.current = null;
    }
  }, [render]);

  // Escape / outside-click / scroll / resize all dismiss it.
  useEffect(() => {
    if (!render) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Element;
      if (cardRef.current?.contains(t)) return;
      // Let the chip's own click toggle it, rather than double-firing here.
      if (t.closest?.('[data-chip]')) return;
      onClose();
    };
    const onResize = () => onClose();
    // Close when the *page* scrolls, but not when a scrollable region inside the
    // card does (e.g. a long chat) — those target an element, not the document.
    const onScroll = (e: Event) => {
      const t = e.target;
      if (t === document || t === document.documentElement || t === document.body) onClose();
    };

    document.addEventListener('keydown', onKey, true);
    document.addEventListener('mousedown', onDown, true);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('mousedown', onDown, true);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [render, onClose]);

  if (!mounted || !render) return null;

  return createPortal(
    <div
      ref={cardRef}
      role="dialog"
      aria-labelledby={labelledBy}
      className={`${styles.pop} ${entered ? styles.in : styles.out}`}
      style={{
        top: pos ? pos.top : 0,
        left: pos ? pos.left : 0,
        transformOrigin: pos ? `${pos.ox}% ${pos.oy}%` : 'center',
        visibility: pos ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
