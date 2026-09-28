"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { sections, site } from "@/lib/site";
import Wordmark from "./wordmark";
import BookTrigger from "./book-trigger";
import { usePrefersReducedMotion } from "./motion";

/* The last word. A night band with everything a visitor might still need,
   and the name itself, swept into view left to right as the page runs out —
   one final pass of the broom. */

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const right = useTransform(scrollYProgress, [0.35, 0.95], [100, 0]);
  const clip = useMotionTemplate`inset(-30% ${right}% 0 0)`;

  return (
    <footer ref={ref} className="grain relative overflow-hidden bg-night text-ink" aria-label="Footer">
      <div aria-hidden className="dot-grid-night absolute inset-0" />
      <div className="container-page relative pt-4 md:pt-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Wordmark tone="night" className="text-[22px]" />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.6] text-ink/55">{site.positioning}</p>
            <p className="mt-6 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink/50">
              <span className="h-1.5 w-1.5 rounded-full bg-live" />
              Taking new projects
            </p>
          </div>
          <FooterCol title="Studio">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-ink">
                {s.label}
              </a>
            ))}
          </FooterCol>
          <FooterCol title="Contact" className="order-last col-span-2 lg:order-none lg:col-span-1">
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="hover:text-ink">
              {site.phone}
            </a>
            <BookTrigger className="hover:text-ink">Book a call</BookTrigger>
          </FooterCol>
          <FooterCol title="Elsewhere">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-ink">
                {s.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            ))}
          </FooterCol>
        </div>
      </div>

      {/* The name, swept in. Decorative: the real wordmark is above. */}
      <div aria-hidden className="relative select-none">
        <motion.div
          className="container-page"
          style={reduced ? undefined : { clipPath: clip }}
        >
          {/* Sized to fill the container exactly and shown whole, sitting right
              on the rule below it: the word is ~5.75em wide, so font-size =
              inner width ÷ 5.9, capped where the container stops growing. The
              tight line box drops it onto the line; the clip above is widened
              upward so no letter top is ever cut. */}
          <Wordmark
            tone="night"
            className="block whitespace-nowrap pt-[0.12em] text-[min(calc((100vw-40px)/5.9),210px)] leading-[0.74] tracking-[-0.05em] md:text-[min(calc((100vw-64px)/5.9),210px)] xl:text-[min(calc((100vw-96px)/5.9),210px)]"
          />
        </motion.div>
      </div>

      <div className="relative border-t border-night-line">
        <div className="container-page flex flex-col justify-between gap-2 py-6 font-mono text-[11.5px] text-ink/45 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span>Designed & built by hand. Swept clean.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{title}</p>
      <div className="mt-4 flex min-w-0 flex-col items-start gap-2.5 text-[15px] text-ink/70 [&_a]:transition-colors [&_a]:duration-200">
        {children}
      </div>
    </div>
  );
}
