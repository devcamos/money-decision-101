import { afterEach, describe, expect, it, vi } from "vitest"
import { GET as health } from "@/app/api/health/route"
import { POST as decide } from "@/app/api/money-decision/route"

const validInput = {
  financialDifficulty: false,
  relevantDebt: true,
  emergencyFundMonths: 2,
  workplacePensionReviewed: false,
  moneyNeededWithinThreeYears: false,
  acceptsInvestmentRisk: false,
}

const governed = {
  decisionState: "DEBT_PRIORITY",
  primaryPolicyId: "MONEY-DEBT-001",
  matchedPolicyIds: ["MONEY-DEBT-001"],
  secondaryStates: [],
  evidenceIds: [],
  policyVersion: "1.0.0",
  explanationCode: "DEBT_PRIORITY",
}

function post(body: unknown) {
  return new Request("http://local/api/money-decision", { method: "POST", body: JSON.stringify(body) })
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe("POST /api/money-decision", () => {
  it("rejects invalid input without inferring a result", async () => {
    const response = await decide(post({ nope: true }))
    expect(response.status).toBe(400)
    expect((await response.json()).audit.reason).toBe("INVALID_INPUT")
  })

  it("returns the governed result with an audit block", async () => {
    vi.stubEnv("OPA_URL", "http://opa")
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ result: governed }))))
    const response = await decide(post(validInput))
    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body.decisionState).toBe("DEBT_PRIORITY")
    expect(body.audit.primaryPolicyId).toBe("MONEY-DEBT-001")
  })

  it("answers 503 when the policy engine is unavailable", async () => {
    vi.stubEnv("OPA_URL", "")
    const response = await decide(post(validInput))
    expect(response.status).toBe(503)
    expect((await response.json()).audit.reason).toBe("POLICY_ENGINE_UNAVAILABLE")
  })
})

describe("GET /api/health", () => {
  function opa(version: string) {
    return vi.fn(async (url: string) =>
      url.endsWith("/health") ? new Response("{}") : new Response(JSON.stringify({ result: version })),
    )
  }

  it("is ready when OPA serves the expected policy", async () => {
    vi.stubEnv("OPA_URL", "http://opa")
    vi.stubGlobal("fetch", opa("1.0.0"))
    const response = await health()
    expect(response.status).toBe(200)
    expect((await response.json()).status).toBe("ready")
  })

  it("is not ready on a policy version mismatch", async () => {
    vi.stubEnv("OPA_URL", "http://opa")
    vi.stubGlobal("fetch", opa("9.9.9"))
    expect((await health()).status).toBe(503)
  })

  it("is not ready when OPA is unreachable", async () => {
    vi.stubEnv("OPA_URL", "")
    expect((await health()).status).toBe(503)
  })
})
