"use client";

import type { ComponentType, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Bot,
  CalendarCheck,
  Check,
  Database,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { StepId } from "@/content/home";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { BM, BMLogo, projects } from "./mocks/bm";
import { EASE } from "./motion";
import { LogoMark } from "./ui";

/* One small, working picture per step. Each mounts when its step becomes
   active, so its entrance plays then — the diagram is the explanation. */

/** Fade-rise with a delay, the unit every diagram is built from. */
function In({ d = 0, className, children }: { d?: number; className?: string; children?: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: d, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[14px] border border-line bg-card p-4 shadow-card", className)}>{children}</div>;
}

function Tick({ d, children }: { d: number; children: ReactNode }) {
  return (
    <In d={d} className="flex items-center gap-2.5 py-1.5 text-[13px]">
      <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-plum text-ink">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      {children}
    </In>
  );
}

/* 01 — Listen */
function Listen() {
  const notes = [
    "Most enquiries come in after hours",
    "The phone rings while we’re on the tools",
    "The site doesn’t show the work we’re proud of",
  ];
  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[1fr_1.15fr]">
      <In>
        <Card className="h-full">
          <p className="flex items-center gap-2 text-[12px] text-ink-muted">
            <Phone className="h-3.5 w-3.5" /> Discovery call · 30 min
          </p>
          <p className="mt-3 text-[15px] font-medium">What we heard</p>
          <ul className="mt-2 space-y-2">
            {notes.map((n, i) => (
              <In key={n} d={0.3 + i * 0.25} className="rounded-[10px] bg-ink/[0.04] px-2.5 py-2 text-[12.5px] text-ink-soft">
                “{n}”
              </In>
            ))}
          </ul>
        </Card>
      </In>
      <In d={0.9}>
        <Card className="relative h-full">
          <p className="text-[12px] text-ink-muted">Sent the next morning</p>
          <p className="mt-1 text-[15px] font-medium">Your plan</p>
          <div className="mt-2">
            <Tick d={1.2}>New site with a project gallery</Tick>
            <Tick d={1.4}>WhatsApp + phone enquiry agent</Tick>
            <Tick d={1.6}>Google & AI search setup</Tick>
            <Tick d={1.8}>Live in four weeks</Tick>
          </div>
          <In d={2.1} className="mt-3 flex items-center justify-between rounded-[10px] bg-plum-soft px-3 py-2 text-[12.5px]">
            <span className="text-ink-soft">One clear price</span>
            <span className="font-medium text-lilac">Fixed before we start</span>
          </In>
        </Card>
      </In>
    </div>
  );
}

/* 02 · Design: a real client, BM Carpentry & Landscaping, as we built it. */
function Design() {
  const swatch = [BM.espresso, BM.copper, BM.paper, BM.stone, BM.bark];
  return (
    <div className="relative h-full">
      <In className="h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-line font-client shadow-card" style={{ background: BM.paper, color: BM.espresso }}>
          {/* hero: their photography under their headline */}
          <div className="relative min-h-0 flex-[1.35] overflow-hidden" style={{ background: BM.espresso }}>
            <Image src="/work/bm/home.jpg" alt="" fill sizes="520px" className="object-cover object-[50%_65%] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201C1B]/90 via-[#201C1B]/30 to-[#201C1B]/40" />
            <div className="relative flex h-full flex-col justify-between p-4" style={{ color: BM.paper }}>
              <div className="flex items-center justify-between">
                <BMLogo className="w-[96px]" />
                <span className="rounded-[3px] px-2.5 py-1 text-[10px] font-medium text-white" style={{ background: BM.copper }}>
                  Get a quote
                </span>
              </div>
              <In d={0.3}>
                <p className="text-[30px] font-medium leading-[0.98] tracking-[-0.03em]">
                  Dream. Design.
                  <br />
                  Deliver.
                </p>
                <p className="mt-1.5 text-[11px] opacity-75">Sydney carpentry & landscaping, from design to done.</p>
              </In>
            </div>
          </div>
          {/* featured projects */}
          <div className="grid flex-1 grid-cols-3 gap-2 p-3">
            {projects.map((p, i) => (
              <In key={p.name} d={0.7 + i * 0.12} className="relative overflow-hidden rounded-[4px]">
                <Image src={p.img} alt="" fill sizes="160px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute inset-x-2 bottom-1.5 text-[10px] font-medium leading-tight" style={{ color: BM.paper }}>
                  {p.name}
                </p>
              </In>
            ))}
          </div>
        </div>
      </In>
      {/* the palette, pinned to the canvas edge */}
      <In d={1.1} className="absolute -right-2 top-[40%] flex -translate-y-1/2 flex-col gap-1.5 rounded-[12px] border border-line bg-card p-1.5 shadow-float">
        {swatch.map((c) => (
          <span key={c} className="block h-5 w-5 rounded-[6px] ring-1 ring-inset ring-white/10" style={{ background: c }} />
        ))}
      </In>
      {/* a design token, the way it's handed to the build */}
      <In d={1.4} className="absolute bottom-4 right-3">
        <div className="flex items-center gap-2.5 rounded-[12px] bg-night-2 px-3 py-2 text-[11.5px] text-ink shadow-float ring-1 ring-night-line">
          <span className="font-client text-[18px] font-medium leading-none">Aa</span>
          <span className="leading-tight">
            <span className="block text-ink/50">Type</span>
            Hanken Grotesk 500
          </span>
          <span className="ml-1 h-6 w-px bg-night-line" />
          <span className="h-4 w-4 rounded-[4px]" style={{ background: BM.copper }} />
          <span className="font-mono text-[10.5px] text-ink/70">#C27D3B</span>
        </div>
      </In>
    </div>
  );
}

/* 03 — Build */
function Build() {
  const log = ["Project pages built", "Project photos made light", "Search details added", "Checked on every phone"];
  const rings = [
    { k: "Speed", d: 1.5 },
    { k: "Search", d: 1.7 },
    { k: "Access", d: 1.9 },
  ];
  const reduced = useReducedMotion();
  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-3">
      <In>
        <Card className="h-full bg-paper font-mono text-[12px] text-ink/80">
          <p className="text-ink/40">$ build {BM.host}</p>
          <div className="mt-3 space-y-2">
            {log.map((l, i) => (
              <In key={l} d={0.3 + i * 0.25} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-lilac" strokeWidth={3} />
                {l}
              </In>
            ))}
            <In d={1.35} className="pt-1 text-lilac">
              ✓ Ready: loads in a blink
            </In>
          </div>
        </Card>
      </In>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {rings.map((r) => (
          <In key={r.k} d={r.d - 0.2}>
            {/* label under the ring on phones, beside it from sm up */}
            <Card className="flex flex-col items-center gap-1.5 p-2.5 sm:flex-row sm:gap-3 sm:p-3">
              <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0 -rotate-90 sm:h-10 sm:w-10" aria-hidden>
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-band)" strokeWidth="4" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="var(--color-lilac)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: r.d, ease: EASE }}
                />
              </svg>
              <span className="text-[12.5px] font-medium sm:text-[13px]">{r.k}</span>
            </Card>
          </In>
        ))}
      </div>
    </div>
  );
}

