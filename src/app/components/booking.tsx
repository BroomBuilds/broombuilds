"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_THEMED_URL, loadCalendly } from "@/lib/calendly";
import { site } from "@/lib/site";

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
        const boot = () =>
          loadCalendly()
            .then(() => {
              window.Calendly?.initInlineWidget({
                url: CALENDLY_THEMED_URL,
                parentElement: el,
              });
            })
            .catch(() => setFailed(true));
        /* Booting the widget is the one genuinely expensive thing left on the
           page — script eval plus a cross-origin iframe that loads its own
           app and fonts. At 600px it landed mid-scroll on the last screen
           before the footer, which is where the hitch was felt. Two screens
           of lead time plus an idle slot moves that work off the scrolled
           frames; the timeout keeps it honest if idle never comes. */
        if ("requestIdleCallback" in window)
          requestIdleCallback(boot, { timeout: 2000 });
        else setTimeout(boot, 0);
      },
      { rootMargin: "1600px" }
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
        <h2>Thirty minutes. We&apos;ll tell you exactly what we&apos;d build.</h2>
        <p className="section-sub">
          No pitch deck, no pressure. Bring the site you have — leave with a
          plan for the one you need. Prefer to skip the form?{" "}
          <a className="book-direct" href={`tel:${site.phoneHref}`}>
            Call {site.phone}
          </a>{" "}
          or email{" "}
          <a className="book-direct" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <div className="calendly-frame">
          <div className="calendly-frame-bar" aria-hidden>
            <span className="calendly-frame-dot" />
            <span className="calendly-frame-dot" />
            <span className="calendly-frame-dot" />
            <span className="calendly-frame-label">book-a-call.calendly</span>
          </div>
          {/* the widget mounts into .calendly-inner, taller than the shell —
              the shell scrolls, so the scrollbar is ours to style (the
              iframe's own cross-origin scrollbar can't be) */}
          <div className="calendly-shell" aria-label="Calendly scheduling widget">
            <div ref={shell} className="calendly-inner">
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
        </div>
      </div>
    </section>
  );
}
