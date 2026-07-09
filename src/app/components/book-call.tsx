"use client";

import { openCalendlyPopup } from "@/lib/calendly";

/* Every "Book a call" on the site is this one button. */
export default function BookCall({
  variant = "primary",
  children = "Book a call",
  className = "",
}: {
  variant?: "primary" | "ghost";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${className}`}
      onClick={() => openCalendlyPopup()}
      aria-label="Book an intro call on Calendly"
    >
      {children}
    </button>
  );
}
