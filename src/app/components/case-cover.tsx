/// <reference types="react/canary" />
"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

/* Next keeps visited pages mounted in hidden <Activity> boundaries, so a
   case page's cover-<slug> ViewTransition can clash with the work-index
   preview after back-navigation. Carry the shared name only while this
   route is the active one. */
export default function CaseCover({ slug, mark }: { slug: string; mark: string }) {
  const pathname = usePathname();
  return (
    <ViewTransition name={pathname === `/work/${slug}` ? `cover-${slug}` : undefined}>
      <div className="case-cover" aria-hidden>
        <span className="work-mark">{mark}</span>
      </div>
    </ViewTransition>
  );
}
