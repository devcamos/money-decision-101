import { ImageResponse } from "next/og";

export const alt = "Nexus Motivus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#fffaf1",
          color: "#1b1510",
        }}
      >
        <div style={{ fontSize: 28, color: "#b85a2a", letterSpacing: "0.18em" }}>
          NEXUS MOTIVUS
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, marginTop: 16 }}>
          UK money guidance, plainly.
        </div>
        <div style={{ fontSize: 28, color: "#6d6254", marginTop: 24, maxWidth: 820 }}>
          Money Decision 101 identifies the next topic. Investing 101 teaches the foundations.
        </div>
      </div>
    ),
    size,
  );
}
