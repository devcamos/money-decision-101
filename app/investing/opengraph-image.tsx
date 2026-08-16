import { ogSize, ogType, shareCardImage } from "@/lib/og/share-card"

export const alt = "Investing 101"
export const size = ogSize
export const contentType = ogType

export default function OpenGraphImage() {
  return shareCardImage({
    kicker: "INVESTING 101",
    headline: "Learn the foundations.",
    lede: "A UK educational guide to asset types, pooled funds, risk and wrappers.",
  })
}
