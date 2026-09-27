/* Homepage copy. The page is one argument, in order: each section answers
   the question the one before it leaves open. Plain words only, and no em
   dashes in anything a visitor reads. */

/* Two short parallel lines, one per thing we make: the website, and AI as a
   product in its own right, not only something bolted onto a site. Short on
   purpose, so the headline and the sentence under it share one width. */
export const hero = {
  lines: [
    { verb: "Websites", rest: "that sell." },
    { verb: "Custom AI", rest: "that works." },
  ],
  sub: "We design and build websites that win customers, and custom AI agents, automations and products that take the busywork off your team.",
};

/* The three layers the live site comes apart into, top to bottom. */
export const layers = [
  {
    n: "01",
    name: "Design",
    title: "What your customers see.",
    body: "Brand, layout and words that make the right people stay.",
  },
  {
    n: "02",
    name: "Build",
    title: "Fast, and found on Google & AI.",
    body: "Pages that load in a blink, rank on Google and get recommended by ChatGPT.",
  },
  {
    n: "03",
    name: "Automate",
    title: "What does the work.",
    body: "Agents and workflows that answer, book and follow up while you sleep.",
  },
] as const;

export const questions = {
  heading: "Every business we meet is asking one of two questions.",
  cards: [
    {
      title: "Why isn’t my website bringing in customers?",
      body: "Most sites look fine and do nothing. We rebuild yours to load instantly, show up on Google, get named by AI assistants, and turn visitors into enquiries.",
      link: { label: "What we build", href: "#services" },
    },
    {
      title: "Where is my team losing hours to busywork?",
      body: "Answering the same questions. Chasing quotes. Picking up the phone on the job. We hand that work to AI agents that never clock off, with a human one tap away.",
      link: { label: "How we automate it", href: "#process" },
    },
  ],
};

export const answer = {
  question: "What is BroomBuilds?",
  answer:
    "BroomBuilds is a design, build and AI studio working with businesses worldwide. We design and build websites, landing pages and web apps, set them up to be found on Google and recommended by AI assistants, and build custom AI solutions: agents that answer customers and book calls, automations that run operations, and AI products built from scratch.",
  points: [
    "Websites & landing pages",
    "Web apps & AI products",
    "Brand & identity",
    "Google + AI search",
    "AI agents & automation",
    "Custom AI solutions",
    "Clients worldwide",
  ],
};

export type ServiceTab = {
  id: "design" | "build" | "automate" | "grow";
  label: string;
  title: string;
  lead: string;
  items: { name: string; line: string; tag?: string }[];
};

export const services = {
  eyebrow: "What we build",
  heading: "One studio for the whole thing.",
  lead: "Most businesses juggle a designer, a developer and an “AI person”. We’re all three: one team, one call, one plan.",
  tabs: [
    {
      id: "design",
      label: "Design",
      title: "Look like the leader in your market.",
      lead: "First impressions are made in under a second. We make sure yours says “these people are the real thing.”",
      items: [
        { name: "Brand & identity", line: "Logo, colors, and a look that stays consistent everywhere." },
        { name: "Websites", line: "Your whole site, designed, written, built and launched for you." },
        { name: "Landing pages", line: "One page with one job: turn visitors into enquiries." },
      ],
    },
    {
      id: "build",
      label: "Build",
      title: "Software that feels instant.",
      lead: "When the job is bigger than a website, like a portal, a dashboard or a whole product, we build that too.",
      items: [
        { name: "Web apps", line: "Custom tools, portals and dashboards that feel instant to use." },
        { name: "AI products", line: "Platforms with AI at the core. Shipped, hosted and running." },
        { name: "Speed & more sales", line: "Pages that load instantly and turn more visitors into customers." },
      ],
    },
    {
      id: "automate",
      label: "Automate",
      title: "Busywork, handled.",
      lead: "Agents that do real work inside the tools you already use, and hand over to a human the moment it matters.",
      items: [
        { name: "Chat & DM agents", line: "Answer WhatsApp, Instagram and website chats in seconds, and close the sale." },
        { name: "Voice agents", line: "Pick up the phone, handle the questions, put the site visit in the calendar." },
        { name: "Workflow automation", line: "Leads, follow-ups, invoices and reports, moving on their own." },
      ],
    },
    {
      id: "grow",
      label: "Grow",
      title: "Get found. Get picked.",
      lead: "A great site nobody finds is a secret. We make sure search engines, and the AI assistants people now ask instead, know your name.",
      items: [
        { name: "Get found on Google", line: "Search engine optimization: when your customers search, you show up." },
        { name: "Get recommended by AI", line: "When people ask ChatGPT or Google’s AI who to hire, your name comes up.", tag: "New" },
        { name: "Keep improving", line: "New pages, fixes and a plain-English report on what’s working, every month." },
      ],
    },
  ] satisfies ServiceTab[],
};

