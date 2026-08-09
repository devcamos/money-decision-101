import { z } from "zod"

export const moneyDecisionInputSchema = z.object({
  financialDifficulty: z.boolean(),
  relevantDebt: z.boolean(),
  emergencyFundMonths: z.number().min(0).max(120),
  workplacePensionReviewed: z.boolean(),
  moneyNeededWithinThreeYears: z.boolean(),
  acceptsInvestmentRisk: z.boolean(),
})

export const decisionStates = [
  "FINANCIAL_DIFFICULTY",
  "DEBT_PRIORITY",
  "EMERGENCY_RESILIENCE",
  "PENSION_REVIEW",
  "NEAR_TERM_CASH",
  "INVESTING_READINESS",
  "UNDETERMINED",
] as const

export const moneyDecisionResultSchema = z.object({
  decisionState: z.enum(decisionStates),
  primaryPolicyId: z.string(),
  matchedPolicyIds: z.array(z.string()),
  secondaryStates: z.array(z.enum(decisionStates)),
  evidenceIds: z.array(z.string()),
  policyVersion: z.string(),
  explanationCode: z.string(),
})

export type MoneyDecisionInput = z.infer<typeof moneyDecisionInputSchema>
export type MoneyDecisionResult = z.infer<typeof moneyDecisionResultSchema>
