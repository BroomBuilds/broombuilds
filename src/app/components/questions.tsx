"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Bot, Search, Sparkles } from "lucide-react";
import { questions } from "@/content/home";
import { cn } from "@/lib/cn";
import { BM } from "./mocks/shell";
import { Counter, EASE, Item, Stagger, useSeen } from "./motion";
import { Panel, Tag } from "./ui";

/* The frame: the two questions every client arrives with. Each card carries
   a small working diagram, one about being found, one about time, both in
   the world of a real client: BM Carpentry & Landscaping. */

/* The other results are left unnamed (masked hosts, generic titles) so the
   diagram never pits BM against a real business. */
const results = [
  { id: "a", host: "", title: "Deck builders in Sydney | Compare quotes" },
  { id: "b", host: "", title: "Landscaping Sydney | Local pros near you" },
  { id: "you", host: BM.host, title: `${BM.name} | Decks & gardens` },
];

/** Your site climbs the results, then an AI assistant names you. */
function FoundDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.5);
  const reduced = useReducedMotion();
  const query = "deck builders near me";
  const [typed, setTyped] = useState(0);
  const [order, setOrder] = useState(["a", "b", "you"]);
  const [named, setNamed] = useState(false);

  useEffect(() => {
    if (!seen || reduced) return;
    let i = 0;
    const type = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= query.length) clearInterval(type);
    }, 45);
    const t1 = setTimeout(() => setOrder(["you", "a", "b"]), 1500);
    const t2 = setTimeout(() => setNamed(true), 2300);
    return () => {
      clearInterval(type);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [seen, reduced]);

  // Reduced motion skips the performance and shows the ending.
  const instant = reduced && seen;
  const shownTyped = instant ? query.length : typed;
  const shownOrder = instant ? ["you", "a", "b"] : order;
  const shownNamed = instant || named;

  return (
    <div ref={ref} className="flex h-full flex-col gap-3">
      <div className="flex h-10 items-center gap-2 rounded-full border border-line bg-card px-3.5 text-[13px] shadow-card">
        <Search className="h-3.5 w-3.5 text-ink-muted" />
        <span className="text-ink-soft">{query.slice(0, shownTyped)}</span>
        <span className="-ml-1.5 h-4 w-px animate-pulse bg-ink/60" aria-hidden />
      </div>
      <ol className="space-y-1.5">
        {shownOrder.map((id, pos) => {
          const r = results.find((x) => x.id === id)!;
          const you = id === "you";
          return (
            <motion.li
              key={id}
              layout
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
              className={cn(
                "flex items-center gap-3 rounded-[12px] border px-3 py-2.5",
                you && pos === 0 ? "border-plum/30 bg-plum-soft" : "border-line bg-card",
              )}
            >
              <span className="w-4 font-mono text-[11px] text-ink-muted">{pos + 1}</span>
              <span className="min-w-0 flex-1">
                {r.host ? (
                  <span className="block truncate font-mono text-[10.5px] text-ink-muted">{r.host}</span>
                ) : (
                  <span aria-hidden className="my-[3px] block h-[7px] w-24 rounded-full bg-ink/10" />
                )}
                <span className={cn("block truncate text-[13px]", you ? "font-medium text-ink" : "text-ink-soft")}>
                  {r.title}
                </span>
              </span>
              {you && <Tag tone="plum">You</Tag>}
            </motion.li>
          );
        })}
      </ol>
      <motion.div
        className="mt-auto flex items-start gap-2.5 rounded-[12px] bg-night-2 p-3 text-[12.5px] leading-snug text-ink ring-1 ring-inset ring-night-line"
        initial={false}
        animate={shownNamed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 8, filter: "blur(4px)" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lilac text-paper">
          <Sparkles className="h-3 w-3" />
        </span>
        <span>
          <span className="text-ink/55">AI assistant · </span>
          For decks and gardens in Sydney, people often recommend <span className="font-semibold text-lilac">{BM.name}</span>.
        </span>
      </motion.div>
    </div>
  );
}

const chores = [
  { task: "Reply to quote requests", hours: 6 },
  { task: "Answer the phone on the job", hours: 5 },
  { task: "Book site measure-ups", hours: 4 },
  { task: "Chase quotes & follow-ups", hours: 3 },
];

/** The broom goes down the to-do list; each chore lands on an agent. */
function BusyworkDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.5);
  const reduced = useReducedMotion();
  const [swept, setSwept] = useState(0);

  useEffect(() => {
    if (!seen || reduced) return;
    const timers = chores.map((_, i) => setTimeout(() => setSwept(i + 1), 700 + i * 520));
    return () => timers.forEach(clearTimeout);
  }, [seen, reduced]);
  const shownSwept = reduced && seen ? chores.length : swept;

  return (
    <div ref={ref} className="flex h-full flex-col gap-1.5">
      {chores.map((c, i) => {
        const done = i < shownSwept;
        return (
          <div
            key={c.task}
            className="relative flex items-center gap-3 overflow-hidden rounded-[12px] border border-line bg-card px-3 py-2.5"
          >
            {/* the broom pass: a plum wash wipes left→right, then settles */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 origin-left bg-plum-soft transition-transform duration-700 ease-in-out",
                done ? "scale-x-100" : "scale-x-0",
              )}
            />
            <span
              className={cn(
                "relative flex-1 text-[13px] transition-colors duration-500",
                done ? "text-ink-muted line-through decoration-lilac/50" : "text-ink",
              )}
            >
              {c.task}
            </span>
            <span className="relative font-mono text-[11px] text-ink-muted tabular">{c.hours}h/wk</span>
            <span
              className={cn(
                "relative inline-flex items-center gap-1 rounded-full bg-plum px-2 py-0.5 text-[10.5px] font-medium text-ink transition-[opacity,transform] duration-300 ease-out",
                done ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
            >
              <Bot className="h-3 w-3" /> Agent
            </span>
          </div>
        );
      })}
      <div className="mt-auto flex items-end justify-between rounded-[12px] bg-plum px-4 py-3 text-ink">
        <span className="text-[12.5px] text-ink/60">Hours back, every week</span>
        <span className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-ink">
          {seen ? <Counter value={18} duration={2.6} /> : 0}
        </span>
      </div>
    </div>
  );
}

export default function Questions() {
  const diagrams = [<FoundDiagram key="f" />, <BusyworkDiagram key="b" />];
  return (
    <section aria-labelledby="questions-title" className="relative border-y border-line bg-band py-20 md:py-24">
      <div className="container-page">
        <h2 id="questions-title" className="text-[40px] sm:text-[48px] md:text-[58px] lg:text-[64px]">
          {questions.heading}
        </h2>
        <Stagger stagger={0.12} className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
          {questions.cards.map((c, i) => (
            <Item key={c.title} className="flex flex-col rounded-[22px] border border-line bg-card p-6 shadow-card md:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  Question {i + 1}
                </span>
                <Tag>Illustrative</Tag>
              </div>
              <h3 className="mt-5 max-w-[17ch] text-[28px] md:text-[34px]">{c.title}</h3>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-ink-muted">{c.body}</p>
              <Panel className="mt-8 min-h-[330px] flex-1 p-4 sm:p-5">{diagrams[i]}</Panel>
              <a
                href={c.link.href}
                className="group mt-8 flex items-center justify-between border-t border-line pt-5 text-[15px] font-medium"
              >
                {c.link.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1" />
              </a>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
