import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import BookTrigger from "./book-trigger";

/* The small shared vocabulary every section is built from. Server
   components — nothing here needs the client. */

/** The house mono label, with a seam dot. Opens most sections. */
export function Eyebrow({ children, className }: { children: ReactNode; tone?: "light" | "night"; className?: string }) {
  return (
    <p className={cn("label inline-flex items-center gap-2 text-ink-muted", className)}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lilac" />
      {children}
    </p>
  );
}

/** Section heading: the title on one line, the lead underneath it. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "night";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="text-[40px] text-ink sm:text-[48px] md:text-[58px] lg:text-[64px]">{title}</h2>
      {lead && (
        <p
          className={cn(
            "mt-5 max-w-[62ch] text-[17px] leading-[1.6] md:text-lg",
            tone === "night" ? "text-ink/60" : "text-ink-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Dot-gridded band every diagram sits on. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("dot-grid rounded-[18px] border border-line bg-band", className)}>{children}</div>
  );
}

type ButtonVariant = "primary" | "ghost";

/* The house buttons: bone pill that turns seam purple on hover, and a ghost
   outline that picks up the purple. */
const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-plum hover:text-white",
  ghost: "text-ink ring-1 ring-inset ring-ink/25 hover:text-lilac hover:ring-lilac",
};

/**
 * Mono, uppercase, pill. Presses in on :active (the interface heard you);
 * the arrow nudges on hover, gated to real pointers.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  book = false,
  className,
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  arrow?: boolean;
  external?: boolean;
  /** Opens the booking modal instead of following href. */
  book?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group/btn inline-flex select-none items-center justify-center gap-2.5 rounded-btn font-mono font-medium uppercase tracking-[0.1em]",
    "transition-[transform,background-color,color,box-shadow] duration-200 ease-out active:scale-[0.97]",
    size === "lg" ? "h-[52px] px-7 text-[12.5px]" : "h-11 px-5 text-[12px]",
    buttonStyles[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
  if (book || !href) {
    return <BookTrigger className={cls}>{inner}</BookTrigger>;
  }
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Tool logo, one colour: the SVG file is used as a mask over currentColor. */
export function LogoMark({ logo, size = 20, className }: { logo: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("logo-mask shrink-0", className)}
      style={{ width: size, height: size, "--logo": `url(/logos/${logo}.svg)` } as CSSProperties}
    />
  );
}

/** Mono chip. */
export function Tag({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: "plain" | "plum" | "night";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[6px] px-1.5 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em]",
        tone === "plain" && "bg-ink/[0.07] text-ink-soft",
        tone === "plum" && "bg-plum text-ink",
        tone === "night" && "bg-ink/10 text-ink/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
