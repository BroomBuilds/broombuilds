"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { work } from "@/content/home";
import { hostOf, projects, type Project, type ProjectKind } from "@/content/projects";
import { cn } from "@/lib/cn";
import { EASE } from "./motion";
import { Eyebrow } from "./ui";
import StageReveal from "./stage-reveal";

/* Proof, on a dark stage. Every card leads with the real thing — a product
   film where there is one, a screenshot of the live site where there isn't —
   and opens it in a new tab. */

type Filter = "all" | ProjectKind;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "product", label: "AI products" },
  { id: "website", label: "Websites" },
];

export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();
  const shown = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <section id="work" aria-labelledby="work-title" className="px-3 py-10 md:px-5 md:py-16">
      <StageReveal>
        <div className="grain relative overflow-hidden rounded-[22px] bg-night py-16 text-ink md:py-24">
          <div aria-hidden className="dot-grid-night absolute inset-0" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-plum/30 blur-[120px]"
          />
          <div className="container-page relative">
            <div className="stage-item" style={{ "--d": "0.35s" } as CSSProperties}>
              <div>
                <Eyebrow tone="night" className="mb-5">
                  {work.eyebrow}
                </Eyebrow>
                <h2 id="work-title" className="text-[40px] text-ink sm:text-[48px] md:text-[58px] lg:text-[64px]">
                  Live on the internet.{" "}
                  <span className="text-lilac">Not in a slide deck.</span>
                </h2>
              </div>
              <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.6] text-ink/60 md:text-lg">{work.lead}</p>
            </div>

            <div className="stage-item mt-10 flex flex-wrap gap-2" style={{ "--d": "0.45s" } as CSSProperties} role="group" aria-label="Filter work">
              {filters.map((f) => {
                const count = projects.filter((p) => f.id === "all" || p.kind === f.id).length;
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "relative h-10 rounded-full px-4 text-[14.5px] transition-colors duration-200",
                      on ? "text-paper" : "text-ink/65 hover:text-ink",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0.12 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className="font-mono text-[11px] opacity-60">{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The entrance animation lives on a wrapper: a CSS animation's
                transform would override motion's layout transforms. */}
            <div className="stage-item mt-8" style={{ "--d": "0.55s" } as CSSProperties}>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown.map((p) => (
                    <motion.li
                      key={p.slug}
                      layout={!reduced}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <WorkCard project={p} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </StageReveal>
    </section>
  );
}

function WorkCard({ project: p }: { project: Project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-night">
        {p.video ? (
          <Film src={p.video} poster={p.image} label={`${p.name} product film`} />
        ) : (
          <Image
            src={p.image}
            alt={`${p.name}, ${p.sector}`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-[6px] bg-night/75 px-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/85 backdrop-blur-sm">
          {p.video ? (
            <>
              <Play className="h-2.5 w-2.5 fill-current" /> Product film
            </>
          ) : p.kind === "website" ? (
            "Live website"
          ) : (
            "Platform"
          )}
        </span>
        {p.url && (
          <span className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium text-paper opacity-0 shadow-card transition-[opacity,transform] duration-200 ease-out [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
            Visit site <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="flex items-center justify-between gap-3 font-mono text-[11px] text-ink/45">
          <span className="truncate">{p.url ? hostOf(p.url) : p.note}</span>
          {p.url && (
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5" />
          )}
        </p>
        <h3 className="mt-2 text-[24px] leading-tight tracking-[-0.025em] text-ink">{p.name}</h3>
        <p className="mt-1 text-[13px] text-lilac/90">{p.sector}</p>
        <p className="mt-3 text-[14.5px] leading-[1.55] text-ink/60">{p.line}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.stack.map((s) => (
            <li key={s} className="rounded-[6px] bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[10.5px] text-ink/60">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col rounded-[18px] bg-night-2 p-2.5 ring-1 ring-inset ring-night-line transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]";

  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.name}, ${p.sector}. Opens the live site in a new tab.`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/**
 * A project's film, playing in the card instead of a still — but only while
 * the card is on screen. Nine cards decoding video nobody is watching is the
 * difference between a smooth scroll and a janky one. The poster holds the
 * slot, so nothing shifts; no bytes move until the card approaches.
 */
function Film({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "200px 0px",
      threshold: 0.01,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible) void v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
    />
  );
}
