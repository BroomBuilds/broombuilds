"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import Wordmark, { BrandMark } from "./components/wordmark";

/* Next 16: the retry prop is `unstable_retry` (was `reset` pre-16). */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="container-page flex h-(--nav-h) items-center">
        <Link href="/" className="flex items-center gap-2.5" aria-label="BroomBuilds home">
          <BrandMark size={32} />
          <Wordmark className="text-[21px]" />
        </Link>
      </header>
      <div className="container-page flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Error 500</p>
        <h1 className="mt-6 text-[40px] md:text-[56px]">
          Something broke <span className="text-lilac">on our end.</span>
        </h1>
        <p className="mt-4 max-w-[40ch] text-[17px] text-ink-muted">A gremlin in the wiring, not your fault. Try again, or head home.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex h-[52px] items-center rounded-full bg-ink px-7 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-paper transition-[transform,background-color,color] duration-200 ease-out hover:bg-plum hover:text-white active:scale-[0.97]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-[52px] items-center rounded-full px-7 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-ink ring-1 ring-inset ring-ink/25 transition-[transform,color,box-shadow] duration-200 ease-out hover:text-lilac hover:ring-lilac active:scale-[0.97]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
