"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/content/home";
import { cn } from "@/lib/cn";
import { Reveal } from "./motion";
import { Eyebrow } from "./ui";

/* Plain questions, plain answers — and the same text as FAQPage schema, so
   search and AI answer engines can quote it. One open at a time. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
      />
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Eyebrow className="mb-5">FAQ</Eyebrow>
          <h2 id="faq-title" className="text-[40px] sm:text-[48px] md:text-[58px] lg:text-[64px]">
            {faq.heading}
          </h2>
          <p className="mt-6 max-w-[34ch] text-[16.5px] leading-[1.6] text-ink-muted">
            Something else on your mind? Ask it on the call. That’s what it’s for.
          </p>
        </div>

        <Reveal>
          <ul className="border-t border-line">
            {faq.items.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      id={`faq-q-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]"
                    >
                      {f.q}
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-300 ease-out",
                          on ? "rotate-45 bg-plum text-ink" : "bg-card text-ink [@media(hover:hover)]:group-hover:bg-ink/5",
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pr-14 text-[16px] leading-[1.65] text-ink-muted">
                      <span className="block pb-6">{f.a}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
