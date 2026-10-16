import type { Metadata } from "next"
import { canonicalFor } from "@/lib/seo/routes"

export const metadata: Metadata = {
  alternates: canonicalFor("/money-decision"),
  title: "Money Decision 101 | What should I do with my next £1,000?",
  description:
    "What should I do with my next £1,000? Six facts and an approved UK policy identify the next money topic to explore.",
  openGraph: {
    title: "What should I do with my next £1,000?",
    description:
      "Six facts and an approved UK policy identify the next money topic to explore.",
    siteName: "Money Decision 101",
  },
}

export default function MoneyDecisionLayout({ children }: { children: React.ReactNode }) {
  return children
}
