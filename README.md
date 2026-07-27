# ali — portfolio

Ali's personal portfolio. Standalone Next.js 14 app (App Router, TypeScript,
CSS Modules), deployable to its own (sub)domain on Vercel.

## Run

```bash
npm install
npm run dev
```

Checks: `npm run typecheck` · `npm run lint` · `npm run build`

## The hero

A "productivity mode" desktop poster: Ali's cutout portrait centred on a silver
wall, with floating UI pieces arranged around him.

| Piece | Where |
| --- | --- |
| Behance-style portfolio card | top-left |
| Focus tabs — Do Not Disturb · Work · Focus | over the head |
| App-icon cluster A (Slack, WhatsApp, Discord, LinkedIn) | upper-right |
| App-icon cluster B (Instagram, Reddit, Medium, Coffee) | lower-left |
| Ghost calendar | lower-left |
| Samsung "one day / or day one" note | lower-right |
| Dock — Finder · Fanar · Escaleads · Figma | bottom |

The stage is static; the only motion is a per-icon hover lift and the Focus
tabs. `components/hero/FocusTabs.tsx` is the one client component (the three
tabs are mutually exclusive, each with its own icon animation) — everything
else is server-rendered.

## Structure

```
app/                  layout (fonts, metadata) + page
components/hero/
  Hero.tsx            the stage: portrait + all floating pieces
  FocusTabs.tsx       interactive Do Not Disturb / Work / Focus tabs
public/
  ali-222.png         the hero portrait (transparent cutout)
  ali-raw.jpeg        source photo, reused in the Behance card avatar
  icons/              app icons
  boards/             mood-board thumbnails for the portfolio card
  dock-*.png          Fanar + Escaleads dock tiles
```

### Swapping the portrait

The hero portrait is a transparent PNG on a light-grey wall. When replacing it,
strip the background with a soft, spill-suppressed edge — a plain flood-fill
leaves a background-tinted fringe that reads as a dirty outline against the
wall. Then update `background-image` and `aspect-ratio` on `.portrait` in
`Hero.module.css` to match the new file's dimensions.

Coming next: about / lab / contact sections.
