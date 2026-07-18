'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

// =============================================================================
// Hero — "builder mode activated".
// =============================================================================
// A poster-style hero: Ali's portrait in the centre of a soft silver stage,
// surrounded by floating desktop "components" — app icons, a portfolio
// browser card, the pinch-portal card, a focus panel, a poster, a polaroid —
// plus a designer toolbar and a dock. Every piece is drawn inline (SVG/CSS);
// the only asset is /ali.jpg (drop the real photo into public/ — a silhouette
// fallback renders until then).
//
// Motion: each piece bobs gently on its own rhythm, and the whole cloud
// parallaxes a few pixels against the pointer. Honours reduced-motion.
// =============================================================================

/** Floating wrapper: outer = pointer parallax (depth), inner = idle bob. */
function Float({
  className,
  depth = 6,
  delay = 0,
  children,
}: {
  className: string;
  depth?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.float} ${className}`}
      style={{ '--depth': depth, '--delay': `${delay}s` } as React.CSSProperties}
    >
      <div className={styles.floatInner}>{children}</div>
    </div>
  );
}

/* ── App icon chips (hand-drawn, close-enough marks) ─────────────────────── */

function ChipFigma() {
  return (
    <svg viewBox="0 0 24 36" width="17" aria-hidden="true">
      <path d="M6 0h6v12H6a6 6 0 0 1 0-12Z" fill="#F24E1E" />
      <path d="M12 0h6a6 6 0 0 1 0 12h-6V0Z" fill="#FF7262" />
      <path d="M6 12h6v12H6a6 6 0 0 1 0-12Z" fill="#A259FF" />
      <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
      <path d="M6 24h6v6a6 6 0 1 1-6-6Z" fill="#0ACF83" />
    </svg>
  );
}

function ChipTerminal() {
  return (
    <svg viewBox="0 0 24 24" width="20" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0A2036" />
      <path
        d="M6 8l4 4-4 4"
        stroke="#4DE0A0"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 16h6" stroke="#E8F4FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChipSpotify() {
  return (
    <svg viewBox="0 0 24 24" width="20" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        d="M6.5 9.5c3.8-1.1 7.6-.8 10.8 1M7 12.6c3.1-.9 6.2-.6 8.9.8M7.6 15.6c2.4-.7 4.8-.5 6.9.6"
        stroke="#fff"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChipNotion() {
  return (
    <svg viewBox="0 0 24 24" width="20" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#fff" stroke="#D8DCE2" />
      <path
        d="M7 18V6.5l2.4-.3L15 15V6h2v12l-2.5.3L8.9 9.5V18H7Z"
        fill="#0A0F16"
      />
    </svg>
  );
}

function ChipGitHub() {
  return (
    <svg viewBox="0 0 24 24" width="20" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#171B21" />
      <circle cx="8" cy="7.5" r="2" fill="none" stroke="#E8EDF3" strokeWidth="1.6" />
      <circle cx="8" cy="16.5" r="2" fill="none" stroke="#E8EDF3" strokeWidth="1.6" />
      <circle cx="16.5" cy="9" r="2" fill="none" stroke="#E8EDF3" strokeWidth="1.6" />
      <path
        d="M8 9.5v5M16.5 11c0 3-3.5 2.5-6 4"
        stroke="#E8EDF3"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChipVSCode() {
  return (
    <svg viewBox="0 0 24 24" width="20" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#E8F1FB" />
      <path
        d="M16.5 4.5 8 12l8.5 7.5 2-1V5.5l-2-1ZM8 12 4.8 9.4l-1.3.8v3.6l1.3.8L8 12Z"
        fill="#0877DE"
      />
    </svg>
  );
}

const ICON_CHIPS = [
  { label: 'Figma', icon: <ChipFigma />, cls: 'posIcFigma', depth: 10, delay: 0.4 },
  { label: 'Terminal', icon: <ChipTerminal />, cls: 'posIcTerm', depth: 14, delay: 1.1 },
  { label: 'Spotify', icon: <ChipSpotify />, cls: 'posIcSpotify', depth: 8, delay: 1.9 },
  { label: 'Notion', icon: <ChipNotion />, cls: 'posIcNotion', depth: 12, delay: 0.8 },
  { label: 'GitHub', icon: <ChipGitHub />, cls: 'posIcGithub', depth: 11, delay: 1.5 },
  { label: 'VS Code', icon: <ChipVSCode />, cls: 'posIcVscode', depth: 9, delay: 0.2 },
] as const;

/* ── Hero ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const stageRef = useRef<HTMLElement | null>(null);

  // Pointer parallax: normalised cursor position drives --mx/--my, which every
  // .float consumes scaled by its --depth. rAF-throttled; disabled for
  // reduced-motion users.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = stage.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        stage.style.setProperty('--mx', mx.toFixed(3));
        stage.style.setProperty('--my', my.toFixed(3));
      });
    };
    stage.addEventListener('pointermove', onMove);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={stageRef} className={styles.stage} aria-label="Ali — portfolio hero">
      {/* Atmosphere */}
      <span className={styles.ghostName} aria-hidden="true">
        ali
      </span>
      <div className={styles.ghostCalendar} aria-hidden="true">
        <p className={styles.calTitle}>july, friday</p>
        <div className={styles.calGrid}>
          {['s', 'm', 't', 'w', 't', 'f', 's'].map((d, i) => (
            <span key={`d${i}`} className={styles.calHead}>
              {d}
            </span>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <span key={i} className={i + 1 === 18 ? styles.calToday : undefined}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.grain} aria-hidden="true" />

      {/* Chrome */}
      <header className={styles.topbar}>
        <span className={styles.wordmark}>
          <span className={styles.wordmarkDot} aria-hidden="true" />
          ali
        </span>
        <a
          className={styles.topLink}
          href="https://escaleadsagency.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          escaleads ↗
        </a>
      </header>

      <p className={styles.caption}>
        <span className={styles.captionDot} aria-hidden="true" />
        Builder mode activated
      </p>

      {/* Portrait — /ali.jpg with a silhouette fallback painted underneath. */}
      <div className={styles.portrait} role="img" aria-label="Portrait of Ali" />

      {/* ── Floating components ─────────────────────────────────────────── */}

      {/* Browser card — the portfolio itself. */}
      <Float className={styles.posBrowser} depth={12} delay={0.6}>
        <div className={styles.browserCard}>
          <div className={styles.browserBar}>
            <span className={styles.dotR} />
            <span className={styles.dotY} />
            <span className={styles.dotG} />
            <span className={styles.urlPill}>ali.dev</span>
          </div>
          <div className={styles.browserBody}>
            <span className={`${styles.tile} ${styles.tileA}`} />
            <span className={`${styles.tile} ${styles.tileB}`} />
            <span className={`${styles.tile} ${styles.tileC}`} />
            <span className={`${styles.tile} ${styles.tileD}`} />
            <span className={`${styles.tile} ${styles.tileE}`} />
            <span className={`${styles.tile} ${styles.tileF}`} />
          </div>
          <span className={styles.browserLabel}>portfolio — live build</span>
        </div>
      </Float>

      {/* Pinch Portal card — the lab experiment. */}
      <Float className={styles.posPortal} depth={16} delay={1.3}>
        <div className={styles.portalCard}>
          <span className={styles.bkTL} />
          <span className={styles.bkTR} />
          <span className={styles.bkBL} />
          <span className={styles.bkBR} />
          <span className={styles.portalLive}>
            <span className={styles.portalLiveDot} />
            live
          </span>
          <p className={styles.portalName}>pinch portal</p>
          <p className={styles.portalSub}>hand-tracking cv</p>
        </div>
      </Float>

      {/* Focus / notifications panel. */}
      <Float className={styles.posFocus} depth={10} delay={0.1}>
        <div className={styles.focusPanel}>
          <div className={styles.focusRow}>
            <svg viewBox="0 0 16 16" width="13" aria-hidden="true">
              <path
                d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
                fill="#BBD7FA"
              />
            </svg>
            <div>
              <p className={styles.focusTitle}>Focus — building</p>
              <p className={styles.focusSub}>notifications off</p>
            </div>
            <span className={styles.focusToggle}>
              <span className={styles.focusKnob} />
            </span>
          </div>
          <div className={styles.focusDivider} />
          <div className={styles.focusRow}>
            <svg viewBox="0 0 16 16" width="13" aria-hidden="true">
              <path
                d="M8 2a4 4 0 0 1 4 4v3l1.2 2H2.8L4 9V6a4 4 0 0 1 4-4Zm-1.5 12h3a1.5 1.5 0 0 1-3 0Z"
                fill="#94A1AF"
              />
            </svg>
            <div>
              <p className={styles.focusTitle}>Inbox zero</p>
              <p className={styles.focusSub}>until the ship date</p>
            </div>
            <span className={styles.focusCount}>100</span>
          </div>
        </div>
      </Float>

      {/* App icon chips. */}
      {ICON_CHIPS.map((c) => (
        <Float key={c.label} className={styles[c.cls]} depth={c.depth} delay={c.delay}>
          <div className={styles.chip}>
            <span className={styles.chipIcon}>{c.icon}</span>
          </div>
          <span className={styles.chipLabel}>{c.label}</span>
        </Float>
      ))}

      {/* Navy poster. */}
      <Float className={styles.posPoster} depth={13} delay={1.8}>
        <div className={styles.poster}>
          <p>
            the work
            <br />
            costs
            <br />
            everything.
          </p>
          <span className={styles.posterRule} />
        </div>
      </Float>

      {/* Polaroid. */}
      <Float className={styles.posPolaroid} depth={9} delay={0.9}>
        <div className={styles.polaroid}>
          <span className={styles.polaroidPhoto} />
          <span className={styles.polaroidCaption}>ali — mmxxv</span>
        </div>
      </Float>

      {/* Designer toolbar. */}
      <div className={styles.toolbar} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14">
          <path d="M4 2l8 6-3.5.8L10 13l-2 .8-1.5-4.2L4 12V2Z" fill="#5A6776" />
        </svg>
        <svg viewBox="0 0 16 16" width="14">
          <path
            d="M5 2v12M11 2v12M2 5h12M2 11h12"
            stroke="#5A6776"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <svg viewBox="0 0 16 16" width="14">
          <rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="#5A6776" strokeWidth="1.4" />
        </svg>
        <span className={styles.toolActive}>T</span>
        <svg viewBox="0 0 16 16" width="14">
          <path
            d="M3 13c0-4 2-9 5-11 1.5 1 2.5 3 2.5 5L13 9l-4 4H3Z"
            fill="none"
            stroke="#5A6776"
            strokeWidth="1.3"
          />
        </svg>
        <svg viewBox="0 0 16 16" width="14">
          <path
            d="M2 3h12v8H8l-3 3v-3H2V3Z"
            fill="none"
            stroke="#5A6776"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dock. */}
      <div className={styles.dock} aria-hidden="true">
        <span className={`${styles.dockApp} ${styles.appFinder}`} />
        <span className={`${styles.dockApp} ${styles.appCompass}`}>
          <span className={styles.needle} />
        </span>
        <span className={`${styles.dockApp} ${styles.appNotes}`} />
        <span className={`${styles.dockApp} ${styles.appPhotos}`}>
          <span className={styles.petalA} />
          <span className={styles.petalB} />
          <span className={styles.petalC} />
          <span className={styles.petalD} />
        </span>
        <span className={`${styles.dockApp} ${styles.appCode}`}>{'</>'}</span>
        <span className={`${styles.dockApp} ${styles.appFolder}`} />
        <span className={styles.dockSep} />
        <span className={`${styles.dockApp} ${styles.appTrash}`} />
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        scroll
      </div>
    </section>
  );
}
