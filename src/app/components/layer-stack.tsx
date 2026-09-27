"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { layers } from "@/content/home";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./motion";
import { N8nCompact, N8nPlate, SearchCompact, SearchPlate, SurfacePlate } from "./layer-plates";

/* The claim, acted out. A live client site sits in a browser; as the page
   scrolls it pins, tilts back and comes apart into the three layers every
   project is made of: what people see, how it gets found, what does the work.
   Each layer peels away to show the one beneath, and the last one turns to
   face you, flat and readable. Scroll-linked transforms only. Reduced motion
   gets the stack already apart; small screens get the three as a list. */

type LayerId = (typeof layers)[number]["name"];

export default function LayerStack() {
  const reduced = usePrefersReducedMotion();
  // Breakpoints in CSS, not JS, so the server HTML is already the right one.
  return (
    <>
      <div className="hidden lg:block">{reduced ? <StaticStack /> : <PinnedStack />}</div>
      <div className="lg:hidden">
        <StackedList />
      </div>
    </>
  );
}

/* ── Desktop: pinned, scroll-driven ─────────────────────────────────────── */

function PinnedStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Pass progress through a function transform on purpose: fed directly,
  // motion hands opacity to a native ScrollTimeline, which mis-measures a
  // target containing a sticky pin (the hint and labels drift out of sync).
  const p = useTransform(scrollYProgress, (v) => v);
  const [active, setActive] = useState<LayerId | null>(null);

  useMotionValueEvent(p, "change", (v) => {
    setActive(v < 0.44 ? null : v < 0.62 ? "Design" : v < 0.78 ? "Build" : "Automate");
  });

  // Tilt back and spin a little, like a stack of plates seen from above.
  // Once the last layer is bare it turns to face you, dead flat, and settles
  // to the right of the labels, inside the frame.
  const rx = useTransform(p, [0.04, 0.4, 0.82, 0.96], [0, 56, 56, 0]);
  const rz = useTransform(p, [0.04, 0.4, 0.82, 0.96], [0, -24, -24, 0]);
  const scale = useTransform(p, [0.04, 0.4, 0.82, 0.96], [1, 0.62, 0.62, 0.78]);
  const x = useTransform(p, [0.26, 0.44, 0.82, 0.96], [0, 13, 13, 17]);
  const y = useTransform(p, [0.04, 0.4], [0, 2]);
  const scene = useMotionTemplate`translate3d(${x}%, ${y}%, 0) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${scale})`;

  // The layers come apart along Z, then each peels away in turn.
  const spread = useTransform(p, [0.14, 0.44], [0, 1]);
  const peelSurface = useTransform(p, [0.58, 0.68], [0, 1]);
  const peelBuild = useTransform(p, [0.74, 0.84], [0, 1]);
  const labels = useTransform(p, [0.34, 0.46], [0, 1]);
  const labelsX = useTransform(p, [0.34, 0.46], [-24, 0]);
  const hint = useTransform(p, [0, 0.06], [1, 0]);

  return (
    <div ref={ref} className="relative h-[360vh]">
      <div className="sticky top-(--nav-h) flex h-[calc(100vh-var(--nav-h))] items-center overflow-hidden">
        <div className="container-page relative h-full">
          {/* Labels, fading in once the layers have separated. */}
          <motion.ol
            aria-label="What every project is made of"
            className="absolute left-5 top-1/2 z-10 w-[280px] -translate-y-1/2 space-y-3 md:left-8 xl:left-12"
            style={{ opacity: labels, x: labelsX }}
          >
            {layers.map((l) => (
              <li
                key={l.name}
                className={cn(
                  "rounded-[16px] border p-4 transition-[background-color,border-color,box-shadow] duration-300",
                  active === l.name ? "border-line bg-card shadow-card" : "border-transparent",
                )}
              >
                <p className="label flex items-center gap-2.5 text-ink-muted">
                  <span className={cn("transition-colors duration-300", active === l.name && "text-lilac")}>{l.n}</span>
                  <span className="h-px w-5 bg-line-strong" />
                  {l.name}
                </p>
                <p
                  className={cn(
                    "mt-2 font-display text-[21px] font-semibold leading-tight tracking-[-0.025em] transition-colors duration-300",
                    active === l.name ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {l.title}
                </p>
                <p
                  className={cn(
                    "overflow-hidden text-[14.5px] leading-snug text-ink-muted transition-[opacity,margin] duration-300",
                    active === l.name ? "mt-1.5 opacity-100" : "mt-0 h-0 opacity-0",
                  )}
                >
                  {l.body}
                </p>
              </li>
            ))}
          </motion.ol>

          <div className="grid h-full place-items-center [perspective:2200px]">
            <motion.div
              className="relative aspect-[16/10] w-[min(1060px,84vw,calc((100vh-var(--nav-h)-48px)*1.6))] [transform-style:preserve-3d]"
              style={{ transform: scene }}
            >
              <Plate depth={-1} spread={spread} active={active === "Automate"}>
                <N8nPlate />
              </Plate>
              <Plate depth={0} spread={spread} peel={peelBuild} active={active === "Build"}>
                <SearchPlate />
              </Plate>
              <Plate depth={1} spread={spread} peel={peelSurface} active={active === "Design"}>
                <SurfacePlate priority />
              </Plate>
            </motion.div>
          </div>

          <motion.p
            aria-hidden
            className="label pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-muted"
            style={{ opacity: hint }}
          >
            Scroll to look underneath
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/**
 * One layer of the stack. `depth` is its slot: 1 top, 0 middle, -1 bottom.
 * `peel` (0→1) lifts it up and away, and fades it out completely, once the
 * story moves beneath it.
 */
function Plate({
  depth,
  spread,
  peel,
  active,
  children,
}: {
  depth: -1 | 0 | 1;
  spread: MotionValue<number>;
  peel?: MotionValue<number>;
  active: boolean;
  children: ReactNode;
}) {
  const none = useMotionValue(0);
  const lift = peel ?? none;
  const z = useTransform([spread, lift], ([s, l]: number[]) => depth * 230 * s + l * 380 + (active ? 30 : 0));
  const up = useTransform(lift, [0, 1], [0, -70]);
  const opacity = useTransform(lift, [0, 0.35, 1], [1, 0.35, 0]);
  const transform = useMotionTemplate`translateY(${up}%) translateZ(${z}px)`;
  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-[18px] transition-shadow duration-500",
        active
          ? "shadow-[0_0_0_2px_var(--color-lilac),0_50px_90px_-40px_rgba(0,0,0,0.75)]"
          : "shadow-[0_0_0_1px_rgba(236,230,218,0.16),0_40px_80px_-40px_rgba(0,0,0,0.7)]",
      )}
      style={{ transform, opacity }}
    >
      {children}
    </motion.div>
  );
}

