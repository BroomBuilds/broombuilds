import BookCall from "./book-call";
import KineticMark from "./kinetic-mark";
import LocalClock from "./local-clock";
import { site } from "@/lib/site";

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
        <KineticMark />

        <div className="footer-meta">
          <a className="footer-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
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
