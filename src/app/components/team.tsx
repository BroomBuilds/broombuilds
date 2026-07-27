import Reveal from "./reveal";
import { team, initials } from "@/content/team";

/* The crew roster. A spec-sheet grid — hairline seams between cards, blueprint
   paper inside, monogram plate where a headshot would go. Hovering a card
   draws the seam across its top edge: the same broom stroke the nav overlay,
   the process line, and the booking curtain all use. Pure CSS, no JS. */
export default function Team() {
  return (
    <section className="section wrap" id="team" aria-label="Team">
      <Reveal>
        <p className="label">The crew</p>
        <h2 className="h-oneline">Small team. Senior hands. No handoffs.</h2>
        <p className="section-sub">
          The people who scope your project are the people who build it. You
          have their email and their number from day one.
        </p>
      </Reveal>

      <ul className="crew">
        {team.map((m, i) => (
          <li className="crew-card" key={m.slug}>
            <span className="crew-index label" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="crew-plate" aria-hidden>
              {initials(m.name)}
            </span>
            <h3 className="crew-name">{m.name}</h3>
            <p className="crew-role label">{m.role}</p>
            <p className="crew-focus">{m.focus}</p>
            <span className="crew-contact">
              <a href={`mailto:${m.email}`}>{m.email}</a>
              <a href={`tel:${m.phoneHref}`}>{m.phone}</a>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
