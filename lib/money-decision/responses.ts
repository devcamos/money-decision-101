import { EXPECTED_MONEY_POLICY_VERSION } from "@/lib/money-decision/opa"
import type { MoneyDecisionResult } from "@/lib/money-decision/schema"

export type UndeterminedReason = "INVALID_INPUT" | "POLICY_ENGINE_UNAVAILABLE"

/** Safe fallback returned whenever the policy engine could not decide. */
export function undeterminedBody(reason: UndeterminedReason, now: Date = new Date()) {
  return {
    decisionState: "UNDETERMINED" as const,
    primaryPolicyId: "MONEY-UNDETERMINED-001",
    matchedPolicyIds: [],
    secondaryStates: [],
    evidenceIds: [],
    policyVersion: EXPECTED_MONEY_POLICY_VERSION,
    explanationCode: "UNDETERMINED",
    audit: { evaluatedAt: now.toISOString(), reason },
  }
}

/** A policy decision with its audit trail attached. */
export function decisionBody(result: MoneyDecisionResult, now: Date = new Date()) {
  return {
    ...result,
    audit: {
      evaluatedAt: now.toISOString(),
      policyVersion: result.policyVersion,
      primaryPolicyId: result.primaryPolicyId,
      evidenceIds: result.evidenceIds,
    },
  }
}

/** Readiness body for /api/health; pass null when OPA could not be reached. */
export function healthBody(opa: { policyVersion: string; versionMatches: boolean } | null) {
  const versionMatches = opa?.versionMatches ?? false
  return {
    status: versionMatches ? ("ready" as const) : ("not_ready" as const),
    checks: {
      opa: {
        reachable: opa !== null,
        policyVersion: opa?.policyVersion ?? null,
        expectedPolicyVersion: EXPECTED_MONEY_POLICY_VERSION,
        versionMatches,
      },
    },
  }
}
