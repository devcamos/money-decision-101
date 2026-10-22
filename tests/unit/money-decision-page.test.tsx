// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import MoneyDecisionPage from "@/app/money-decision/page"
import { decisionStates } from "@/lib/money-decision/schema"
import { resultCopy } from "@/lib/money-decision/results"
import { todaysRiskCheck } from "@/lib/money-decision/risk-checks"

const optionLabel = (correct: boolean) => todaysRiskCheck().options.find(([value]) => value === correct)![1]

const { track } = vi.hoisted(() => ({ track: vi.fn() }))
vi.mock("@vercel/analytics", () => ({ track: (...args: unknown[]) => track(...args) }))
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))


type State = (typeof decisionStates)[number]

function governed(state: State, extra: Record<string, unknown> = {}) {
  return {
    decisionState: state,
    primaryPolicyId: `MONEY-${state}`,
    matchedPolicyIds: [`MONEY-${state}`],
    secondaryStates: state === "DEBT_PRIORITY" ? ["EMERGENCY_RESILIENCE"] : [],
    evidenceIds: state === "INVESTING_READINESS" ? ["FCA-INVEST-001", "UNKNOWN-ID"] : [],
    policyVersion: "1.0.0",
    explanationCode: state,
    ...extra,
  }
}

/** Mock fetch: probe (acceptsInvestmentRisk true) returns probeState; final call returns finalFor(answer). */
function mockDecision(probeState: State, finalFor: (accepts: boolean) => State = a => a ? "INVESTING_READINESS" : "UNDETERMINED") {
  const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body))
    const calls = fetchMock.mock.calls.length
    const state = calls === 1 ? probeState : finalFor(body.acceptsInvestmentRisk)
    return new Response(JSON.stringify(governed(state)))
  })
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

const foundationAnswers = ["No", "No", "3 to 6 months", "Yes", "No"]
const debtAnswers = ["No", "Yes", "1 to under 3 months", "No", "No"]

async function answerFoundations(labels: string[]) {
  for (const label of labels) {
    fireEvent.click(screen.getByRole("button", { name: label }))
  }
  await screen.findByRole("heading", { level: 1 }).catch(() => undefined)
}

function eventNames() {
  return track.mock.calls.map(call => call[0])
}

