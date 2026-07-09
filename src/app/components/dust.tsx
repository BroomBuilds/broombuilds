"use client";

import { useEffect, useRef } from "react";

/* The interactive background: a field of drifting dust motes on a fixed
   canvas behind the page. The cursor is the broom — its recent path is a
   stroke, and motes caught in the stroke's wake get dragged along it and
   curl around it like dust behind a real sweep, flaring purple and leaving
   streaks before settling back into their drift. A faint glow rides the
   pointer, brightening with speed (the broom kicking dust up), and a
   press/click bursts nearby motes outward. Occasionally one mote
   "twinkles" on its own so the field never reads as static.

   Touch devices keep the ambient drift (no sweep); reduced-motion users
   get nothing — the canvas never mounts a loop. Sits at z-index -1, so
   opaque sections (footer) paint over it like any real background. */

const SEAM = "168, 92, 210"; // --seam lifted for legibility on the ink bg
const BONE = "236, 230, 218"; // --bone as rgb

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bx: number; // base drift velocity — what it settles back to
  by: number;
  r: number;
  seam: boolean; // purple mote vs bone mote
  a: number; // base alpha
  tw: number; // twinkle phase
  e: number; // sweep energy 0..1
};

export default function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let w = 0,
      h = 0,
      dpr = 1;
    let motes: Mote[] = [];

    const seed = () => {
      const count = Math.min(150, Math.round((w * h) / 14000));
      motes = Array.from({ length: count }, () => {
        const bx = (Math.random() - 0.5) * 0.12;
        const by = (Math.random() - 0.5) * 0.12;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: bx,
          vy: by,
          bx,
          by,
          r: 0.6 + Math.random() * 1.2,
          seam: Math.random() < 0.3,
          a: 0.12 + Math.random() * 0.3,
          tw: Math.random() * Math.PI * 2,
          e: 0,
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer state — position, velocity, and the recent path (the stroke).
    // Each trail point keeps the stroke velocity at that moment and a life
    // that decays, so a fast swipe leaves a wake that keeps churning briefly.
    type Trail = { x: number; y: number; vx: number; vy: number; life: number };
    const trail: Trail[] = [];
    let mx = -9999,
      my = -9999,
      pvx = 0,
      pvy = 0;
    const onMove = (e: PointerEvent) => {
      pvx = pvx * 0.7 + (e.clientX - mx) * 0.3;
      pvy = pvy * 0.7 + (e.clientY - my) * 0.3;
      mx = e.clientX;
      my = e.clientY;
      trail.push({ x: mx, y: my, vx: pvx, vy: pvy, life: 1 });
      if (trail.length > 16) trail.shift();
    };
    const onLeave = () => {
      mx = my = -9999;
    };
    // press: the broom taps the floor — nearby motes burst outward
    const onDown = (e: PointerEvent) => {
      for (const p of motes) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 220) {
          const f = 1 - d / 220;
          p.vx += (dx / d) * f * 7;
          p.vy += (dy / d) * f * 7;
          p.e = Math.min(1, p.e + f);
        }
      }
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    const R = 130; // wake radius around each stroke point
    let t = 0;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // the pointer's own velocity decays between events; the stroke fades
      pvx *= 0.9;
      pvy *= 0.9;
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.035;
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      // glow riding the pointer — brightens with speed, the kicked-up dust
      const speed = Math.min(1, Math.hypot(pvx, pvy) / 30);
      if (mx > -999 && speed > 0.02) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 110);
        g.addColorStop(0, `rgba(${SEAM}, ${0.07 * speed})`);
        g.addColorStop(1, `rgba(${SEAM}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mx - 110, my - 110, 220, 220);
      }

      for (const p of motes) {
        // wake: motes near any point of the stroke get dragged along it and
        // curl around it — the swirl side follows the side of the stroke
        for (const tr of trail) {
          const dx = p.x - tr.x;
          const dy = p.y - tr.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= R * R) continue;
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * tr.life;
          const side = Math.sign(tr.vx * dy - tr.vy * dx) || 1;
          p.vx += tr.vx * f * 0.06 + (dx / d) * f * 0.22 + (-dy / d) * side * f * 0.5;
          p.vy += tr.vy * f * 0.06 + (dy / d) * f * 0.22 + (dx / d) * side * f * 0.5;
          p.e = Math.min(1, p.e + f * 0.12);
        }

        // settle back toward base drift; energy fades
        p.vx += (p.bx - p.vx) * 0.03;
        p.vy += (p.by - p.vy) * 0.03;
        p.e *= 0.955;

        p.x += p.vx;
        p.y += p.vy;

        // wrap with a margin so motes re-enter naturally
        if (p.x < -12) p.x = w + 12;
        else if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        else if (p.y > h + 12) p.y = -12;

        const twinkle = 0.75 + 0.25 * Math.sin(t * 0.8 + p.tw);
        const alpha = Math.min(1, p.a * twinkle + p.e * 0.55);
        const rgb = p.seam || p.e > 0.35 ? SEAM : BONE;

        // swept motes leave a short streak behind them — the broom stroke
        if (p.e > 0.08) {
          ctx.strokeStyle = `rgba(${rgb}, ${alpha * p.e * 0.8})`;
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x - p.vx * 5, p.y - p.vy * 5);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + p.e * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (fine) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  return <canvas ref={ref} className="dust" aria-hidden />;
}
