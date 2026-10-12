import type { MoneyDecisionInput, MoneyDecisionResult } from "./schema"

type State = MoneyDecisionResult["decisionState"]

export type SuggestedAction = {
  label: string
  href: string
  kind: "internal" | "official"
  source?: string
}

export const INVESTING_READY_KEYS = ["INVESTING_READINESS"] as const

export function isInvestingReadyKey(state: string): boolean {
  return (INVESTING_READY_KEYS as readonly string[]).includes(state)
}

export const resultCopy: Record<State, { eyebrow: string; title: string; body: string; next: string; actions: SuggestedAction[] }> = {
  FINANCIAL_DIFFICULTY: {
    eyebrow: "Your money priority",
    title: "Immediate financial stability is the next topic",
    body: "Your answers indicate that keeping up with essential or priority payments may deserve attention before considering investing.",
    next: "Free, independent debt support is the next honest step. Investing can wait until money feels less stretched.",
    actions: [
      {
        label: "Help if you're struggling with debt",
        href: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/help-if-youre-struggling-with-debt",
        kind: "official",
        source: "MoneyHelper",
      },
      {
        label: "How to prioritise your debts",
        href: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/how-to-prioritise-your-debts",
        kind: "official",
        source: "MoneyHelper",
      },
    ],
  },
  DEBT_PRIORITY: {
    eyebrow: "Your money priority",
    title: "Debt is the next topic before investing education",
    body: "Your answers indicate that relevant short-term or costly debt remains to be addressed.",
    next: "Get a clear picture of the debts still in view before you think about investing.",
    actions: [
      {
        label: "How to prioritise your debts",
        href: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/how-to-prioritise-your-debts",
        kind: "official",
        source: "MoneyHelper",
      },
      {
        label: "Should you invest?",
        href: "https://www.fca.org.uk/investsmart/should-you-invest",
        kind: "official",
        source: "Financial Conduct Authority",
      },
    ],
  },
  EMERGENCY_RESILIENCE: {
    eyebrow: "Your money priority",
    title: "An emergency buffer is the next topic",
    body: "Your accessible emergency savings are below the policy's minimum investing-readiness threshold of three months of essential living expenses.",
    next: "An accessible savings buffer is the next topic. Official guidance below explains why that buffer comes before investing.",
    actions: [
      {
        label: "Should you invest?",
        href: "https://www.fca.org.uk/investsmart/should-you-invest",
        kind: "official",
        source: "Financial Conduct Authority",
      },
      {
        label: "Is it the right investment for you?",
        href: "https://www.fca.org.uk/investsmart/right-investment-you",
        kind: "official",
        source: "Financial Conduct Authority",
      },
    ],
  },
  PENSION_REVIEW: {
    eyebrow: "Your money priority",
    title: "Workplace pension is the next topic to explore",
    body: "Your answers indicate that your workplace pension arrangements or available contributions have not yet been reviewed.",
    next: "Check your own workplace pension and the contributions available through it before looking at other investments.",
    actions: [
      {
        label: "Workplace pensions: what you, your employer and the government pay",
        href: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay",
        kind: "official",
        source: "GOV.UK",
      },
      {
        label: "Should you invest?",
        href: "https://www.fca.org.uk/investsmart/should-you-invest",
        kind: "official",
        source: "Financial Conduct Authority",
      },
    ],
  },
  NEAR_TERM_CASH: {
    eyebrow: "Your money priority",
    title: "Keep near-term needs in view",
    body: "You may need this money within approximately three years, so the policy does not classify it as ready for long-term investing education.",
    next: "This money may be needed soon, so savings and cash information is the honest next step — not long-term investing education.",
    actions: [
      {
        label: "Is it the right investment for you?",
        href: "https://www.fca.org.uk/investsmart/right-investment-you",
        kind: "official",
        source: "Financial Conduct Authority",
      },
    ],
  },
  INVESTING_READINESS: {
    eyebrow: "Your money priority",
    title: "You may be ready to explore investing",
    body: "Your answers cleared the financial-foundation checks in Money Decision 101, and you correctly answered a knowledge check that investments can fall as well as rise.",
    next: "You can learn about risk, diversification, time horizons, fees and UK investment wrappers.",
    actions: [
      {
        label: "Continue to Investing 101",
        href: "/investing",
        kind: "internal",
      },
      {
        label: "A beginner's guide to investing",
        href: "https://www.moneyhelper.org.uk/en/savings/investing/investing-beginners-guide",
        kind: "official",
        source: "MoneyHelper",
      },
      {
        label: "Should you invest?",
        href: "https://www.fca.org.uk/investsmart/should-you-invest",
        kind: "official",
        source: "Financial Conduct Authority",
      },
    ],
  },
  UNDETERMINED: {
    eyebrow: "Your result",
    title: "This cannot be classified yet",
    body: "Your answers did not match an approved next money topic. No financial result was inferred.",
    next: "You can run again. A correctly answered knowledge check is needed before exploring investing; other money priorities can still appear if they matched.",
    actions: [
      {
        label: "How we use official guidance",
        href: "/help",
        kind: "internal",
      },
    ],
  },
}

