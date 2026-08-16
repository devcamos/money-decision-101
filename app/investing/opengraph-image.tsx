import { ImageResponse } from "next/og";

export const alt = "Investing 101";
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
          INVESTING 101
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, marginTop: 16 }}>
          Learn the foundations.
        </div>
        <div style={{ fontSize: 28, color: "#6d6254", marginTop: 24, maxWidth: 820 }}>
          Asset types, pooled funds, risk, time horizon and UK wrappers from visible public guidance.
        </div>
      </div>
    ),
    size,
  );
}
