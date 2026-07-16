"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import Wordmark from "./components/wordmark";

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
    <main className="nf" role="main">
      <div className="nf-inner wrap">
        <Link href="/" className="nf-brand" aria-label="BroomBuilds — home">
          <Wordmark />
        </Link>
        <p className="nf-tag label">Error 500</p>
        <div className="nf-code" aria-hidden>
          <span className="nf-d" style={{ "--i": 0 } as CSSProperties}>5</span>
          <span className="nf-d nf-o" style={{ "--i": 1 } as CSSProperties}>0</span>
          <span className="nf-d" style={{ "--i": 2 } as CSSProperties}>0</span>
        </div>
        <h1 className="nf-title">Something broke on our end.</h1>
        <p className="nf-copy">
          A gremlin in the wiring — not your fault. Try again, or head home.
        </p>
        <div className="nf-actions">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn btn-primary"
          >
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