export const work = {
  eyebrow: "Selected work",
  heading: "Live on the internet. Not in a slide deck.",
  lead: "AI products we designed, built and run, and websites for businesses on three continents. Every one is live. Open it and see.",
};

export type StepId = "listen" | "design" | "build" | "automate" | "launch" | "grow";

export const method = {
  heading: "How a project runs.",
  lead: "Six steps from the first call to a site that keeps getting better. You see real work every week. No decks, no throwaway mockups.",
  groups: [
    {
      name: "Make it",
      steps: [
        {
          id: "listen" as StepId,
          label: "Listen",
          title: "One call to find what’s in the way.",
          body: "We learn how you win work today and where it leaks, then send back a written plan: what we’ll build, when, and one clear price.",
        },
        {
          id: "design" as StepId,
          label: "Design",
          title: "See the real thing take shape.",
          body: "Brand, layout and words, designed in the browser, so what you approve is exactly what ships.",
        },
        {
          id: "build" as StepId,
          label: "Build",
          title: "Hand-built for speed.",
          body: "Clean code, instant pages, and every page set up so Google and AI assistants understand what you do.",
        },
      ],
    },
    {
      name: "Make it work",
      steps: [
        {
          id: "automate" as StepId,
          label: "Automate",
          title: "Put the busywork on autopilot.",
          body: "We connect the site to your inbox, calendar, CRM and phone line, then add agents that reply, book and follow up.",
        },
        {
          id: "launch" as StepId,
          label: "Launch",
          title: "Go live without the drama.",
          body: "Domain, redirects, analytics and search setup, all handled. The rankings you already have come with you.",
        },
        {
          id: "grow" as StepId,
          label: "Grow",
          title: "Keep getting found.",
          body: "Monthly improvements, new pages, and a plain-English report on what’s working, including where AI assistants mention you.",
        },
      ],
    },
  ],
};

export type Tool = { name: string; logo: string };

