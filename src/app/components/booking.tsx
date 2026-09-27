"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Globe, Mail, Phone, Search } from "lucide-react";
import { cta } from "@/content/home";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { VideoCall, WhatsAppChat } from "./mocks/mocks";
import { GoogleWord } from "./layer-plates";
import { Reveal, Sweep, usePrefersReducedMotion, useSeen } from "./motion";
import { Button } from "./ui";

/* The close. The mascot sweeps in, the headline lands, one button opens the
   booking modal. Around it, four screens for "Your Business": no one client,
   so every visitor can picture their own. Each is drawn at the size it's
   shown, so nothing is a squashed miniature. */

const drift = (delay: number) => ({
  y: [0, -8, 0],
  transition: { duration: 5.6, repeat: Infinity, ease: "easeInOut" as const, delay },
});

function Float({ className, rotate, delay, children }: { className: string; rotate: number; delay: number; children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={cn("absolute", className)} style={{ rotate }} animate={reduced ? undefined : drift(delay)}>
      {children}
    </motion.div>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("overflow-hidden rounded-[18px] border border-line bg-card shadow-float", className)}>{children}</div>;
}

/* Illustrative bookings: any business, any kind of appointment. */
const bookings = [
  { when: "Tue 10:00am", name: "Priya N.", what: "New client · consult", via: "WhatsApp", color: "#25D366" },
  { when: "Wed 2:30pm", name: "Daniel M.", what: "Returning · follow-up", via: "Phone agent", color: "#b58bd3" },
  { when: "Thu 3:00pm", name: "Jordan K.", what: "Website lead · quote", via: "Website", color: "#8b8983" },
];

function BookingsCard() {
  return (
    <Card className="w-[330px]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-white">
            <span
              aria-hidden
              className="logo-mask h-[18px] w-[18px]"
              style={{ backgroundColor: "#4285F4", "--logo": "url(/logos/googlecalendar.svg)" } as CSSProperties}
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[13px] font-semibold">This week’s bookings</span>
            <span className="block truncate text-[11px] text-ink-muted">Your Business</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-plum-soft px-2.5 py-1 text-[11px] font-semibold text-lilac">3 new today</span>
      </div>
      <ul className="divide-y divide-line px-4">
        {bookings.map((r) => (
          <li key={r.name} className="flex items-center gap-3 py-2.5">
            <span className="w-[62px] shrink-0 font-mono text-[11px] leading-tight text-ink-soft">{r.when}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{r.name}</span>
              <span className="block truncate text-[11px] text-ink-muted">{r.what}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10.5px] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.color }} /> {r.via}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-4 py-2.5 text-[11px] text-ink-muted">Booked by agents · synced to your calendar</p>
    </Card>
  );
}

/** Found on Google: the business at the top of a local search. */
function FoundCard() {
  return (
    <Card className="w-[310px] p-3.5">
      <div className="flex items-center gap-3">
        <GoogleWord size={20} />
        <span className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#303134] px-3 text-[12px] text-[#e8eaed]">
          <span className="flex-1 truncate">
            best <span className="text-lilac">your service</span> near me
          </span>
          <Search className="h-3.5 w-3.5 shrink-0 text-[#8ab4f8]" />
        </span>
      </div>
      <div className="mt-3.5 flex items-center gap-2.5">
        {/* Google's stand-in favicon for a site without one */}
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e8eaed]">
          <Globe className="h-4 w-4 text-[#5f6368]" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[12.5px] text-ink">Your Business</span>
          <span className="block truncate text-[11px] text-ink-muted">https://yourbusiness.com</span>
        </span>
        <span className="ml-auto shrink-0 rounded-[6px] bg-ink/[0.07] px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">#1</span>
      </div>
      <p className="mt-1.5 truncate text-[15px] leading-snug text-[#8ab4f8]">Your Business | What you do</p>
      <p className="mt-1 text-[12px] leading-[1.5] text-ink-muted">Clear services, quick replies and booking in seconds.</p>
      <div className="mt-2 flex gap-4 text-[12.5px] text-[#8ab4f8]">
        <span>Services</span>
        <span>About</span>
        <span>Book now</span>
      </div>
    </Card>
  );
}

function Mascot() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.6);
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} className="relative mx-auto h-[110px] w-[110px]">
      {/* dust kicked up by the broom, settling as it arrives */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute bottom-4 h-2.5 w-2.5 rounded-full bg-ink/20"
          style={{ left: -6 - i * 14 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={seen && !reduced ? { opacity: [0, 0.9, 0], scale: [0.6, 1.3, 1.6], y: [0, -6, -12] } : { opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: "easeOut" }}
        />
      ))}
      {/* data-reveal: the reduced-motion CSS pins this to its resting pose */}
      <motion.div
        data-reveal
        initial={reduced ? false : { x: -220, rotate: -8, opacity: 0 }}
        animate={seen ? { x: 0, rotate: 0, opacity: 1 } : undefined}
        transition={{ type: "spring", duration: 1.1, bounce: 0.25 }}
      >
        <Image src="/mascot.png" alt="" width={110} height={110} className="select-none" draggable={false} />
      </motion.div>
    </div>
  );
}

export default function Booking() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden py-16 md:py-24">
      <div className="container-page relative">
        {/* Floating screens: desktop only, pure decoration. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden origin-center max-[1439px]:scale-[0.84] xl:block">
          <Float className="left-0 top-2" rotate={-5} delay={0}>
            <div className="h-[430px] w-[216px] rounded-[36px] bg-[#0b0b0c] p-[7px] shadow-float ring-1 ring-white/10">
              <div className="relative h-full overflow-hidden rounded-[29px]">
                <WhatsAppChat compact persona="generic" />
                <span className="absolute left-1/2 top-1.5 h-[13px] w-[58px] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </Float>
          <Float className="-bottom-10 left-[10%] z-10" rotate={3} delay={1.4}>
            <FoundCard />
          </Float>
          <Float className="right-0 top-0" rotate={4} delay={0.7}>
            <BookingsCard />
          </Float>
          <Float className="bottom-6 right-[2%]" rotate={-3} delay={2.1}>
            <div className="aspect-[16/11] w-[320px] overflow-hidden rounded-[16px] shadow-float ring-1 ring-white/10">
              <VideoCall compact persona="generic" />
            </div>
          </Float>
        </div>

        <div className="relative mx-auto flex min-h-[520px] max-w-[620px] flex-col items-center justify-center text-center xl:min-h-[640px]">
          <Mascot />
          <Reveal delay={0.1}>
            <h2 id="book-title" className="mt-5 text-[46px] sm:text-[60px] xl:text-[68px]">
              {cta.before}{" "}
              <Sweep delay={0.5}>
                <span className="pr-[0.04em] text-lilac">{cta.accent}</span>
              </Sweep>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-ink-muted md:text-lg">{cta.lead}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-col items-center gap-4">
            <Button book size="lg" arrow>
              Book a call with us
            </Button>
            <span className="flex flex-wrap justify-center gap-2">
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink/[0.06] px-4 text-[14px] transition-[transform,background-color] duration-150 hover:bg-ink/10 active:scale-[0.97]"
              >
                <Phone className="h-4 w-4 text-lilac" /> {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink/[0.06] px-4 text-[14px] transition-[transform,background-color] duration-150 hover:bg-ink/10 active:scale-[0.97]"
              >
                <Mail className="h-4 w-4 text-lilac" /> {site.email}
              </a>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

