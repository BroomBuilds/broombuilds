import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { BM, BMMark, MockShell } from "./shell";

export { BM, BMMark };

/* The Design showcase: BM Carpentry & Landscaping's brand and site as we
   built them. Palette, type, logo and photography are theirs, not invented. */

const swatches = [
  { hex: BM.espresso, name: "Ink" },
  { hex: BM.copper, name: "Copper" },
  { hex: BM.paper, name: "Paper" },
  { hex: BM.stone, name: "Stone" },
  { hex: BM.bark, name: "Bark" },
];

export const projects = [
  { name: "Earlwood Deck & Garden", img: "/work/bm/earlwood.jpg" },
  { name: "Campsie Deck & Garden", img: "/work/bm/campsie.jpg" },
  { name: "Avalon Beach Stairs", img: "/work/bm/avalon.jpg" },
];

/** Their wordmark. `tone` picks the version for the ground it sits on; size
    it with a width class (the height follows the file's 600×193 ratio). */
export function BMLogo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "light" ? "/work/bm/logo-light.png" : "/work/bm/logo-dark.png"}
      alt="BM Carpentry & Landscaping"
      width={600}
      height={193}
      className={cn("h-auto select-none", className)}
    />
  );
}

/* ── The brand board ────────────────────────────────────────────────────── */

export function BMBrandBoard({ className }: { className?: string }) {
  return (
    <MockShell kind="app" title={`${BM.name} · Brand`} subtitle="Real client · identity in use" icon={<BMMark className="h-7 w-7" />} className={className}>
      <div className="grid h-full grid-cols-[1.05fr_1fr] gap-3 p-3.5">
        {/* the brand on its home ground: their photography, their mark */}
        <div className="relative overflow-hidden rounded-[10px]" style={{ background: BM.espresso }}>
          <Image src="/work/bm/earlwood.jpg" alt="" fill sizes="260px" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201C1B] via-[#201C1B]/40 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-3.5">
            <BMLogo className="w-[62%] max-w-[150px]" />
            <div className="font-client" style={{ color: BM.paper }}>
              <p className="text-[22px] font-medium leading-[1.02] tracking-[-0.02em]">
                Dream. Design.
                <br />
                Deliver.
              </p>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.22em] opacity-70">Sydney · design to done</p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="grid grid-cols-5 gap-1.5">
            {swatches.map((s) => (
              <div key={s.name} className="min-w-0">
                <span className="block aspect-[3/4] rounded-[5px] ring-1 ring-inset ring-white/10" style={{ background: s.hex }} />
                <p className="mt-1 truncate text-[9px] text-ink-soft">{s.name}</p>
                <p className="truncate font-mono text-[8px] text-ink-muted">{s.hex}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end justify-between rounded-[8px] p-3 font-client" style={{ background: BM.paper, color: BM.espresso }}>
            <div>
              <p className="text-[34px] font-medium leading-none tracking-[-0.03em]">Aa</p>
              <p className="mt-1 text-[9.5px]" style={{ color: BM.bark }}>
                Hanken Grotesk · 500 / 400
              </p>
            </div>
            <p className="text-right text-[11px] font-medium leading-tight" style={{ color: BM.copper }}>
              Built to
              <br />
              last outdoors.
            </p>
          </div>
          <div className="flex gap-1.5 font-client">
            <span className="rounded-[4px] px-3 py-1.5 text-[10px] font-medium" style={{ background: BM.espresso, color: BM.paper }}>
              Get a free quote
            </span>
            <span className="rounded-[4px] px-3 py-1.5 text-[10px] font-medium" style={{ background: BM.copper, color: "#fff" }}>
              View projects
            </span>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/* ── The site: their "Featured projects" section ────────────────────────── */

export function BMSiteCanvas({ className }: { className?: string }) {
  return (
    <MockShell
      kind="browser"
      title={BM.host}
      footer={
        <div className="flex items-center justify-between">
          <span>Real client site · designed & built by BroomBuilds</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> Live
          </span>
        </div>
      }
      className={className}
    >
      <div className="flex h-full flex-col font-client" style={{ background: BM.paper, color: BM.espresso }}>
        <div className="flex items-center justify-between px-4 py-2.5">
          <BMLogo tone="dark" className="w-[92px]" />
          <span className="flex items-center gap-3 text-[9.5px]" style={{ color: BM.bark }}>
            <span>Projects</span>
            <span>About</span>
            <span className="rounded-[3px] px-2 py-1 font-medium text-white" style={{ background: BM.copper }}>
              Get a quote
            </span>
          </span>
        </div>
        <div className="flex items-end justify-between px-4 pb-2.5 pt-1">
          <p className="text-[22px] font-medium leading-none tracking-[-0.03em]">Featured projects.</p>
          <span className="flex items-center gap-0.5 text-[9.5px]" style={{ color: BM.bark }}>
            All work <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 px-4 pb-4">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={cn("relative overflow-hidden rounded-[4px]", i === 1 && "outline outline-2 outline-offset-2")}
              style={i === 1 ? { outlineColor: "#b58bd3" } : undefined}
            >
              <Image src={p.img} alt="" fill sizes="160px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute inset-x-2 bottom-2 text-[10.5px] font-medium leading-tight" style={{ color: BM.paper }}>
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}