/* 04 · Automate: in rows, so it reads at any width. Three ways in converge
   on the agent; the agent fans out to three places the work lands. Chips sit
   on a fixed three-column grid so the arrows meet them at any width. */
const sources = [
  { label: "Website", Icon: Globe },
  { label: "WhatsApp", Icon: MessageCircle },
  { label: "Phone", Icon: Phone },
];
const outs = [
  { label: "Site visits", Icon: CalendarCheck },
  { label: "Job list", Icon: Database },
  { label: "Email", Icon: Mail },
];
const COLS = [16.67, 50, 83.33];

function Chip({ label, Icon, tone }: { label: string; Icon: typeof Globe; tone: "in" | "out" }) {
  return (
    <span className="flex h-10 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] border border-line bg-card px-2 text-[12px] shadow-card sm:gap-2 sm:text-[13px]">
      <Icon className={cn("h-3.5 w-3.5 shrink-0", tone === "in" ? "text-ink-muted" : "text-lilac")} /> {label}
    </span>
  );
}

/** Arrowhead pointing down, centred on x%. */
function Head({ x }: { x: number }) {
  return (
    <svg aria-hidden viewBox="0 0 10 7" className="absolute -bottom-px h-[7px] w-[10px] -translate-x-1/2 text-lilac" style={{ left: `${x}%` }}>
      <path d="M0 0 L10 0 L5 7 Z" fill="currentColor" />
    </svg>
  );
}

/** Three wires converging (in) or fanning out (out), each ending in an arrowhead. */
function Wiring({ dir }: { dir: "in" | "out" }) {
  const paths = COLS.map((x) =>
    dir === "in" ? `M ${x} 0 C ${x} 55, 50 45, 50 92` : `M 50 0 C 50 55, ${x} 45, ${x} 92`,
  );
  return (
    <div className="relative h-11">
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {paths.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
            <path d={d} fill="none" stroke="var(--color-lilac)" strokeWidth={1.25} vectorEffect="non-scaling-stroke" className="dash-flow" opacity={0.8} />
          </g>
        ))}
      </svg>
      {dir === "in" ? <Head x={50} /> : COLS.map((x) => <Head key={x} x={x} />)}
    </div>
  );
}

