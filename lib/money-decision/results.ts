import type { MoneyDecisionResult } from "./schema"

type State = MoneyDecisionResult["decisionState"]

export const resultCopy: Record<State, { eyebrow: string; title: string; body: string; next: string }> = {
  FINANCIAL_DIFFICULTY: {
    eyebrow: "Your money priority",
    title: "Focus on immediate financial stability",
    body: "Your answers indicate that keeping up with essential or priority payments may deserve attention before considering investing.",
    next: "Review free, independent debt-support information before continuing the investing-readiness journey.",
  },
  DEBT_PRIORITY: {
    eyebrow: "Your money priority",
    title: "Review debt before investing",
    body: "Your answers indicate that relevant short-term or costly debt remains to be addressed.",
    next: "Understand your debts, their costs and repayment priorities using approved UK guidance.",
  },
  EMERGENCY_RESILIENCE: {
    eyebrow: "Your money priority",
    title: "Strengthen your financial buffer",
    body: "Your accessible emergency savings are below the policy's minimum investing-readiness threshold of three months of essential living expenses.",
    next: "Explore building accessible emergency savings before progressing toward investing.",
  },
  PENSION_REVIEW: {
    eyebrow: "Your money priority",
    title: "Review your workplace pension first",
    body: "Your answers indicate that your workplace pension arrangements or available contributions have not yet been reviewed.",
    next: "Check your own scheme rules and available employer contributions before exploring other investments.",
  },
  NEAR_TERM_CASH: {
    eyebrow: "Your money priority",
    title: "Keep near-term needs in view",
    body: "You may need this money within approximately three years, so the policy does not classify it as ready for long-term investing education.",
    next: "Explore savings and cash information for money that may be needed in the near term.",
  },
  INVESTING_READINESS: {
    eyebrow: "Your money priority",
    title: "You may be ready to explore investing",
    body: "Your answers cleared the financial-foundation checks in Money Decision 101 and you acknowledged that investments can fall as well as rise.",
    next: "Explore Investing 101 to learn about risk, diversification, time horizons, fees and UK investment wrappers.",
  },
  UNDETERMINED: {
    eyebrow: "Your result",
    title: "We cannot classify this safely yet",
    body: "The information available does not allow the approved Money Decision policy to reach a supported classification.",
    next: "Review the unanswered or unsupported area before making a decision.",
  },
}

export const evidenceCopy: Record<string, { authority: string; title: string; url: string }> = {
  "FCA-INVEST-001": { authority: "Financial Conduct Authority", title: "Should you invest?", url: "https://www.fca.org.uk/investsmart/should-you-invest" },
  "FCA-INVEST-002": { authority: "Financial Conduct Authority", title: "Is it the right investment for you?", url: "https://www.fca.org.uk/investsmart/right-investment-you" },
  "MONEYHELPER-DEBT-001": { authority: "MoneyHelper", title: "How to prioritise your debts", url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/how-to-prioritise-your-debts" },
  "MONEYHELPER-DEBT-002": { authority: "MoneyHelper", title: "Help if you're struggling with debt", url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/help-if-youre-struggling-with-debt" },
  "GOVUK-PENSION-001": { authority: "GOV.UK", title: "Workplace pensions: what you, your employer and the government pay", url: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay" },
}
