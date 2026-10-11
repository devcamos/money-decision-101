import { ImageResponse } from "next/og"
import { refineryBrand } from "@/lib/brand"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

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
          background: refineryBrand.cream,
        }}
      >
        <div style={{ width: 18, height: 18, background: refineryBrand.copper }} />
      </div>
    ),
    size,
  )
}
