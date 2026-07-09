/* Shared motion vocabulary — every animation on the site draws from here
   so timing feels like one hand built it. */

import type { Transition, Variants } from "motion/react";

/** The house curve — fast out, long settle. Same as the loader. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Default spring: physical, slightly damped, no wobble. */
export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 1,
};

/** Softer spring with a hint of overshoot — for the loader split and playful bits. */
export const springOvershoot: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 19,
  mass: 1,
};

/** Blur-to-focus reveal — the signature entrance. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/** Stagger container for grouped reveals. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Viewport config for whileInView reveals. */
export const inView = { once: true, margin: "-15% 0px" } as const;
