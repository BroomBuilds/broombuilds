"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";

/* No jargon, no metrics — the site you're on is the demo. */
const CLAIMS = [
  { k: "Speed", h: "Loads in a blink", d: "No spinners, no waiting. The page is simply there." },
  { k: "Search", h: "Built to be found", d: "Clean structure search engines actually understand, on every route." },
  { k: "Craft", h: "Built by hand", d: "No page builders, no bloat — every detail placed on purpose." },
  { k: "Proof", h: "You're reading it", d: "This site is built the way yours will be. Poke around." },
];

/* deterministic scatter — no Math.random, so SSR/replay/resume stay stable */
const scatter = (i: number) => ({
  x: (((i * 67) % 13) - 6) * 13,
  y: (((i * 31) % 11) - 5) * 15,
  rot: (((i * 43) % 9) - 4) * 5,
});

/* The broom assembles the words: each claim's letters start as scattered
   dust (offset, rotated, blurred) and sweep into place as the section
   scrolls through — scrubbed, so the user's thumb is the broom. Descriptions
   settle in behind the words. Mobile: plain fade-up. Reduced motion: static. */
export default function Proof() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    mm.add(
      "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            end: "center 45%",
            scrub: 0.6,
          },
        });
        tl.fromTo(
          q<HTMLElement>(".proof-ch"),
          {
            x: (i: number) => scatter(i).x,
            y: (i: number) => scatter(i).y,
            rotation: (i: number) => scatter(i).rot,
            opacity: 0,
            filter: "blur(5px)",
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.7,
            stagger: 0.012, // settles left-to-right, like a pass of the broom
          },
          0
        );
        tl.fromTo(
          q(".proof-desc"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
          0.55
        );
      }
    );

    mm.add(
      "(max-width: 959.9px) and (prefers-reduced-motion: no-preference)",
      () => {
        q<HTMLElement>(".proof-cell").forEach((cell, i) => {
          gsap.fromTo(
            cell,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: (i % 2) * 0.07,
              ease: "power3.out",
              scrollTrigger: { trigger: cell, start: "top 85%" },
            }
          );
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      className="section wrap proof"
      id="proof"
      ref={root}
      aria-label="Why our sites work"
    >
      <Reveal>
        <p className="label">Built to rank and load fast</p>
        <h2>This site is the pitch.</h2>
        <p className="section-sub">
          Everything we sell — speed, structure, search visibility — you can
          feel on the page you&apos;re reading.
        </p>
      </Reveal>
      <dl className="proof-grid">
        {CLAIMS.map((c) => (
          <div key={c.k} className="proof-cell">
            <dt className="label">{c.k}</dt>
            <dd>
              <span className="proof-word" aria-label={c.h}>
                {c.h.split(" ").map((word, wi) => (
                  <span className="proof-w" key={wi} aria-hidden>
                    {word.split("").map((ch, li) => (
                      <span className="proof-ch" key={li}>
                        {ch}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
              <span className="proof-desc">{c.d}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
