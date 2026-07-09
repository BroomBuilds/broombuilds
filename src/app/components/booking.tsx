"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_THEMED_URL, loadCalendly } from "@/lib/calendly";

/* The money section. Enters via a seam curtain sweep (the broom again) —
   an IO flips data-reveal and CSS runs the wipe. Inline Calendly is
   brand-themed and lazy-mounted only when the section approaches the
   viewport so it never taxes first paint. */
export default function Booking() {
  const root = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        root.current!.dataset.reveal = "true";
        reveal.disconnect();
      },
      { rootMargin: "-25% 0px" }
    );
    reveal.observe(root.current!);

    const el = shell.current!;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        loadCalendly()
          .then(() => {
            window.Calendly?.initInlineWidget({
              url: CALENDLY_THEMED_URL,
              parentElement: el,
            });
          })
          .catch(() => setFailed(true));
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      reveal.disconnect();
    };
  }, []);

  return (
    <section
      className="section book"
      id="book"
      ref={root}
      aria-label="Book an intro call"
    >
      <span className="book-backdrop" aria-hidden>
        B<span className="flip-b">B</span>
      </span>
      <span className="book-curtain" aria-hidden />
      <div className="wrap book-inner">
        <p className="label">Book a call</p>
        <h2>Twenty minutes. We&apos;ll tell you exactly what we&apos;d build.</h2>
        <p className="section-sub">
          No pitch deck, no pressure. Bring the site you have — leave with a
          plan for the one you need.
        </p>
        <div ref={shell} className="calendly-shell" aria-label="Calendly scheduling widget">
          {failed && (
            <p className="calendly-fallback">
              The scheduler didn&apos;t load —{" "}
              <a href={CALENDLY_THEMED_URL} target="_blank" rel="noopener noreferrer">
                book directly on Calendly
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
