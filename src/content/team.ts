/* The crew — typed data drives the team section.
   To add someone: append an entry. Order is the order they render. */

export type Teammate = {
  slug: string;
  name: string;
  /** Title shown under the name. */
  role: string;
  /** One plain sentence — what they actually own. */
  focus: string;
  email: string;
  /** Display form. */
  phone: string;
  /** E.164 — for tel: links. Keep in sync with `phone`. */
  phoneHref: string;
};

export const team: Teammate[] = [
  {
    slug: "varun-singh",
    name: "Varun Singh",
    role: "Founder & Principal Engineer",
    focus:
      "Fullstack and AI engineer — scopes the project, runs delivery, and builds across the stack and the model layer.",
    email: "varun17593@gmail.com",
    phone: "+91 95808 68588",
    phoneHref: "+919580868588",
  },
  {
    slug: "vishal-lodhi",
    name: "Vishal Lodhi",
    role: "Founding Engineer",
    focus:
      "Builds the front and the back of it — interfaces, APIs, and the wiring in between.",
    email: "lodhivishal286@gmail.com",
    phone: "+91 97115 90582",
    phoneHref: "+919711590582",
  },
  {
    slug: "updesh-singh",
    name: "Updesh Singh",
    role: "Founding Engineer",
    focus:
      "Ships product end to end — data models, APIs, and the screens that sit on top of them.",
    email: "updeshsingh9063@gmail.com",
    phone: "+91 90765 40430",
    phoneHref: "+919076540430",
  },
];

/** Initials for the monogram plate — no headshots, so the mark carries it. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
