'use client';

import { useRef, useState } from 'react';
import styles from './WhatsAppCard.module.css';

// A compact WhatsApp chat card — slim header, one incoming bubble, and the
// composer. Type a message and Send opens a real WhatsApp chat to Ali's number
// with the text pre-filled (wa.me deep link).

const PROFILE = {
  name: 'Ali Anees',
  phone: '923337916213', // +92 333 7916213, wa.me wants it without the +
  status: 'online',
};

export default function WhatsAppCard({ titleId }: { titleId: string }) {
  const [text, setText] = useState('');
  const sendRef = useRef<HTMLAnchorElement>(null);

  const trimmed = text.trim();
  const href = `https://wa.me/${PROFILE.phone}${trimmed ? `?text=${encodeURIComponent(trimmed)}` : ''}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.dp} aria-hidden="true">
          <svg viewBox="0 0 40 40" width="32" height="32">
            <circle cx="20" cy="16" r="7.6" fill="#fff" />
            <path d="M5.5 40c0-8.3 6.3-13.2 14.5-13.2S34.5 31.7 34.5 40Z" fill="#fff" />
          </svg>
        </span>
        <span className={styles.who}>
          <span id={titleId} className={styles.name}>
            {PROFILE.name}
          </span>
          <span className={styles.status}>{PROFILE.status}</span>
        </span>
        <span className={styles.brand} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 18.13h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29" />
          </svg>
        </span>
      </div>

      <div className={styles.chat}>
        <div className={styles.bubbleIn}>
          <span className={styles.bubbleText}>Hey! 👋 Drop me a message.</span>
          <span className={styles.time}>Ali</span>
        </div>
        {trimmed && (
          <div className={styles.bubbleOut}>
            <span className={styles.bubbleText}>{text}</span>
            <span className={styles.timeOut}>you</span>
          </div>
        )}
      </div>

      <div className={styles.composer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message Ali…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendRef.current?.click();
            }
          }}
          aria-label="Message to Ali on WhatsApp"
        />
        <a
          ref={sendRef}
          className={styles.send}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Send on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
