# Portfolio Overhaul — Design Spec (2026-07-10)

Direction A ("Seam Sweep, deepened") approved. Brand system unchanged: ink/bone
palette, purple seam accent, broom motif, existing type scale.

## Goals

1. Every word on the page understandable by technical and non-technical
   visitors alike. No jargon (LCP, CRO, D2C, "headless"), no metric numbers.
2. Real projects replace fictional case studies.
3. Add GEO (Generative Engine Optimization) to services.
4. Fix Calendly embed: height/timezone, date contrast, hover contrast, custom
   scrollbar.
5. Major UI + animation upgrade for Services and "Built to rank" (Proof)
   sections — signature, non-generic motion, within Emil Kowalski constraints.

## Non-goals

- No palette/typography/brand changes.
- No new dependencies (GSAP + ScrollTrigger already installed).
- Hero, Process, Nav, Footer keep their current design (copy already plain).

## 1. Copy — plain language, zero metrics

Remove from the entire site:

- Work index result column (`2.1×`, `0.6s`, …) and "The numbers are the story"
  subhead.
- Services `svc-bar` mini load-bar and its `LCP 0.6s` label.
- All case-study metric blocks (removed with the route, see §2).

New Services list (order + copy final):

| # | Name | Line | Tag |
|---|------|------|-----|
| 01 | Websites | Your whole site — designed, written, built, and launched for you. | |
| 02 | Landing pages | One page with one job: turn visitors into enquiries. | |
| 03 | Web apps | Custom tools and dashboards that feel instant to use. | |
| 04 | Brand & identity | Logo, colors, and a look that stays consistent everywhere. | |
| 05 | Get found on Google | Search engine optimization — when your customers search, you show up. | |
| 06 | Get recommended by AI | When people ask ChatGPT or Google's AI who to hire, your name comes up. | New |
| 07 | Speed & more sales | Pages that load instantly and turn more visitors into customers. | |
| 08 | AI features | Chat, search, and automation built into your site. | |

Work section header: keep "Proof, not promises." Subhead becomes:
"Real projects, live on the internet. Hover to peek, click to visit."

Proof section copy stays (already plain) — the redesign there is visual (§4).

`site.ts` metadata untouched (off-page, already includes GEO keyword).

## 2. Projects

`src/content/case-studies.ts` → renamed concept: project list. New type:

```ts
type Project = {
  slug: string;
  client: string;
  sector: string;      // plain words
  line: string;        // one plain sentence, shown in the glimpse
  url: string;         // live site, opens in new tab
  image: string;       // /work/<slug>.jpg (already in public/work/)
};
```

Data (facts fetched from live sites):

1. **Dolopreneur** — AI Platform — "An AI platform that lets one operator run
   chat, websites, and voice support on autopilot." —
   https://dolopreneur.com — /work/dolopreneur.jpg
2. **TDOT Immigration** — Immigration Services — "A Canadian immigration
   consultancy helping people study, work, and settle in Canada." —
   https://tdotimm.com — /work/tdot-immigration.jpg
3. **Tomato M&C India** — Medical Supplies — "Supplier of Korean-made
   orthopedic casting tape and splints to hospitals across India." —
   https://tomatomncindia.com — /work/tomato-mnc-india.jpg
4. **BM Carpentry & Landscaping** — Carpentry & Landscaping — "A Sydney crew
   building decks, gardens, and outdoor spaces — design to done." —
   https://bmcarpentryandlandscaping.netlify.app — /work/bm-carpentry.jpg

Year field dropped (not public info; sector reads better alone).

### Work section behaviour

- Rows: number · client · sector · "Visit ↗" affordance (replaces the result
  column). Anchor = external link, `target="_blank" rel="noopener noreferrer"`.
- Keep: hover focus/dim, variable-weight jump, scroll-velocity skew,
  cursor-chasing preview with velocity tilt.
- Preview content changes from typographic mark to **screenshot glimpse**:
  the project image inside the existing frame, with a slow continuous pan
  (scale ~1.08, translateY drifts over ~6s ease-in-out alternate) so it reads
  as a living peek, plus the one-line `line` caption below.
- Images preloaded with `<link rel=prefetch>`-equivalent (render all four
  `<img>` stacked in the preview, toggle opacity) so first hover never flashes.
- Touch / reduced motion: no preview; rows show sector + Visit link plainly.

### Deletions

