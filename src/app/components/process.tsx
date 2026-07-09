"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";

const STEPS = [
  { n: "01", h: "Discover", d: "One call. We learn your goals, your customers, and what's in the way." },
  { n: "02", h: "Design", d: "You see the real thing take shape — no decks, no throwaway mockups." },
  { n: "03", h: "Build", d: "Hand-built for speed and clarity. The craft you're reading right now." },
  { n: "04", h: "Launch", d: "We take it live, ready to be found from day one." },
  { n: "05", h: "Optimize", d: "We watch what converts and tighten the path every month." },
];

/* The sweep. Section pins; scrolling draws a seam line across the row and
   each step rises from its mask as the line passes — progress tied 1:1 to
   scroll. Mobile / reduced motion: no pin, steps rise as they enter. */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    mm.add(
      "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
      () => {
        const steps = q<HTMLElement>(".step");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top+=64",
            end: "+=130%",
            pin: true,
            scrub: true,
          },
        });
        tl.fromTo(
          q("[data-sweep-line]"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", duration: 1 }
        );
        steps.forEach((step, i) => {
          const at = (i + 0.25) / STEPS.length;
          tl.fromTo(
            step.querySelectorAll("[data-mask] > *"),
            { yPercent: 110 },
            { yPercent: 0, ease: "power2.out", duration: 0.12, stagger: 0.02 },
            at
          );
          tl.to(step.querySelector(".step-num"), { color: "var(--seam)", duration: 0.04 }, at);
        });
      }
    );

    mm.add(
      "(max-width: 959.9px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          q("[data-sweep-line]"),
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "power2.inOut",
            duration: 1.4,
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          }
        );
        q<HTMLElement>(".step").forEach((step, i) => {
          gsap.fromTo(
            step.querySelectorAll("[data-mask] > *"),
            { yPercent: 110 },
            {
              yPercent: 0,
              ease: "power3.out",
              duration: 0.7,
              delay: i * 0.06,
              scrollTrigger: { trigger: step, start: "top 85%" },
            }
          );
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="section wrap process" id="process" ref={root} aria-label="Process">
      <Reveal>
        <p className="label">Process</p>
        <h2>Five steps. One clean sweep.</h2>
      </Reveal>

      <div className="sweep-track" aria-hidden>
        <svg width="100%" height="2" preserveAspectRatio="none">
          <line
            data-sweep-line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            pathLength={1}
            strokeDasharray={1}
          />
        </svg>
      </div>

      <ol className="steps">
        {STEPS.map((s) => (
          <li className="step" key={s.n}>
            <span className="step-num label">{s.n}</span>
            <span className="step-mask" data-mask>
              <h3>{s.h}</h3>
            </span>
            <span className="step-mask" data-mask>
              <p>{s.d}</p>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