function Automate() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="label mb-2.5 text-center text-ink-muted">Comes in</p>
      <In className="grid grid-cols-3 gap-2">
        {sources.map((x) => (
          <Chip key={x.label} {...x} tone="in" />
        ))}
      </In>
      <In d={0.2}>
        <Wiring dir="in" />
      </In>
      <In d={0.35} className="mx-auto w-full max-w-[400px]">
        <div className="flex items-center gap-3 rounded-[16px] bg-plum p-3.5 text-ink shadow-float">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-ink text-plum">
            <Bot className="h-5 w-5" />
          </span>
          <span className="leading-snug">
            <span className="block text-[14.5px] font-semibold">Front-desk agent</span>
            <span className="block text-[12px] text-ink/65">Replies, books, and hands off to a human when it should.</span>
          </span>
        </div>
      </In>
      <In d={0.5}>
        <Wiring dir="out" />
      </In>
      <In d={0.65} className="grid grid-cols-3 gap-2">
        {outs.map((x) => (
          <Chip key={x.label} {...x} tone="out" />
        ))}
      </In>
      <p className="label mt-2.5 text-center text-ink-muted">Gets done</p>
    </div>
  );
}

/* 05 — Launch */
function Launch() {
  const reduced = useReducedMotion();
  const checks = ["Domain connected", "Old links redirected", "Analytics switched on", "Sitemap sent to Google"];
  return (
    <div className="flex h-full flex-col gap-3">
      <In>
        <Card className="flex items-center gap-3 py-3">
          <span className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-ink/[0.04] px-3 font-mono text-[12px] text-ink-soft sm:text-[12.5px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-live/60"
                animate={reduced ? undefined : { scale: [1, 2.2], opacity: [0.8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 1.8 }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
            </span>
            <span className="truncate">{BM.host}</span>
          </span>
          <motion.span
            className="shrink-0 rounded-full px-3 py-1 text-[12px] font-medium"
            initial={reduced ? false : { backgroundColor: "rgba(236,230,218,0.06)", color: "#8b8983" }}
            animate={{ backgroundColor: "#3fa66b", color: "#08090b" }}
            transition={{ duration: 0.3, delay: 1.7 }}
          >
            Live
          </motion.span>
        </Card>
      </In>
      <In d={0.2} className="flex-1">
        <Card className="h-full">
          <p className="text-[12px] text-ink-muted">Launch checklist</p>
          <div className="mt-2">
            {checks.map((c, i) => (
              <Tick key={c} d={0.4 + i * 0.28}>
                {c}
              </Tick>
            ))}
          </div>
          <In d={1.9} className="mt-3 rounded-[10px] bg-plum-soft px-3 py-2 text-[12.5px] text-lilac">
            Rankings you already had came with you.
          </In>
        </Card>
      </In>
    </div>
  );
}

/* 06 — Grow */
function Grow() {
  const reduced = useReducedMotion();
  const pts = [8, 12, 11, 18, 24, 31, 37, 48];
  const w = 300;
  const h = 110;
  const max = 52;
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * w} ${h - (v / max) * h}`)
    .join(" ");
  const ai = [
    { name: "ChatGPT", logo: "openai" },
    { name: "Gemini", logo: "googlegemini" },
    { name: "Perplexity", logo: "perplexity" },
  ];
  return (
    <div className="flex h-full flex-col gap-3">
      <In>
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-ink-muted">Visitors from search · 8 months</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-plum-soft px-2 py-0.5 text-[11px] font-medium text-lilac">
              <TrendingUp className="h-3 w-3" /> Climbing
            </span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-[110px] w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
            {[0.25, 0.5, 0.75].map((y) => (
              <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <motion.path
              d={`${d} L ${w} ${h} L 0 ${h} Z`}
              fill="var(--color-lilac)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <motion.path
              d={d}
              fill="none"
              stroke="var(--color-lilac)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            />
          </svg>
        </Card>
      </In>
      <In d={0.5} className="flex-1">
        <Card className="h-full">
          <p className="flex items-center gap-1.5 text-[12px] text-ink-muted">
            <Sparkles className="h-3.5 w-3.5" /> Named by AI assistants this month
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ai.map((a, i) => (
              <In key={a.name} d={1 + i * 0.18}>
                <span className="flex items-center gap-2 rounded-[10px] border border-line px-2.5 py-2 text-[12.5px]">
                  <LogoMark logo={a.logo} size={14} className="text-ink" />
                  {a.name}
                  <Check className="h-3.5 w-3.5 text-lilac" strokeWidth={3} />
                </span>
              </In>
            ))}
          </div>
          <In d={1.7} className="mt-3 flex items-center justify-between rounded-[10px] bg-ink/[0.04] px-3 py-2 text-[12.5px]">
            <span className="text-ink-soft">Monthly report</span>
            <span className="text-ink-muted">3 new pages · 1 new agent</span>
          </In>
        </Card>
      </In>
    </div>
  );
}

export const stepDiagrams: Record<StepId, ComponentType> = {
  listen: Listen,
  design: Design,
  build: Build,
  automate: Automate,
  launch: Launch,
  grow: Grow,
};
