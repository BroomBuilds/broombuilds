"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Draws children at a fixed design size and scales them to the box's width,
 * so a product mock keeps its exact proportions at any screen size instead of
 * reflowing into a cramped version of itself. The box holds the design's
 * aspect ratio in CSS, so it never shifts layout; the contents stay hidden
 * until the first measurement so there's no flash at the wrong scale.
 */
export default function Fit({
  w,
  h,
  children,
  className,
  fill = false,
}: {
  /** Design width in px. */
  w: number;
  /** Design height in px. */
  h: number;
  children: ReactNode;
  className?: string;
  /** Fill the parent's height instead of taking the design aspect ratio. */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", fill && "h-full", className)}
      style={fill ? undefined : { aspectRatio: `${w} / ${h}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: w, height: h, transform: `scale(${scale ?? 1})`, visibility: scale === null ? "hidden" : undefined }}
      >
        {children}
      </div>
    </div>
  );
}
