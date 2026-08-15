import type { MoneyDecisionInput, MoneyDecisionResult } from "@/lib/money-decision/schema"
import { moneyDecisionResultSchema } from "@/lib/money-decision/schema"

export const EXPECTED_MONEY_POLICY_VERSION = "1.0.0"

const OPA_TIMEOUT_MS = 5_000

function opaEndpoint(path: string) {
  const opaUrl = process.env.OPA_URL?.replace(/\/+$/, "")
  if (!opaUrl) throw new Error("OPA_URL is not configured")
  return `${opaUrl}${path}`
}

async function fetchOpa(path: string, init?: RequestInit) {
  const response = await fetch(opaEndpoint(path), {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(OPA_TIMEOUT_MS),
  })

  if (!response.ok) throw new Error(`OPA request failed with status ${response.status}`)
  return response
}

export async function evaluateMoneyDecision(input: MoneyDecisionInput): Promise<MoneyDecisionResult> {
  const response = await fetchOpa("/v1/data/nexus/money/v1/decision", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ input }),
  })
  const payload = await response.json()
  const result = moneyDecisionResultSchema.parse(payload.result)

  if (result.policyVersion !== EXPECTED_MONEY_POLICY_VERSION) {
    throw new Error("OPA policy version does not match the application release")
  }

  return result
}

export async function probeOpa() {
  const [healthResponse, versionResponse] = await Promise.all([
    fetchOpa("/health"),
    fetchOpa("/v1/data/nexus/money/v1/policy_version"),
  ])

  await healthResponse.arrayBuffer()
  const payload = await versionResponse.json()
  if (!payload || typeof payload.result !== "string") {
    throw new Error("OPA policy version response is invalid")
  }

  return {
    policyVersion: payload.result,
    versionMatches: payload.result === EXPECTED_MONEY_POLICY_VERSION,
  }
}
