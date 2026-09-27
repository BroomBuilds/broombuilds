/* Single source of truth for SEO + brand metadata.
   Change SITE_URL to the real production domain before launch. */

export const SITE_URL = "https://broombuilds.com";

export const site = {
  name: "BroomBuilds",
  legalName: "BroomBuilds Studio",
  /* Brand-name variants people actually type — feeds schema alternateName so
     "broom builds", "broom build studio" etc. resolve to this entity. */
  aliases: [
    "Broom Builds",
    "Broombuilds",
    "Broom Build",
    "BroomBuilds Studio",
    "Broom Builds Design Studio",
  ],
  url: SITE_URL,
  tagline: "Design, Build & AI Automation Studio",
  positioning:
    "We design and build websites, web apps and custom AI solutions: agents, automations and AI products that do real work for your business.",
  description:
    "BroomBuilds is a design, build and AI studio. We design and build websites, landing pages, web apps and brand systems, set them up to be found on Google and recommended by AI assistants, and build custom AI solutions: agents that answer customers and book calls, automations that run operations, and AI products built from scratch.",
  /* ~150 chars — the <meta name="description"> snippet. Kept short so Google
     shows it whole; `description` above stays long for OG/schema/manifest. */
  metaDescription:
    "Design, build & AI studio. Websites that win customers, and custom AI agents, automations and products that do the work.",
  keywords: [
    "BroomBuilds",
    "Broom Builds",
    "Broombuilds studio",
    "broom builds design studio",
    "design studio",
    "design and build studio",
    "get a website built",
    "get my website built",
    "hire a web design studio",
    "web design studio",
    "website design and build",
    "landing page design",
    "web performance",
    "technical SEO",
    "generative engine optimization",
    "conversion rate optimization",
    "brand identity design",
    "Next.js studio",
    "fast websites",
    "AI automation studio",
    "AI automation agency",
    "build AI automations",
    "AI development services",
    "AI website development",
    "AI integration services",
    "AI chatbot development",
    "AI automation for business",
    "AI-powered web apps",
  ],
  email: "varun17593@gmail.com",
  phone: "+91 9580868588",
  /* E.164 — for tel: links and schema. Keep in sync with `phone`. */
  phoneHref: "+919580868588",
  location: "Worldwide",
  founded: "2026",
  locale: "en_US",
  twitter: "@broombuilds",
  socials: {
    instagram: "https://instagram.com/broombuilds",
    linkedin: "https://linkedin.com/company/broombuilds",
    x: "https://x.com/broombuilds",
  },
} as const;

/** In-page sections — drives the nav and footer links from one list. */
export const sections = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
] as const;
