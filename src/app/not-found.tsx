import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Wordmark, { BrandMark } from "./components/wordmark";

/* Root not-found: also catches every unmatched URL app-wide.
   Next auto-injects <meta robots noindex> on 404 responses. */
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page swept off somewhere. Head back to BroomBuilds.",
};

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#book", label: "Book a call" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col">
      <header className="container-page flex h-(--nav-h) items-center">
        <Link href="/" className="flex items-center gap-2.5" aria-label="BroomBuilds home">
          <BrandMark size={32} />
          <Wordmark className="text-[21px]" />
        </Link>
      </header>

      <div className="container-page flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Error 404</p>
        <div aria-hidden className="mt-6 flex items-center font-display text-[clamp(96px,20vw,220px)] font-bold leading-none tracking-[-0.06em]">
          <span className="fade-rise">4</span>
          <Image src="/mascot.png" alt="" width={220} height={220} priority className="fade-rise h-[0.9em] w-auto [--d:0.12s]" />
          <span className="fade-rise [--d:0.24s]">4</span>
        </div>
        <h1 className="mt-6 text-[36px] md:text-[48px]">
          This page swept off <span className="text-lilac">somewhere.</span>
        </h1>
        <Link
          href="/"
          className="mt-10 inline-flex h-[52px] items-center rounded-full bg-ink px-7 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-paper transition-[transform,background-color,color] duration-200 ease-out hover:bg-plum hover:text-white active:scale-[0.97]"
        >
          Back home
        </Link>
        <nav aria-label="Popular sections" className="mt-8 flex gap-6 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
