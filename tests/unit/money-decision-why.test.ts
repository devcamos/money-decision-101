import { describe, expect, it } from "vitest"
import { matchedFactLines, policyCopy, resultCopy } from "@/lib/money-decision/results"
import type { MoneyDecisionInput, MoneyDecisionResult } from "@/lib/money-decision/schema"

const answers: MoneyDecisionInput = {
  financialDifficulty: false,
  relevantDebt: true,
  emergencyFundMonths: 1,
  workplacePensionReviewed: false,
  moneyNeededWithinThreeYears: false,
  acceptsInvestmentRisk: true,
}

function result(partial: Partial<MoneyDecisionResult>): MoneyDecisionResult {
  return {
    decisionState: "DEBT_PRIORITY",
    primaryPolicyId: "MONEY-DEBT-001",
    matchedPolicyIds: ["MONEY-DEBT-001"],
    secondaryStates: [],
    evidenceIds: ["FCA-INVEST-001"],
    policyVersion: "1.0.0",
    explanationCode: "DEBT_PRIORITY",
    ...partial,
  }
}

describe("policyCopy", () => {
  it("names and describes the debt policy without an APR threshold", () => {
    expect(policyCopy.DEBT_PRIORITY.name).toBe("Debt before investing")
    expect(policyCopy.DEBT_PRIORITY.description).toMatch(/short-term or costly debt/i)
    expect(policyCopy.DEBT_PRIORITY.why).not.toMatch(/APR|%/i)
  })

  it("addresses you, not the user", () => {
    const blob = [
      ...Object.values(policyCopy).flatMap(item => [item.name, item.description, item.why]),
      ...Object.values(resultCopy).flatMap(item => [item.eyebrow, item.title, item.body, item.next]),
    ].join(" ")
    expect(blob).not.toMatch(/\bthe user\b/i)
    expect(policyCopy.INVESTING_READINESS.description).toMatch(/\byou may be ready\b/i)
  })
})

describe("matchedFactLines", () => {
  it("lists the debt answer and lower-priority matches without inventing a repayment order", () => {
    const lines = matchedFactLines(answers, result({
      secondaryStates: ["EMERGENCY_RESILIENCE", "PENSION_REVIEW"],
    }))

    expect(lines).toContain("You said you still have short-term or costly debt to address.")
    expect(lines).toContain("You said your accessible savings would cover less than three months of essential living costs.")
    expect(lines).toContain("You said you have not reviewed your workplace pension and the contributions available through it.")
    expect(lines.join(" ")).not.toMatch(/pay (this|your) (card|loan) first/i)
  })

  it("lists the cleared foundation answers for investing readiness", () => {
    const ready: MoneyDecisionInput = {
      financialDifficulty: false,
      relevantDebt: false,
      emergencyFundMonths: 4.5,
      workplacePensionReviewed: true,
      moneyNeededWithinThreeYears: false,
      acceptsInvestmentRisk: true,
    }
    const lines = matchedFactLines(ready, result({
      decisionState: "INVESTING_READINESS",
      primaryPolicyId: "MONEY-INVESTING-READINESS-001",
      explanationCode: "INVESTING_READINESS",
    }))

    expect(lines.length).toBe(6)
    expect(lines.join(" ")).toMatch(/can fall as well as rise/)
  })

  it("explains a failed knowledge check when the result is undetermined", () => {
    const ready: MoneyDecisionInput = {
      financialDifficulty: false,
      relevantDebt: false,
      emergencyFundMonths: 4.5,
      workplacePensionReviewed: true,
      moneyNeededWithinThreeYears: false,
      acceptsInvestmentRisk: false,
    }
    const lines = matchedFactLines(ready, result({
      decisionState: "UNDETERMINED",
      primaryPolicyId: "MONEY-UNDETERMINED-001",
      explanationCode: "UNDETERMINED",
    }))

    expect(lines).toContain("The knowledge check was not answered correctly, so exploring investing was not classified as the next topic.")
  })

  it("does not treat a failed knowledge check as the reason when the policy engine is unavailable", () => {
    const ready: MoneyDecisionInput = {
      financialDifficulty: false,
      relevantDebt: false,
      emergencyFundMonths: 4.5,
      workplacePensionReviewed: true,
      moneyNeededWithinThreeYears: false,
      acceptsInvestmentRisk: false,
    }
    const lines = matchedFactLines(ready, result({
      decisionState: "UNDETERMINED",
      primaryPolicyId: "MONEY-UNDETERMINED-001",
      explanationCode: "UNDETERMINED",
    }), { engineUnavailable: true })

    expect(lines.join(" ")).not.toMatch(/knowledge check was not answered correctly/)
  })
})