/* The tools, as layers feeding one studio, feeding your business. */
export const stack = {
  heading: "The tools we build with, wired into yours.",
  lead: "We pick the right model and tool for each job, then connect everything to the systems your business already runs on. Nothing has to be replaced to get started.",
  layers: [
    {
      label: "AI models",
      sub: "The brains behind every agent",
      items: [
        { name: "ChatGPT", logo: "openai" },
        { name: "Claude", logo: "claude" },
        { name: "Gemini", logo: "googlegemini" },
        { name: "Mistral", logo: "mistralai" },
        { name: "Perplexity", logo: "perplexity" },
        { name: "Llama", logo: "meta" },
      ] as Tool[],
    },
    {
      label: "Automation",
      sub: "Workflows that run on their own",
      items: [
        { name: "n8n", logo: "n8n" },
        { name: "Make", logo: "make" },
        { name: "Zapier", logo: "zapier" },
        { name: "Twilio", logo: "twilio" },
        { name: "WhatsApp", logo: "whatsapp" },
        { name: "Instagram", logo: "instagram" },
      ] as Tool[],
    },
    {
      label: "Build",
      sub: "What your site and apps are made of",
      items: [
        { name: "Next.js", logo: "nextdotjs" },
        { name: "React", logo: "react" },
        { name: "Tailwind", logo: "tailwindcss" },
        { name: "Supabase", logo: "supabase" },
        { name: "Vercel", logo: "vercel" },
        { name: "Cloudflare", logo: "cloudflare" },
        { name: "Figma", logo: "figma" },
      ] as Tool[],
    },
  ],
  hub: {
    line: "wires every layer into one system: your site, your agents and your workflows.",
    tags: ["One team", "One plan", "You own it"],
  },
  systems: {
    label: "Your business tools",
    sub: "Where the work gets recorded",
    items: [
      { name: "HubSpot", logo: "hubspot" },
      { name: "Salesforce", logo: "salesforce" },
      { name: "Google Calendar", logo: "googlecalendar" },
      { name: "Calendly", logo: "calendly" },
      { name: "Slack", logo: "slack" },
      { name: "Notion", logo: "notion" },
      { name: "Stripe", logo: "stripe" },
      { name: "Razorpay", logo: "razorpay" },
      { name: "Shopify", logo: "shopify" },
      { name: "QuickBooks", logo: "quickbooks" },
      { name: "Zendesk", logo: "zendesk" },
      { name: "Google Analytics", logo: "googleanalytics" },
    ] as Tool[],
  },
};

export const engage = {
  heading: "Two ways to work with us.",
  lead: "Start with a project. Stay for the partnership, or don’t. Either way, it’s yours.",
  cards: [
    {
      id: "project",
      title: "A project",
      body: "A clear scope, one clear quote and a launch date. When it ships, you own everything: the code, the designs, the accounts.",
      points: ["Written plan before we start", "Weekly check-ins on real work", "Full handover at launch"],
    },
    {
      id: "partner",
      title: "A partner",
      body: "Monthly. We host it, look after it and keep improving it, with new pages, new automations and a report every month.",
      points: ["Hosting & upkeep", "New pages and agents as you grow", "A plain-English monthly report"],
    },
  ],
};

export const faq = {
  heading: "Questions, answered.",
  items: [
    {
      q: "How much does a website cost?",
      a: "It depends on what it needs to do. After a 30-minute call we send a written plan with one clear price, before any work starts, and with no surprises later.",
    },
    {
      q: "How long does it take?",
      a: "A landing page usually takes one to two weeks, and a full website three to six. Web apps and AI agents depend on scope, and we’ll give you a date in the plan.",
    },
    {
      q: "Do you work with businesses outside India?",
      a: "Yes. We work with clients in Canada, Australia and India over video calls and shared docs. Time zones haven’t been a problem yet.",
    },
    {
      q: "What does “recommended by AI” mean?",
      a: "More people now ask ChatGPT, Gemini or Google’s AI who to hire. We structure your site and content so those assistants understand what you do and can name you, the same way SEO works for Google search.",
    },
    {
      q: "Can you add AI to the website I already have?",
      a: "Yes. Chat and WhatsApp agents, voice agents and automations plug into an existing site, inbox or CRM. You don’t need to rebuild anything to start.",
    },
    {
      q: "Will I own what you build?",
      a: "Yes. The code, the designs and every account are yours at handover. If you keep us on afterwards, it’s because it’s working, not because you’re locked in.",
    },
  ],
};

export const cta = {
  before: "Let’s build something",
  accent: "clean.",
  lead: "Thirty minutes. Bring the site you have and leave with a plan for the one you need. If we’re not the right fit, we’ll say so.",
};

/* The booking modal's left column. */
export const booking = {
  title: "Book a call with us.",
  lead: "Thirty minutes with the people who build it.",
  points: [
    { k: "Bring", v: "The site you have, the one you admire, and what’s eating your week." },
    { k: "Leave with", v: "A clear view of what we’d build, what we’d automate, and a date for the written plan." },
    { k: "Cost", v: "Nothing. If we’re not the right fit, we’ll say so and point you to who is." },
  ],
};
