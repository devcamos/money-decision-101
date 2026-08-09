import { NextResponse } from "next/server"
import { moneyDecisionInputSchema, moneyDecisionResultSchema } from "@/lib/money-decision/schema"

export const runtime = "nodejs"

const undetermined = {
  decisionState: "UNDETERMINED" as const,
  primaryPolicyId: "MONEY-UNDETERMINED-001",
  matchedPolicyIds: [],
  secondaryStates: [],
  evidenceIds: [],
  policyVersion: "1.0.0",
  explanationCode: "UNDETERMINED",
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = moneyDecisionInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ...undetermined, audit: { evaluatedAt: new Date().toISOString(), reason: "INVALID_INPUT" } }, { status: 400 })
  }

  const opaUrl = process.env.OPA_URL
  if (!opaUrl) {
    return NextResponse.json({ ...undetermined, audit: { evaluatedAt: new Date().toISOString(), reason: "POLICY_ENGINE_UNAVAILABLE" } }, { status: 503 })
  }

  try {
    const response = await fetch(`${opaUrl.replace(/\/$/, "")}/v1/data/nexus/money/v1/decision`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input: parsed.data }),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    })

    if (!response.ok) throw new Error(`OPA ${response.status}`)
    const payload = await response.json()
    const result = moneyDecisionResultSchema.parse(payload.result)

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
