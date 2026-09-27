"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

/* Motion vocabulary for the whole page. One curve family, one timing
   personality: fast out, long settle. Every scroll trigger fires once. */

export const EASE = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Reduced-motion preference that is safe to branch *rendered output* on.
 * motion's useReducedMotion is null on the server but real on the first
 * client render, so markup that depends on it fails hydration. This reports
 * false while hydrating, then the real value.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** In view once, a little before the element is fully on screen. */
export function useSeen(ref: RefObject<Element | null>, amount = 0.3) {
  return useInView(ref, { once: true, amount, margin: "0px 0px -6% 0px" });
}

/**
 * Headline text that lifts in a word at a time from behind its own baseline.
 * Each word keeps its box in the flow, so the line breaks exactly as the plain
 * string would and crawlers read one text node. CSS-animated — never blank
 * while the bundle loads.
 */
export function Words({
  text,
  delay = 0,
  stagger = 0.06,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* Padding keeps descenders out of the clip; the matching negative
              margin keeps the line height unchanged. */}
          <span className={cn("inline-flex overflow-hidden pb-[0.12em] mb-[-0.12em] align-bottom", className)}>
            <span className="word-rise inline-block" style={{ "--d": `${delay + i * stagger}s` } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** The bristled stroke, drawn once at 300×24 and stretched to the word. */
function Bristles() {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
      <path
        d="M3 13.5C58 8.4 139 8.8 297 10.2l-1.6 7.4C182 15.8 96 17.6 5.5 20.6 1.4 18.9.4 15.2 3 13.5Z"
        fill="currentColor"
      />
      {[
        { d: "M9 8.6C92 5.4 182 6.2 292 7.4", w: 1.2, o: 0.55 },
        { d: "M26 6.6C110 4.3 196 4.8 262 5.6", w: 0.7, o: 0.35 },
        { d: "M12 21.6C104 19.6 204 18.8 288 19.2", w: 1, o: 0.5 },
        { d: "M44 23.2C126 22 214 21.6 270 22", w: 0.6, o: 0.3 },
      ].map((b) => (
        <path
          key={b.d}
          d={b.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={b.w}
          strokeLinecap="round"
          opacity={b.o}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * The brand flourish: one pass of the broom under a word. `load` plays with
 * the page (CSS, pre-hydration); `view` waits until the word is on screen.
 */
export function Sweep({
  children,
  delay = 0,
  trigger = "view",
  color,
  className,
}: {
  children: ReactNode;
  delay?: number;
  trigger?: "load" | "view";
  /** Stroke colour. Defaults to a plum tint that sits behind ink or plum text. */
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useSeen(ref, 0.8);
  const play = trigger === "load" ? "auto" : seen ? "true" : "false";
  return (
    <span
      ref={ref}
      className={cn("sweep isolate", className)}
      data-play={play}
      style={{ "--d": `${delay}s`, "--sweep-color": color } as CSSProperties}
    >
      <span className="sweep-stroke -z-10" aria-hidden>
        <Bristles />
      </span>
      {children}
    </span>
  );
}

const group: Variants = {
  hidden: {},
  show: (c: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: c.stagger, delayChildren: c.delay },
  }),
};
const child: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Children marked with <Item> rise in one after another when in view. */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, amount);
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={group}
      custom={{ stagger, delay }}
      initial="hidden"
      animate={seen ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div data-reveal className={className} variants={child}>
      {children}
    </motion.div>
  );
}

/** One element, one fade-rise, once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.25);
  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal bar that grows to `value`% once visible. Scale, not width. */
export function GrowBar({
  value,
  delay = 0,
  className,
}: {
  value: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useSeen(ref, 0.5);
  return (
    <span ref={ref} className="block h-full w-full">
      <motion.span
        className={cn("block h-full origin-left rounded-full", className)}
        style={{ width: `${value}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: seen ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : delay, ease: EASE }}
      />
    </span>
  );
}

/**
 * Diagram wires: each draws itself in, then a dash stream runs along it.
 * Paths live in a 0–100 box stretched to the parent; strokes stay 1px.
 */
export function Wires({
  paths,
  className,
  tone = "light",
}: {
  paths: string[];
  className?: string;
  tone?: "light" | "night";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const seen = useSeen(ref, 0.2);
  const base = tone === "night" ? "rgba(236,230,218,0.14)" : "var(--color-line-strong)";
  const flow = "var(--color-lilac)";
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-visible", className)}
    >
      {paths.map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            stroke={base}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: seen ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.15 + i * 0.12, ease: EASE }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke={flow}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
            className="dash-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: seen ? 0.7 : 0 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : 1 + i * 0.12 }}
          />
        </g>
      ))}
    </svg>
  );
}

/** Integer that counts up to `value` once visible. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useSeen(ref, 0.6);
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen || reduced) return;
    const c = animate(0, value, { duration, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, reduced, value, duration]);
  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {(reduced && seen ? value : n).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Renders children only once scrolled into view, so their mount animations play then. */
export function MountInView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.25);
  return (
    <div ref={ref} className={className}>
      {seen ? children : null}
    </div>
  );
}
