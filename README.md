# BroomBuilds

Single-page studio site. Next.js App Router + Tailwind v4 + Motion (`motion`)
+ Lenis. Warm ink, bone type, one purple seam — the house palette.

The page is one argument, told in order (see `src/app/page.tsx`):
claim → the two questions → what we are → what we build → proof → process →
tools → ways to work → FAQ → book.

## Run

```bash
npm install
npm run dev
```

## Where things live

| What | File |
| --- | --- |
| All homepage copy | `src/content/home.ts` |
| Work cards (films, screenshots, links) | `src/content/projects.ts` |
| Name, contact, SEO metadata, nav sections | `src/lib/site.ts` |
| Calendly link + theme | `src/lib/calendly.ts` |
| Colours, radii, easing, type roles | `src/app/globals.css` (`@theme`) |
| Fonts | `src/app/layout.tsx` (Bricolage Grotesque, Inter, JetBrains Mono) |

## Add a project

Drop a screenshot (and optionally a muted `.mp4` film) in `public/work/`, then
append an entry to `src/content/projects.ts`. `kind` decides which filter it
appears under; leave `url` out and set `note` when there's no public link.

## The signature pieces

- **Layer stack** (`layer-stack.tsx`) — the hero's live site pins, tilts and
  peels apart into Design → Build → Automate as you scroll. Desktop only;
  phones get a stacked list, reduced motion gets it already apart.
- **The broom stroke** (`Sweep` in `motion.tsx`) — the one flourish: a
  bristled seam-purple pass under a word.
- **Mocks** (`mocks/`) — product screens set in one real client's world, BM
  Carpentry & Landscaping, using their real palette, type, logo and photos.
  The Design showcase is their real site; the automation and growth screens
  are illustrative and labelled as such.

## Motion rules

Transforms, opacity and clip-path only. Custom curves from the `@theme`
tokens (`ease-out` is the strong curve). Hover effects only on hover-capable
pointers. Everything has a `prefers-reduced-motion` path; anything whose
*markup* depends on that preference uses `usePrefersReducedMotion` so it
hydrates cleanly.

## Deploy

```bash
npx vercel
```

Set `SITE_URL` in `src/lib/site.ts` to the production domain first.
