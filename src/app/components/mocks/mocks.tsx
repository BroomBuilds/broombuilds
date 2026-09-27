import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  BatteryFull,
  Bot,
  Camera,
  CheckCheck,
  MessageSquare,
  Mic,
  MonitorUp,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  ShieldCheck,
  Signal,
  Smile,
  TrendingUp,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Avatar, BM, BMMark, MockShell } from "./shell";

/* Illustrative product screens, all in the world of one real client: BM
   Carpentry & Landscaping, a Sydney crew building decks, gardens and outdoor
   spaces. Their brand is real; the conversations and numbers show the kind
   of work we'd automate, and are labelled as illustrative where they appear.
   Static on purpose: the sections that hold them do the moving. */

const logo = (name: string, color: string, size = 16): ReactNode => (
  <span
    aria-hidden
    className="logo-mask shrink-0"
    style={{ width: size, height: size, backgroundColor: color, "--logo": `url(/logos/${name}.svg)` } as CSSProperties}
  />
);

/* ── Who the screens belong to ───────────────────────────────────────────────
   "bm" is the real client, used where we showcase their world. "generic" is
   any business at all, used where the page talks to every visitor at once. */

export type Persona = "bm" | "generic";

/** WhatsApp's own "no profile photo" avatar: a white silhouette on grey. */
export function DefaultAvatar({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("block shrink-0 overflow-hidden rounded-full", className)} style={{ background: "#DFE5E7" }}>
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <circle cx="20" cy="15.5" r="7.2" fill="#fff" />
        <path d="M5.5 38.5c1.6-8.4 7.3-13 14.5-13s12.9 4.6 14.5 13Z" fill="#fff" />
      </svg>
    </span>
  );
}

/** An AI voice agent with no face of its own: a soft, glowing orb. */
export function VoiceOrb({ className, color = "#b58bd3" }: { className?: string; color?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block shrink-0 rounded-full", className)}
      style={{
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 38%, #3b1552 100%)`,
        boxShadow: `0 0 24px 2px ${color}66, inset 0 -4px 10px rgba(0,0,0,0.35)`,
      }}
    />
  );
}

const PERSONAS = {
  bm: {
    name: BM.short,
    accent: BM.copper,
    mark: (cls: string) => <BMMark round className={cls} />,
    agent: (cls: string) => <BMMark round className={cls} />,
    caller: { initials: "LP", label: "Lena (homeowner)" },
    caption: "I’ve booked your free measure-up for Friday at 2pm and texted you the details.",
    chat: [
      { out: true, t: "19:40", m: "Hi! Could I get a quote for a timber deck? About 20m², in Earlwood." },
      { out: false, t: "19:40", m: "Hi Sam! We’d love to. Free measure-up: Thursday 10am or Friday 2pm?" },
      { out: true, t: "19:41", m: "Friday 2pm works" },
      { out: false, t: "19:41", m: "Booked ✅ Friday 2pm in Earlwood. Confirmation’s on its way. Any photos of the space?" },
    ],
    extra: [
      { out: true, t: "19:42", m: "Sending a few now 📷" },
      { out: false, t: "19:42", m: "Perfect, we’ll bring timber samples. See you Friday!" },
    ],
  },
  generic: {
    name: "Your Business",
    accent: "#b58bd3",
    mark: (cls: string) => <DefaultAvatar className={cls} />,
    agent: (cls: string) => <VoiceOrb className={cls} />,
    caller: { initials: "JM", label: "Jordan (customer)" },
    caption: "You’re booked in for Thursday at 3pm. I’ve texted you the details.",
    chat: [
      { out: true, t: "19:40", m: "Hi! Do you have anything available this week?" },
      { out: false, t: "19:40", m: "Hi! Yes, we have Tuesday 10am or Thursday 3pm. Which suits you?" },
      { out: true, t: "19:41", m: "Thursday 3pm please" },
      { out: false, t: "19:41", m: "Booked ✅ Thursday 3pm. Confirmation’s on its way. Anything we should know beforehand?" },
    ],
    extra: [
      { out: true, t: "19:42", m: "Nope, that’s perfect" },
      { out: false, t: "19:42", m: "Great, see you Thursday! Reply here if anything changes." },
    ],
  },
} as const;

