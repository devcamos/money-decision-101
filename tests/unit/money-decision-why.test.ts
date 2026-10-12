import { describe, expect, it } from "vitest"
import { foundationAnswerLabel, foundationQuestionTitle } from "@/lib/money-decision/questions"
import {
  isInvestingReadyKey,
  matchedAnswerAudit,
  officialGuidanceFor,
  policyCopy,
  resultCopy,
  resultEvidenceIds,
} from "@/lib/money-decision/results"
import { decisionStates, type MoneyDecisionInput, type MoneyDecisionResult } from "@/lib/money-decision/schema"

const answers: MoneyDecisionInput = {
  financialDifficulty: false,
  relevantDebt: true,
  emergencyFundMonths: 2,
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
      ...Object.values(resultCopy).flatMap(item => [
        item.eyebrow,
        item.title,
        item.body,
        item.next,
        ...item.actions.map(action => action.label),
      ]),
    ].join(" ")
    expect(blob).not.toMatch(/\bthe user\b/i)
    expect(policyCopy.INVESTING_READINESS.description).toMatch(/\byou may be ready\b/i)
  })

  it("only opens Investing 101 from investing-readiness", () => {
    const investing = resultCopy.INVESTING_READINESS.actions.find(action => action.href === "/investing")
    expect(investing?.label).toBe("Continue to Investing 101")
    expect(resultCopy.INVESTING_READINESS.next).not.toMatch(/Continue to Investing 101/)
    for (const state of Object.keys(resultCopy) as Array<keyof typeof resultCopy>) {
      const hrefs = resultCopy[state].actions.map(action => action.href)
      if (state === "INVESTING_READINESS") {
        expect(hrefs).toContain("/investing")
      } else {
        expect(hrefs, state).not.toContain("/investing")
      }
    }
  })
})

describe("suggested actions", () => {
  it("gives every policy at least one next step with a link", () => {
    for (const state of decisionStates) {
      expect(resultCopy[state].actions.length, state).toBeGreaterThan(0)
      for (const action of resultCopy[state].actions) {
        expect(action.href.length, `${state}:${action.label}`).toBeGreaterThan(1)
      }
    }
  })

  it("maps financial difficulty to MoneyHelper debt support, not Investing 101", () => {
    const hrefs = resultCopy.FINANCIAL_DIFFICULTY.actions.map(action => action.href)
    expect(hrefs.some(href => href.includes("help-if-youre-struggling-with-debt"))).toBe(true)
    expect(hrefs.some(href => href.includes("how-to-prioritise-your-debts"))).toBe(true)
    expect(hrefs).not.toContain("/investing")
  })

  it("maps pension review to the GOV.UK workplace pension page", () => {
    expect(resultCopy.PENSION_REVIEW.actions.some(action => action.href.includes("workplace-pensions"))).toBe(true)
  })

  it("keeps official guidance ids aligned with each policy", () => {
    expect(officialGuidanceFor("FINANCIAL_DIFFICULTY").map(item => item.title)).toEqual([
      "How to prioritise your debts",
      "Help if you're struggling with debt",
    ])
    expect(resultEvidenceIds.UNDETERMINED).toEqual([])
  })
})

describe("isInvestingReadyKey", () => {
  it("gates the knowledge check on the existing INVESTING_READINESS key only", () => {
    expect(isInvestingReadyKey("INVESTING_READINESS")).toBe(true)
    for (const state of decisionStates) {
      if (state === "INVESTING_READINESS") continue
      expect(isInvestingReadyKey(state), state).toBe(false)
    }
  })
})

describe("matchedAnswerAudit", () => {
  it("lists debt and lower-priority matches as question and answer pairs", () => {
    const rows = matchedAnswerAudit(answers, result({
      secondaryStates: ["EMERGENCY_RESILIENCE", "PENSION_REVIEW"],
    }))

    expect(rows).toContainEqual({
      question: foundationQuestionTitle("relevantDebt"),
      answer: foundationAnswerLabel("relevantDebt", true),
    })
    expect(rows).toContainEqual({
      question: foundationQuestionTitle("emergencyFundMonths"),
      answer: foundationAnswerLabel("emergencyFundMonths", 2),
    })
    expect(rows).toContainEqual({
      question: foundationQuestionTitle("workplacePensionReviewed"),
      answer: foundationAnswerLabel("workplacePensionReviewed", false),
    })
    expect(rows.map(row => row.answer).join(" ")).not.toMatch(/pay (this|your) (card|loan) first/i)
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
    const rows = matchedAnswerAudit(ready, result({
      decisionState: "INVESTING_READINESS",
      primaryPolicyId: "MONEY-INVESTING-READINESS-001",
      explanationCode: "INVESTING_READINESS",
    }), {
      knowledgeCheck: {
        title: "Could you get back less than you put into an investment?",
        answerLabel: "Yes. You could get back less than you put in",
      },
    })

    expect(rows).toHaveLength(6)
    expect(rows[0]).toEqual({
      question: foundationQuestionTitle("financialDifficulty"),
      answer: "No",
    })
    expect(rows[5]).toEqual({
      question: "Could you get back less than you put into an investment?",
      answer: "Yes. You could get back less than you put in",
    })
  })

  it("includes the failed knowledge check answer when the result is undetermined", () => {
    const ready: MoneyDecisionInput = {
      financialDifficulty: false,
      relevantDebt: false,
      emergencyFundMonths: 4.5,
      workplacePensionReviewed: true,
      moneyNeededWithinThreeYears: false,
      acceptsInvestmentRisk: false,
    }
    const rows = matchedAnswerAudit(ready, result({
      decisionState: "UNDETERMINED",
      primaryPolicyId: "MONEY-UNDETERMINED-001",
      explanationCode: "UNDETERMINED",
    }), {
      knowledgeCheck: {
        title: "Are returns from investing guaranteed?",
        answerLabel: "Yes, if you choose a well-known company",
      },
    })

    expect(rows).toEqual([{
      question: "Are returns from investing guaranteed?",
      answer: "Yes, if you choose a well-known company",
    }])
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
    const rows = matchedAnswerAudit(ready, result({
      decisionState: "UNDETERMINED",
      primaryPolicyId: "MONEY-UNDETERMINED-001",
      explanationCode: "UNDETERMINED",
    }), {
      engineUnavailable: true,
      knowledgeCheck: {
        title: "Are returns from investing guaranteed?",
        answerLabel: "Yes, if you choose a well-known company",
      },
    })

    expect(rows).toEqual([])
  })
})
