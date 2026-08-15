import { afterEach, describe, expect, it, vi } from "vitest"
import {
  EXPECTED_MONEY_POLICY_VERSION,
  evaluateMoneyDecision,
  probeOpa,
} from "@/lib/money-decision/opa"

const governedResult = {
  decisionState: "INVESTING_READINESS" as const,
  primaryPolicyId: "MONEY-INVESTING-READINESS-001",
  matchedPolicyIds: ["MONEY-INVESTING-READINESS-001"],
  secondaryStates: [],
  evidenceIds: ["FCA-INVEST-001", "FCA-INVEST-002"],
  policyVersion: EXPECTED_MONEY_POLICY_VERSION,
  explanationCode: "INVESTING_READINESS",
}

const governedInput = {
  financialDifficulty: false,
  relevantDebt: false,
  emergencyFundMonths: 3,
  workplacePensionReviewed: true,
  moneyNeededWithinThreeYears: false,
  acceptsInvestmentRisk: true,
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe("OPA client", () => {
  it("evaluates decisions through the configured OPA service", async () => {
    vi.stubEnv("OPA_URL", "http://opa.internal/")
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ result: governedResult }),
    )
    vi.stubGlobal("fetch", fetchMock)

    await expect(evaluateMoneyDecision(governedInput)).resolves.toEqual(governedResult)
    expect(fetchMock).toHaveBeenCalledWith(
      "http://opa.internal/v1/data/nexus/money/v1/decision",
      expect.objectContaining({ method: "POST", cache: "no-store" }),
    )
  })

  it("fails closed when the OPA policy version drifts", async () => {
    vi.stubEnv("OPA_URL", "http://opa.internal")
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      Response.json({ result: { ...governedResult, policyVersion: "2.0.0" } }),
    ))

    await expect(evaluateMoneyDecision(governedInput)).rejects.toThrow(
      "policy version does not match",
    )
  })

  it("fails closed when the policy engine URL is missing", async () => {
    vi.stubEnv("OPA_URL", "")
    await expect(evaluateMoneyDecision(governedInput)).rejects.toThrow("OPA_URL is not configured")
  })

  it("probes OPA health and the loaded policy version", async () => {
    vi.stubEnv("OPA_URL", "http://opa.internal")
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({}))
      .mockResolvedValueOnce(Response.json({ result: EXPECTED_MONEY_POLICY_VERSION }))
    vi.stubGlobal("fetch", fetchMock)

    await expect(probeOpa()).resolves.toEqual({
      policyVersion: EXPECTED_MONEY_POLICY_VERSION,
      versionMatches: true,
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
