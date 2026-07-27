import Link from "next/link";
import BookCall from "./book-call";
import KineticMark from "./kinetic-mark";
import LocalClock from "./local-clock";
import { site } from "@/lib/site";
import { HIRING_DASHBOARD_URL, roles } from "@/content/careers";

const MARQUEE = [
  "Websites",
  "Landing pages",
  "Web apps",
  "Brand & identity",
  "Get found on Google",
  "Get recommended by AI",
  "Speed & more sales",
  "AI features",
];

export default function Footer() {
  const line = MARQUEE.map((m) => `${m} · `).join("");
  return (
    <footer className="footer" aria-label="Footer">
      <div className="wrap">
        <div className="footer-top">
          <p className="footer-pitch">
            Have a project? The fastest way to find out if we fit is a call.
          </p>
          <BookCall variant="ghost" />
        </div>
      </div>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          <span className="marquee-line label">{line}</span>
          <span className="marquee-line label">{line}</span>
        </div>
      </div>

      <div className="wrap">
        <nav className="footer-nav label" aria-label="Site sections">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#team">Team</Link>
          <Link href="/careers">
            Careers
            {roles.length > 0 && (
              <span className="footer-open">{roles.length} open</span>
            )}
          </Link>
          <a href={HIRING_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
            Hiring dashboard ↗
          </a>
        </nav>

        <KineticMark />

        <div className="footer-meta">
          <span className="footer-contact">
            <a className="footer-mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="footer-mail" href={`tel:${site.phoneHref}`}>
              {site.phone}
            </a>
          </span>
          <nav className="footer-socials" aria-label="Social links">
            {Object.entries(site.socials).map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer">
                {k === "x" ? "X" : k[0].toUpperCase() + k.slice(1)}
              </a>
            ))}
          </nav>
          <LocalClock />
        </div>

        <p className="footer-legal label">
          © {new Date().getFullYear()} {site.legalName}. Built by hand, loads in a blink.
        </p>
      </div>
    </footer>
  );
}
