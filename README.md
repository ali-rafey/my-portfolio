# Ali Anees — Portfolio

Personal portfolio of Ali Anees — building web platforms, automation, and AI systems.

Live: [alianees.online](https://alianees.online)

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- CSS Modules

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## SEO

Metadata, canonical URL, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`, and
the web manifest are all generated from the App Router (`app/layout.tsx`,
`app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`). The production origin is
read from `NEXT_PUBLIC_SITE_URL` and falls back to `https://alianees.online`, so
a domain change is a single environment variable.
