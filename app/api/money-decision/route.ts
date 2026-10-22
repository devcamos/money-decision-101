import { NextResponse } from "next/server"
import { evaluateMoneyDecision } from "@/lib/money-decision/opa"
import { decisionBody, undeterminedBody } from "@/lib/money-decision/responses"
import { moneyDecisionInputSchema } from "@/lib/money-decision/schema"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = moneyDecisionInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(undeterminedBody("INVALID_INPUT"), { status: 400 })
  }

  try {
    return NextResponse.json(decisionBody(await evaluateMoneyDecision(parsed.data)))
  } catch {
    return NextResponse.json(undeterminedBody("POLICY_ENGINE_UNAVAILABLE"), { status: 503 })
  }
}
