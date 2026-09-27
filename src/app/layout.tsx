import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { site, SITE_URL } from "@/lib/site";
import SmoothScroll from "./components/smooth-scroll";
import "./globals.css";

/* The house type: Bricolage for anything that's a headline, Inter for
   reading, JetBrains Mono for labels, buttons and data. */
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

/* Not ours: BM Carpentry & Landscaping's brand face, used only inside the
   screens that showcase their site, so the showcase is true to the build. */
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
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
    title: `${site.name} | ${site.tagline}`,
    description: site.metaDescription,
    // og image auto-linked from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
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
  "AI chat & WhatsApp agents",
  "AI voice agents",
  "Workflow automation",
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
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
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
        "AI voice agents",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} ${hanken.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
