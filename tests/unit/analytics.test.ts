import { beforeEach, describe, expect, it, vi } from "vitest"
import * as analytics from "@/lib/analytics"

const state = vi.hoisted(() => ({ failing: false, track: vi.fn() }))
const track = state.track
vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => {
    if (state.failing) throw new Error("blocked")
    state.track(...args)
  },
}))



beforeEach(() => {
  state.failing = false
  track.mockReset()
})

describe("Money Decision analytics events", () => {
  it("uses the six launch-plan event names", () => {
    expect(Object.values(analytics.mdEvents).sort()).toEqual(
      ["md_bmc_click", "md_kc_pass", "md_kc_shown", "md_result", "md_start", "md_step_n"],
    )
  })

  it("sends each event with its properties", () => {
    analytics.trackStart()
    analytics.trackStep(3, "emergencyFundMonths")
    analytics.trackKnowledgeCheckShown()
    analytics.trackKnowledgeCheckPass()
    analytics.trackResult("DEBT_PRIORITY")
    analytics.trackSupportClick("result")
    expect(track.mock.calls).toEqual([
      ["md_start", undefined],
      ["md_step_n", { step: 3, question: "emergencyFundMonths" }],
      ["md_kc_shown", undefined],
      ["md_kc_pass", undefined],
      ["md_result", { decisionState: "DEBT_PRIORITY" }],
      ["md_bmc_click", { placement: "result" }],
    ])
  })

  it("never throws if analytics fails", () => {
    state.failing = true
    expect(() => analytics.trackStart()).not.toThrow()
    state.failing = false
  })
})
