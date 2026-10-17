import { ImageResponse } from "next/og"
import { appBrand } from "@/lib/brand"

// One mark for favicon, Apple and PWA icons. Keep the book inside the
// central maskable safe circle; the device supplies its own outer shape.
export function appIcon(size: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: appBrand.copperDeep }}>
        <svg width={size} height={size} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={appBrand.cream}
            d="M220 245 Q206 239 206 257 L206 648 Q206 664 222 667 C326 679 419 718 484 770 L484 390 C484 354 458 334 422 320 Z"
          />
          <path
            fill={appBrand.cream}
            d="M780 245 Q794 239 794 257 L794 648 Q794 664 778 667 C674 679 581 718 516 770 L516 390 C516 354 542 334 578 320 Z"
          />
        </svg>
      </div>
    ),
    { width: size, height: size },
  )
}
