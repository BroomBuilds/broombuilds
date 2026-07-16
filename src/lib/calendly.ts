/* Calendly — the primary conversion path. One constant, swappable. */

export const CALENDLY_URL = "https://calendly.com/broombuilds/build-plan-call";

/* Calendly theme params take hex WITHOUT the leading "#".
   Keep in sync with the tokens in globals.css. */
const THEME = new URLSearchParams({
  background_color: "08090b",
  text_color: "ece6da",
  primary_color: "56186e",
  hide_gdpr_banner: "1",
});

export const CALENDLY_THEMED_URL = `${CALENDLY_URL}?${THEME}`;

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

let loading: Promise<void> | null = null;

/** Lazy-load Calendly's widget script + CSS once, on demand (never blocks first paint). */
export function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);

    const js = document.createElement("script");
    js.src = WIDGET_JS;
    js.async = true;
    js.onload = () => resolve();
    js.onerror = () => {
      loading = null;
      reject(new Error("Calendly widget failed to load"));
    };
    document.head.appendChild(js);
  });
  return loading;
}

/** Open the brand-themed Calendly popup. Falls back to a new tab if the script fails. */
export async function openCalendlyPopup(): Promise<void> {
  try {
    await loadCalendly();
    window.Calendly?.initPopupWidget({ url: CALENDLY_THEMED_URL });
  } catch {
    window.open(CALENDLY_THEMED_URL, "_blank", "noopener");
  }
}
