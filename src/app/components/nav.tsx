"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Wordmark from "./wordmark";
import Magnetic from "./magnetic";
import LocalClock from "./local-clock";
import { scrollState } from "@/lib/scroll";
import { site } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

/* `hash` present → same-page glide when we're on "/". Absent (Careers) → a
   real route change, every time. */
const LINKS: { href: string; hash?: string; label: string }[] = [
  { href: "/#work", hash: "#work", label: "Work" },
  { href: "/#services", hash: "#services", label: "Services" },
  { href: "/#process", hash: "#process", label: "Process" },
  { href: "/#team", hash: "#team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/#book", hash: "#book", label: "Book a call" },
];

const SWEEP: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* The nav mechanic is the brand mechanic. Closed: a fixed bar that compacts
   past 60px, hides on scroll-down / reveals on scroll-up, and carries a
   scroll-progress seam along its top edge. Open: the wordmark's halves split
   apart and a full-screen overlay sweeps down via clip-path — the broom
   stroke — with masked, staggered menu items, focus-one/dim-the-rest hover,
   a cursor-trailing preview, and a live-clock contact footer. Esc closes,
   focus is trapped, scroll is locked through Lenis. */
export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const reduced = useReducedMotion();
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* --- bar behavior: compact / hide-reveal / progress seam ------------- */
  useEffect(() => {
    const el = ref.current!;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      el.dataset.compact = String(y > 60);
      // 6px hysteresis so tiny reversals never jitter the bar
      if (!openRef.current) {
        if (y > lastY + 6 && y > 140) el.dataset.hidden = "true";
        else if (y < lastY - 6 || y <= 8) el.dataset.hidden = "false";
      }
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- open state: scroll lock, Esc, focus trap ------------------------ */
  useEffect(() => {
    if (!open) return;
    const el = ref.current!;
    const toggle = toggleRef.current;
    el.dataset.hidden = "false";
    scrollState.lenis?.stop();
    document.body.style.overflow = "hidden";
    overlayRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = el.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      scrollState.lenis?.start();
      document.body.style.overflow = "";
      toggle?.focus();
    };
  }, [open]);

  /* item click → close, then glide (Lenis must be running again first) */
  const go = useCallback((e: React.MouseEvent, hash?: string) => {
    setOpen(false);
    if (!hash) return; // real route (Careers) — let Link navigate
    if (location.pathname !== "/") return; // case pages: normal navigation
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    scrollState.lenis?.start();
    if (scrollState.lenis)
      scrollState.lenis.scrollTo(target as HTMLElement, { offset: -72 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header ref={ref} className="nav" data-open={open}>
      <span className="nav-progress" ref={progressRef} aria-hidden />

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            id="nav-overlay"
            ref={overlayRef}
            className="ov"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={reduced ? { duration: 0.2 } : { duration: 0.8, ease: SWEEP }}
          >
            <nav
              className="ov-list"
              aria-label="Sections"
              data-hovered={hovered >= 0}
              onPointerLeave={() => setHovered(-1)}
            >
              {LINKS.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="ov-link"
                  data-on={hovered === i}
                  onClick={(e) => go(e, l.hash)}
                  onPointerEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                >
                  <span className="ov-mask">
                    <motion.span
                      className="ov-line"
                      initial={reduced ? { y: 0 } : { y: "115%" }}
                      animate={{ y: 0 }}
                      exit={reduced ? {} : { y: "115%" }}
                      transition={{
                        duration: 0.7,
                        ease: EASE_OUT,
                        delay: reduced ? 0 : 0.2 + i * 0.07,
                      }}
                    >
                      <span className="ov-num label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </motion.span>
                  </span>
                </Link>
              ))}
            </nav>

            <motion.div
              className="ov-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.65 }}
            >
              <LocalClock />
              <a className="ov-mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <nav className="ov-socials" aria-label="Social links">
                {Object.entries(site.socials).map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noopener noreferrer">
                    {k === "x" ? "X" : k[0].toUpperCase() + k.slice(1)}
                  </a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="nav-inner wrap">
        <Link href="/" className="nav-logo" aria-label="BroomBuilds — home">
          <Image
            src="/mascot.png"
            alt=""
            width={30}
            height={30}
            className="nav-mascot"
            priority
          />
          <Wordmark />
        </Link>
        {/* logo stays out of the rise — the intro's FLIP delivers it */}
        <div
          className="nav-right intro-rise"
          style={{ "--rise-delay": "0.45s" } as React.CSSProperties}
        >
          <Magnetic>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="nav-overlay"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="nav-toggle-mask">
                <span className="nav-toggle-line label">Menu</span>
                <span className="nav-toggle-line label" aria-hidden>
                  Close
                </span>
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
