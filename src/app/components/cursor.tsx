"use client";

import { useEffect, useRef } from "react";

/* Custom cursor: a seam dot that lerps behind the pointer and grows over
   interactive targets. Mounted only for fine pointers with motion allowed —
   touch devices and reduced-motion users keep the native cursor untouched. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current!;
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, tx = -100, ty = -100;
    let scale = 1, tScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = (e.target as Element)?.closest?.(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      tScale = hot ? (hot.dataset.cursor === "big" ? 7 : 3) : 1;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      scale += (tScale - scale) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden />;
}
