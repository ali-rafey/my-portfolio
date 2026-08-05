import styles from './Hero.module.css';
import FocusStage from './FocusStage';
import GhostCalendar from './GhostCalendar';

// =============================================================================
// Hero — "productivity mode" poster, inspired by the reference, starring Ali.
// =============================================================================
// Ali's cutout portrait (public/ali-222.webp) stands centre on a silver wall.
// Around him:
//   left         the intro, and a clickable <GhostCalendar/> below it
//   over-head    <FocusStage/> — the mode tabs plus the icons they swap in
//   lower-right  Samsung "one day / one day one" note
//   bottom       a four-app dock
//
// The stage itself is static; the motion is a per-icon hover lift plus the
// mode switch. FocusStage and GhostCalendar are client components — the mode
// state and the current date both live in the browser; the rest is server-
// rendered.
// =============================================================================

function Float({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={`${styles.float} ${className}`}>{children}</div>;
}

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

      {/* ── Intro ───────────────────────────────────────────────────────── */}
      <div className={styles.bio}>
        <span className={styles.bioLabel}>
          <span className={styles.bioDot} aria-hidden="true" />
          about
        </span>
        <p className={styles.bioLead}>
          I&apos;m <em>Ali</em>
        </p>

        <span className={styles.bioRule} aria-hidden="true" />

        <p className={styles.bioText}>
          I help businesses step into the <em>tech world</em>.
        </p>
        <p className={styles.bioTextDim}>
          Web platforms, automation, and AI — built to actually ship.
        </p>
      </div>

      <GhostCalendar />

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
