/* Open roles — typed data drives both the homepage strip and /careers,
   and feeds the JobPosting structured data on the careers page.
   To close a role: delete the entry. Both surfaces empty out on their own. */

/** Applications are taken on the hiring dashboard, not by email. */
export const HIRING_DASHBOARD_URL =
  "https://dev-hire-hiring-dashboard.vercel.app/";

export type Role = {
  slug: string;
  title: string;
  /** Employment type — also mapped into JobPosting.employmentType. */
  type: string;
  location: string;
  /** ISO dates for JobPosting. Bump these when a role is re-listed. */
  datePosted: string;
  validThrough: string;
  /** One paragraph a candidate can decide from. */
  summary: string;
  responsibilities: string[];
  stack: string[];
  looking: string[];
};

export const roles: Role[] = [
  {
    slug: "fullstack-developer",
    title: "Fullstack Developer",
    type: "Full-time",
    location: "Remote (India)",
    datePosted: "2026-07-27",
    validThrough: "2026-10-25",
    summary:
      "You own features end to end — the interface someone clicks, the API behind it, and the data underneath. Client work, real deadlines, shipped to production and watched after launch.",
    responsibilities: [
      "Build client sites and web apps from design through launch",
      "Design and implement the APIs and data models behind them",
      "Hold the performance bar: sub-second loads, clean Core Web Vitals",
      "Review teammates' work and keep the codebase boring to read",
      "Stay on a project after launch — fixes, measurement, iteration",
    ],
    stack: ["TypeScript", "Next.js", "React", "Node", "PostgreSQL", "Tailwind", "Vercel"],
    looking: [
      "2+ years shipping production web applications",
      "Comfortable across the whole request path, not just one end",
      "An eye for detail — you notice when spacing or motion is off",
      "Writes plainly, in code and in messages",
    ],
  },
  {
    slug: "fullstack-ai-engineer",
    title: "Fullstack AI Engineer",
    type: "Full-time",
    location: "Remote (India)",
    datePosted: "2026-07-27",
    validThrough: "2026-10-25",
    summary:
      "You build the AI layer of client products and the product around it: agents, chat, retrieval, and automations that run unattended — plus the interface people actually use them through.",
    responsibilities: [
      "Design and ship LLM features: chat, retrieval, agents, tool use",
      "Build the automation pipelines around them and keep them running",
      "Wire evaluation and guardrails in before anything reaches a client",
      "Own the surrounding product surface — UI, API, and deployment",
      "Watch cost and latency the same way we watch page speed",
    ],
    stack: ["TypeScript", "Python", "Next.js", "Claude / OpenAI APIs", "Vector DBs", "n8n", "Vercel"],
    looking: [
      "Shipped at least one LLM feature that real users touched",
      "Fullstack by default — you can build the app, not just the model call",
      "Skeptical of demos; you measure before you claim",
      "Keeps up with the field without chasing every release",
    ],
  },
];
