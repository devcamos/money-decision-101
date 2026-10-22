import { describe, expect, it } from "vitest"
import { EXPECTED_MONEY_POLICY_VERSION } from "@/lib/money-decision/opa"
import { decisionBody, healthBody, undeterminedBody } from "@/lib/money-decision/responses"

const now = new Date("2026-10-21T12:00:00Z")

describe("money decision responses", () => {
  it("builds the undetermined fallback with its reason", () => {
    expect(undeterminedBody("INVALID_INPUT", now)).toEqual({
      decisionState: "UNDETERMINED",
      primaryPolicyId: "MONEY-UNDETERMINED-001",
      matchedPolicyIds: [],
      secondaryStates: [],
      evidenceIds: [],
      policyVersion: EXPECTED_MONEY_POLICY_VERSION,
      explanationCode: "UNDETERMINED",
      audit: { evaluatedAt: "2026-10-21T12:00:00.000Z", reason: "INVALID_INPUT" },
    })
    expect(undeterminedBody("POLICY_ENGINE_UNAVAILABLE").audit.reason).toBe("POLICY_ENGINE_UNAVAILABLE")
  })

  it("attaches the audit trail to a decision", () => {
    const result = { policyVersion: "1.0.0", primaryPolicyId: "P1", evidenceIds: ["E1"], decisionState: "X" }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = decisionBody(result as any, now)
    expect(body).toMatchObject(result)
    expect(body.audit).toEqual({ evaluatedAt: "2026-10-21T12:00:00.000Z", policyVersion: "1.0.0", primaryPolicyId: "P1", evidenceIds: ["E1"] })
  })

  it("reports readiness for matching, mismatched and unreachable OPA", () => {
    expect(healthBody({ policyVersion: "1.0.0", versionMatches: true })).toEqual({
      status: "ready",
      checks: { opa: { reachable: true, policyVersion: "1.0.0", expectedPolicyVersion: EXPECTED_MONEY_POLICY_VERSION, versionMatches: true } },
    })
    expect(healthBody({ policyVersion: "0.9.0", versionMatches: false }).status).toBe("not_ready")
    expect(healthBody(null)).toEqual({
      status: "not_ready",
      checks: { opa: { reachable: false, policyVersion: null, expectedPolicyVersion: EXPECTED_MONEY_POLICY_VERSION, versionMatches: false } },
    })
  })
})
