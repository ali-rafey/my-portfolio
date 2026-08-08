import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Home-screen icon for iOS/Safari, which ignore SVG favicons and want a PNG.
//
// The font has to be supplied explicitly: ImageResponse renders through Satori,
// which has no access to system fonts — naming "Georgia" there silently falls
// back to the bundled sans, which is not the face the wordmark uses.
//
// Composed for the squircle iOS masks over every home-screen icon: the artwork
// is a full-bleed square with no rounded corners of its own, and everything
// meaningful sits well inside the corners so the mask can't clip it.

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Bake the PNG at build time. The font is read off disk, and that file isn't
// traced into the serverless bundle — pinning this static means the handler
// only ever runs during the build, where the file is guaranteed to be there.
export const dynamic = 'force-static';

export default async function AppleIcon() {
  const playfair = await readFile(
    join(process.cwd(), 'app/_fonts/PlayfairDisplay-BoldItalic.ttf'),
  );

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
          backgroundImage: 'linear-gradient(155deg, #123253 0%, #0A2036 55%, #071829 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Playfair',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 1,
            color: '#FFFFFF',
            // optical centring — the italic leans right, and the glyph's
            // visual mass sits above its baseline
            transform: 'translate(-7px, 6px)',
          }}
        >
          a
        </div>

        {/* the wordmark's accent dot */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 46,
            width: 21,
            height: 21,
            borderRadius: 21,
            background: '#E8541E',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair',
          data: playfair,
          style: 'italic',
          weight: 700,
        },
      ],
    },
  );
}
