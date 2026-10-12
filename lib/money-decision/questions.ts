import type { MoneyDecisionInput } from "./schema"

export type FoundationQuestionKey = Exclude<keyof MoneyDecisionInput, "acceptsInvestmentRisk">

export type FoundationQuestion = {
  key: FoundationQuestionKey
  title: string
  options: ReadonlyArray<readonly [boolean | number, string]>
}

/** Foundation prompts shown in the Money Decision journey (shared with the result audit). */
export const foundationQuestions: readonly FoundationQuestion[] = [
  {
    key: "financialDifficulty",
    title: "Are you struggling to keep up with essential bills or priority payments?",
    options: [
      [false, "No"],
      [true, "Yes"],
    ],
  },
  {
    key: "relevantDebt",
    title: "Do you currently have short-term or costly debt that still needs addressing?",
    options: [
      [false, "No"],
      [true, "Yes"],
    ],
  },
  {
    key: "emergencyFundMonths",
    title: "How much of your essential living costs could your accessible savings cover?",
    options: [
      [0.5, "Less than 1 month"],
      [2, "1 to under 3 months"],
      [4.5, "3 to 6 months"],
      [7, "More than 6 months"],
    ],
  },
  {
    key: "workplacePensionReviewed",
    title: "Have you reviewed your workplace pension and the contributions available through it?",
    options: [
      [true, "Yes"],
      [false, "No"],
    ],
  },
  {
    key: "moneyNeededWithinThreeYears",
    title: "Could you need this £1,000 within the next three years?",
    options: [
      [false, "No"],
      [true, "Yes"],
    ],
  },
]

export function foundationAnswerLabel(
  key: FoundationQuestionKey,
  value: boolean | number,
): string {
  const question = foundationQuestions.find(item => item.key === key)
  const match = question?.options.find(option => option[0] === value)
  if (!match) {
    throw new Error(`No label for ${key}=${String(value)}`)
  }
  return match[1]
}

export function foundationQuestionTitle(key: FoundationQuestionKey): string {
  const question = foundationQuestions.find(item => item.key === key)
  if (!question) throw new Error(`Unknown foundation question: ${key}`)
  return question.title
}
