/* Case studies — typed data drives the work section, detail routes, and sitemap.
   To add one: append an entry here; the route, card, and sitemap follow. */

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  year: string;
  /** One line: who they are + what was broken. Shown on the card. */
  problem: string;
  /** The headline outcome, as a number. */
  result: string;
  resultDetail: string;
  scope: string[];
  /** Big typographic cover — initial + hue rotation for the ink-toned gradient. */
  mark: string;
  /** Full story, one paragraph per entry. */
  story: string[];
  metrics: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "halden-co",
    client: "Halden & Co",
    sector: "B2B Consultancy",
    year: "2026",
    problem:
      "A respected consultancy losing leads to a five-year-old brochure site nobody trusted enough to book through.",
    result: "2.1×",
    resultDetail: "booked calls in the first 60 days",
    scope: ["Website design & build", "CRO", "Copy structure"],
    mark: "H",
    story: [
      "Halden & Co win work through referrals, but every referral checked the website first — and the website undid the referral. Dated design, slow pages, and a contact form that went to an inbox nobody watched.",
      "We rebuilt it as a single conversion path: proof up top, services stated in plain language, and a calendar embedded where the contact form used to die. Every page loads in under a second.",
      "The measurable change wasn't traffic — it was conversion. Same visitors, twice the booked calls, because the site finally matched the quality of the referral that sent them.",
    ],
    metrics: [
      { label: "Booked calls", value: "2.1×" },
      { label: "Largest Contentful Paint", value: "0.7s" },
      { label: "Bounce rate", value: "−34%" },
    ],
  },
  {
    slug: "fernway",
    client: "Fernway",
    sector: "D2C Skincare",
    year: "2025",
    problem:
      "A skincare brand whose Shopify theme took four seconds to paint — on the mobile devices 80% of their customers use.",
    result: "0.6s",
    resultDetail: "LCP, down from 4.1s",
    scope: ["Headless storefront", "Performance", "Design system"],
    mark: "F",
    story: [
      "Fernway's product photography deserved better than a theme fighting itself — five apps injecting scripts, three font families, and a hero image loading last.",
      "We moved the storefront to a headless build: server-rendered pages, images sized to the device requesting them, and one font file. The design got quieter and the product got louder.",
      "Largest Contentful Paint went from 4.1 seconds to 0.6. Mobile checkout completion followed the speed.",
    ],
    metrics: [
      { label: "LCP", value: "0.6s" },
      { label: "Mobile conversion", value: "+28%" },
      { label: "Core Web Vitals", value: "3/3 green" },
    ],
  },
  {
    slug: "northstack",
    client: "Northstack",
    sector: "B2B SaaS",
    year: "2025",
    problem:
      "A logistics SaaS invisible to search — strong product, zero organic pipeline, paying for every single click.",
    result: "+48%",
    resultDetail: "organic traffic in four months",
    scope: ["Technical SEO", "Site architecture", "Content system"],
    mark: "N",
    story: [
      "Northstack ranked for their own name and nothing else. The site had no semantic structure, no internal linking logic, and rendered its content client-side where crawlers gave up.",
      "We rebuilt the architecture around the queries their buyers actually type: server-rendered comparison and integration pages, structured data on every route, and a content system the team can extend without us.",
      "Four months later organic traffic was up 48% and their first page-one rankings arrived for commercial-intent terms. Paid spend now supplements the pipeline instead of being the pipeline.",
    ],
    metrics: [
      { label: "Organic traffic", value: "+48%" },
      { label: "Page-one keywords", value: "0 → 23" },
      { label: "Demo requests from organic", value: "+61%" },
    ],
  },
  {
    slug: "atelier-mira",
    client: "Atelier Mira",
    sector: "Architecture Studio",
    year: "2026",
    problem:
      "An architecture practice with award-winning work buried in a PDF portfolio clients had to request by email.",
    result: "2×",
    resultDetail: "qualified enquiries per month",
    scope: ["Brand & identity", "Portfolio site", "SEO"],
    mark: "M",
    story: [
      "Atelier Mira's work spoke for itself — to anyone who managed to see it. The studio had no real web presence, just an email address and a 40MB PDF.",
      "We built an identity system and a portfolio site where the projects breathe: full-bleed photography, fast image delivery, and project pages structured so search engines understand what the studio builds and where.",
      "Enquiries doubled, and — more usefully — they arrived pre-qualified, because prospects had already seen the work and the process before writing.",
    ],
    metrics: [
      { label: "Qualified enquiries", value: "2×" },
      { label: "Time on portfolio pages", value: "3m 40s avg" },
      { label: "Load time", value: "0.8s" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
