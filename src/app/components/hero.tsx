import Loader from "./loader";
import BookCall from "./book-call";
import { site } from "@/lib/site";

/* The hero assembles beneath the intro: mono eyebrow, two masked headline
   lines, CTAs, meta, scroll cue — all keyed off html[data-intro="rise"],
   so they lift exactly when the veil does. Fully visible without JS. */
export default function Hero() {
  return (
    <section className="hero wrap" aria-label="Introduction">
      <Loader />
      <p className="label intro-rise">{site.tagline}</p>
      <h1 className="hero-title">
        <span
          className="intro-rise"
          style={{ "--rise-delay": "0.08s" } as React.CSSProperties}
        >
          Every pixel <em className="seam-sweep">swept clean</em>.
        </span>
        <span
          className="intro-rise"
          style={{ "--rise-delay": "0.16s" } as React.CSSProperties}
        >
          Every visitor moved to act.
        </span>
      </h1>
      <div
        className="hero-cta intro-rise"
        style={{ "--rise-delay": "0.26s" } as React.CSSProperties}
      >
        <BookCall />
        <a className="btn btn-ghost" href="#work">
          See the work
        </a>
      </div>
      <p
        className="hero-meta label intro-rise"
        style={{ "--rise-delay": "0.34s" } as React.CSSProperties}
      >
        Design · Build · AI — one studio, end to end
      </p>
      <span className="hero-cue label" aria-hidden>
        Scroll
      </span>
    </section>
  );
}