/* ── Reduced motion, desktop: the stack simply sits apart ──────────────── */

function StaticStack() {
  const plates = [
    { depth: -1, el: <N8nPlate key="a" /> },
    { depth: 0, el: <SearchPlate key="b" /> },
    { depth: 1, el: <SurfacePlate key="s" priority /> },
  ];
  return (
    <div className="container-page grid h-[min(calc(100vh-var(--nav-h)),820px)] grid-cols-[280px_minmax(0,1fr)] items-center gap-8">
      <ol aria-label="What every project is made of" className="space-y-6">
        {layers.map((l) => (
          <li key={l.name}>
            <p className="label flex items-center gap-2.5 text-ink-muted">
              <span className="text-lilac">{l.n}</span>
              <span className="h-px w-5 bg-line-strong" />
              {l.name}
            </p>
            <p className="mt-2 font-display text-[21px] font-semibold leading-tight tracking-[-0.025em]">{l.title}</p>
            <p className="mt-1.5 text-[14.5px] leading-snug text-ink-muted">{l.body}</p>
          </li>
        ))}
      </ol>
      <div className="grid h-full place-items-center [perspective:2200px]">
        <div
          className="relative aspect-[16/10] w-[min(900px,60vw)] [transform-style:preserve-3d]"
          style={{ transform: "rotateX(56deg) rotateZ(-24deg) scale(0.8)" }}
        >
          {plates.map((pl) => (
            <div
              key={pl.depth}
              className="absolute inset-0 rounded-[18px] shadow-[0_0_0_1px_rgba(236,230,218,0.16),0_40px_80px_-40px_rgba(0,0,0,0.7)]"
              style={{ transform: `translateZ(${pl.depth * 230}px)` }}
            >
              {pl.el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Small screens ──────────────────────────────────────────────────────── */

function StackedList() {
  const content = [<SurfacePlate key="s" priority />, <SearchCompact key="b" />, <N8nCompact key="a" />];
  return (
    <ol className="container-page space-y-10 pb-6">
      {layers.map((l, i) => (
        <li key={l.name}>
          <div className={cn("w-full rounded-[18px] shadow-tile", i === 0 && "aspect-[16/10]")}>{content[i]}</div>
          <p className="label mt-5 flex items-center gap-2.5 text-ink-muted">
            <span className="text-lilac">{l.n}</span>
            <span className="h-px w-5 bg-line-strong" />
            {l.name}
          </p>
          <p className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.025em]">{l.title}</p>
          <p className="mt-1.5 text-[16px] text-ink-muted">{l.body}</p>
        </li>
      ))}
    </ol>
  );
}
