import type { CSSProperties } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { stack, type Tool } from "@/content/home";
import { cn } from "@/lib/cn";
import { Reveal } from "./motion";
import { Panel, SectionHead } from "./ui";
import Wordmark, { BrandMark } from "./wordmark";

/* The tools, as layers: what we build with at the top, flowing into the
   studio, which wires it all into the business tools underneath. Each row
   drifts sideways on a -50% loop; hover pauses it. */

/* Brand colours, lifted where the real one would vanish on ink. */
const BRAND: Record<string, string> = {
  openai: "#ffffff",
  claude: "#D97757",
  googlegemini: "#8AB4F8",
  mistralai: "#FA520F",
  perplexity: "#20B8CD",
  meta: "#3B8BFF",
  n8n: "#EA4B71",
  make: "#B77CFF",
  zapier: "#FF4F00",
  twilio: "#F22F46",
  whatsapp: "#25D366",
  instagram: "#E4405F",
  nextdotjs: "#ffffff",
  react: "#61DAFB",
  tailwindcss: "#38BDF8",
  supabase: "#3FCF8E",
  vercel: "#ffffff",
  cloudflare: "#F38020",
  figma: "#F24E1E",
  hubspot: "#FF7A59",
  salesforce: "#00A1E0",
  googlecalendar: "#4285F4",
  calendly: "#4C8DFF",
  slack: "#E01E5A",
  notion: "#ffffff",
  stripe: "#8A84FF",
  razorpay: "#3395FF",
  shopify: "#95BF47",
  quickbooks: "#2CA01C",
  zendesk: "#ece6da",
  googleanalytics: "#F9AB00",
};

function Chip({ t, hidden }: { t: Tool; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden}
      className="inline-flex h-12 shrink-0 items-center gap-2.5 rounded-[12px] border border-line bg-card px-4 text-[14px] shadow-card"
    >
      <span
        aria-hidden
        className="logo-mask h-[18px] w-[18px]"
        style={{ backgroundColor: BRAND[t.logo] ?? "currentColor", "--logo": `url(/logos/${t.logo}.svg)` } as CSSProperties}
      />
      <span className="whitespace-nowrap">{t.name}</span>
    </li>
  );
}

function Row({ label, sub, items, reverse }: { label: string; sub: string; items: Tool[]; reverse?: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6">
      <div>
        <p className="font-display text-[17px] font-semibold tracking-[-0.01em]">{label}</p>
        <p className="text-[13px] text-ink-muted">{sub}</p>
      </div>
      <div className="marquee-mask overflow-hidden">
        <ul
          className={cn("marquee-track gap-2.5 pr-2.5", reverse && "marquee-reverse")}
          style={{ "--marquee-duration": `${items.length * 9}s` } as CSSProperties}
        >
          {/* Four copies: each half of the track is two sets wide, enough to
              fill the row, so the -50% loop never shows its seam. */}
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <Chip key={`${t.name}-${i}`} t={t} hidden={i >= items.length} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Arrows({ up }: { up?: boolean }) {
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <div aria-hidden className="flex justify-center gap-[18%] py-3 text-ink-muted md:pl-[200px]">
      {[0, 1, 2].map((i) => (
        <Icon key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section aria-labelledby="stack-title" className="py-20 md:py-24">
      <div className="container-page">
        <SectionHead eyebrow="Tools" title={<span id="stack-title">{stack.heading}</span>} lead={stack.lead} />
        <Reveal className="mt-10 md:mt-12">
          <Panel className="space-y-5 p-5 md:p-8">
            {stack.layers.map((l, i) => (
              <Row key={l.label} label={l.label} sub={l.sub} items={l.items} reverse={i % 2 === 1} />
            ))}

            <Arrows />

            {/* the studio in the middle */}
            <div className="relative overflow-hidden rounded-[18px] border border-lilac/40 bg-card p-5 shadow-[0_0_0_1px_rgba(181,139,211,0.08),0_24px_60px_-30px_rgba(86,24,110,0.6)] md:p-6">
              <span aria-hidden className="absolute -left-20 -top-24 h-56 w-72 rounded-full bg-plum/40 blur-3xl" />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                <span className="flex shrink-0 items-center gap-2.5">
                  <BrandMark size={40} />
                  <Wordmark className="text-[26px]" />
                </span>
                <p className="flex-1 text-[15.5px] leading-[1.55] text-ink-soft">
                  BroomBuilds {stack.hub.line}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {stack.hub.tags.map((t) => (
                    <li key={t} className="label rounded-[6px] bg-ink/[0.07] px-2 py-1 text-[10.5px] text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Arrows up />

            <Row label={stack.systems.label} sub={stack.systems.sub} items={stack.systems.items} />
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
