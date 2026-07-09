/* Shared scroll state — Lenis writes it once per frame, effects (work-index
   skew, footer kinetic mark) read it in their own tickers. A mutable module
   object instead of React state: subscribers sample at 60fps and must never
   trigger re-renders. */

import type Lenis from "lenis";

export const scrollState = {
  y: 0,
  /** Lenis velocity (px/frame-ish). 0 when smooth scroll is off. */
  velocity: 0,
  /** The live Lenis instance — nav uses it to lock scroll while the menu is open. */
  lenis: null as Lenis | null,
};
