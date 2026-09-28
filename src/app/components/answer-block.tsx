import { Check } from "lucide-react";
import { answer } from "@/content/home";
import { Tag } from "./ui";
import { Reveal } from "./motion";

/* The page's short answer, written to be lifted verbatim. It sits just
   before the FAQ: a recap for readers, a clean passage for answer engines.
   Answer engines quote the first self-contained passage that resolves the
   query, so the studio states what it is in ~40 words, no pronouns pointing
   outside the block. We sell "get recommended by AI"; this is us doing it.

   Layout: question and answer read as one editorial column (a plum rule
   down the side), and the points sit underneath as a checked list: two
   columns on phones, four from md, so nothing ever crowds. */
export default function AnswerBlock() {
  return (
    <section aria-label={answer.question} className="container-page pb-4 pt-20 md:pt-24">
      <Reveal>
        <aside className="answer-block relative overflow-hidden rounded-[22px] border border-line bg-card shadow-card">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-plum" />
          <div className="grid grid-cols-1 gap-5 px-6 pb-6 pt-7 md:grid-cols-[0.8fr_1.6fr] md:gap-14 md:p-10">
            <div>
              <Tag tone="plum">In short</Tag>
              <h2 className="mt-4 text-[30px] leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[40px]">{answer.question}</h2>
            </div>
            <p className="text-[16px] leading-[1.7] text-ink-soft md:self-end md:text-[18px]">{answer.answer}</p>
          </div>
          <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {answer.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 border-b border-r border-line px-4 py-3.5 text-[13.5px] leading-snug text-ink-soft even:border-r-0 md:px-6 md:py-4 md:even:border-r md:[&:nth-child(4n)]:border-r-0 md:[&:nth-last-child(-n+4)]:border-b-0 [&:nth-last-child(-n+2)]:border-b-0"
              >
                <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-lilac" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </section>
  );
}
