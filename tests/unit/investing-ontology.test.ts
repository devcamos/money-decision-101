import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { investingOntology, investingOntologyEvidenceIds } from "@/lib/investing/ontology"

const registry = readFileSync("docs/investing-101/evidence-registry-v1.md", "utf8")

describe("Investing 101 ontology v1", () => {
  it("has ten concepts and a single root", () => {
    expect(investingOntology.nodes).toHaveLength(10)
    expect(investingOntology.nodes.filter(node => node.role === "root")).toHaveLength(1)
    expect(investingOntology.nodes[0].id).toBe("INV-101-INVESTING")
  })

  it("only cites evidence IDs that exist in the Investing 101 registry", () => {
    const cited = new Set(investingOntology.nodes.flatMap(node => node.evidenceIds))
    for (const id of cited) {
      expect(registry, id).toContain(id)
      expect(investingOntologyEvidenceIds).toContain(id)
    }
    expect(cited.size).toBe(investingOntologyEvidenceIds.length)
  })

  it("does not invent FSCS, funds, or allocation nodes", () => {
    const labels = investingOntology.nodes.map(node => `${node.id} ${node.label}`).join(" ")
    expect(labels).not.toMatch(/FSCS|S&P|ETF|REIT|index fund|401\(k\)|IRA/i)
    expect(investingOntology.outOfScopeV1.join(" ")).toMatch(/FSCS/)
    expect(investingOntology.namedInstrumentTiers.map(item => item.term)).toEqual([
      "ETF",
      "Tracker / index fund",
      "S&P 500",
      "REIT",
    ])
    expect(investingOntology.namedInstrumentTiers.every(item => item.tier !== "node")).toBe(true)
  })

  it("opens only from Money Decision investing-readiness", () => {
    expect(investingOntology.entry.opensWhen).toBe("INVESTING_READINESS")
    expect(investingOntology.entry.fromRoute).toBe("/money-decision")
    expect(investingOntology.entry.destinationRoute).toBe("/investing")
  })
})
