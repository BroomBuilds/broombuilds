import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { site, SITE_URL } from "@/lib/site";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import BookCall from "../../components/book-call";
import CaseCover from "../../components/case-cover";
import Reveal from "../../components/reveal";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.client} — ${cs.result} ${cs.resultDetail}`;
  return {
    title,
    description: cs.problem,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      title: `${cs.client} × ${site.name}`,
      description: cs.problem,
      url: `${SITE_URL}/work/${cs.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
      { "@type": "ListItem", position: 3, name: cs.client, item: `${SITE_URL}/work/${cs.slug}` },
    ],
  };

  return (
    <div id="top">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main" className="case wrap">
        <Reveal>
          <p className="label case-crumb">
            <Link href="/#work">← All work</Link>
          </p>
          <p className="label">
            {cs.sector} · {cs.year}
          </p>
          <h1 className="case-title">{cs.client}</h1>
          <p className="case-problem">{cs.problem}</p>
        </Reveal>

        {/* Morph target — the work-index preview carries the same name,
            so the thumbnail physically becomes this cover. */}
        <div className="case-hero">
          <CaseCover slug={cs.slug} mark={cs.mark} />
        </div>

        <div className="case-body">
          <Reveal className="case-story">
            {cs.story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="case-aside" delay={0.1}>
            <dl className="case-metrics">
              {cs.metrics.map((m) => (
                <div key={m.label} className="case-metric">
                  <dt className="label">{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
            <p className="label case-scope-head">Scope</p>
            <ul className="case-scope">
              {cs.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="case-cta">
          <h2>Want numbers like these?</h2>
          <BookCall />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
