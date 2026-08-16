import type { Metadata } from "next"
import { LegalShell } from "@/components/site/legal-shell"

export const metadata: Metadata = {
  title: "Terms — Nexus Motivus",
  description: "How to use Investing 101 and Money Decision 101.",
}

export default function TermsPage() {
  return (
    <LegalShell title="Terms">
      <p>
        These pages are UK educational content from Nexus Motivus. They help you see which money topic to explore next. They are not personal financial advice and not a recommendation to buy, sell, or hold any investment.
      </p>
      <p>
        Money Decision 101 applies an approved policy to the answers you provide in that session. Official sources sit behind each result. Open Evidence-backed in the header to read how that works. The Financial Conduct Authority, MoneyHelper, and GOV.UK have not assessed you and have not endorsed Nexus Motivus.
      </p>
      <p>
        Investment values can fall as well as rise. Nothing on this site promises a return, a guaranteed outcome, or that a particular product is suitable for you.
      </p>
      <p>
        You can leave at any time. There is no account to close. If a page or the decision service is unavailable, Nexus will not invent a financial result.
      </p>
    </LegalShell>
  )
}
