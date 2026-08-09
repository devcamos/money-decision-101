import { describe, expect, it } from "vitest"
import { moneyDecisionInputSchema, moneyDecisionResultSchema } from "@/lib/money-decision/schema"

describe("moneyDecisionInputSchema", () => {
  const validInput = {
    financialDifficulty: false,
    relevantDebt: false,
    emergencyFundMonths: 3,
    workplacePensionReviewed: true,
    moneyNeededWithinThreeYears: false,
    acceptsInvestmentRisk: true,
  }

  it("accepts the minimal approved fact model", () => {
    expect(moneyDecisionInputSchema.parse(validInput)).toEqual(validInput)
  })

  it("rejects missing required facts", () => {
    const { emergencyFundMonths: _removed, ...incomplete } = validInput
    expect(moneyDecisionInputSchema.safeParse(incomplete).success).toBe(false)
  })

  it("rejects negative emergency-fund months", () => {
    expect(moneyDecisionInputSchema.safeParse({ ...validInput, emergencyFundMonths: -1 }).success).toBe(false)
  })
})

describe("moneyDecisionResultSchema", () => {
  it("accepts the governed OPA result contract", () => {
    const result = {
      decisionState: "INVESTING_READINESS",
      primaryPolicyId: "MONEY-INVESTING-READINESS-001",
      matchedPolicyIds: ["MONEY-INVESTING-READINESS-001"],
      secondaryStates: [],
      evidenceIds: ["FCA-INVEST-001", "FCA-INVEST-002"],
      policyVersion: "1.0.0",
      explanationCode: "INVESTING_READINESS",
    }

    expect(moneyDecisionResultSchema.parse(result)).toEqual(result)
  })

  it("rejects an unapproved decision state", () => {
    expect(moneyDecisionResultSchema.safeParse({
      decisionState: "BUY_FUND",
      primaryPolicyId: "X",
      matchedPolicyIds: [],
      secondaryStates: [],
      evidenceIds: [],
      policyVersion: "1.0.0",
      explanationCode: "BUY_FUND",
    }).success).toBe(false)
  })
})
