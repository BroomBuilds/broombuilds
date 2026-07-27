import Link from "next/link";
import Reveal from "./reveal";
import { roles, HIRING_DASHBOARD_URL } from "@/content/careers";

/* Open roles, homepage strip. Same index-row language as Selected work —
   numbered, hairline-ruled, nudges right on hover — so it reads as part of
   the same document rather than a bolted-on jobs board. Detail lives on
   /careers; applications live on the hiring dashboard. */
export default function Careers() {
  if (roles.length === 0) return null;

  return (
    <section className="section wrap" id="careers" aria-label="Careers">
      <Reveal>
        {/* count lives in the eyebrow, not the headline — the headline stays
            true whatever the list length is */}
        <p className="label">Careers — {roles.length} open</p>
        <h2 className="h-oneline">Open roles. Every one of them builds.</h2>
        <p className="section-sub">
          We hire people who ship and then stay to see it work. Remote, senior
          scope, no ticket queues.
        </p>
      </Reveal>

      <ul className="roles">
        {roles.map((r, i) => (
          <li key={r.slug}>
            <Link href={`/careers#${r.slug}`} className="role-row">
              <span className="role-num label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="role-title">{r.title}</span>
              <span className="role-meta">
                <span className="role-chip label">{r.type}</span>
                <span className="role-chip label">{r.location}</span>
              </span>
              <span className="role-go label" aria-hidden>
                Details <span className="role-arrow">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="careers-cta">
        <a
          className="btn btn-primary"
          href={HIRING_DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hiring dashboard ↗
        </a>
        <Link className="btn btn-ghost" href="/careers">
          Read the roles
        </Link>
      </div>
    </section>
  );
}
