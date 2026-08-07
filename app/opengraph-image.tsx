import { ImageResponse } from 'next/og';

// The card that renders when the site is pasted into WhatsApp / LinkedIn /
// Slack / X / iMessage. Next wires this into both og:image and twitter:image
// automatically. Generated at build so there's no static image to maintain.
export const alt = 'Ali Anees — Web, Automation & AI Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background:
            'radial-gradient(125% 90% at 50% -5%, #ECEAE7 0%, #E0DED9 46%, #C9C7C2 100%)',
          color: '#0A2036',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, fontStyle: 'italic', fontWeight: 700 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#E8541E', marginRight: 16 }} />
          ali
        </div>

        {/* Name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Ali Anees
          </div>
          <div style={{ width: 96, height: 4, background: 'rgba(10,32,54,0.28)', margin: '30px 0' }} />
          <div style={{ fontSize: 40, color: '#262C32', lineHeight: 1.35, maxWidth: 900 }}>
            Web platforms, automation, and AI — built to actually ship.
          </div>
        </div>

        {/* Footer domain */}
        <div style={{ display: 'flex', fontSize: 30, color: '#5A6167', letterSpacing: '0.02em', fontFamily: 'sans-serif' }}>
          alianees.online
        </div>
      </div>
    ),
    { ...size },
  );
}
