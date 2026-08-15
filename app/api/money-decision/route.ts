import { NextResponse } from "next/server"
import { evaluateMoneyDecision, EXPECTED_MONEY_POLICY_VERSION } from "@/lib/money-decision/opa"
import { moneyDecisionInputSchema } from "@/lib/money-decision/schema"

export const runtime = "nodejs"

const undetermined = {
  decisionState: "UNDETERMINED" as const,
  primaryPolicyId: "MONEY-UNDETERMINED-001",
  matchedPolicyIds: [],
  secondaryStates: [],
  evidenceIds: [],
  policyVersion: EXPECTED_MONEY_POLICY_VERSION,
  explanationCode: "UNDETERMINED",
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = moneyDecisionInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ...undetermined, audit: { evaluatedAt: new Date().toISOString(), reason: "INVALID_INPUT" } }, { status: 400 })
  }

  try {
    const result = await evaluateMoneyDecision(parsed.data)

    return NextResponse.json({
      ...result,
      audit: {
        evaluatedAt: new Date().toISOString(),
        policyVersion: result.policyVersion,
        primaryPolicyId: result.primaryPolicyId,
        evidenceIds: result.evidenceIds,
      },
    })
  } catch {
    return NextResponse.json({ ...undetermined, audit: { evaluatedAt: new Date().toISOString(), reason: "POLICY_ENGINE_UNAVAILABLE" } }, { status: 503 })
  }
}
