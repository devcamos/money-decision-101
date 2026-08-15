import type { Metadata } from "next"
import { LegalShell } from "@/components/site/legal-shell"

export const metadata: Metadata = {
  title: "Privacy — Nexus Motivus",
  description: "What Money Decision 101 and Investing 101 collect, and what they do not.",
}

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy">
      <p>
        Money Decision 101 and Investing 101 are educational pages. They do not ask you to create an account, and they do not ask for your name, email, phone number, bank details, or National Insurance number.
      </p>
      <p>
        Money Decision 101 asks six money facts in your browser. Those answers stay in that session until you leave, refresh, or start again. When you finish, the six facts are sent once to evaluate your result. Nexus does not keep a record of them.
      </p>
      <p>
        Official guidance links open FCA, MoneyHelper, and GOV.UK sites. Those organisations have their own privacy notices.
      </p>
      <p>
        On the live site, Vercel Analytics may record anonymous page views. It is not used to identify you or to build a marketing profile.
      </p>
    </LegalShell>
  )
}
