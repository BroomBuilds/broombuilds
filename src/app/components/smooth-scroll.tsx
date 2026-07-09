"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState } from "@/lib/scroll";

/* Buttery inertial scroll. Falls back to native when the user prefers
   reduced motion. Publishes velocity to scrollState so the work-index skew
   and footer kinetic mark all read one source. Hands anchor clicks to Lenis
   so in-page nav glides. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    scrollState.lenis = lenis;

    lenis.on("scroll", (l: Lenis) => {
      scrollState.y = l.scroll;
      scrollState.velocity = l.velocity;
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Without this, Lenis fights native anchor jumps and #links look broken.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.('a[href^="#"]');
      const href = a?.getAttribute("href");
      if (!href || href === "#") return;
      const target = href === "#top" ? 0 : document.querySelector(href);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement | number, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      scrollState.lenis = null;
      scrollState.velocity = 0;
    };
  }, []);

  return <>{children}</>;
}
