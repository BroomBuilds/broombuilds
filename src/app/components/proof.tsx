import Reveal from "./reveal";

/* No jargon, no metrics — the site you're on is the demo. */
const CLAIMS = [
  { k: "Speed", h: "Loads in a blink", d: "No spinners, no waiting. The page is simply there." },
  { k: "Search", h: "Built to be found", d: "Clean structure search engines actually understand, on every route." },
  { k: "Craft", h: "Built by hand", d: "No page builders, no bloat — every detail placed on purpose." },
  { k: "Proof", h: "You're reading it", d: "This site is built the way yours will be. Poke around." },
];

export default function Proof() {
  return (
    <section
      className="section wrap"
      id="proof"
      aria-label="Performance and SEO proof"
    >
      <Reveal>
        <p className="label">Built to rank and load fast</p>
        <h2>This site is the pitch.</h2>
        <p className="section-sub">
          Everything we sell — speed, structure, search visibility — you can
          feel on the page you&apos;re reading.
        </p>
      </Reveal>
      <dl className="proof-grid">
        {CLAIMS.map((c) => (
          <div key={c.k} className="proof-cell">
            <dt className="label">{c.k}</dt>
            <dd>
              <span className="proof-word">{c.h}</span>
              <span className="proof-desc">{c.d}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
