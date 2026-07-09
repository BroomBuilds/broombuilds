"use client";

import { useEffect, useState } from "react";

/* "IST — 14:22". Renders a placeholder on the server (no hydration
   mismatch), ticks on the half-minute after mount. */
export default function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="label footer-clock">
      IST{time ? ` — ${time}` : ""}
    </span>
  );
}
