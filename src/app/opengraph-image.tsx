import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Generated social share image (also reused for Twitter via metadata).
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08090B",
          color: "#ECE6DA",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#64656C",
            fontWeight: 500,
          }}
        >
          BroomBuilds · Design &amp; Build Studio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: -4,
            alignItems: "center",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Broom</span>
          <span style={{ transform: "scaleX(-1)", color: "#56186E" }}>B</span>
          <span style={{ color: "#56186E" }}>uilds</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#B9B4AA", maxWidth: 760 }}>
            Websites that load in under a second and turn visitors into booked calls.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#56186E" }}>
            broombuilds.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
