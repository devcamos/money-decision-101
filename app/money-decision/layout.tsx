import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Money Decision 101 | What should I do with my next £1,000?",
  description:
    "What should I do with my next £1,000? Six facts and an approved UK policy identify the next money topic to explore.",
  openGraph: {
    title: "What should I do with my next £1,000?",
    description:
      "Six facts and an approved UK policy identify the next money topic to explore.",
  },
}

export default function MoneyDecisionLayout({ children }: { children: React.ReactNode }) {
  return children
}
