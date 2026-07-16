import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Wordmark from "./components/wordmark";

/* Root not-found: also catches every unmatched URL app-wide (Next 13.3+).
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
    <main className="nf" role="main">
      {/* brand pinned top-left, mirroring the site nav */}
      <header className="nf-nav wrap">
        <Link href="/" className="nf-brand" aria-label="BroomBuilds — home">
          <Wordmark />
        </Link>
      </header>

      <div className="nf-inner wrap">
        <p className="nf-tag label">Error 404</p>

        {/* 4 · mascot · 4 — the code reads visually; screen readers get the tag + h1 */}
        <div className="nf-code" aria-hidden="true">
          <span className="nf-d" style={{ "--i": 0 } as CSSProperties}>
            4
          </span>
          <Image
            src="/mascot.png"
            alt=""
            width={300}
            height={300}
            className="nf-mascot"
            priority
          />
          <span className="nf-d" style={{ "--i": 1 } as CSSProperties}>
            4
          </span>
        </div>

        <h1 className="nf-title">This page swept off somewhere.</h1>

        <div className="nf-actions">
          <Link href="/" className="btn btn-primary nf-home">
            Back home
          </Link>
        </div>

        <nav className="nf-links label" aria-label="Popular sections">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