- `src/app/work/[slug]/page.tsx` (whole route dir)
- `src/app/components/case-cover.tsx`
- ViewTransition wiring + `usePathname` + react/canary reference in `work.tsx`
- Case-study URLs in `sitemap.ts`
- Old story/metrics/mark fields and all four fictional entries

## 3. Services — Direction A

Full-bleed interactive rows, giant type (`clamp(1.8rem, 5vw, 3.6rem)`).

Signature interactions (the "how did they do that" layer):

1. **Direction-aware ink fill.** Row name is duplicated (base bone + seam-ink
   copy clipped with `clip-path: inset()`). On pointerenter the fill wipes in
   **from the edge the cursor entered** (compare `e.clientX` to row midpoint;
   set a CSS var switching the inset side). On leave it wipes out **toward the
   exit edge**. 320ms `cubic-bezier(0.23, 1, 0.32, 1)`.
2. **Spring seam marker.** Existing gliding marker upgraded: position follows
   the active row through a small JS spring (stiffness ~170, damping ~24) so it
   overshoots a hair and settles — alive, interruptible.
3. **Broom-pass streak.** On row activation, a one-shot narrow light-gradient
   band sweeps across the row (WAAPI, translateX -100%→100%, ~450ms, strong
   ease-out), leaving the expanded description behind it — the broom pass
   revealing the content. Fires once per activation, never loops.
4. Active row expands to reveal the plain-language line (existing
   grid-template-rows technique). No load bar.

Touch / reduced motion: tap toggles expansion, fill/streak/spring replaced by
opacity transitions.

## 4. Proof ("Built to rank and load fast") — Direction A

Concept: **the broom assembles the words.** Scroll-scrubbed dust-assembly.

- Section keeps header + 4 claims (Speed / Search / Craft / Proof).
- Each claim headline ("Loads in a blink", …) splits into per-letter spans.
- GSAP ScrollTrigger scrub: as the section scrolls through the viewport, the
  letters converge from scattered offsets (deterministic pseudo-random from
  index — no Math.random in render) with slight blur (4px→0) and opacity 0→1,
  settling left-to-right like a sweep. Descriptions fade up after their word
  settles.
- Layout upgrade: claims become a 2×2 editorial grid with oversized headline
  words and a hairline seam cross dividing the cells; a faint dust drift (the
  existing `dust.tsx` aesthetic) sits behind.
- Scrub not pin — the section never traps the page.
- Reduced motion / mobile (<960px): plain staggered fade-up, no scatter, no blur.

## 5. Calendly

- `.calendly-shell`: 500px → **720px** (timezone picker fully visible);
  680px below 640px viewport width.
- **Custom scrollbar:** the widget mounts inside an inner wrapper at a fixed
  ~980px height; `.calendly-shell` gets `overflow-y: auto`. The scrollbar is
  therefore ours: 6px wide, transparent track, seam-tinted thumb
  (`color-mix(seam 45%)`, 70% on hover), `scrollbar-width: thin` +
  `scrollbar-color` for Firefox.
- **Date contrast fix:** current filter
  `invert(0.9) hue-rotate(205deg) saturate(1.4) brightness(0.92)` makes
  date-number vs circle-fill vs hover-bg dissolve. Retune live in the browser:
  add `contrast()`, raise brightness, adjust invert strength until
  (a) available-date numbers read clearly against their circles,
  (b) hovered dates visibly brighten instead of going black,
  (c) selected state is unmistakable. Exact values are found empirically with
  the dev server + browser; spec target is the three legibility criteria, not
  fixed numbers.

## 6. Animation standards (site-wide, all new work)

- Transforms + opacity (+ clip-path) only; no layout properties.
- UI transitions ≤ 320ms; strong custom curves
  (`--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`).
- Hover effects gated behind `@media (hover:hover) and (pointer:fine)`.
- Every scripted animation has a `prefers-reduced-motion` fallback.
- Enter ≠ exit timing (exits faster).
- No entrance from `scale(0)`; no `transition: all`.

## 7. Verification

- `npm run build` clean.
- Dev server + browser pass: hover glimpse on all four projects, external
  links open, services fill direction correct from both edges, streak fires
  once, proof scrub settles fully at section center, Calendly timezone row
  visible, custom scrollbar renders, date/hover/selected legibility criteria
  met, reduced-motion pass, mobile pass.