/* ── WhatsApp, the real look ────────────────────────────────────────────── */

const WA = {
  header: "#008069",
  wall: "#EFEAE2",
  out: "#D9FDD3",
  in: "#FFFFFF",
  text: "#111B21",
  meta: "#667781",
  tick: "#53BDEB",
  bar: "#F0F2F5",
  send: "#00A884",
};

/* WhatsApp's doodle wallpaper, approximated: faint line icons on warm grey. */
const WALLPAPER = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='none' stroke='%23000' stroke-opacity='.055' stroke-width='1.4'><circle cx='18' cy='20' r='7'/><path d='M60 12l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z'/><path d='M96 16c6 0 10 4 10 9s-4 9-10 9'/><rect x='12' y='62' width='18' height='13' rx='3'/><path d='M58 70c0-6 11-6 11 0s-11 10-11 10-11-4-11-10 11-6 11 0'/><path d='M92 64l14 14M106 64L92 78'/><circle cx='24' cy='104' r='3'/><path d='M52 100h22M63 92v16'/><path d='M94 98c4-6 12-6 16 0'/></svg>")`;

function Bubble({ out, time, children }: { out?: boolean; time: string; children: ReactNode }) {
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn("relative max-w-[82%] rounded-[8px] px-2 pb-1 pt-1.5 text-[12.5px] leading-[1.35] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]", out ? "rounded-tr-none" : "rounded-tl-none")}
        style={{ background: out ? WA.out : WA.in, color: WA.text }}
      >
        <span>{children}</span>
        <span className="ml-2 inline-flex translate-y-[3px] items-center gap-0.5 whitespace-nowrap align-bottom text-[9.5px]" style={{ color: WA.meta }}>
          {time}
          {out && <CheckCheck className="h-3 w-3" style={{ color: WA.tick }} />}
        </span>
      </div>
    </div>
  );
}

/** A phone's worth of WhatsApp: a customer booking in with the business's agent. */
export function WhatsAppChat({
  className,
  compact = false,
  persona = "bm",
}: {
  className?: string;
  compact?: boolean;
  persona?: Persona;
}) {
  const who = PERSONAS[persona];
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)} style={{ background: WA.wall }}>
      {/* status bar + header */}
      <div style={{ background: WA.header }} className="text-white">
        <div className="flex items-center justify-between px-4 pt-2 text-[10.5px] font-semibold">
          <span>19:42</span>
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 pb-2.5 pt-2">
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {who.mark("h-8 w-8")}
          <div className="ml-0.5 min-w-0 flex-1 leading-tight">
            <p className="flex items-center gap-1 text-[12.5px] font-semibold">
              <span className="truncate">{who.name}</span>
              <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-[#25D366]">
                <CheckCheck className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </span>
            </p>
            <p className="truncate text-[10px] text-white/80">Business account</p>
          </div>
          {!compact && <Phone className="h-3.5 w-3.5 shrink-0" />}
          <MoreVertical className="h-3.5 w-3.5 shrink-0" />
        </div>
      </div>

      {/* chat */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-2.5 py-3" style={{ backgroundImage: WALLPAPER }}>
        <span className="mx-auto mb-1 rounded-[6px] bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide shadow-sm" style={{ color: WA.meta }}>
          Today
        </span>
        {[...who.chat, ...(compact ? [] : who.extra)].map((b) => (
          <Bubble key={b.m} out={b.out} time={b.t}>
            {b.m}
          </Bubble>
        ))}
      </div>

      {/* composer */}
      <div className="flex items-center gap-1.5 px-2 py-2" style={{ background: WA.bar }}>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-white px-3" style={{ color: WA.meta }}>
          <Smile className="h-4 w-4" />
          <span className="flex-1 text-[12px]">Message</span>
          <Paperclip className="h-4 w-4 -rotate-45" />
          {!compact && <Camera className="h-4 w-4" />}
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: WA.send }}>
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

/* ── A Zoom-style call, answered by the AI receptionist ─────────────────── */

