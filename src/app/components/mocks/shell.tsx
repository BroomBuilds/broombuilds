import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Window chrome for the product mocks, so each reads as a whole screen
   rather than a cropped strip. Every mock tells one story: a real client,
   BM Carpentry & Landscaping, a Sydney carpentry and landscaping crew. Their
   brand (palette, type, logo) is taken from the site we built for them. */

export const BM = {
  name: "BM Carpentry & Landscaping",
  short: "BM Carpentry",
  host: "bmcarpentryandlandscaping.com.au",
  espresso: "#201C1B",
  copper: "#C27D3B",
  paper: "#F8F6F4",
  card: "#F2F0EC",
  stone: "#E5E0DC",
  bark: "#5F5651",
};

type Kind = "browser" | "app";

export function MockShell({
  kind,
  title,
  subtitle,
  trailing,
  footer,
  icon,
  className,
  children,
}: {
  kind: Kind;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  /** App header mark. Defaults to BM's. */
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden bg-card text-ink", className)}>
      {kind === "browser" ? (
        <div className="flex items-center gap-3 border-b border-line px-3 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="ml-1 flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-ink/[0.06] px-2.5 text-[11px] text-ink-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
            <span className="truncate">{title ?? BM.host}</span>
          </div>
          {trailing}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {icon ?? <BMMark className="h-7 w-7" />}
            <div className="min-w-0 leading-tight">
              {title && <p className="truncate text-[12.5px] font-semibold">{title}</p>}
              {subtitle && <p className="truncate text-[10.5px] text-ink-muted">{subtitle}</p>}
            </div>
          </div>
          {trailing}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      {footer && <div className="border-t border-line px-4 py-2.5 text-[11px] text-ink-muted">{footer}</div>}
    </div>
  );
}

/** BM's app icon: copper "BM" on espresso. Size and text size come in via
    className (e.g. "h-12 w-12 text-[15px]"); `round` for chat avatars. */
export function BMMark({ className, round = false }: { className?: string; round?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center font-client font-semibold leading-none tracking-[0.02em]",
        !className?.includes("text-[") && "text-[10px]",
        round ? "rounded-full" : "rounded-[6px]",
        className,
      )}
      style={{ background: BM.espresso, color: BM.copper }}
    >
      BM
    </span>
  );
}

/** Two-letter avatar disc. */
export function Avatar({ initials, className, tone }: { initials: string; className?: string; tone?: string }) {
  return (
    <span
      className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-semibold", !tone && "bg-ink/[0.08] text-ink-soft", className)}
      style={tone ? { background: tone, color: "#fff" } : undefined}
    >
      {initials}
    </span>
  );
}
