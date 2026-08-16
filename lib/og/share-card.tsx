import { ImageResponse } from "next/og"

/** Parent Readiness share-card layout. Colours from the Nexus kit only. */
export const ogSize = { width: 1200, height: 630 } as const
export const ogType = "image/png"

const cream = "#fffaf1"
const ink = "#1b1510"
const copper = "#b85a2a"
const mute = "#6d6254"

export function shareCardImage(copy: {
  kicker: string
  headline: string
  lede: string
}) {
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
          background: cream,
          color: ink,
        }}
      >
        <div style={{ fontSize: 28, color: copper, letterSpacing: "0.18em" }}>
          {copy.kicker}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, marginTop: 16, maxWidth: 980, lineHeight: 1.1 }}>
          {copy.headline}
        </div>
        <div style={{ fontSize: 28, color: mute, marginTop: 24, maxWidth: 820 }}>
          {copy.lede}
        </div>
      </div>
    ),
    ogSize,
  )
}
