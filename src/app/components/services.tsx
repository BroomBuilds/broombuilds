"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";

const SERVICES = [
  { n: "01", h: "Websites", d: "Your whole site — designed, written, built, and launched for you." },
  { n: "02", h: "Landing pages", d: "One page with one job: turn visitors into enquiries." },
  { n: "03", h: "Web apps", d: "Custom tools and dashboards that feel instant to use." },
  { n: "04", h: "Brand & identity", d: "Logo, colors, and a look that stays consistent everywhere." },
  { n: "05", h: "Get found on Google", d: "Search engine optimization — when your customers search, you show up." },
  { n: "06", h: "Get recommended by AI", d: "When people ask ChatGPT or Google's AI who to hire, your name comes up.", tag: "New" },
  { n: "07", h: "Speed & more sales", d: "Pages that load instantly and turn more visitors into customers." },
  { n: "08", h: "AI features", d: "Chat, search, and automation built into your site." },
];

/* Giant-type interactive rows, three signature moves:
   1. direction-aware ink fill — the seam-colored copy of the row name wipes
      in from whichever edge the cursor entered, and wipes out toward the
      edge it left (clip-path retargeting, fully interruptible)
   2. spring seam marker — the side marker chases the active row through a
      small physical spring, so it overshoots a hair and settles
   3. broom-pass streak — activating a row fires a one-shot light band that
      sweeps across it, "revealing" the description behind it.
   Touch / reduced motion: tap expands, everything else degrades to CSS. */
export default function Services() {
  const listRef = useRef<HTMLUListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  /* spring marker — position/height both animated by the same spring */
  useEffect(() => {
    const list = listRef.current!;
    const marker = markerRef.current!;
    const row = list.children[active] as HTMLElement | undefined;
    if (!row) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      marker.style.top = `${row.offsetTop}px`;
      marker.style.height = `${row.offsetHeight}px`;
      return;
    }

    let y = parseFloat(marker.style.top) || row.offsetTop;
    let h = parseFloat(marker.style.height) || 0;
    let vy = 0, vh = 0;
    let raf = 0;
    const K = 170, D = 24; // stiffness / damping — slight overshoot, quick settle

    const step = () => {
      // the row's height changes while its body expands — re-read every frame
      const ty = row.offsetTop;
      const th = row.offsetHeight;
      // semi-implicit Euler at a fixed 60fps step — stable and frame-simple
      const dt = 1 / 60;
      vy += (K * (ty - y) - D * vy) * dt;
      vh += (K * (th - h) - D * vh) * dt;
      y += vy * dt;
      h += vh * dt;
      marker.style.top = `${y}px`;
      marker.style.height = `${Math.max(0, h)}px`;
      if (Math.abs(ty - y) > 0.5 || Math.abs(th - h) > 0.5 || Math.abs(vy) > 0.5 || Math.abs(vh) > 0.5) {
        raf = requestAnimationFrame(step);
      } else {
        marker.style.top = `${ty}px`;
        marker.style.height = `${th}px`;
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  /* broom-pass streak — one shot per activation */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const row = listRef.current?.children[active] as HTMLElement | undefined;
    const streak = row?.querySelector<HTMLElement>(".svc-streak");
    streak?.animate(
      [
        { transform: "translateX(-101%)", opacity: 1 },
        { transform: "translateX(101%)", opacity: 1 },
      ],
      { duration: 450, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
  }, [active]);

  /* direction-aware wipe: record which half of the row the pointer crossed */
  const setWipeSide = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--wipe-hide",
      e.clientX - r.left < r.width / 2 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)"
    );
  };

  return (
    <section className="section wrap" id="services" aria-label="Services">
      <Reveal>
        <p className="label">Services</p>
        <h2>Everything a site needs to win.</h2>
        <p className="section-sub">
          Said plainly — whatever your business, you&apos;ll know exactly what
          you&apos;re getting.
        </p>
      </Reveal>
      <div className="svc-wrap">
        <span className="svc-marker" ref={markerRef} aria-hidden />
        <ul className="svc-list" ref={listRef}>
          {SERVICES.map((s, i) => (
            <li key={s.n} className="svc-row" data-on={active === i}>
              <span className="svc-streak" aria-hidden />
              <button
                type="button"
                className="svc-head"
                onPointerEnter={(e) => {
                  setWipeSide(e);
                  setActive(i);
                }}
                onPointerLeave={setWipeSide}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={active === i}
              >
                <span className="svc-num label">{s.n}</span>
                <span className="svc-name">
                  <span className="svc-word">
                    {s.h}
                    {/* seam-ink copy, revealed by the directional wipe */}
                    <span className="svc-word-fill" aria-hidden>{s.h}</span>
                  </span>
                  {s.tag && <span className="svc-tag label">{s.tag}</span>}
                </span>
              </button>
              <div className="svc-body">
                <div className="svc-body-inner">
                  <p className="svc-desc">{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
