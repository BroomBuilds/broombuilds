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
    slug: "perfect-setter",
    name: "Perfect Setter",
    kind: "product",
    sector: "AI sales agent",
    line: "An agent that answers Instagram, Facebook and WhatsApp messages at any hour, and closes the sale.",
    url: "https://app.theperfectsetter.com",
    image: "/work/perfect-setter.jpg",
    video: "/work/perfect-setter.mp4",
    stack: ["Next.js", "Meta Graph API", "Supabase"],
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
    slug: "sciren",
    name: "SCIREN",
    kind: "product",
    sector: "AI voice agents",
    line: "Voice agents that answer the phone, handle the questions, and put the meeting in the calendar.",
    url: "https://sciren.io",
    image: "/work/sciren.jpg",
    video: "/work/sciren.mp4",
    stack: ["Vapi", "Twilio", "Stripe"],
  },
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
    slug: "cleancut",
    name: "CleanCut",
    kind: "product",
    sector: "AI video editing",
    line: "Raw recordings in, finished vertical clips out. Edited automatically, the same way every time.",
    url: "https://cleaner.contentcartel.net",
    image: "/work/cleancut.jpg",
    video: "/work/cleancut.mp4",
    stack: ["Python", "Remotion", "Supabase"],
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
    slug: "ai-brain",
    name: "The AI Brain",
    kind: "product",
    sector: "AI agent with memory",
    line: "An agent that remembers everything it has done, and has been running unattended since June.",
    note: "Internal system",
    image: "/work/ai-brain.jpg",
    video: "/work/ai-brain.mp4",
    stack: ["TypeScript", "MCP", "pgvector"],
  },
  {
    slug: "ai-video-and-motion",
    name: "AI Video & Motion",
    kind: "product",
    sector: "AI film & motion graphics",
    line: "Generated film with the same face in every shot, and motion graphics that render identically twice.",
    note: "Reel on request",
    image: "/work/ai-video-and-motion.jpg",
    video: "/work/ai-video-and-motion.mp4",
    stack: ["Image-to-video", "Three.js", "Remotion"],
  },
];

/** "https://www.foo.com/x" → "foo.com" */
export const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");
