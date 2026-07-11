"use client";

import { useEffect, useRef } from "react";
import { useAnimate } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { scrollState } from "@/lib/scroll";

/* The intro — the brand manufactures itself. No counter, ever.

   Act 1 · draft & print: construction guides trace themselves around a
   hollow first B, then a scan-line sweeps down and inks the fill in
   behind it (clip-path reveal synced to the line).
   Act 2 · the mirrored B flies in and butts heads — impact jolt only,
   no seam line between the B's. The hold on the monogram is gated on
   real load progress (fonts + document, 3s cap), then the word is born
   from the split: B ᙠ → BroomBuilds.
   Act 3 · the veil lifts, the page rises beneath (html[data-intro="rise"]
   drives the CSS mask reveals) and the wordmark docks into the nav logo
   slot — a measured FLIP, transform-only, so zero CLS.

   The overlay is display:none without JS and for return visits; crawlers
   and reduced-motion users see the finished page immediately. */

const STORAGE_KEY = "bb-intro";

/** Dock travel time — must match the .loader-word transition in globals.css. */
const DOCK_MS = 1600;

// dev-only replay control — resolved at build time, same on server and client
const SHOW_REPLAY = process.env.NODE_ENV === "development";

/** Strong in-out — the print head and the dock travel (on-screen movement). */
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export default function Loader() {
  const [scope, animateScoped] = useAnimate();
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    if (document.documentElement.dataset.intro !== "run") return;
    played.current = true;

    document.body.style.overflow = "hidden";
    scrollState.lenis?.stop();

    const root = scope.current as HTMLElement;
    const q = (s: string) => root.querySelector(s) as HTMLElement;
    const word = q("[data-word]");
    const b1 = q("[data-b1]");
    const room = q("[data-room]");
    const uilds = q("[data-uilds]");

    // CSS pre-collapses these before first paint (so the B draft sits dead
    // center). Un-collapse synchronously, measure natural widths, re-collapse —
    // no paint happens in between.
    room.style.maxWidth = "none";
    uilds.style.maxWidth = "none";
    const roomW = room.offsetWidth;
    const uildsW = uilds.offsetWidth;
    room.style.maxWidth = "0px";
    uilds.style.maxWidth = "0px";

    // The nav logo slot stays empty until the wordmark docks into it.
    const navMark = document.querySelector<HTMLElement>(".nav-logo .wordmark");
    if (navMark) navMark.style.opacity = "0";

    /* --- real load progress: fonts + document, 3s safety cap ----------- */
    const fontsReady = document.fonts.ready.then(() => {});
    const docLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true })
          );
    const loaded = Promise.race([
      Promise.all([fontsReady, docLoaded]),
      new Promise((r) => setTimeout(r, 3000)),
    ]);

    const run = async () => {
      // guides are already drawing (CSS). Wait for the display font so the
      // draft is the real glyph, not a fallback that swaps mid-act.
      await Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1000))]);

      // 1a — draft: the hollow B surfaces inside its guides
      await animateScoped(
        "[data-b1-outline]",
        { opacity: 1, filter: ["blur(5px)", "blur(0px)"] },
        { duration: 0.5, ease: EASE_OUT }
      );

      // 1b — print: the scan-line inks the fill in as it passes
      root.dataset.phase = "ink";
      const scanDist = b1.offsetHeight;
      animateScoped("[data-scan]", { opacity: 1 }, { duration: 0.15 });
      animateScoped(
        "[data-scan]",
        { transform: ["translateY(0px)", `translateY(${scanDist}px)`] },
        { duration: 0.85, ease: EASE_IN_OUT }
      );
      await animateScoped(
        "[data-b1-fill]",
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 -8% 0)"] },
        { duration: 0.85, ease: EASE_IN_OUT }
      );
      animateScoped("[data-scan]", { opacity: 0 }, { duration: 0.25 });
      animateScoped("[data-b1-outline]", { opacity: 0 }, { duration: 0.35 });
      animateScoped(
        "[data-guides]",
        { opacity: 0 },
        { duration: 0.5, ease: EASE_OUT }
      );

      // 2 — mirrored B flies in and butts heads
      await animateScoped(
        "[data-b2]",
        {
          opacity: 1,
          transform: ["translateX(240px)", "translateX(0px)"],
          filter: ["blur(14px)", "blur(0px)"],
        },
        { duration: 0.65, ease: [0.3, 0, 0.2, 1] }
      );

      // impact: a jolt through both letters (no seam flash)
      animateScoped("[data-b1]", { x: [-5, 0] }, { type: "spring", stiffness: 700, damping: 14 });
      await animateScoped("[data-b2]", { x: [5, 0] }, { type: "spring", stiffness: 700, damping: 14 });

      // 3 — hold on the monogram until assets are actually in
      await Promise.all([loaded, new Promise((r) => setTimeout(r, 400))]);

      // 4 — split: "room" born from the seam, "uilds" extends right
      animateScoped("[data-label]", { opacity: 0, y: -8 }, { duration: 0.4, ease: EASE_OUT });
      animateScoped(
        "[data-room]",
        { maxWidth: [0, roomW], opacity: 1, filter: ["blur(10px)", "blur(0px)"] },
        { type: "spring", stiffness: 210, damping: 22 }
      );
      await animateScoped(
        "[data-uilds]",
        { maxWidth: [0, uildsW], opacity: 1, filter: ["blur(10px)", "blur(0px)"] },
        { type: "spring", stiffness: 210, damping: 22, delay: 0.08 }
      );

      // 5 — settle layout, then let the page rise beneath the travel
      // ("none", not "" — the pre-paint CSS collapse would re-apply)
      room.style.maxWidth = "none";
      uilds.style.maxWidth = "none";
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );

      document.documentElement.dataset.intro = "rise";
      document.body.style.overflow = "";
      scrollState.lenis?.start();
      sessionStorage.setItem(STORAGE_KEY, "1");

      animateScoped(
        "[data-sweep]",
        { opacity: [0, 1, 1, 0], transform: ["translateX(0vw)", "translateX(108vw)"] },
        { duration: 1.4, ease: [0.6, 0, 0.2, 1], times: [0, 0.1, 0.85, 1] }
      );
      // the veil lifts while the wordmark is mid-flight — one gesture, the
      // page surfaces beneath the travel
      animateScoped("[data-veil]", { opacity: 0 }, { duration: 1, ease: EASE_OUT });

      // 6 — the dock: a measured FLIP from mid-screen into the nav logo slot,
      // one element traveling as a single transform. CSS owns the transition
      // (.loader-word / [data-dock]); we only measure and set the deltas.
      if (navMark) {
        const from = word.getBoundingClientRect();
        const to = navMark.getBoundingClientRect();
        const end = getComputedStyle(navMark.closest(".nav-logo") ?? navMark);
        const s =
          parseFloat(end.fontSize) / parseFloat(getComputedStyle(word).fontSize);
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        word.style.setProperty("--dock-x", `${dx}px`);
        word.style.setProperty("--dock-y", `${dy}px`);
        word.style.setProperty("--dock-s", `${s}`);
        // typography interpolates in parallel with the travel. Length values
        // are divided by s — the transform scale shrinks them again visually,
        // so the on-screen result lands exactly on the nav's computed values.
        word.style.letterSpacing = `${parseFloat(end.letterSpacing) / s || 0}px`;
        word.style.fontWeight = end.fontWeight;
        word.style.color = end.color;
        root.dataset.dock = "true";
        await new Promise<void>((resolve) => {
          const fallback = setTimeout(resolve, DOCK_MS + 100);
          word.addEventListener("transitionend", (e) => {
            if (e.target !== word || e.propertyName !== "transform") return;
            clearTimeout(fallback);
            resolve();
          });
        });
        // instant swap — B always sat in its true layout slot, so no drift
        navMark.style.opacity = "";
        word.style.visibility = "hidden";
      } else {
        await animateScoped("[data-word]", { opacity: 0 }, { duration: 0.4, ease: EASE_OUT });
      }

      // after the rise animations settle, drop the gate for good
      setTimeout(() => {
        document.documentElement.dataset.intro = "done";
      }, 1800);
    };

    run();
    return () => {
      document.body.style.overflow = "";
    };
  }, [scope, animateScoped]);

  const replay = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    location.reload();
  };

  return (
    <>
      <div ref={scope} className="loader" data-phase="draft" aria-hidden>
        <div className="loader-veil" data-veil />

        <div className="loader-stage">
          <div className="loader-word" data-word>
            <span className="loader-b1" data-b1>
              <svg className="loader-guides" data-guides viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="36" pathLength={1} />
                <line x1="50" y1="-6" x2="50" y2="106" pathLength={1} />
                <line x1="-6" y1="50" x2="106" y2="50" pathLength={1} />
              </svg>
              <span className="b1-outline" data-b1-outline>
                B
              </span>
              <span className="b1-fill" data-b1-fill>
                B
              </span>
              <span className="b1-scan" data-scan />
            </span>
            <span className="loader-collapse" data-room>
              room
            </span>
            <span data-b2>
              <span className="flip-b">B</span>
            </span>
            <span className="loader-collapse" data-uilds>
              uilds
            </span>
          </div>

          <span className="loader-phase label" data-label>
            <span>Drafting</span>
            <span>Inking</span>
          </span>
        </div>

        <span className="loader-sweep" data-sweep />
      </div>

      {SHOW_REPLAY && (
        <button type="button" className="loader-replay label" onClick={replay}>
          ↻ Replay
        </button>
      )}
    </>
  );
}
