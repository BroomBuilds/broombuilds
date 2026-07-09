/// <reference types="react/canary" />
"use client";

import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { caseStudies } from "@/content/case-studies";
import { scrollState } from "@/lib/scroll";
import Reveal from "./reveal";

/* Selected work — an interactive index, not cards.
   - hovering a row focuses it (variable-weight jump) and dims the rest
   - a cursor-following preview tilts with pointer velocity
   - the whole list skews with scroll velocity
   - clicking morphs the preview into the case-study cover via the native
     View Transitions API (same `cover-<slug>` name on the detail page).
   Touch / reduced motion: plain focused rows, no preview, no skew. */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const section = root.current!;
      const list = listRef.current!;
      const preview = previewRef.current!;

      let px = 0, py = 0, tx = 0, ty = 0;
      let tilt = 0, skew = 0;

      const onMove = (e: PointerEvent) => {
        const r = section.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
      };
      section.addEventListener("pointermove", onMove, { passive: true });

      const tick = () => {
        // preview chases the cursor; its lag is what the tilt reads
        const dx = tx - px;
        px += dx * 0.14;
        py += (ty - py) * 0.14;
        tilt += (gsap.utils.clamp(-9, 9, dx * 0.06) - tilt) * 0.12;
        preview.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${tilt}deg)`;

        // scroll velocity leans the whole index
        const target = gsap.utils.clamp(-4, 4, scrollState.velocity * 0.12);
        skew += (target - skew) * 0.1;
        list.style.transform = `skewY(${skew.toFixed(3)}deg)`;
      };

      // only burn frames while the section is on screen
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      });
      io.observe(section);

      return () => {
        io.disconnect();
        gsap.ticker.remove(tick);
        section.removeEventListener("pointermove", onMove);
        list.style.transform = "";
      };
    });

    return () => mm.revert();
  }, []);

  const current = active >= 0 ? caseStudies[active] : null;

  return (
    <section
      className="section wrap work"
      id="work"
      ref={root}
      aria-label="Selected work"
    >
      <Reveal>
        <p className="label">Selected work</p>
        <h2>Proof, not promises.</h2>
        <p className="section-sub">
          Every project below shipped with one job: turn attention into
          outcomes. The numbers are the story.
        </p>
      </Reveal>

      <ul
        className="index"
        ref={listRef}
        data-focused={active >= 0}
        onPointerLeave={() => setActive(-1)}
      >
        {caseStudies.map((c, i) => (
          <li key={c.slug} data-on={active === i}>
            <Link
              href={`/work/${c.slug}`}
              className="index-row"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              /* unmount the preview before the case page mounts its
                 cover-<slug> ViewTransition — two mounted ViewTransitions
                 with the same name are not supported */
              onClick={() => setActive(-1)}
            >
              <span className="index-num label">{String(i + 1).padStart(2, "0")}</span>
              <span className="index-name">{c.client}</span>
              <span className="index-meta label">
                {c.sector} · {c.year}
              </span>
              <span className="index-result">
                <span className="index-value">{c.result}</span>
                <span className="index-detail">{c.resultDetail}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="index-preview" ref={previewRef} data-show={active >= 0} aria-hidden>
        {/* shared name only while home is the active route — Next keeps this
            page mounted in a hidden <Activity> on case pages, where a named
            ViewTransition would clash with the case cover */}
        {current && (
          <ViewTransition name={pathname === "/" ? `cover-${current.slug}` : undefined}>
            <div className="index-cover">
              <span className="work-mark">{current.mark}</span>
              <span className="index-cover-label label">{current.problem}</span>
            </div>
          </ViewTransition>
        )}
      </div>
    </section>
  );
}
