"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import { booking } from "@/content/home";
import { BOOKING_EVENT, openBooking } from "@/lib/booking";
import { CALENDLY_THEMED_URL, CALENDLY_URL, loadCalendly } from "@/lib/calendly";
import { scrollState } from "@/lib/scroll";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { EASE, usePrefersReducedMotion } from "./motion";

/* The booking modal and its always-on launcher.

   The modal stays mounted once opened, so Calendly loads a single time and
   every later open is instant. Closed, it's hidden with visibility + inert,
   so it's out of the tab order and the accessibility tree. A modal isn't
   anchored to a trigger, so it scales from the centre. */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  const [bubble, setBubble] = useState(true);
  // Hydration-safe: this branches the closed pose the server renders.
  const reduced = usePrefersReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const calendlyStarted = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Any trigger on the page opens it.
  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setEverOpened(true);
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_EVENT, onOpen);
  }, []);

  // Mount Calendly on the first open only.
  useEffect(() => {
    if (!everOpened || calendlyStarted.current || !shell.current) return;
    calendlyStarted.current = true;
    const el = shell.current;
    loadCalendly()
      .then(() => window.Calendly?.initInlineWidget({ url: CALENDLY_THEMED_URL, parentElement: el }))
      .catch(() => setFailed(true));
  }, [everOpened]);

  // Open: lock the page, focus the close button, keep Tab inside, Esc closes.
  useEffect(() => {
    if (!open) return;
    scrollState.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    // Next frame: the dialog is still visibility:hidden as the fade starts,
    // and a hidden element can't take focus.
    const raf = requestAnimationFrame(() => closeBtn.current?.focus({ preventScroll: true }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      scrollState.lenis?.start();
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <>
      {/* ── Launcher: always on screen ──────────────────────────────── */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-[80] flex items-end gap-3 transition-[opacity,transform] duration-200 ease-out md:bottom-6 md:right-6",
          open ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100",
        )}
      >
        {bubble && (
          <motion.div
            className="relative mb-2 hidden sm:block"
            // The message arrives ~1.8s after the page, once the hero has landed.
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 1.8, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
          >
            <button
              type="button"
              onClick={openBooking}
              className="rounded-[16px] rounded-br-[4px] border border-line bg-card py-3 pl-4 pr-9 text-left shadow-float transition-transform duration-150 ease-out active:scale-[0.98]"
            >
              <span className="block text-[14.5px] font-semibold text-ink">Book a call with us</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-live" /> 30 minutes, free, this week
              </span>
            </button>
            <button
              type="button"
              aria-label="Hide this message"
              onClick={() => setBubble(false)}
              className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
        <button
          type="button"
          onClick={openBooking}
          aria-haspopup="dialog"
          aria-label="Book a call with us"
          className="group relative flex h-14 items-center gap-2.5 rounded-full bg-ink pl-1.5 pr-5 text-paper shadow-float transition-[transform,background-color,color] duration-200 ease-out hover:bg-plum hover:text-white active:scale-[0.96] sm:w-14 sm:justify-center sm:p-0"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-paper">
            <Image src="/mascot.png" alt="" width={34} height={34} />
          </span>
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] sm:hidden">Book a call</span>
          <span aria-hidden className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-ink bg-live group-hover:border-plum" />
        </button>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────── */}
      <motion.div
        className="fixed inset-0 z-[90] grid place-items-center p-3 sm:p-6"
        initial={false}
        animate={open ? { opacity: 1, visibility: "visible" } : { opacity: 0, transitionEnd: { visibility: "hidden" } }}
        transition={{ duration: open ? 0.22 : 0.16, ease: "easeOut" }}
        style={{ visibility: "hidden" }}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close"
          onClick={close}
          className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          className="relative grid max-h-[calc(100dvh-24px)] w-full max-w-[1080px] grid-cols-1 overflow-y-auto overscroll-contain rounded-[24px] border border-line bg-card shadow-float sm:max-h-[calc(100dvh-48px)] lg:grid-cols-[0.78fr_1.22fr] lg:overflow-hidden"
          initial={false}
          animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: reduced ? 1 : 0.97, y: reduced ? 0 : 8 }}
          transition={{ duration: open ? 0.26 : 0.16, ease: EASE }}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close booking"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/80 text-ink ring-1 ring-line backdrop-blur transition-[transform,background-color] duration-150 ease-out hover:bg-paper active:scale-[0.94]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col border-b border-line p-6 pr-14 sm:p-8 sm:pr-14 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-paper ring-1 ring-line">
                <Image src="/mascot.png" alt="" width={36} height={36} />
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-live" /> Taking new projects
              </span>
            </div>
            <h2 id="booking-title" className="mt-6 text-[32px] md:text-[40px]">
              {booking.title}
            </h2>
            <p className="mt-2 text-[16px] text-ink-soft">{booking.lead}</p>
            <dl className="mt-7 hidden space-y-4 text-[14.5px] sm:block">
              {booking.points.map((p) => (
                <div key={p.k}>
                  <dt className="font-semibold text-ink">{p.k}</dt>
                  <dd className="mt-0.5 leading-[1.55] text-ink-muted">{p.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex flex-wrap gap-2 pt-7">
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink/[0.06] px-3.5 text-[13.5px] transition-colors hover:bg-ink/10"
              >
                <Phone className="h-3.5 w-3.5 text-lilac" /> {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink/[0.06] px-3.5 text-[13.5px] transition-colors hover:bg-ink/10"
              >
                <Mail className="h-3.5 w-3.5 text-lilac" /> Email us
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <div
              ref={shell}
              className="calendly-shell"
              style={{ height: "min(700px, calc(100dvh - 48px))" }}
              aria-label="Choose a time on Calendly"
            />
            {failed && (
              <div className="absolute inset-0 grid place-items-center bg-card p-10 text-center">
                <div>
                  <p className="text-[18px] font-semibold">The calendar didn’t load.</p>
                  <a
                    className="mt-3 inline-flex items-center gap-1.5 text-lilac underline underline-offset-4"
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open it in a new tab <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
