"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { services, type ServiceTab } from "@/content/home";
import { cn } from "@/lib/cn";
import { AppDashboard, SearchAnswer, VideoCall, WhatsAppChat } from "./mocks/mocks";
import { BMBrandBoard, BMSiteCanvas } from "./mocks/bm";
import { EASE, Reveal } from "./motion";
import Fit from "./fit";
import { Button, Panel, SectionHead, Tag } from "./ui";

/* What we build, in four tabs. The active tab is marked by a second copy of
   the tab row, painted plum and clipped down to the active tab, so fill and
   text colour change as one piece instead of two transitions racing. */

type TabId = ServiceTab["id"];
const tabs: ServiceTab[] = services.tabs;

/** Auto-advance: how long each tab holds before the next one. */
const AUTOPLAY_MS = 2000;
/** After a visitor picks a tab, how long it holds before auto-advance resumes. */
const HOLD_MS = 6000;

/** Every tab is set in one real client's world. Design shows what we built
    for them; the other tabs illustrate what we'd automate and grow. */
const credit: Record<TabId, string> = {
  design: "Real client · BM Carpentry & Landscaping",
  build: "Illustrative · BM Carpentry & Landscaping",
  automate: "Illustrative · BM Carpentry & Landscaping",
  grow: "Illustrative · BM Carpentry & Landscaping",
};

function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("absolute overflow-hidden rounded-[16px] bg-card shadow-float ring-1 ring-ink/[0.06]", className)}>
      {children}
    </div>
  );
}

/** A phone: black bezel, rounded screen, a hint of the island. */
function Phone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("absolute rounded-[38px] bg-[#0b0b0c] p-[7px] shadow-float ring-1 ring-white/10", className)}>
      <div className="relative h-full overflow-hidden rounded-[31px]">
        {children}
        <span aria-hidden className="absolute left-1/2 top-1.5 h-[14px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/* sm and up: the mocks composed on a fixed-height stage. */
const stages: Record<TabId, ReactNode> = {
  design: (
    <>
      <Frame className="left-[4%] top-[5%] h-[50%] w-[64%]">
        <BMBrandBoard />
      </Frame>
      <Frame className="bottom-[5%] right-[4%] h-[50%] w-[62%]">
        <BMSiteCanvas />
      </Frame>
    </>
  ),
  build: (
    <Frame className="inset-x-[7%] inset-y-[7%]">
      <AppDashboard />
    </Frame>
  ),
  automate: (
    <>
      <Frame className="right-[3%] top-[54%] aspect-[16/11] w-[54%] -translate-y-1/2 !bg-[#1c1c1c]">
        <VideoCall />
      </Frame>
      <Phone className="left-[5%] top-[4%] h-[92%] w-[39%]">
        <WhatsAppChat />
      </Phone>
    </>
  ),
  grow: (
    <Frame className="inset-x-[9%] inset-y-[6%]">
      <SearchAnswer />
    </Frame>
  ),
};

/** A mock in the page flow, drawn at its design size and scaled to fit. */
function Shot({ w, h, dark, children }: { w: number; h: number; dark?: boolean; children: ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] shadow-float ring-1 ring-ink/[0.08]", dark ? "bg-[#1c1c1c]" : "bg-card")}>
      <Fit w={w} h={h}>{children}</Fit>
    </div>
  );
}

/* Phones: the same mocks stacked in the flow, each at a readable scale,
   instead of squeezed onto a stage built for a wider screen. */