function Waveform({ bars = 22, color }: { bars?: number; color: string }) {
  return (
    <div className="flex h-10 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="voice-bar w-[3px] rounded-full"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.09}s`, background: color } as CSSProperties}
        />
      ))}
    </div>
  );
}

function CallControl({ icon, label, tone }: { icon: ReactNode; label: string; tone?: "green" }) {
  return (
    <span className="flex flex-col items-center gap-1 text-[9.5px] text-[#d2d2d2]">
      <span className={tone === "green" ? "text-[#23D959]" : ""}>{icon}</span>
      {label}
    </span>
  );
}

export function VideoCall({
  className,
  compact = false,
  persona = "bm",
}: {
  className?: string;
  compact?: boolean;
  persona?: Persona;
}) {
  const who = PERSONAS[persona];
  return (
    <div className={cn("flex h-full flex-col overflow-hidden bg-[#1c1c1c] text-white", className)}>
      {/* top bar */}
      <div className="flex items-center justify-between px-3 py-2 text-[11px]">
        <span className="flex items-center gap-2">
          {logo("zoom", "#0B5CFF", 16)}
          <span className="font-semibold">Enquiry line</span>
          <ShieldCheck className="h-3.5 w-3.5 text-[#23D959]" />
        </span>
        <span className="flex items-center gap-2 text-[#bdbdbd]">
          <span className="flex items-center gap-1 text-[#ff4d4f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d4f]" /> REC
          </span>
          02:14
        </span>
      </div>

      {/* tiles */}
      <div className="grid flex-1 grid-cols-2 gap-1.5 px-1.5">
        <div className="relative grid place-items-center rounded-[6px] bg-[#2a2a2a]">
          <Avatar initials={who.caller.initials} tone="#5b6b8a" className="h-14 w-14 text-[18px]" />
          <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-[4px] bg-black/60 px-1.5 py-0.5 text-[10px]">
            <Mic className="h-2.5 w-2.5" /> {who.caller.label}
          </span>
        </div>
        <div
          className="relative grid place-items-center rounded-[6px] ring-2 ring-[#23D959]"
          style={{ background: `radial-gradient(circle at 50% 40%, ${who.accent}40, #141416 70%)` }}
        >
          <div className="flex flex-col items-center gap-2">
            {who.agent("h-12 w-12 text-[15px]")}
            <Waveform bars={compact ? 14 : 22} color={who.accent} />
          </div>
          <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-[4px] bg-black/60 px-1.5 py-0.5 text-[10px]">
            <Bot className="h-2.5 w-2.5" style={{ color: who.accent }} /> Ava · AI receptionist
          </span>
        </div>
      </div>

      {/* live captions */}
      <div className="mx-auto my-2 max-w-[92%] rounded-[6px] bg-black/70 px-3 py-1.5 text-center text-[11.5px] leading-snug">
        <span style={{ color: who.accent }}>Ava:</span> {who.caption}
      </div>

      {/* controls */}
      <div className="flex items-center justify-between border-t border-white/5 bg-[#141414] px-3 py-2">
        <div className="flex items-center gap-3.5">
          <CallControl icon={<Mic className="h-4 w-4" />} label="Mute" />
          <CallControl icon={<Video className="h-4 w-4" />} label="Video" />
        </div>
        <div className="flex items-center gap-3.5">
          <CallControl icon={<Users className="h-4 w-4" />} label="2" />
          <CallControl icon={<MessageSquare className="h-4 w-4" />} label="Chat" />
          {!compact && <CallControl icon={<MonitorUp className="h-4 w-4" />} label="Share" tone="green" />}
        </div>
        <span className="rounded-[6px] bg-[#e02828] px-3 py-1.5 text-[11px] font-semibold">End</span>
      </div>
    </div>
  );
}

/* ── Build: the enquiries dashboard ─────────────────────────────────────── */

const days = [
  { d: "Mon", v: 42 },
  { d: "Tue", v: 55 },
  { d: "Wed", v: 48 },
  { d: "Thu", v: 70 },
  { d: "Fri", v: 86 },
  { d: "Sat", v: 100 },
];

