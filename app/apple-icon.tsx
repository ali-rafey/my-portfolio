import { ImageResponse } from 'next/og';

// Home-screen icon for iOS/Safari, which ignore SVG favicons and want a PNG.
// Generated so there's no binary asset to keep in sync with the identity.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#0A2036',
          color: '#ffffff',
          fontSize: 118,
          fontStyle: 'italic',
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
        }}
      >
        a
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 44,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#E8541E',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
