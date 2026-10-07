import type { CSSProperties } from "react";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { hero } from "@/content/home";
import { Button } from "./ui";
import { Sweep, Words } from "./motion";
import LayerStack from "./layer-stack";

/* The hero is the whole first screen and says one thing: what we make. Two
   short parallel lines, each led by its subject in the brand purple; one
   sentence under them at the same width, so the block reads as one column;
   two buttons; then the direct lines, for people who'd rather just call.
   The layer stack below does the explaining. */
const STAGGER = 0.07;
const starts = hero.lines.reduce<number[]>((acc, line, i) => {
  const prev = i === 0 ? 0.1 : acc[i - 1] + (hero.lines[i - 1].verb + " " + hero.lines[i - 1].rest).split(" ").length * STAGGER + 0.06;
  return [...acc, prev];
}, []);
const REST = starts[starts.length - 1] + (hero.lines.at(-1)!.verb + " " + hero.lines.at(-1)!.rest).split(" ").length * STAGGER + 0.3;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="container-page flex min-h-svh flex-col items-center justify-center pb-2 pt-[calc(var(--nav-h)+24px)] text-center md:pb-16 md:pt-(--nav-h)">
        <h1
          id="hero-title"
          className="whitespace-nowrap text-[min(calc((100vw-40px)/10.3),48px)] leading-[1.04] tracking-[-0.035em] text-ink sm:text-[56px] md:text-[64px] lg:text-[68px]"
        >
          {hero.lines.map((line, i) => (
            <span key={line.verb} className="block">
              {i === 1 ? (
                <Sweep trigger="load" delay={starts[i] + 0.25}>
                  <Words text={line.verb} delay={starts[i]} className="text-lilac" />
                </Sweep>
              ) : (
                <Words text={line.verb} delay={starts[i]} className="text-lilac" />
              )}{" "}
              <Words text={line.rest} delay={starts[i] + STAGGER} stagger={STAGGER} />
            </span>
          ))}
        </h1>

        <p
          className="fade-rise mt-6 max-w-[34rem] text-[17px] leading-[1.55] text-ink-soft sm:max-w-[36rem] md:mt-7 md:max-w-[40rem] md:text-[19px] lg:max-w-[42rem] lg:text-[19.5px]"
          style={{ "--d": `${REST}s` } as CSSProperties}
        >
          {hero.sub}
        </p>

        <div
          className="fade-rise mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={{ "--d": `${REST + 0.1}s` } as CSSProperties}
        >
          <Button book size="lg" arrow className="w-full max-w-[340px] sm:w-auto">
            Book a call with us
          </Button>
          <Button href="#work" size="lg" variant="ghost" className="w-full max-w-[340px] sm:w-auto">
            See the work
          </Button>
        </div>

        <p
          className="fade-rise mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14.5px] text-ink-muted"
          style={{ "--d": `${REST + 0.2}s` } as CSSProperties}
        >
          <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-ink">
            <Phone className="h-3.5 w-3.5 text-lilac" /> {site.phone}
          </a>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink/30 sm:block" />
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-ink">
            <Mail className="h-3.5 w-3.5 text-lilac" /> {site.email}
          </a>
        </p>
      </div>

      <LayerStack />
    </section>
  );
}
