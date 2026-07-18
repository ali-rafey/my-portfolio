# ali — portfolio

Ali's personal portfolio. Standalone Next.js 14 app, deployable to its own
(sub)domain on Vercel.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks: `npm run typecheck` · `npm run lint` · `npm run build`

## Your photo

The hero expects **`public/ali.jpg`** — a portrait on a plain light wall
(profile shots work great). Until the file exists a silhouette placeholder
renders. Recommended: at least 1200px on the long edge; the hero shows the
top ~center of the image and feathers the edges into the stage.

## Structure

```
app/            layout (fonts, metadata) + page
components/
  hero/         the "builder mode" hero — portrait + floating desktop pieces
public/
  ali.jpg       your portrait (you add this)
```

Coming next: about / lab (Pinch Portal, ask-ali) / contact sections.
