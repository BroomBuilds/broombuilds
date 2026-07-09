"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";

const SERVICES = [
  { n: "01", h: "Website design & build", d: "Your whole site — designed, written, built, shipped." },
  { n: "02", h: "Landing pages", d: "One page, one goal, engineered to convert." },
  { n: "03", h: "Web apps", d: "Product interfaces that feel as fast as they look." },
  { n: "04", h: "Brand & identity systems", d: "Wordmark to guidelines — an identity that scales." },
  { n: "05", h: "SEO", d: "Technical, on-page, and content. Built to rank, not retrofit." },
  { n: "06", h: "Performance & CRO", d: "Sub-second loads and pages that earn the click.", bar: true },
  { n: "07", h: "AI components", d: "Interfaces with intelligence built in.", tag: "New" },
];

/* Interactive list with a morphing accent: one seam marker glides between
   rows; the active row expands to reveal its line (and a live mini load-bar
   on the perf row). One continuous element, not per-row borders. */
export default function Services() {
  const listRef = useRef<HTMLUListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current!;
    const marker = markerRef.current!;
    const row = list.children[active] as HTMLElement | undefined;
    if (!row) return;
    marker.style.top = `${row.offsetTop}px`;
    marker.style.height = `${row.offsetHeight}px`;
  }, [active]);

  return (
    <section className="section wrap" id="services" aria-label="Services">
      <Reveal>
        <p className="label">Services</p>
        <h2>Everything a site needs to win.</h2>
      </Reveal>
      <div className="svc-wrap">
        <span className="svc-marker" ref={markerRef} aria-hidden />
        <ul className="svc-list" ref={listRef}>
          {SERVICES.map((s, i) => (
            <li key={s.n} className="svc-row" data-on={active === i}>
              <button
                type="button"
                className="svc-head"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={active === i}
              >
                <span className="svc-num label">{s.n}</span>
                <span className="svc-name">
                  {s.h}
                  {s.tag && <span className="svc-tag label">{s.tag}</span>}
                </span>
              </button>
              <div className="svc-body">
                <div className="svc-body-inner">
                  <p className="svc-desc">{s.d}</p>
                  {s.bar && (
                    <span className="svc-bar" aria-hidden>
                      <span className="svc-bar-fill" />
                      <span className="svc-bar-label label">LCP 0.6s</span>
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
