import styles from './Hero.module.css';
import FocusStage from './FocusStage';

// =============================================================================
// Hero — "productivity mode" poster, inspired by the reference, starring Ali.
// =============================================================================
// Ali's cutout portrait (public/ali-222.webp) stands centre on a silver wall.
// Around him:
//   top-left     Behance-style portfolio card           (label: Behance portfolio)
//   over-head    <FocusTabs/> — three interactive iOS-style Focus tabs
//   upper-right  app-icon cluster A (tilted, label-less)
//   lower-left   app-icon cluster B  +  ghost calendar
//   lower-right  Samsung "one day / one day one" note
//   bottom       a four-app macOS dock
//
// The stage itself is static; the only motion is per-icon hover lift and the
// FocusTabs interaction. FocusTabs is a client component; the rest is server-
// rendered.
// =============================================================================

function Float({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={`${styles.float} ${className}`}>{children}</div>;
}

const BOARD_IMAGES = ['b-01', 'b-02', 'b-03', 'b-05', 'b-08', 'b-13'] as const;

export default function Hero() {
  return (
    <section className={styles.stage} aria-label="Ali — portfolio hero">
     <div className={styles.artboard}>
      <span className={styles.ghostName} aria-hidden="true">
        ali
      </span>
      <div className={styles.grain} aria-hidden="true" />

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
        <strong>Productivity mode</strong>&nbsp;activated
      </p>

      {/* ── Left cards ──────────────────────────────────────────────────── */}

      <Float className={`${styles.posBehance} ${styles.layerBack}`}>
        <div className={styles.behanceCard}>
          <div className={styles.behanceSidebar}>
            <span className={styles.behanceAvatar} />
            <span className={styles.behanceName} />
            <span className={styles.behanceLine} />
            <span className={styles.behanceLineShort} />
            <span className={styles.behanceChip}>Follow</span>
            <span className={styles.behanceLine} />
            <span className={styles.behanceLineShort} />
          </div>
          <div className={styles.behanceGrid}>
            {BOARD_IMAGES.map((b) => (
              <span
                key={b}
                className={styles.behanceThumb}
                style={{ backgroundImage: `url('/boards/${b}.webp')` }}
              />
            ))}
            <span className={styles.behanceTag}>Media</span>
          </div>
        </div>
        <span className={styles.floatLabel}>Behance portfolio</span>
      </Float>

      <div className={styles.ghostCalendar} aria-hidden="true">
        <p className={styles.calTitle}>18 july, friday</p>
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

      {/* ── Mode tabs + the app icons they swap in ──────────────────────── */}
      <FocusStage />

      {/* ── Samsung note ────────────────────────────────────────────────── */}

      <Float className={styles.posSms}>
        <div className={styles.smsCard}>
          <p className={styles.smsLine}>one day</p>
          <p className={styles.smsLine}>or day one.</p>
          <p className={styles.smsLineDim}>you decide.</p>
          <span className={styles.smsBrand}>SAMSUNG</span>
        </div>
      </Float>

      {/* ── Portrait (cutout) ───────────────────────────────────────────── */}
      <div className={styles.portrait} role="img" aria-label="Portrait of Ali" />

      {/* Dock — four tiles: Finder · Fanar · Escaleads · Figma. */}
      <div className={styles.dock} aria-hidden="true">
        <span className={`${styles.dockApp} ${styles.appFinder}`} />
        <span className={`${styles.dockApp} ${styles.appFanar}`} />
        <span className={`${styles.dockApp} ${styles.appEscaleads}`} />
        <span className={`${styles.dockApp} ${styles.appFigma}`}>
          <svg viewBox="0 0 24 36" width="13" aria-hidden="true">
            <path d="M6 0h6v12H6a6 6 0 0 1 0-12Z" fill="#F24E1E" />
            <path d="M12 0h6a6 6 0 0 1 0 12h-6V0Z" fill="#FF7262" />
            <path d="M6 12h6v12H6a6 6 0 0 1 0-12Z" fill="#A259FF" />
            <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
            <path d="M6 24h6v6a6 6 0 1 1-6-6Z" fill="#0ACF83" />
          </svg>
        </span>
      </div>
     </div>
    </section>
  );
}
