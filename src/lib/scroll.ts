/* Shared scroll state — Lenis writes it once per frame. A mutable module
   object instead of React state: readers sample it and must never trigger
   re-renders. */

import type Lenis from "lenis";

export const scrollState = {
  y: 0,
  /** Lenis velocity (px/frame-ish). 0 when smooth scroll is off. */
  velocity: 0,
  /** The live Lenis instance — the nav locks it while the menu is open; the
      process stepper scrolls through it. */
  lenis: null as Lenis | null,
};
