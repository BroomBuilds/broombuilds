// INTRO DISABLED — see the introScript note in app/layout.tsx to re-enable.
// import Loader from "./loader";
import BookCall from "./book-call";
import { site } from "@/lib/site";

/* What we make — every word ships in the HTML (crawlers and AI answer
   engines read the whole list); CSS cycles which one is visible. */
const BUILDS = [
  "websites",
  "landing pages",
  "web apps",
  "AI automations",
  "AI chatbots",
  "brand systems",
];

/* The hero assembles beneath the intro: mono eyebrow, headline with the
   rotating build-list, the brand line, CTAs, direct contact, scroll cue —
   all keyed off html[data-intro="rise"], so they lift exactly when the veil
   does. Fully visible without JS. */
export default function Hero() {
  return (
    <section className="hero wrap" aria-label="Introduction">
      {/* <Loader /> */}
      <p className="label intro-rise">{site.tagline}</p>
      <h1 className="hero-title">
        <span
          className="intro-rise"
          style={{ "--rise-delay": "0.08s" } as React.CSSProperties}
        >
          We design, build &amp; automate
        </span>
        <span
          className="intro-rise hero-rotator"
          style={{ "--rise-delay": "0.16s" } as React.CSSProperties}
        >
          {/* screen readers + crawlers get the flat list, once */}
          <span className="sr-only">{BUILDS.join(", ")}.</span>
          <span
            className="rot-track"
            style={{ "--rot-n": BUILDS.length } as React.CSSProperties}
            aria-hidden
          >
            {BUILDS.map((word, i) => (
              <span
                key={word}
                className="rot-word"
                style={{ "--rot-i": i } as React.CSSProperties}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
      </h1>
      <p
        className="hero-line intro-rise"
        style={{ "--rise-delay": "0.24s" } as React.CSSProperties}
      >
        Every pixel swept clean. Every visitor moved to act.
      </p>
      <div
        className="hero-cta intro-rise"
        style={{ "--rise-delay": "0.32s" } as React.CSSProperties}
      >
        <BookCall />
        <a className="btn btn-ghost" href={`tel:${site.phoneHref}`}>
          Call {site.phone}
        </a>
      </div>
      <p
        className="hero-meta label intro-rise"
        style={{ "--rise-delay": "0.4s" } as React.CSSProperties}
      >
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span aria-hidden>·</span>
        <a href="#work">See the work</a>
      </p>
      <span className="hero-cue label" aria-hidden>
        Scroll
      </span>
    </section>
  );
}
