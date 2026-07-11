/* Live client projects — typed data drives the work section.
   To add one: drop a screenshot in public/work/ and append an entry here. */

export type Project = {
  slug: string;
  client: string;
  /** Plain words a non-technical visitor understands. */
  sector: string;
  /** One plain sentence, shown in the hover glimpse. */
  line: string;
  /** Live site — cards open this in a new tab. */
  url: string;
  /** Screenshot in public/work/. */
  image: string;
};

export const projects: Project[] = [
  {
    slug: "dolopreneur",
    client: "Dolopreneur",
    sector: "AI Platform",
    line: "An AI platform that lets one operator run chat, websites, and voice support on autopilot.",
    url: "https://dolopreneur.com",
    image: "/work/dolopreneur.jpg",
  },
  {
    slug: "tdot-immigration",
    client: "TDOT Immigration",
    sector: "Immigration Services",
    line: "A Canadian immigration consultancy helping people study, work, and settle in Canada.",
    url: "https://tdotimm.com",
    image: "/work/tdot-immigration.jpg",
  },
  {
    slug: "tomato-mnc-india",
    client: "Tomato M&C India",
    sector: "Medical Supplies",
    line: "Supplier of Korean-made orthopedic casting tape and splints to hospitals across India.",
    url: "https://tomatomncindia.com",
    image: "/work/tomato-mnc-india.jpg",
  },
  {
    slug: "bm-carpentry",
    client: "BM Carpentry & Landscaping",
    sector: "Carpentry & Landscaping",
    line: "A Sydney crew building decks, gardens, and outdoor spaces — design to done.",
    url: "https://bmcarpentryandlandscaping.netlify.app",
    image: "/work/bm-carpentry.jpg",
  },
];
