"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, inView } from "@/lib/motion";

/* Mask-wipe scroll reveal — content rises out of a clip, no opacity fade.
   Reduced motion → instant, plain quick fade. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.3 } },
            }
          : {
              hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 34 },
              visible: {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                transition: { duration: 0.9, ease: EASE_OUT, delay },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
