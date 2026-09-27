"use client";

import type { ReactNode } from "react";
import { openBooking } from "@/lib/booking";

/**
 * Anything that should open the booking modal. A real link to #book under the
 * hood: without JS it scrolls to the closing section instead.
 */
export default function BookTrigger({
  children,
  className,
  onOpen,
}: {
  children: ReactNode;
  className?: string;
  /** Runs before the modal opens (the mobile menu closes itself). */
  onOpen?: () => void;
}) {
  return (
    <a
      href="#book"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onOpen?.();
        openBooking();
      }}
    >
      {children}
    </a>
  );
}
