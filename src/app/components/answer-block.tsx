import { answer } from "@/content/home";
import { Tag } from "./ui";
import { Reveal } from "./motion";

/* The page's short answer, placed high and written to be lifted verbatim.
   Answer engines quote the first self-contained passage that resolves the
   query — so the studio states what it is in ~60 words, no pronouns pointing
   outside the block. We sell "get recommended by AI"; this is us doing it. */
export default function AnswerBlock() {
  return (
    <section aria-label={answer.question} className="container-page py-12 md:py-16">
      <Reveal>
        <aside className="answer-block grid grid-cols-1 gap-6 rounded-[22px] border border-line bg-card p-6 shadow-card md:grid-cols-[1fr_1.5fr] md:gap-14 md:p-10">
          <div>
            <Tag tone="plum">In short</Tag>
            <h2 className="mt-5 text-[30px] tracking-[-0.03em] md:text-[40px]">{answer.question}</h2>
          </div>
          <div>
            <p className="text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">{answer.answer}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {answer.points.map((p) => (
                <li key={p} className="rounded-full border border-line bg-paper px-3 py-1 text-[13px] text-ink-soft">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
