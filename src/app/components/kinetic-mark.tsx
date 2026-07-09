"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/* Giant end-to-end footer wordmark. Letters rise out of masks with a
   stagger when the footer enters the viewport — no skew, no tilt.
   Purely decorative (the footer already carries the name in text). */
export default function KineticMark() {
  const reduced = useReducedMotion();

  const letters = (word: string, base: number, flipFirst = false) =>
    word.split("").map((ch, i) => (
      <span className="fm-mask" key={i}>
        <motion.span
          className="fm-ch"
          variants={
            reduced
              ? { hidden: { y: 0 }, visible: { y: 0 } }
              : {
                  hidden: { y: "115%" },
                  visible: {
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: EASE_OUT,
                      delay: (base + i) * 0.045,
                    },
                  },
                }
          }
        >
          {flipFirst && i === 0 ? <span className="flip-b">{ch}</span> : ch}
        </motion.span>
      </span>
    ));

  return (
    <motion.div
      className="footer-mark"
      data-cursor="big"
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <span className="fm-broom">{letters("Broom", 0)}</span>
      <span className="fm-builds">{letters("Builds", 5, true)}</span>
    </motion.div>
  );
}
