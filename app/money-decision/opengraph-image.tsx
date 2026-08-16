import { ogSize, ogType, shareCardImage } from "@/lib/og/share-card"

export const alt = "Money Decision 101"
export const size = ogSize
export const contentType = ogType

export default function OpenGraphImage() {
  return shareCardImage({
    kicker: "MONEY DECISION 101",
    headline: "What should I do with my next £1,000?",
    lede: "Six facts and an approved UK policy identify the next money topic to explore.",
  })
}
