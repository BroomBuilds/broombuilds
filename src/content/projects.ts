/* Shipped work — typed data drives the work section.
   To add one: drop a screenshot (and optional film) in public/work/ and
   append an entry here. `url` is omitted rather than faked when a project
   has no public front door — an internal system is still real work. */

export type ProjectKind = "product" | "website";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** Plain words a non-technical visitor understands. */
  sector: string;
  /** One plain sentence: what it does. */
  line: string;
  /** Live site — cards open this in a new tab. */
  url?: string;
  /** Shown in place of the host when there is no public link. */
  note?: string;
  /** Screenshot or poster frame in public/work/. */
  image: string;
  /** Muted product film in public/work/. Plays while the card is on screen. */
  video?: string;
  /** Three named tools, in build order. */
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "bm-carpentry",
    name: "BM Carpentry & Landscaping",
    kind: "website",
    sector: "Carpentry & landscaping · Sydney",
    line: "A Sydney crew building decks, gardens, and outdoor spaces, from design to done.",
    // The build lives here. The .com.au domain still serves their old site
    // until it's pointed at this one.
    url: "https://bmcarpentryandlandscaping.netlify.app",
    image: "/work/bm-carpentry.jpg",
    stack: ["Website", "Brand", "Enquiries"],
  },
  {
    slug: "ai-patent-register",
    name: "AI Patent Register",
    kind: "product",
    sector: "AI product · Invention evaluation",
    line: "Find out if an idea is worth patenting: an AI evaluation, a pre-patent report and a timestamped certificate, for $49.",
    url: "https://www.aipatentregister.com",
    image: "/work/aipatent.jpg",
    stack: ["AI evaluation", "Payments", "Certificates"],
  },
  {
    slug: "secret-world",
    name: "Secret World",
    kind: "product",
    sector: "Mobile app · Local opportunities",
    line: "An app that maps the jobs, hustles, home businesses and deals hiding on your block. Earn it, sell it, save it.",
    url: "https://secretworld.ai",
    image: "/work/secretworld.jpg",
    stack: ["iOS & Android", "Maps", "Marketplace"],
  },
  {
    slug: "tomato-mnc-india",
    name: "Tomato M&C India",
    kind: "website",
    sector: "Medical supplies · India",
    line: "Supplier of Korean-made orthopedic casting tape and splints to hospitals across India.",
    url: "https://tomatomncindia.com",
    image: "/work/tomato-mnc-india.jpg",
    stack: ["Website", "Catalog", "Enquiries"],
  },
  {
    slug: "dolopreneur",
    name: "Dolopreneur",
    kind: "product",
    sector: "AI platform",
    line: "An AI platform that lets one operator run chat, websites, and voice support on autopilot.",
    note: "Demo on request",
    image: "/work/dolopreneur.jpg",
    stack: ["Next.js", "AI agents", "Voice"],
  },
  {
    slug: "access-exchange",
    name: "The Access Exchange",
    kind: "website",
    sector: "Leadership access · Education",
    line: "Connects people with accomplished leaders through an interview series, university programmes, live experiences and coaching.",
    url: "https://theaccessexchange.com",
    image: "/work/access-exchange-card.jpg",
    stack: ["Website", "Content", "Partnerships"],
  },
  {
    slug: "whizzit",
    name: "WhizzIT",
    kind: "website",
    sector: "Managed IT services · UK",
    line: "Managed IT, support, cloud and cyber security for businesses across the UK, with same-day response.",
    url: "https://staging.whizzit.co.uk",
    image: "/work/whizzit.jpg",
    stack: ["Website", "Lead capture", "Search"],
  },
  {
    slug: "tdot-immigration",
    name: "TDOT Immigration",
    kind: "website",
    sector: "Immigration services · Canada",
    line: "A Canadian immigration consultancy helping people study, work, and settle in Canada.",
    url: "https://tdotimm.com",
    image: "/work/tdot-immigration.jpg",
    stack: ["Website", "Search", "Lead capture"],
  },
  {
    slug: "centauri-renewables",
    name: "Centauri Renewables",
    kind: "website",
    sector: "Energy infrastructure",
    line: "A Space-to-Earth energy platform: advanced solar, domestic manufacturing, battery storage and long-duration power assets.",
    url: "https://centauri-renewables.com",
    image: "/work/centauri-card.jpg",
    stack: ["Website", "Investor story", "Brand"],
  },
];

/** "https://www.foo.com/x" → "foo.com" */
export const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");