/* Illustrative customers and jobs. */
export const jobs = [
  { i: "SC", name: "Sam Carter", what: "Timber deck · Earlwood", when: "Fri 2:00pm", via: "WhatsApp", color: "#25D366" },
  { i: "LP", name: "Lena Park", what: "Pergola · Campsie", when: "Sat 9:00am", via: "Phone agent", color: BM.copper },
  { i: "TR", name: "Tom Reid", what: "Garden & paving · Avalon", when: "Mon 11:00am", via: "Website", color: "#8b8983" },
];

export function AppDashboard({ className }: { className?: string }) {
  return (
    <MockShell
      kind="app"
      title="Enquiries"
      subtitle={`${BM.name} · this week`}
      trailing={
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${BM.copper}26`, color: BM.copper }}>
          <TrendingUp className="h-3 w-3" /> Busiest week yet
        </span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span>Live · updates as enquiries land</span>
          <span>Illustrative</span>
        </div>
      }
      className={className}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: "New enquiries", v: "38" },
            { k: "Answered by agents", v: "71%" },
            { k: "Site visits booked", v: "14" },
          ].map((s) => (
            <div key={s.k} className="rounded-[10px] bg-ink/[0.05] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">{s.k}</p>
              <p className="mt-0.5 font-display text-[22px] font-bold tabular leading-tight">{s.v}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-wider text-ink-muted">Enquiries by day</p>
          <div className="flex h-20 items-end gap-2">
            {days.map((b) => (
              <div key={b.d} className="flex flex-1 flex-col items-center justify-end gap-1">
                {/* px, not %: a percentage of an auto-height flex item is 0 */}
                <div
                  className="w-full rounded-t-[4px]"
                  style={{ height: Math.round(b.v * 0.6), background: b.v >= 86 ? BM.copper : "rgba(236,230,218,0.2)" }}
                />
                <span className="text-[9px] text-ink-muted">{b.d}</span>
              </div>
            ))}
          </div>
        </div>
        <ul className="divide-y divide-line">
          {jobs.map((v) => (
            <li key={v.name} className="flex items-center gap-3 py-2">
              <Avatar initials={v.i} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium">{v.name}</p>
                <p className="truncate text-[11px] text-ink-muted">
                  {v.what} · {v.when}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10px] text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.color }} />
                {v.via}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockShell>
  );
}

/* ── Grow: named by AI, first on Google ─────────────────────────────────── */

export function SearchAnswer({ className }: { className?: string }) {
  return (
    <MockShell kind="browser" title="chatgpt.com" className={className}>
      <div className="flex h-full flex-col gap-3 p-4 text-[12.5px]">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-ink/[0.07] px-3 py-2 text-ink-soft">
          Who can build a timber deck and redo my garden in Sydney?
        </div>
        <div className="flex gap-2.5">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-paper">{logo("openai", "#08090b", 13)}</span>
          <div className="space-y-2 leading-relaxed text-ink-soft">
            <p>
              A few good options. One that comes up often for decks and gardens is{" "}
              <mark className="rounded-[4px] px-1 font-semibold" style={{ background: `${BM.copper}2e`, color: "#e3a364" }}>
                {BM.name}
              </mark>
              : they design and build decks, gardens and outdoor spaces across Sydney, from design to done.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full border border-line px-2 py-0.5 text-[10.5px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BM.copper }} /> {BM.host}
              </span>
              <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-muted">Google Maps</span>
              <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-muted">Instagram</span>
            </div>
          </div>
        </div>
        <div className="mt-auto rounded-[12px] border border-line p-3">
          <p className="flex items-center gap-1.5 text-[10.5px] text-ink-muted">
            <Search className="h-3 w-3" /> Google · deck builders near me
          </p>
          <div className="mt-2 flex items-center gap-3">
            <BMMark className="h-9 w-9 text-[12px]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-[#8ab4f8]">{BM.name}</p>
              <p className="mt-0.5 truncate text-[11px] text-ink-muted">Carpenter & landscaper · Sydney NSW · Free quotes</p>
            </div>
            <span className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: BM.copper }}>
              Get a quote
            </span>
          </div>
        </div>
      </div>
    </MockShell>
  );
}
