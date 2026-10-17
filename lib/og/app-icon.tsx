import { ImageResponse } from "next/og"
import { appBrand } from "@/lib/brand"

// Keep the existing cream-and-copper app mark at home-screen icon sizes.
export function appIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: appBrand.cream,
        }}
      >
        <div style={{ width: size * 0.4, height: size * 0.4, background: appBrand.copper }} />
      </div>
    ),
    { width: size, height: size },
  )
}
