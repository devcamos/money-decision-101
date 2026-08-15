import { describe, expect, it } from "vitest"
import { correctRiskOption, riskCheckIndexForDay, riskChecks } from "@/lib/money-decision/risk-checks"

describe("riskChecks", () => {
  it("has five rotating knowledge checks with exactly one correct option each", () => {
    expect(riskChecks).toHaveLength(5)
    const titles = new Set(riskChecks.map(check => check.title))
    expect(titles.size).toBe(5)

    for (const check of riskChecks) {
      const correct = check.options.filter(option => option[0] === true)
      expect(correct, check.id).toHaveLength(1)
      expect(check.options.length).toBeGreaterThanOrEqual(3)
      expect(correctRiskOption(check)).toBe(correct[0][1])
    }
  })

  it("does not treat a guaranteed outcome as the correct answer", () => {
    for (const check of riskChecks) {
      expect(correctRiskOption(check)).not.toMatch(/guaranteed to|must recover|cannot fall/i)
    }
  })

  it("addresses you, not the user", () => {
    const blob = riskChecks
      .flatMap(check => [check.title, ...check.options.map(option => option[1])])
      .join(" ")
    expect(blob).not.toMatch(/\bthe user\b/i)
  })

  it("rotates by UTC day", () => {
    expect(riskCheckIndexForDay(0)).toBe(0)
    expect(riskCheckIndexForDay(86_400_000)).toBe(1)
    expect(riskCheckIndexForDay(86_400_000 * 5)).toBe(0)
  })
})
