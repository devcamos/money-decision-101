import { ImageResponse } from "next/og"
import { refineryBrand } from "@/lib/brand"

/** Parent Readiness share-card layout. Colours from the Nexus kit only. */
export const ogSize = { width: 1200, height: 630 } as const
export const ogType = "image/png"

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
          background: refineryBrand.cream,
          color: refineryBrand.ink,
        }}
      >
        <div style={{ fontSize: 28, color: refineryBrand.copper, letterSpacing: "0.18em" }}>
          {copy.kicker}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, marginTop: 16, maxWidth: 980, lineHeight: 1.1 }}>
          {copy.headline}
        </div>
        <div style={{ fontSize: 28, color: refineryBrand.muted, marginTop: 24, maxWidth: 820 }}>
          {copy.lede}
        </div>
      </div>
    ),
    ogSize,
  )
}
