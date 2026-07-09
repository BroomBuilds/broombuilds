import { ImageResponse } from "next/og";

/* The monogram favicon: B and its mirror, spine to spine. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          fontSize: 40,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>B</span>
        <span style={{ transform: "scaleX(-1)", color: "#56186E" }}>B</span>
      </div>
    ),
    size
  );
}
