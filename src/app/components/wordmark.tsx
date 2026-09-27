import Image from "next/image";
import { cn } from "@/lib/cn";

/* The brand: BroomBuilds, second B horizontally mirrored. Two-tone rule:
   "Broom" is white, "Builds" (mirrored B included) is seam purple. Plain
   text under the hood — screen readers and crawlers read "BroomBuilds". */
export default function Wordmark({ className }: { className?: string; tone?: "light" | "night" }) {
  return (
    <span className={cn("inline-flex items-baseline whitespace-nowrap font-display font-bold tracking-[-0.03em]", className)}>
      <span className="text-white">Broom</span>
      {/* Mirrored, the B's tight bowl side faces the m and its roomy stem side
          faces the u. Measured from the rendered ink at 21px to 210px: +0.055em
          before and -0.072em after make both gaps match the word's own. */}
      <span className="text-plum">
        <span className="ml-[0.055em] mr-[-0.072em] inline-block -scale-x-100">B</span>uilds
      </span>
    </span>
  );
}

/** The mascot, sweeping — the logo mark that sits beside the wordmark. */
export function BrandMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/mascot.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      priority
      className={cn("shrink-0 select-none", className)}
      draggable={false}
    />
  );
}
