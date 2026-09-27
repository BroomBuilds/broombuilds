import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Generated social share image (also reused for Twitter via metadata).
export const alt = `${site.name} | ${site.tagline}`;
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
          padding: "72px 80px",
          background: "#08090B",
          color: "#ECE6DA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>
            <span style={{ color: "#FFFFFF" }}>Broom</span>
            <span style={{ transform: "scaleX(-1)", color: "#56186E", marginLeft: 2, marginRight: -3 }}>B</span>
            <span style={{ color: "#56186E" }}>uilds</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#64656C" }}>
            Design · Build · AI automation
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
          <span>Websites that sell.</span>
          <span style={{ color: "#B58BD3" }}>Custom AI that works.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, color: "#B9B4AA" }}>
          <div style={{ display: "flex", maxWidth: 760 }}>Websites, web apps and custom AI for your business.</div>
          <div style={{ display: "flex", color: "#B58BD3" }}>broombuilds.com</div>
        </div>
      </div>
    ),
    size,
  );
}
