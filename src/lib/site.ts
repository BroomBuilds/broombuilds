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
    "We design and build websites, web apps, and AI automations that load in under a second and turn visitors into booked calls.",
  description:
    "BroomBuilds is a design, build, and AI automation studio. We design and build websites, landing pages, web apps, brand systems, and AI automations — with SEO and performance baked in, so they rank, load in under a second, and turn visitors into booked calls.",
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
  location: "Lucknow / Worldwide",
  founded: "2026",
  locale: "en_US",
  twitter: "@broombuilds",
  socials: {
    instagram: "https://instagram.com/broombuilds",
    linkedin: "https://linkedin.com/company/broombuilds",
    x: "https://x.com/broombuilds",
  },
} as const;

/** In-page sections — drives the sitemap and anchor nav from one list. */
export const sections = [
  { id: "top", label: "Home", priority: 1.0 },
  { id: "work", label: "Work", priority: 0.9 },
  { id: "services", label: "Services", priority: 0.8 },
  { id: "process", label: "Process", priority: 0.6 },
  { id: "book", label: "Book a call", priority: 0.9 },
] as const;
