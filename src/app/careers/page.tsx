import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/nav";
import Footer from "../components/footer";
import Reveal from "../components/reveal";
import { roles, HIRING_DASHBOARD_URL } from "@/content/careers";
import { site, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at BroomBuilds — Fullstack Developer and Fullstack AI Engineer. Remote, senior scope, shipped to production.",
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/careers`,
    title: `Careers — ${site.name}`,
    description:
      "Open roles at BroomBuilds — Fullstack Developer and Fullstack AI Engineer. Remote, senior scope, shipped to production.",
  },
};

/* One JobPosting per open role. Google Jobs and AI answer engines read this;
   the visible page below is the same data. Remote roles need both
   jobLocationType and applicantLocationRequirements to validate. */
const jobsLd = {
  "@context": "https://schema.org",
  "@graph": roles.map((r) => ({
    "@type": "JobPosting",
    "@id": `${SITE_URL}/careers#${r.slug}`,
    title: r.title,
    description: [
      `<p>${r.summary}</p>`,
      `<p><strong>What you'll do</strong></p><ul>${r.responsibilities.map((x) => `<li>${x}</li>`).join("")}</ul>`,
      `<p><strong>What we look for</strong></p><ul>${r.looking.map((x) => `<li>${x}</li>`).join("")}</ul>`,
      `<p><strong>Stack</strong>: ${r.stack.join(", ")}.</p>`,
    ].join(""),
    datePosted: r.datePosted,
    validThrough: r.validThrough,
    employmentType: "FULL_TIME",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "India" },
    directApply: false,
    url: HIRING_DASHBOARD_URL,
    skills: r.stack.join(", "),
    /* Spelled out rather than a bare @id: Google validates each JobPosting on
       its own, and merging with the layout's Organization node isn't guaranteed. */
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: site.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
    },
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: r.slug,
    },
  })),
};

export default function CareersPage() {
  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobsLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main id="main">
        <section className="section wrap page-head" aria-label="Careers">
          <Reveal>
            <p className="label">Careers — {roles.length} open</p>
            <h1 className="page-title h-oneline">
              Build things people actually use.
            </h1>
            <p className="section-sub">
              We&apos;re a small studio that designs, builds, and automates for
              clients worldwide. No ticket queues, no handoff to a delivery
              team — you scope it, you build it, you launch it, then you stay
              and watch it work.
            </p>
          </Reveal>
          <div className="careers-cta">
            <a
              className="btn btn-primary"
              href={HIRING_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply on the hiring dashboard ↗
            </a>
            <Link className="btn btn-ghost" href="/#team">
              Meet the crew
            </Link>
          </div>
        </section>

        <div className="wrap">
          {roles.map((r) => (
            <article className="jd" id={r.slug} key={r.slug}>
              <Reveal>
                <div className="jd-head">
                  <h2>{r.title}</h2>
                  <span className="role-meta">
                    <span className="role-chip label">{r.type}</span>
                    <span className="role-chip label">{r.location}</span>
                  </span>
                </div>
                <p className="jd-summary">{r.summary}</p>
              </Reveal>

              <div className="jd-grid">
                <div>
                  <p className="label">What you&apos;ll do</p>
                  <ul className="jd-list">
                    {r.responsibilities.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label">What we look for</p>
                  <ul className="jd-list">
                    {r.looking.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label">Stack</p>
                  <span className="jd-stack">
                    {r.stack.map((s) => (
                      <span className="role-chip label" key={s}>
                        {s}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              <a
                className="btn btn-ghost jd-apply"
                href={HIRING_DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply — {r.title} ↗
              </a>
            </article>
          ))}
        </div>

        <section className="section wrap" aria-label="How hiring works">
          <Reveal>
            <p className="label">How hiring works</p>
            <h2 className="h-oneline">Four steps. Same sweep as the work.</h2>
          </Reveal>
          <ol className="steps hiring-steps">
            {[
              { n: "01", h: "Apply", d: "One form on the hiring dashboard. No cover letter." },
              { n: "02", h: "Intro call", d: "Thirty minutes. What you've shipped, what you want next." },
              { n: "03", h: "Build together", d: "A paid, scoped task from real work — not a whiteboard puzzle." },
              { n: "04", h: "Offer", d: "Decision within a week of the task. Start date is yours." },
            ].map((s) => (
              <li className="step" key={s.n}>
                <span className="step-num label">{s.n}</span>
                <span className="step-mask">
                  <h3>{s.h}</h3>
                </span>
                <span className="step-mask">
                  <p>{s.d}</p>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
