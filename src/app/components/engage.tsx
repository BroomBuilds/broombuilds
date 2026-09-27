import { Check, Flag, KeyRound, Repeat } from "lucide-react";
import { engage } from "@/content/home";
import { Item, Stagger } from "./motion";
import { Panel, SectionHead } from "./ui";

/* How the relationship works: a project with an end, or a partnership
   without one. Each card carries a small picture of its shape. */

function ProjectPicture() {
  const phases = ["Plan", "Design", "Build", "Launch"];
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="relative grid grid-cols-4 gap-1.5">
        {phases.map((p, i) => (
          <div key={p}>
            <div className={i === 3 ? "h-2 rounded-full bg-plum" : "h-2 rounded-full bg-ink/15"} />
            <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-muted">
              {i === 3 && <Flag className="h-3 w-3 text-lilac" />}
              {p}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 rounded-[12px] border border-line bg-card px-3 py-2.5 text-[13px] shadow-card">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-plum text-ink">
          <KeyRound className="h-4 w-4" />
        </span>
        Handover: the code, designs and accounts are yours.
      </div>
    </div>
  );
}

function PartnerPicture() {
  const months = [
    { m: "Oct", what: "Two new service pages" },
    { m: "Nov", what: "WhatsApp agent goes live" },
    { m: "Dec", what: "Speed pass + report" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      {months.map((x) => (
        <div key={x.m} className="flex items-center gap-3 rounded-[12px] border border-line bg-card px-3 py-2 text-[13px] shadow-card">
          <span className="w-8 font-mono text-[11px] text-ink-muted">{x.m}</span>
          <span className="flex-1">{x.what}</span>
          <Check className="h-3.5 w-3.5 text-lilac" strokeWidth={3} />
        </div>
      ))}
      <p className="mt-1 flex items-center gap-1.5 px-1 text-[12px] text-ink-muted">
        <Repeat className="h-3 w-3" /> Every month, until you say stop.
      </p>
    </div>
  );
}

export default function Engage() {
  const pictures = { project: <ProjectPicture />, partner: <PartnerPicture /> };
  return (
    <section aria-labelledby="engage-title" className="border-y border-line bg-band py-20 md:py-24">
      <div className="container-page">
        <SectionHead title={<span id="engage-title">{engage.heading}</span>} lead={engage.lead} />
        <Stagger stagger={0.12} className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
          {engage.cards.map((c) => (
            <Item key={c.id} className="grid grid-cols-1 gap-6 rounded-[22px] border border-line bg-card p-6 shadow-card sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:grid-cols-1 md:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <div className="flex flex-col">
                <h3 className="text-[30px] md:text-[36px]">{c.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-muted">{c.body}</p>
                <ul className="mt-auto space-y-2 pt-6">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[14px] text-ink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-plum" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Panel className="min-h-[220px] p-4">{pictures[c.id as keyof typeof pictures]}</Panel>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