beforeEach(() => {
  track.mockReset()
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} }))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("Money Decision journey", () => {
  it("fires md_start, md_step_n per question, md_kc_shown, md_kc_pass and md_result on the investing path", async () => {
    mockDecision("INVESTING_READINESS")
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    expect(eventNames()).toEqual(["md_start"])

    await answerFoundations(foundationAnswers)
    fireEvent.click(await screen.findByRole("button", { name: /Continue to knowledge check/ }))
    const check = await screen.findByText("Knowledge check")
    expect(check).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: optionLabel(true) }))

    expect(await screen.findByText(resultCopy.INVESTING_READINESS.title)).toBeTruthy()
    expect(screen.getByTestId("result-disclaimer").textContent).toContain("General information, not financial advice.")
    expect(eventNames()).toEqual([
      "md_start",
      "md_step_n", "md_step_n", "md_step_n", "md_step_n", "md_step_n",
      "md_kc_shown",
      "md_step_n",
      "md_kc_pass",
      "md_result",
    ])
    expect(track.mock.calls.filter(c => c[0] === "md_step_n").map(c => c[1].step)).toEqual([1, 2, 3, 4, 5, 6])
    expect(track).toHaveBeenLastCalledWith("md_result", { decisionState: "INVESTING_READINESS" })

    fireEvent.click(screen.getByRole("link", { name: /Get me a coffee/ }))
    expect(track).toHaveBeenLastCalledWith("md_bmc_click", { placement: "result" })
  })

  it("does not fire md_kc_pass on a wrong answer and offers a retry", async () => {
    mockDecision("INVESTING_READINESS")
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(foundationAnswers)
    fireEvent.click(await screen.findByRole("button", { name: /Continue to knowledge check/ }))
    await screen.findByText("Knowledge check")
    fireEvent.click(screen.getByRole("button", { name: optionLabel(false) }))
    expect(await screen.findByText(resultCopy.UNDETERMINED.title)).toBeTruthy()
    expect(screen.getByTestId("result-disclaimer")).toBeTruthy()
    expect(eventNames()).not.toContain("md_kc_pass")

    fireEvent.click(screen.getByRole("button", { name: /Try the knowledge check again/ }))
    expect(await screen.findByText("Knowledge check")).toBeTruthy()
  })

  it.each(decisionStates.filter(s => s !== "INVESTING_READINESS"))(
    "shows the disclaimer on the %s result screen",
    async state => {
      mockDecision(state)
      render(<MoneyDecisionPage />)
      fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
      await answerFoundations(debtAnswers)
      expect(await screen.findByText(resultCopy[state].title)).toBeTruthy()
      expect(screen.getByTestId("result-disclaimer").textContent).toMatch(/general information, not financial advice/i)
      expect(track).toHaveBeenLastCalledWith("md_result", { decisionState: state })
      expect(eventNames()).not.toContain("md_kc_shown")

      fireEvent.click(screen.getByRole("button", { name: "Run again" }))
      expect(await screen.findByText(/1 of 5/)).toBeTruthy()
    },
  )

  it("shows the engine-unavailable notice when the result carries an audit reason", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(governed("UNDETERMINED", { audit: { reason: "POLICY_ENGINE_UNAVAILABLE" } })))))
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(debtAnswers)
    expect(await screen.findByText(/Reference: POLICY_ENGINE_UNAVAILABLE/)).toBeTruthy()
    expect(screen.getByTestId("result-disclaimer")).toBeTruthy()
  })

  it("shows the error screen when the service fails, then retries and starts over", async () => {
    let fail = true
    vi.stubGlobal("fetch", vi.fn(async () => {
      if (fail) throw new Error("offline")
      return new Response("not json")
    }))
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(debtAnswers)
    expect(await screen.findByText("We could not evaluate your answers")).toBeTruthy()
    fail = false
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    expect(await screen.findByText("We could not evaluate your answers")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Start over" }))
    expect(await screen.findByText(/1 of 5/)).toBeTruthy()
    expect(eventNames()).not.toContain("md_result")
  })

  it("retries the final evaluation after a failure on the knowledge check", async () => {
    let call = 0
    vi.stubGlobal("fetch", vi.fn(async () => {
      call += 1
      if (call === 1) return new Response(JSON.stringify(governed("INVESTING_READINESS")))
      if (call === 2) throw new Error("offline")
      if (call === 3) return new Response(JSON.stringify({ bad: true }))
      return new Response(JSON.stringify(governed("INVESTING_READINESS")))
    }))
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(foundationAnswers)
    fireEvent.click(await screen.findByRole("button", { name: /Continue to knowledge check/ }))
    await screen.findByText("Knowledge check")
    fireEvent.click(screen.getByRole("group").querySelector("button")!)
    expect(await screen.findByText("We could not evaluate your answers")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    expect(await screen.findByText("We could not evaluate your answers")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    expect(await screen.findByText(resultCopy.INVESTING_READINESS.title)).toBeTruthy()
  })

  it("lets the visitor go back from questions and the knowledge-check gate", async () => {
    mockDecision("INVESTING_READINESS")
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    fireEvent.click(screen.getByRole("button", { name: "No" }))
    expect(screen.getByText(/2 of 5/)).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: /Back/ }))
    expect(screen.getByText(/1 of 5/)).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: /Back/ }))
    expect(screen.getByRole("button", { name: /Start Money Decision/ })).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(foundationAnswers)
    fireEvent.click(await screen.findByRole("button", { name: /Back/ }))
    expect(await screen.findByText(/5 of 5/)).toBeTruthy()
  })

  it("auto-continues to the knowledge check when motion is allowed", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.stubGlobal("matchMedia", () => ({ matches: false }))
    mockDecision("INVESTING_READINESS")
    render(<MoneyDecisionPage />)
    fireEvent.click(screen.getByRole("button", { name: /Start Money Decision/ }))
    await answerFoundations(foundationAnswers)
    await screen.findByText("Knowledge check required")
    await vi.advanceTimersByTimeAsync(1700)
    expect(await screen.findByText("Knowledge check")).toBeTruthy()
    expect(eventNames()).toContain("md_kc_shown")
    vi.useRealTimers()
  })
})