export const policyCopy: Record<State, { name: string; description: string; why: string }> = {
  FINANCIAL_DIFFICULTY: {
    name: "Immediate financial stability",
    description: "If you are struggling with essential or priority payments, this policy stops the investing-readiness path and signposts free, independent debt support.",
    why: "You said you are struggling to keep up with essential bills or priority payments. That rule sits above debt review, emergency savings, pension review, and investing.",
  },
  DEBT_PRIORITY: {
    name: "Debt before investing",
    description: "If you still have short-term or costly debt to address, this policy puts debt review before investing.",
    why: "You said relevant short-term or costly debt remains to be addressed. That rule sits above emergency savings, pension review, and investing. It does not set an interest-rate cut-off or tell you which debt to pay first.",
  },
  EMERGENCY_RESILIENCE: {
    name: "Emergency savings before investing",
    description: "If your accessible emergency savings cover less than three months of essential living costs, this policy puts that buffer before investing education.",
    why: "You said your accessible savings would cover less than three months of essential living costs. The policy uses three months as its investing-readiness threshold, not as an FCA requirement that you hold six months.",
  },
  PENSION_REVIEW: {
    name: "Workplace pension review",
    description: "If you have not reviewed your workplace pension and the contributions available through it, this policy puts that review before other investments.",
    why: "You said you have not reviewed your workplace pension and the contributions available through it. The policy does not tell you how much to contribute.",
  },
  NEAR_TERM_CASH: {
    name: "Near-term money",
    description: "If you may need this money within about three years, this policy points to savings and cash information rather than long-term investing education.",
    why: "You said you could need this £1,000 within the next three years. The policy therefore does not classify it as ready for long-term investing education.",
  },
  INVESTING_READINESS: {
    name: "Investing readiness",
    description: "If your earlier answers are clear, you would not need this money soon, and you correctly answer the knowledge check, you may be ready to explore investing education.",
    why: "Your answers cleared the earlier foundation checks, you would not need this money within three years, and you correctly answered a knowledge check that investments can fall as well as rise. This is not a statement that investing is suitable for you.",
  },
  UNDETERMINED: {
    name: "Cannot classify",
    description: "If your answers do not match an approved money topic, this policy makes no substantive financial conclusion.",
    why: "Your answers did not match an approved next money topic, so no financial result was inferred.",
  },
}

