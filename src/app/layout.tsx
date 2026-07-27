import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { site, SITE_URL } from "@/lib/site";
import { team } from "@/content/team";
import SmoothScroll from "./components/smooth-scroll";
import Cursor from "./components/cursor";
import Dust from "./components/dust";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  category: "design",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.metaDescription,
    // og image auto-linked from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.metaDescription,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const SERVICES_LD = [
  "Website design & build",
  "Landing pages",
  "Web apps",
  "Brand & identity systems",
  "SEO & generative engine optimization",
  "Performance & CRO",
  "AI development & integration",
  "AI chatbots & automation",
  "AI-powered web experiences",
];

// Structured data: studio + site + services, for search engines and AI crawlers.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: site.name,
      legalName: site.legalName,
      alternateName: [...site.aliases],
      slogan: site.tagline,
      url: SITE_URL,
      description: site.description,
      foundingDate: site.founded,
      email: site.email,
      telephone: site.phone,
      logo: `${SITE_URL}/icon.png`,
      sameAs: Object.values(site.socials),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        email: site.email,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      // named crew — entity signal that this is a firm, not a single freelancer
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: team.length,
      },
      employee: team.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
      })),
      // GEO: plain-language capability list for AI crawlers & answer engines
      knowsAbout: [
        "web design",
        "web development",
        "Next.js",
        "technical SEO",
        "generative engine optimization",
        "web performance",
        "conversion rate optimization",
        "brand identity",
        "AI development",
        "AI integration",
        "AI chatbots",
        "AI automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      description: site.positioning,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    ...SERVICES_LD.map((s) => ({
      "@type": "Service",
      name: s,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
    })),
  ],
};

/* Runs before first paint: decides whether the intro plays. Absent JS,
   the attribute never lands and all content is simply visible.
   ?loader forces a replay (dev/QA); reduced motion always wins.

   INTRO DISABLED — the homepage paints straight away. 'done' is the same
   state a return visit lands in, so every intro-keyed rule (.intro-rise,
   .nav-mascot, .hero-rotator::after, .loader) resolves to its finished
   form, and Loader's effect bails on anything but 'run'.
   To switch the intro back on: restore the line below and un-comment
   <Loader /> in components/hero.tsx. Nothing else changes. */
const introScript = `(function(){try{document.documentElement.dataset.intro='done'}catch(e){}})()`;
// const introScript = `(function(){try{var f=/[?&]loader/.test(location.search);var skip=matchMedia('(prefers-reduced-motion: reduce)').matches||(!f&&(location.pathname!=='/'||sessionStorage.getItem('bb-intro')));document.documentElement.dataset.intro=skip?'done':'run'}catch(e){document.documentElement.dataset.intro='done'}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Dust />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
