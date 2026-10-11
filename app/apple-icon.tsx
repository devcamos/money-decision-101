import { ImageResponse } from "next/og"
import { refineryBrand } from "@/lib/brand"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: refineryBrand.cream,
        }}
      >
        <div style={{ width: 72, height: 72, background: refineryBrand.copper }} />
      </div>
    ),
    size,
  )
}