const phoneStages: Record<TabId, ReactNode> = {
  design: (
    <div className="space-y-3">
      <Shot w={460} h={290}>
        <BMBrandBoard />
      </Shot>
      <Shot w={460} h={300}>
        <BMSiteCanvas />
      </Shot>
    </div>
  ),
  build: (
    <Shot w={460} h={470}>
      <AppDashboard />
    </Shot>
  ),
  automate: (
    <div className="mx-auto h-[460px] w-[236px] rounded-[38px] bg-[#0b0b0c] p-[7px] shadow-float ring-1 ring-white/10">
      <div className="relative h-full overflow-hidden rounded-[31px]">
        <WhatsAppChat />
        <span aria-hidden className="absolute left-1/2 top-1.5 h-[14px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  ),
  grow: (
    <Shot w={460} h={470}>
      <SearchAnswer />
    </Shot>
  ),
};

export default function Services() {
  const [active, setActive] = useState<TabId>("design");
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState("inset(0 100% 100% 0 round 999px)");
  const [keyboard, setKeyboard] = useState(false);
  const [held, setHeld] = useState(0);
  const inView = useInView(areaRef, { amount: 0.2 });

  // Clip the plum copy of the tab row down to the active tab. Top and bottom
  // too: on phones the tabs sit in a 2×2 grid.
  useLayoutEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!list || !el) return;
    const update = () => {
      const t = el.offsetTop;
      const l = el.offsetLeft;
      const r = list.offsetWidth - (l + el.offsetWidth);
      const b = list.offsetHeight - (t + el.offsetHeight);
      setClip(`inset(${t}px ${r}px ${b}px ${l}px round 999px)`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  // Auto-advance whenever the section is on screen, hovered or not. Picking
  // a tab holds it for a few seconds, then the tour carries on; keyboard
  // focus in the tabs pauses it outright. Never under reduced motion.
  useEffect(() => {
    if (!held) return;
    const t = setTimeout(() => setHeld(0), HOLD_MS);
    return () => clearTimeout(t);
  }, [held]);

  const playing = inView && !keyboard && !held && !reduced;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      const i = tabs.findIndex((x) => x.id === active);
      setActive(tabs[(i + 1) % tabs.length].id);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active]);

  const choose = (id: TabId) => {
    setHeld((h) => h + 1); // a fresh value restarts the hold on every pick
    setActive(id);
  };

  const onKey = (e: KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") choose(tabs[(i + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") choose(tabs[(i - 1 + tabs.length) % tabs.length].id);
  };

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 md:py-24">
      <div className="container-page">
        <SectionHead eyebrow={services.eyebrow} title={<span id="services-title">{services.heading}</span>} lead={services.lead} />

        <Reveal className="mt-10 md:mt-12">
          <div
            ref={areaRef}
            onFocusCapture={(e) => setKeyboard((e.target as HTMLElement).matches(":focus-visible"))}
            onBlurCapture={() => setKeyboard(false)}
          >
            {/* Tabs: a 2×2 grid on phones, one row from sm up. */}
            <div className="relative w-full rounded-[26px] bg-ink/[0.05] p-1.5 sm:w-fit sm:rounded-full">
              <div ref={listRef} role="tablist" aria-label="Services" className="relative grid grid-cols-2 gap-1 sm:flex sm:gap-0" onKeyDown={onKey}>
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    data-tab={t.id}
                    aria-selected={active === t.id}
                    aria-controls="services-panel"
                    tabIndex={active === t.id ? 0 : -1}
                    onClick={() => choose(t.id)}
                    className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium text-ink-muted transition-colors duration-200 hover:text-ink sm:justify-start md:h-12 md:px-7 md:text-[16px]"
                  >
                    <span className="font-mono text-[11px] opacity-60">0{i + 1}</span>
                    {t.label}
                  </button>
                ))}
                {/* The plum copy, clipped to the active tab. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-1 rounded-[22px] bg-plum transition-[clip-path] duration-300 ease-out sm:flex sm:gap-0 sm:rounded-full"
                  style={{ clipPath: clip }}
                >
                  {tabs.map((t, i) => (
                    <span
                      key={t.id}
                      className="relative flex h-11 shrink-0 items-center justify-center gap-2 px-5 text-[15px] font-medium text-ink sm:justify-start md:h-12 md:px-7 md:text-[16px]"
                    >
                      <span className="font-mono text-[11px] opacity-70">0{i + 1}</span>
                      {t.label}
                      {/* countdown to the next tab while auto-advancing */}
                      {playing && t.id === active && (
                        <span key={active} className="absolute inset-x-5 bottom-[7px] h-[2px] overflow-hidden rounded-full bg-white/20 md:inset-x-7">
                          <span className="tab-progress block h-full origin-left rounded-full bg-white/80" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel */}
            <div
              id="services-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-12"
            >
              <div className="flex flex-col">
                {/* Every tab's copy shares one grid cell, so the column is as
                    tall as the longest and nothing below it moves while the
                    tabs auto-advance. */}
                <div className="grid">
                  {tabs.map((t) => {
                    const on = t.id === active;
                    return (
                      <div
                        key={t.id}
                        aria-hidden={!on}
                        inert={!on}
                        style={{ gridArea: "1 / 1" }}
                        className={cn(
                          "flex flex-col transition-[opacity,transform,filter] ease-out",
                          on
                            ? "translate-y-0 opacity-100 blur-0 delay-100 duration-300"
                            : "pointer-events-none translate-y-2 opacity-0 blur-[3px] duration-150",
                        )}
                      >
                        <h3 className="max-w-[16ch] text-[34px] md:text-[44px]">{t.title}</h3>
                        <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.6] text-ink-muted">{t.lead}</p>
                        <ul className="mt-8 divide-y divide-line border-y border-line">
                          {t.items.map((it) => (
                            <li key={it.name} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                              <p className="flex items-center gap-2 text-[16px] font-medium">
                                {it.name}
                                {it.tag && <Tag tone="plum">{it.tag}</Tag>}
                              </p>
                              <p className="text-[15px] leading-[1.55] text-ink-muted">{it.line}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <Button book arrow>
                    Talk about your project
                  </Button>
                </div>
              </div>

              <Panel className="relative overflow-hidden p-3 pb-9 sm:h-[520px] sm:p-0 lg:h-[600px]">
                {/* sm and up: the composed stage */}
                <div className="hidden sm:block">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02, filter: "blur(6px)", transition: { duration: 0.2 } }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {stages[active]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* phones: the mocks stacked in the flow, all four sharing one
                    grid cell so the panel keeps one height as tabs advance */}
                <div className="grid sm:hidden">
                  {tabs.map((t) => {
                    const on = t.id === active;
                    return (
                      <div
                        key={t.id}
                        aria-hidden={!on}
                        inert={!on}
                        style={{ gridArea: "1 / 1" }}
                        className={cn(
                          "self-center transition-opacity ease-out",
                          on ? "opacity-100 delay-100 duration-300" : "pointer-events-none opacity-0 duration-150",
                        )}
                      >
                        {phoneStages[t.id]}
                      </div>
                    );
                  })}
                </div>
                <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted/80">
                  {credit[active]}
                </span>
              </Panel>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
