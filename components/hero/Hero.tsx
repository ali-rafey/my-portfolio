import styles from './Hero.module.css';

// =============================================================================
// Hero — "productivity mode" poster, faithful to the reference, starring Ali.
// =============================================================================
// Ali's cutout portrait (public/ali.png) stands centre on a silver wall.
// Around him, as in the reference poster:
//   top-left   Behance-style portfolio card            (label: Behance portfolio)
//   left-mid   Pinterest boards collage                (label: Pinterest boards)
//   left-low   ghost calendar with the day circled
//   top-right  notification stack (Do Not Disturb / Work) — behind his head
//   right arc  Gmail · Slack · Notion(100) · WhatsApp · Spotify
//   left arc   Claude · GitHub · LinkedIn
//   shoulder   ID card, phone-message card, orange poster on a chain-link card
//   bottom     designer toolbar (T active) + macOS dock (Figma centred)
//
// Everything is STATIC — no idle motion, no parallax. The only animation is a
// per-icon hover lift, scoped to the icon actually under the pointer. Server
// component: zero client JS.
// =============================================================================

function Float({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={`${styles.float} ${className}`}>{children}</div>;
}

const RIGHT_ICONS = [
  { label: 'Gmail', src: '/icons/gmail.webp', cls: 'posGmail', behind: true },
  { label: 'Slack', src: '/icons/slack.webp', cls: 'posSlack', behind: false },
  { label: 'Notion', src: '/icons/notion.webp', cls: 'posNotion', behind: false, badge: '100' },
  { label: 'WhatsApp', src: '/icons/whatsapp.webp', cls: 'posWhatsApp', behind: false },
  { label: 'Spotify', src: '/icons/spotify.png', cls: 'posSpotify', behind: false },
] as const;

const LEFT_ICONS = [
  { label: 'Claude', src: '/icons/claude.webp', cls: 'posClaude', behind: false },
  { label: 'GitHub', src: '/icons/github.webp', cls: 'posGithub', behind: false },
  { label: 'LinkedIn', src: '/icons/linkedin.webp', cls: 'posLinkedin', behind: false },
  { label: 'Discord', src: '/icons/discord.webp', cls: 'posDiscord', behind: false },
  { label: 'Pinterest', src: '/icons/pinterest.webp', cls: 'posPinterest', behind: false },
] as const;

// The rest of Ali's icons live in the dock — his personal app row.
const DOCK_ICONS = [
  { label: 'Medium', src: '/icons/medium.webp' },
  { label: 'Reddit', src: '/icons/reddit.png' },
  { label: 'Twitter', src: '/icons/twitter.webp' },
  { label: 'X', src: '/icons/x.webp' },
  { label: 'Buy Me a Coffee', src: '/icons/coffee.webp' },
] as const;

const BOARD_IMAGES = ['b-01', 'b-02', 'b-03', 'b-05', 'b-08', 'b-13'] as const;

function IconFloat({
  icon,
}: {
  icon: { label: string; src: string; cls: string; behind: boolean; badge?: string };
}) {
  return (
    <div
      className={`${styles.float} ${styles.iconFloat} ${styles[icon.cls]} ${
        icon.behind ? styles.behindPortrait : ''
      }`}
    >
      <div className={styles.appChip}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.src} alt={icon.label} width={30} height={30} />
        {icon.badge ? <span className={styles.appBadge}>{icon.badge}</span> : null}
      </div>
      <span className={styles.floatLabel}>{icon.label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.stage} aria-label="Ali — portfolio hero">
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

      {/* ── Left column ─────────────────────────────────────────────────── */}

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
                style={{ backgroundImage: `url('/boards/${b}.jpeg')` }}
              />
            ))}
            <span className={styles.behanceTag}>Media</span>
          </div>
        </div>
        <span className={styles.floatLabel}>Behance portfolio</span>
      </Float>

      <Float className={`${styles.posBoards} ${styles.layerBack}`}>
        <div className={styles.boardsCard}>
          {BOARD_IMAGES.slice()
            .reverse()
            .map((b) => (
              <span
                key={b}
                className={styles.boardThumb}
                style={{ backgroundImage: `url('/boards/${b}.jpeg')` }}
              />
            ))}
        </div>
        <span className={styles.floatLabel}>Pinterest boards</span>
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

      {/* ── Right column ────────────────────────────────────────────────── */}

      <Float className={`${styles.posNotif} ${styles.behindPortrait}`}>
        <div className={styles.notifStack}>
          <div className={styles.notifPanel}>
            <span className={styles.notifIcon}>
              <svg viewBox="0 0 16 16" width="13" aria-hidden="true">
                <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z" fill="#C9D4E2" />
              </svg>
            </span>
            <span>
              <span className={styles.notifTitle}>Do Not Disturb</span>
              <span className={styles.notifSub}>silence notifications</span>
            </span>
            <span className={styles.notifDots}>···</span>
          </div>
          <div className={`${styles.notifPanel} ${styles.notifPanelB}`}>
            <span className={styles.notifIcon}>
              <svg viewBox="0 0 16 16" width="12" aria-hidden="true">
                <path
                  d="M6 4V3a2 2 0 0 1 4 0v1h2.5A1.5 1.5 0 0 1 14 5.5v6A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5v-6A1.5 1.5 0 0 1 3.5 4H6Zm1.2 0h1.6V3a.8.8 0 0 0-1.6 0v1Z"
                  fill="#C9D4E2"
                />
              </svg>
            </span>
            <span>
              <span className={styles.notifTitle}>Work</span>
              <span className={styles.notifSub}>active</span>
            </span>
            <span className={styles.notifDots}>···</span>
          </div>
        </div>
      </Float>

      {RIGHT_ICONS.map((ic) => (
        <IconFloat key={ic.label} icon={ic} />
      ))}
      {LEFT_ICONS.map((ic) => (
        <IconFloat key={ic.label} icon={ic} />
      ))}

      {/* Shoulder cluster */}
      <Float className={styles.posIdCard}>
        <div className={styles.idCard}>
          <span className={styles.idPhoto} />
        </div>
      </Float>

      <Float className={styles.posSms}>
        <div className={styles.smsCard}>
          <p className={styles.smsLine}>one day</p>
          <p className={styles.smsLine}>or day one.</p>
          <p className={styles.smsLineDim}>you decide.</p>
          <span className={styles.smsBrand}>SAMSUNG</span>
        </div>
      </Float>

      <Float className={styles.posPoster}>
        <div className={styles.chainCard}>
          <div className={styles.poster}>
            <p>
              the calling
              <br />
              costs little.
              <br />
              <em>the work</em>
              <br />
              <em>costs</em>
              <br />
              <em>everything.</em>
            </p>
          </div>
        </div>
        <span className={styles.floatLabel}>Pinterest boards</span>
      </Float>

      {/* ── Portrait (cutout) ───────────────────────────────────────────── */}
      <div className={styles.portrait} role="img" aria-label="Portrait of Ali" />

      {/* ── Bottom chrome ───────────────────────────────────────────────── */}

      <div className={styles.toolbar} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="13">
          <path d="M4 2l8 6-3.5.8L10 13l-2 .8-1.5-4.2L4 12V2Z" fill="#5A6167" />
        </svg>
        <svg viewBox="0 0 16 16" width="13">
          <path d="M5 2v12M11 2v12M2 5h12M2 11h12" stroke="#5A6167" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 16 16" width="13">
          <rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="#5A6167" strokeWidth="1.3" />
        </svg>
        <svg viewBox="0 0 16 16" width="13">
          <path d="M8 2l6 6-6 6-6-6 6-6Z" fill="none" stroke="#5A6167" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        <span className={styles.toolActive}>T</span>
        <svg viewBox="0 0 16 16" width="13">
          <path d="M2 3h12v8H8l-3 3v-3H2V3Z" fill="none" stroke="#5A6167" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        <span className={styles.toolSep} />
        <svg viewBox="0 0 16 16" width="13">
          <path d="M3 3h4v10H3zM9 3h4v6H9z" fill="none" stroke="#5A6167" strokeWidth="1.3" />
        </svg>
        <svg viewBox="0 0 16 16" width="13">
          <path d="M6 4 3 8l3 4M10 4l3 4-3 4" stroke="#5A6167" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Dock — Finder + Figma keep the macOS feel; the rest are Ali's own
          apps, each with a tooltip label on hover. */}
      <div className={styles.dock}>
        <span className={`${styles.dockApp} ${styles.appFinder}`} aria-hidden="true" />
        <span className={`${styles.dockApp} ${styles.appFigma}`} aria-hidden="true">
          <svg viewBox="0 0 24 36" width="13">
            <path d="M6 0h6v12H6a6 6 0 0 1 0-12Z" fill="#F24E1E" />
            <path d="M12 0h6a6 6 0 0 1 0 12h-6V0Z" fill="#FF7262" />
            <path d="M6 12h6v12H6a6 6 0 0 1 0-12Z" fill="#A259FF" />
            <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
            <path d="M6 24h6v6a6 6 0 1 1-6-6Z" fill="#0ACF83" />
          </svg>
        </span>
        {DOCK_ICONS.map((d) => (
          <span key={d.label} className={`${styles.dockApp} ${styles.dockReal}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.src} alt={d.label} width={26} height={26} />
            <span className={styles.dockTip}>{d.label}</span>
          </span>
        ))}
        <span className={styles.dockSep} aria-hidden="true" />
        <span className={`${styles.dockApp} ${styles.appTrash}`} aria-hidden="true" />
      </div>
    </section>
  );
}
