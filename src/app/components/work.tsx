"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { projects } from "@/content/projects";
import { scrollState } from "@/lib/scroll";
import Reveal from "./reveal";

/* Selected work — an interactive index of live client sites.
   - hovering a row focuses it (variable-weight jump) and dims the rest
   - a cursor-following glimpse tilts with pointer velocity and shows the
     project screenshot slowly panning inside its frame
   - the whole list skews with scroll velocity
   - clicking opens the live site in a new tab.
   Touch / reduced motion: plain focused rows, no glimpse, no skew. */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

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
        // glimpse chases the cursor; its lag is what the tilt reads
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
          Real projects, live on the internet. Hover to peek, click to visit.
        </p>
      </Reveal>

      <ul
        className="index"
        ref={listRef}
        data-focused={active >= 0}
        onPointerLeave={() => setActive(-1)}
      >
        {projects.map((p, i) => (
          <li key={p.slug} data-on={active === i}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="index-row"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="index-num label">{String(i + 1).padStart(2, "0")}</span>
              <span className="index-name">{p.client}</span>
              <span className="index-meta label">{p.sector}</span>
              <span className="index-visit label" aria-hidden>
                Visit <span className="index-arrow">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="index-preview" ref={previewRef} data-show={active >= 0} aria-hidden>
        <div className="index-cover">
          {/* all four screenshots stay mounted so the first hover never flashes */}
          {projects.map((p, i) => (
            <div key={p.slug} className="index-shot" data-on={active === i}>
              <Image src={p.image} alt="" fill sizes="340px" />
            </div>
          ))}
          {active >= 0 && (
            <span className="index-cover-label label">{projects[active].line}</span>
          )}
        </div>
      </div>
    </section>
  );
}