export const resultEvidenceIds: Record<State, string[]> = {
  FINANCIAL_DIFFICULTY: ["MONEYHELPER-DEBT-001", "MONEYHELPER-DEBT-002"],
  DEBT_PRIORITY: ["FCA-INVEST-001", "FCA-INVEST-002"],
  EMERGENCY_RESILIENCE: ["FCA-INVEST-001"],
  PENSION_REVIEW: ["FCA-INVEST-001", "GOVUK-PENSION-001"],
  NEAR_TERM_CASH: ["FCA-INVEST-002"],
  INVESTING_READINESS: ["FCA-INVEST-001", "FCA-INVEST-002"],
  UNDETERMINED: [],
}

export function matchedStates(result: MoneyDecisionResult): State[] {
  const states: State[] = [result.decisionState]
  for (const state of result.secondaryStates) {
    if (state !== "UNDETERMINED" && !states.includes(state)) states.push(state)
  }
  return states
}

export function matchedFactLines(
  answers: MoneyDecisionInput,
  result: MoneyDecisionResult,
  options?: { engineUnavailable?: boolean },
): string[] {
  const states = new Set(matchedStates(result))
  const lines: string[] = []

  if (states.has("FINANCIAL_DIFFICULTY") && answers.financialDifficulty) {
    lines.push("You said you are struggling to keep up with essential bills or priority payments.")
  }
  if (states.has("DEBT_PRIORITY") && answers.relevantDebt) {
    lines.push("You said you still have short-term or costly debt to address.")
  }
  if (states.has("EMERGENCY_RESILIENCE") && answers.emergencyFundMonths < 3) {
    lines.push("You said your accessible savings would cover less than three months of essential living costs.")
  }
  if (states.has("PENSION_REVIEW") && answers.workplacePensionReviewed === false) {
    lines.push("You said you have not reviewed your workplace pension and the contributions available through it.")
  }
  if (states.has("NEAR_TERM_CASH") && answers.moneyNeededWithinThreeYears) {
    lines.push("You said you could need this £1,000 within the next three years.")
  }
  if (states.has("INVESTING_READINESS")) {
    if (!answers.financialDifficulty) lines.push("You said you are not struggling to keep up with essential bills.")
    if (!answers.relevantDebt) lines.push("You said you do not have short-term or costly debt still to address.")
    if (answers.emergencyFundMonths >= 3) lines.push("You said your accessible savings would cover at least three months of essential living costs.")
    if (answers.workplacePensionReviewed) lines.push("You said you have reviewed your workplace pension.")
    if (!answers.moneyNeededWithinThreeYears) lines.push("You said you would not need this money within three years.")
    if (answers.acceptsInvestmentRisk) {
      lines.push("You correctly answered a knowledge check that investment values can fall as well as rise.")
    }
  }
  if (
    result.decisionState === "UNDETERMINED" &&
    answers.acceptsInvestmentRisk === false &&
    !options?.engineUnavailable
  ) {
    lines.push("The knowledge check was not answered correctly, so exploring investing was not classified as the next topic.")
  }

  return lines
}

export const evidenceCopy: Record<string, { authority: string; title: string; url: string }> = {
  "FCA-INVEST-001": { authority: "Financial Conduct Authority", title: "Should you invest?", url: "https://www.fca.org.uk/investsmart/should-you-invest" },
  "FCA-INVEST-002": { authority: "Financial Conduct Authority", title: "Is it the right investment for you?", url: "https://www.fca.org.uk/investsmart/right-investment-you" },
  "MONEYHELPER-DEBT-001": { authority: "MoneyHelper", title: "How to prioritise your debts", url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/how-to-prioritise-your-debts" },
  "MONEYHELPER-DEBT-002": { authority: "MoneyHelper", title: "Help if you're struggling with debt", url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/help-if-youre-struggling-with-debt" },
  "GOVUK-PENSION-001": { authority: "GOV.UK", title: "Workplace pensions: what you, your employer and the government pay", url: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay" },
}

export function officialGuidanceFor(state: State) {
  return resultEvidenceIds[state]
    .map(id => evidenceCopy[id])
    .filter(Boolean)
}
