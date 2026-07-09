/* Single source of truth for SEO + brand metadata.
   Change SITE_URL to the real production domain before launch. */

export const SITE_URL = "https://broombuilds.com";

export const site = {
  name: "BroomBuilds",
  legalName: "BroomBuilds Studio",
  url: SITE_URL,
  tagline: "Design & Build Studio",
  positioning:
    "We design and build websites that load in under a second and turn visitors into booked calls.",
  description:
    "BroomBuilds is a boutique design-and-build studio. Fast, beautiful websites and AI-powered experiences with SEO and performance baked in — built to rank, load in under a second, and turn visitors into booked calls.",
  keywords: [
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
    "AI development services",
    "AI website development",
    "AI integration services",
    "AI chatbot development",
    "AI automation for business",
    "AI-powered web apps",
    "BroomBuilds",
  ],
  email: "hello@broombuilds.com",
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
