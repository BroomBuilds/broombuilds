# BroomBuilds

Type-forward design-and-build studio site. Next.js App Router + Tailwind v4 +
Framer Motion (`motion`) + GSAP ScrollTrigger + Lenis. The mirrored-B wordmark
and the loader are the brand — everything else stays quiet.

> Note: no shadcn/ui — the Calendly popup uses Calendly's own widget, and the
> two button styles didn't justify the primitive layer.

## Run

```bash
npm install
npm run dev
```

## Set your Calendly link

Edit `src/lib/calendly.ts`:

```ts
export const CALENDLY_URL = "https://calendly.com/your-handle/intro"; // TODO: replace
```

The brand theme params (ink background, bone text, periwinkle accent) are
appended automatically for both the popup and the inline embed.

## Add a case study

Append an entry to `src/content/case-studies.ts`. The work-section card, the
`/work/[slug]` route, and the sitemap all derive from that one array. Keep the
`result` a concrete number ("2.1×", "0.6s", "+48%") — the design leans on it.

## Set the production domain

`src/lib/site.ts` → `SITE_URL`. Canonicals, OG URLs, sitemap, robots, and
JSON-LD all read from it.

## Deploy to Vercel

```bash
npx vercel
```

No env vars required. Fonts are self-hosted via `next/font`; the OG image and
favicon are generated at the edge (`app/opengraph-image.tsx`, `app/icon.tsx`).

## Motion system

- `src/lib/motion.ts` — shared spring presets and the house ease curve.
- Loader sequence lives in `src/app/components/loader.tsx`; a "↻ Replay"
  button appears in dev builds.
- `prefers-reduced-motion` skips the loader and downgrades reveals to fades.
