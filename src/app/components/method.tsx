"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { method } from "@/content/home";
import { cn } from "@/lib/cn";
import { scrollState } from "@/lib/scroll";
import { stepDiagrams } from "./method-diagrams";
import { EASE, MountInView, useSeen } from "./motion";
import { Panel, SectionHead } from "./ui";

/** Phone-width box per diagram: tall enough for it, no taller. */
const mobileBox: Record<string, string> = {
  listen: "",
  design: "h-[400px] [&>*]:h-full",
  build: "h-[340px] [&>*]:h-full",
  automate: "h-[340px] [&>*]:h-full",
  launch: "h-[330px] [&>*]:h-full",
  grow: "h-[360px] [&>*]:h-full",
};

const steps = method.groups.flatMap((g) => g.steps.map((s) => ({ ...s, group: g.name })));
const num = (i: number) => String(i + 1).padStart(2, "0");

/* How a project runs. Desktop: the section is steps × 62vh tall and its
   frame pins under the nav; scroll position picks the step. Below lg it
   unpins into a plain list, one diagram per step, each mounting in view. */
export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Diagrams animate on mount — hold them until the section is reached.
  const seen = useSeen(ref, 0.05);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const y = top + (span * (i + 0.5)) / steps.length;
    if (scrollState.lenis) scrollState.lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };

  const step = steps[active];
  const Diagram = stepDiagrams[step.id];

  return (
    <section id="process" aria-labelledby="process-title" className="pt-20 md:pt-24">
      <div className="container-page">
        <SectionHead eyebrow="Process" title={<span id="process-title">{method.heading}</span>} lead={method.lead} />
      </div>

      {/* ── Desktop, pinned ─────────────────────────────────────────── */}
      <div ref={ref} className="relative mt-6 hidden lg:block" style={{ height: `${steps.length * 62}vh` }}>
        <div className="sticky top-(--nav-h) flex h-[calc(100vh-var(--nav-h))] items-start pt-8">
          <div className="container-page grid grid-cols-[210px_minmax(0,1fr)_minmax(0,1.3fr)] gap-5">
            <nav aria-label="Process steps" className="relative self-center border-l border-line pl-1">
              <motion.span
                aria-hidden
                className="absolute -left-px top-0 h-full w-px origin-top bg-plum"
                style={{ scaleY: scrollYProgress }}
              />
              {method.groups.map((g) => (
                <div key={g.name} className="mb-6 last:mb-0">
                  <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{g.name}</p>
                  <ul>
                    {g.steps.map((s) => {
                      const i = steps.findIndex((x) => x.id === s.id);
                      const on = i === active;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => jump(i)}
                            aria-current={on ? "step" : undefined}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[14.5px] transition-colors duration-200",
                              on ? "bg-card text-ink shadow-card" : "text-ink-muted hover:text-ink",
                            )}
                          >
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full transition-colors duration-200",
                                on ? "bg-plum" : i < active ? "bg-ink/60" : "bg-line-strong",
                              )}
                            />
                            <span className="font-mono text-[11px]">{num(i)}</span>
                            {s.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="flex h-[min(540px,calc(100vh-var(--nav-h)-80px))] flex-col justify-end rounded-[22px] border border-line bg-card p-9 shadow-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.16 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    <span className="text-lilac">{num(active)}</span>
                    <span className="h-px w-6 bg-line-strong" />
                    {step.group}
                  </p>
                  <h3 className="mt-5 max-w-[15ch] text-[34px] xl:text-[40px]">{step.title}</h3>
                  <p className="mt-4 max-w-[38ch] text-[16px] leading-[1.6] text-ink-muted">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex h-[min(540px,calc(100vh-var(--nav-h)-80px))] flex-col rounded-[22px] border border-line bg-card p-6 shadow-card">
              <p className="text-[20px] font-medium tracking-[-0.02em]">{step.label}</p>
              <Panel className="relative mt-4 flex-1 overflow-hidden p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.id}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2 }}
                  >
                    {seen && <Diagram />}
                  </motion.div>
                </AnimatePresence>
              </Panel>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet, stacked ─────────────────────────────────── */}
      <ol className="container-page mt-12 space-y-14 pb-8 lg:hidden">
        {steps.map((s, i) => {
          const D = stepDiagrams[s.id];
          return (
            <li key={s.id}>
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                <span className="text-lilac">{num(i)}</span>
                <span className="h-px w-6 bg-line-strong" />
                {s.group} · {s.label}
              </p>
              <h3 className="mt-3 text-[28px] leading-[1.08]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-muted">{s.body}</p>
              <Panel className="mt-6 p-3 sm:p-4">
                <MountInView className={mobileBox[s.id] || "min-h-[300px]"}>
                  <D />
                </MountInView>
              </Panel>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
