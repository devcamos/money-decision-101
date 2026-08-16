import { ogSize, ogType, shareCardImage } from "@/lib/og/share-card"

export const alt = "Money Decision 101"
export const size = ogSize
export const contentType = ogType

/** Root `/` 307s to Money Decision; crawlers that skip the hop still get the landing card. */
export default function OpenGraphImage() {
  return shareCardImage({
    kicker: "MONEY DECISION 101",
    headline: "What should I do with my next £1,000?",
    lede: "Six facts and an approved UK policy identify the next money topic to explore.",
  })
}
