"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  Bot,
  Check,
  Database,
  Hourglass,
  Mic,
  Play,
  Search,
  Sparkles,
  Split,
  Webhook,
  Zap,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { LogoMark } from "./ui";
import Fit from "./fit";

/* The three plates of the hero stack: the live site, how it's found, and the
   workflow running underneath. Each is drawn once at a fixed design size and
   scaled to fit, so it stays exactly proportional inside a tilting 3D plate
   and in a phone-width card alike. */

export const SITE = {
  host: "bmcarpentryandlandscaping.com.au",
  name: "BM Carpentry & Landscaping",
  image: "/work/bm-carpentry.jpg",
  alt: "BM Carpentry & Landscaping website: a Sydney landscaping company, designed and built by BroomBuilds",
};

const DESIGN_W = 1060;
const DESIGN_H = 662;

function Illustrative() {
  return (
    <span className="absolute right-4 top-3 z-10 rounded-[6px] bg-black/50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70 backdrop-blur">
      Illustrative
    </span>
  );
}

/* ── 01 · The live site ─────────────────────────────────────────────────── */

export function SurfacePlate({ priority = false }: { priority?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] bg-card">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        <div className="flex h-6 max-w-[420px] flex-1 items-center gap-1.5 truncate rounded-md bg-ink/[0.05] px-2.5 text-[11px] text-ink-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
          {SITE.host}
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          src={SITE.image}
          alt={SITE.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 1060px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/* ── 02 · Found: Google, AI Overview and ChatGPT ────────────────────────── */

const G = { bg: "#202124", field: "#303134", text: "#bdc1c6", title: "#e8eaed", link: "#8ab4f8", faint: "#9aa0a6" };

export function GoogleWord({ size = 26 }: { size?: number }) {
  const letters: [string, string][] = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span className="font-sans font-medium tracking-[-0.02em]" style={{ fontSize: size }}>
      {letters.map(([l, c], i) => (
        <span key={i} style={{ color: c }}>
          {l}
        </span>
      ))}
    </span>
  );
}

function Gauge({ value, label }: { value: number; label: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-[58px] w-[58px]">
        <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="28" cy="28" r={r} fill="rgba(12,206,107,0.12)" stroke="rgba(12,206,107,0.2)" strokeWidth="5" />
          <circle cx="28" cy="28" r={r} fill="none" stroke="#0cce6b" strokeWidth="5" strokeDasharray={`${(c * value) / 100} ${c}`} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[17px] font-semibold text-[#0cce6b]">{value}</span>
      </div>
      <span className="text-center text-[11px] leading-tight" style={{ color: G.text }}>
        {label}
      </span>
    </div>
  );
}

function SearchCanvas() {
  return (
    <div className="relative h-full w-full" style={{ background: G.bg, color: G.text }}>
      <Illustrative />
      {/* header */}
      <div className="flex items-center gap-8 px-8 pt-6">
        <GoogleWord size={30} />
        <div className="flex h-11 w-[560px] items-center gap-3 rounded-full px-5" style={{ background: G.field, color: G.title }}>
          <span className="flex-1 text-[15px]">landscaping and decks sydney</span>
          <Mic className="h-4 w-4 text-[#8ab4f8]" />
          <Search className="h-4 w-4 text-[#8ab4f8]" />
        </div>
      </div>
      <div className="mt-3 flex gap-6 border-b border-white/10 pl-[150px] text-[13px]" style={{ color: G.faint }}>
        {["All", "Maps", "Images", "News", "Videos"].map((t, i) => (
          <span key={t} className={cn("pb-2.5", i === 0 && "border-b-[3px] border-[#8ab4f8] text-[#e8eaed]")}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-8 pl-[150px] pr-8 pt-5">
        <div className="w-[560px]">
          {/* AI Overview */}
          <div className="rounded-[16px] bg-[#28292c] p-4">
            <p className="flex items-center gap-2 text-[14px] font-medium" style={{ color: G.title }}>
              <Sparkles className="h-4 w-4 text-[#8ab4f8]" /> AI Overview
            </p>
            <div className="mt-2.5 flex gap-4">
              <p className="flex-1 text-[13.5px] leading-[1.6]">
                For decks, gardens and outdoor builds in Sydney, <b style={{ color: G.title }}>{SITE.name}</b> is a
                well-reviewed choice that handles projects from design to completion, with a portfolio of residential
                and commercial work.
              </p>
              <div className="w-[170px] shrink-0 rounded-[12px] border border-white/10 p-2.5">
                <div className="relative h-[64px] overflow-hidden rounded-[8px]">
                  <Image src={SITE.image} alt="" fill sizes="170px" className="object-cover object-top" />
                </div>
                <p className="mt-2 text-[11.5px] leading-snug" style={{ color: G.title }}>
                  Decks, gardens & outdoor spaces in Sydney
                </p>
                <p className="mt-1 truncate text-[10.5px]">{SITE.host}</p>
              </div>
            </div>
          </div>

          {/* #1 result */}
          <div className="mt-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[10px] font-bold text-[#1f3a2a]">BM</span>
              <span className="leading-tight">
                <span className="block text-[13px]" style={{ color: G.title }}>
                  {SITE.name}
                </span>
                <span className="block text-[11.5px]">https://{SITE.host}</span>
              </span>
            </div>
            <p className="mt-1.5 text-[19px]" style={{ color: G.link }}>
              {SITE.name} | Decks, Gardens & Outdoor Spaces
            </p>
            <p className="mt-1 text-[13px] leading-[1.55]">
              Sydney-based landscape company delivering high-quality carpentry and landscaping for residential and
              commercial projects. Get a free quote.
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[13.5px]" style={{ color: G.link }}>
              {["Our work", "Decks & pergolas", "Get a quote", "About us"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* right column: speed + ChatGPT */}
        <div className="flex w-[250px] flex-col gap-4">
          <div className="rounded-[14px] border border-white/10 p-4">
            <p className="text-[12px] font-medium" style={{ color: G.title }}>
              PageSpeed · Mobile
            </p>
            <div className="mt-3 grid grid-cols-2 gap-y-3">
              <Gauge value={99} label="Performance" />
              <Gauge value={100} label="SEO" />
              <Gauge value={98} label="Accessibility" />
              <Gauge value={100} label="Best practices" />
            </div>
          </div>
          <div className="rounded-[14px] border border-white/10 p-4">
            <p className="flex items-center gap-2 text-[12px] font-medium" style={{ color: G.title }}>
              <LogoMark logo="openai" size={14} className="text-white" /> ChatGPT
            </p>
            <p className="mt-2 text-[12px] leading-snug">“Who builds decks in Sydney?”</p>
            <p className="mt-1.5 text-[12px] leading-snug" style={{ color: G.title }}>
              Try <b>{SITE.name}</b>. They design and build decks, gardens and outdoor spaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchPlate() {
  return (
    <div className="h-full overflow-hidden rounded-[18px]">
      <Fit w={DESIGN_W} h={DESIGN_H} fill>
        <SearchCanvas />
      </Fit>
    </div>
  );
}

/** Phone width: the same story, stacked. */
export function SearchCompact() {
  return (
    <div className="space-y-3 rounded-[18px] p-4" style={{ background: G.bg, color: G.text }}>
      <div className="flex items-center gap-3">
        <GoogleWord size={20} />
        <div className="flex h-9 flex-1 items-center gap-2 rounded-full px-3.5 text-[13px]" style={{ background: G.field, color: G.title }}>
          <span className="flex-1 truncate">landscaping sydney</span>
          <Search className="h-3.5 w-3.5 text-[#8ab4f8]" />
        </div>
      </div>
      <div className="rounded-[12px] bg-[#28292c] p-3 text-[12.5px] leading-[1.55]">
        <p className="mb-1 flex items-center gap-1.5 font-medium" style={{ color: G.title }}>
          <Sparkles className="h-3.5 w-3.5 text-[#8ab4f8]" /> AI Overview
        </p>
        For outdoor builds in Sydney, <b style={{ color: G.title }}>{SITE.name}</b> is a well-reviewed choice.
      </div>
      <div>
        <p className="text-[11.5px]">https://{SITE.host}</p>
        <p className="text-[16px] leading-snug" style={{ color: G.link }}>
          {SITE.name} | Decks, Gardens & Outdoor Spaces
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1 border-t border-white/10 pt-3">
        <Gauge value={99} label="Speed" />
        <Gauge value={100} label="SEO" />
        <Gauge value={98} label="Access" />
        <Gauge value={100} label="Practices" />
      </div>
    </div>
  );
}

/* ── 03 · The workflow underneath (n8n) ─────────────────────────────────── */

const N = { bg: "#262627", node: "#2f2f31", border: "#58585c", ok: "#3cb179", line: "#7a7a80", text: "#f0f0f2", sub: "#9d9da3" };

type NodeSpec = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  icon: ReactNode;
  trigger?: boolean;
};

/** A brand logo in its own colour, from the one-colour SVG mask. */
const nodeIcon = (logo: string, color: string) => (
  <span className="logo-mask h-[34px] w-[34px]" style={{ backgroundColor: color, ["--logo" as string]: `url(/logos/${logo}.svg)` }} />
);

const NODES: NodeSpec[] = [
  { id: "form", x: 40, y: 96, label: "Website form", sub: "On new enquiry", icon: <Webhook className="h-8 w-8 text-[#ff6d5a]" />, trigger: true },
  { id: "wa-in", x: 40, y: 330, label: "WhatsApp Trigger", sub: "On message", icon: nodeIcon("whatsapp", "#25D366"), trigger: true },
  { id: "switch", x: 488, y: 196, label: "Route by intent", sub: "Switch · 3 rules", icon: <Split className="h-8 w-8 rotate-90 text-[#b7a4ff]" /> },
  { id: "hubspot", x: 648, y: 56, label: "HubSpot", sub: "Create deal", icon: nodeIcon("hubspot", "#FF7A59") },
  { id: "gmail", x: 808, y: 56, label: "Gmail", sub: "Send the quote", icon: nodeIcon("gmail", "#EA4335") },
  { id: "cal", x: 648, y: 206, label: "Google Calendar", sub: "Book site visit", icon: nodeIcon("googlecalendar", "#4285F4") },
  { id: "wa-out", x: 808, y: 206, label: "WhatsApp", sub: "Send confirmation", icon: nodeIcon("whatsapp", "#25D366") },
  { id: "wait", x: 958, y: 206, label: "Wait", sub: "1 day", icon: <Hourglass className="h-7 w-7 text-[#f5c451]" /> },
  { id: "slack", x: 648, y: 356, label: "Slack", sub: "Hand to a human", icon: nodeIcon("slack", "#E01E5A") },
  { id: "sheet", x: 808, y: 356, label: "Google Sheets", sub: "Log the lead", icon: nodeIcon("googlesheets", "#34A853") },
];

const AGENT = { x: 214, y: 188, w: 206, h: 92 };
const SIZE = 76;

/** Right handle of a node → left handle of another, as a smooth S-curve. */
function link(ax: number, ay: number, bx: number, by: number) {
  const mid = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mid} ${ay}, ${mid} ${by}, ${bx} ${by}`;
}
const at = (id: string) => NODES.find((n) => n.id === id)!;
const right = (id: string) => [at(id).x + SIZE, at(id).y + SIZE / 2] as const;
const left = (id: string) => [at(id).x, at(id).y + SIZE / 2] as const;

const EDGES: string[] = [
  link(...right("form"), AGENT.x, AGENT.y + AGENT.h / 2),
  link(...right("wa-in"), AGENT.x, AGENT.y + AGENT.h / 2),
  link(AGENT.x + AGENT.w, AGENT.y + AGENT.h / 2, ...left("switch")),
  link(...right("switch"), ...left("hubspot")),
  link(...right("switch"), ...left("cal")),
  link(...right("switch"), ...left("slack")),
  link(...right("hubspot"), ...left("gmail")),
  link(...right("cal"), ...left("wa-out")),
  link(...right("wa-out"), ...left("wait")),
  link(...right("slack"), ...left("sheet")),
];

const SUBS = [
  { x: 196, label: "Chat Model", name: "OpenAI", icon: nodeIcon("openai", "#ffffff") },
  { x: 290, label: "Memory", name: "Postgres", icon: nodeIcon("postgresql", "#6b9bff") },
  { x: 384, label: "Tool", name: "Calendar", icon: nodeIcon("googlecalendar", "#4285F4") },
];
const SUB_Y = 360;

function N8nNode({ n }: { n: NodeSpec }) {
  return (
    <div className="absolute" style={{ left: n.x, top: n.y, width: SIZE }}>
      {n.trigger && <Zap className="absolute -left-4 top-[30px] h-3.5 w-3.5 fill-[#ff6d5a] text-[#ff6d5a]" />}
      <div
        className="relative grid place-items-center"
        style={{
          width: SIZE,
          height: SIZE,
          background: N.node,
          border: `2px solid ${N.ok}`,
          borderRadius: n.trigger ? "38px 12px 12px 38px" : 12,
        }}
      >
        {n.icon}
        <span className="absolute -bottom-2 -right-2 grid h-[18px] w-[18px] place-items-center rounded-full" style={{ background: N.ok }}>
          <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
        </span>
        <span className="absolute -right-[5px] top-[33px] h-2.5 w-2.5 rounded-full" style={{ background: N.line }} />
        {!n.trigger && <span className="absolute -left-[5px] top-[33px] h-2.5 w-2.5 rounded-[2px]" style={{ background: N.line }} />}
      </div>
      <p className="mt-2.5 w-[120px] -translate-x-[22px] text-center text-[12.5px] font-semibold leading-tight" style={{ color: N.text }}>
        {n.label}
      </p>
      <p className="w-[120px] -translate-x-[22px] text-center text-[10.5px]" style={{ color: N.sub }}>
        {n.sub}
      </p>
    </div>
  );
}

function N8nCanvas() {
  return (
    <div className="relative h-full w-full" style={{ background: N.bg, color: N.text }}>
      {/* top bar */}
      <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#1f1f20] px-5">
        <div className="flex items-center gap-3">
          <span className="logo-mask h-6 w-6" style={{ backgroundColor: "#EA4B71", ["--logo" as string]: "url(/logos/n8n.svg)" }} />
          <span className="text-[13px]" style={{ color: N.sub }}>
            Personal /
          </span>
          <span className="text-[13.5px] font-semibold">Enquiry to booking agent</span>
          <span className="rounded-[5px] bg-white/10 px-1.5 py-0.5 text-[10.5px]" style={{ color: N.sub }}>
            leads
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-[8px] bg-white/5 p-1 text-[12px]">
          <span className="rounded-[6px] bg-white/10 px-3 py-1 font-medium">Editor</span>
          <span className="px-3 py-1" style={{ color: N.sub }}>
            Executions
          </span>
        </div>
        <div className="flex items-center gap-3 text-[12px]">
          <span style={{ color: N.sub }}>Active</span>
          <span className="relative h-5 w-9 rounded-full bg-[#3cb179]">
            <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
          </span>
          <span className="rounded-[6px] border border-white/15 px-2.5 py-1">Saved</span>
        </div>
      </div>

      {/* canvas */}
      <div
        className="absolute inset-x-0 bottom-0 top-12"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {EDGES.map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke={N.line} strokeWidth={2} />
              <path d={d} fill="none" stroke="#b58bd3" strokeWidth={2} className="dash-flow" opacity={0.75} />
            </g>
          ))}
          {SUBS.map((s) => (
            <path
              key={s.label}
              d={`M ${s.x + 22} ${AGENT.y + AGENT.h} L ${s.x + 22} ${SUB_Y}`}
              fill="none"
              stroke={N.line}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          ))}
        </svg>

        {/* AI Agent */}
        <div
          className="absolute flex items-center gap-3 px-4"
          style={{ left: AGENT.x, top: AGENT.y, width: AGENT.w, height: AGENT.h, background: N.node, border: `2px solid ${N.ok}`, borderRadius: 12 }}
        >
          <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/10">
            <Bot className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold">AI Agent</span>
            <span className="block text-[11px]" style={{ color: N.sub }}>
              Tools agent · replies in seconds
            </span>
          </span>
          <span className="absolute -bottom-2 -right-2 grid h-[18px] w-[18px] place-items-center rounded-full" style={{ background: N.ok }}>
            <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
          </span>
        </div>
        {SUBS.map((s) => (
          <div key={s.label} className="absolute w-[44px]" style={{ left: s.x, top: SUB_Y - 8 }}>
            <p className="-translate-x-[18px] -translate-y-[64px] w-[80px] text-center text-[10.5px]" style={{ color: N.sub }}>
              {s.label}
            </p>
            <div className="grid h-[44px] w-[44px] -translate-y-[16px] place-items-center rounded-full" style={{ background: N.node, border: `2px solid ${N.border}` }}>
              <span className="scale-[0.6]">{s.icon}</span>
            </div>
            <p className="w-[80px] -translate-x-[18px] -translate-y-[8px] text-center text-[11px] font-semibold">{s.name}</p>
          </div>
        ))}

        {NODES.map((n) => (
          <N8nNode key={n.id} n={n} />
        ))}

        {/* bottom controls */}
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          {[Maximize2, ZoomIn, ZoomOut].map((I, i) => (
            <span key={i} className="grid h-8 w-8 place-items-center rounded-[7px] border border-white/15 bg-[#2a2a2c]">
              <I className="h-3.5 w-3.5" style={{ color: N.sub }} />
            </span>
          ))}
        </div>
        <span className="absolute bottom-4 left-1/2 flex h-9 -translate-x-1/2 items-center gap-2 rounded-[8px] bg-[#ff6d5a] px-4 text-[13px] font-semibold text-white">
          <Play className="h-3.5 w-3.5 fill-white" /> Execute workflow
        </span>
        <span className="absolute bottom-5 right-4 flex items-center gap-2 text-[11.5px]" style={{ color: N.sub }}>
          <span className="h-2 w-2 rounded-full bg-[#3cb179]" /> Succeeded in 2.4s · 1,284 runs this month
        </span>
      </div>
    </div>
  );
}

export function N8nPlate() {
  return (
    <div className="h-full overflow-hidden rounded-[18px]">
      <Fit w={DESIGN_W} h={DESIGN_H} fill>
        <N8nCanvas />
      </Fit>
    </div>
  );
}

/** Phone width: the same workflow, in rows that wrap to fit. */
export function N8nCompact() {
  const m = (logo: string, color: string) => (
    <span className="logo-mask h-4 w-4" style={{ backgroundColor: color, ["--logo" as string]: `url(/logos/${logo}.svg)` }} />
  );
  const steps: { label: string; icon: ReactNode }[] = [
    { label: "Website form", icon: <Webhook className="h-4 w-4 text-[#ff6d5a]" /> },
    { label: "WhatsApp", icon: m("whatsapp", "#25D366") },
    { label: "AI Agent", icon: <Bot className="h-4 w-4" /> },
    { label: "Route by intent", icon: <Split className="h-4 w-4 rotate-90 text-[#b7a4ff]" /> },
    { label: "Calendar", icon: m("googlecalendar", "#4285F4") },
    { label: "Confirm", icon: m("whatsapp", "#25D366") },
    { label: "HubSpot", icon: m("hubspot", "#FF7A59") },
    { label: "Gmail", icon: m("gmail", "#EA4335") },
    { label: "Slack", icon: m("slack", "#E01E5A") },
  ];
  return (
    <div className="rounded-[18px] p-4" style={{ background: N.bg, color: N.text }}>
      <p className="mb-3 flex items-center gap-2 text-[12px]" style={{ color: N.sub }}>
        {m("n8n", "#EA4B71")}
        Enquiry to booking agent
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3cb179]" /> Active
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((n, i) => (
          <span key={n.label} className="flex items-center gap-1.5">
            <span
              className="flex items-center gap-2 whitespace-nowrap rounded-[10px] px-2.5 py-2 text-[12px] font-medium"
              style={{ background: N.node, border: `1.5px solid ${N.ok}` }}
            >
              {n.icon}
              {n.label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-[12px]" style={{ color: N.line }}>
                →
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px]" style={{ color: N.sub }}>
        <Database className="h-3 w-3" /> Remembers every customer · OpenAI + Postgres memory
      </p>
    </div>
  );
}
