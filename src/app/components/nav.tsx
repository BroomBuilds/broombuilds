"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { sections, site } from "@/lib/site";
import { scrollState } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Wordmark, { BrandMark } from "./wordmark";
import BookTrigger from "./book-trigger";
import { EASE } from "./motion";

/* Floating nav. Transparent over the hero, ink-and-blur once the page
   moves. Three columns with equal outer tracks, so the links sit on the true
   centre of the page whatever the sides hold. The active section gets a pill
   that glides between links, and a hairline tracks reading progress. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Whichever section owns the middle band of the viewport is "active".
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menu open: freeze the page underneath, close on Escape.
  useEffect(() => {
    if (!open) return;
    scrollState.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      scrollState.lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
            scrolled || open
              ? "border-line/80 bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />
        <motion.span
          aria-hidden
          className="absolute -bottom-px left-0 h-px w-full origin-left bg-plum"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
        <div className="container-page relative grid h-(--nav-h) grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="flex items-center gap-2.5 justify-self-start" aria-label="BroomBuilds, back to top">
            <BrandMark size={32} />
            <Wordmark className="text-[21px]" />
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14.5px] transition-colors duration-200",
                  active === s.id ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/6"
                    transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.15 }}
                  />
                )}
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            {/* The number, as a call button that shows it on hover. */}
            <a
              href={`tel:${site.phoneHref}`}
              aria-label={`Call us on ${site.phone}`}
              className="group relative hidden h-11 w-11 place-items-center rounded-full text-ink-soft ring-1 ring-inset ring-ink/20 transition-[color,box-shadow,transform] duration-200 ease-out hover:text-ink hover:ring-ink/40 active:scale-[0.95] lg:grid"
            >
              <Phone className="h-4 w-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-full mt-2 -translate-y-1 whitespace-nowrap rounded-[8px] bg-card px-2.5 py-1.5 font-mono text-[11.5px] text-ink-soft opacity-0 shadow-card ring-1 ring-line transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {site.phone}
              </span>
            </a>
            <BookTrigger className="group hidden h-11 items-center gap-2 rounded-full bg-ink px-5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-paper transition-[transform,background-color,color] duration-200 ease-out hover:bg-plum hover:text-white active:scale-[0.97] sm:inline-flex">
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5" />
            </BookTrigger>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-150 active:scale-[0.95] md:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-out",
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-out",
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper pt-(--nav-h) md:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.3, ease: EASE } }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav aria-label="Menu" className="container-page flex flex-1 flex-col justify-center gap-1">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-[40px] font-bold tracking-[-0.04em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.05, ease: EASE }}
                >
                  {s.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 + sections.length * 0.05, ease: EASE }}
              >
                <BookTrigger
                  onOpen={() => setOpen(false)}
                  className="block border-b border-line py-4 font-display text-[40px] font-bold tracking-[-0.04em] text-lilac"
                >
                  Book a call
                </BookTrigger>
              </motion.div>
            </nav>
            <div className="container-page flex items-center justify-between py-8 font-mono text-[12.5px] text-ink-muted">
              <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>Email us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
