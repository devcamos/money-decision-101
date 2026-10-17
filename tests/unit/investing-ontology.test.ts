import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { investingOntology, investingOntologyEvidenceIds } from "@/lib/investing/ontology"

const registry = readFileSync("docs/investing-101/evidence-registry-v2.md", "utf8")

describe("Investing 101 ontology v3", () => {
  it("has eighteen concepts and a single root", () => {
    expect(investingOntology.version).toBe("3.0.0")
    expect(investingOntology.nodes).toHaveLength(18)
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

  it("includes benchmark and ETF concepts without recommending products", () => {
    const ids = investingOntology.nodes.map(node => node.id)
    expect(ids).toContain("INV-101-ASSET-TYPES")
    expect(ids).toContain("INV-101-FUNDS")
    expect(ids).toContain("INV-101-TRACKER")

    const labels = investingOntology.nodes.map(node => `${node.id} ${node.label}`).join(" ")
    expect(labels).not.toMatch(/FSCS|REIT|401\(k\)|IRA/i)

    const tracker = investingOntology.namedInstrumentTiers.find(item => item.term === "Tracker / index fund")
    expect(tracker?.tier).toBe("node")
    expect(investingOntology.namedInstrumentTiers.find(item => item.term === "ETF")?.tier).toBe("node")
    expect(investingOntology.namedInstrumentTiers.find(item => item.term === "S&P 500")?.tier).toBe("benchmark-example")
  })

  it("keeps MSE and difficulty levels out of the official graph", () => {
    expect(investingOntology.never.join(" ")).toMatch(/MoneySavingExpert/)
    expect(investingOntology.never.join(" ")).toMatch(/Beginner \/ intermediate \/ advanced/)
    expect(investingOntology.outOfScopeV3.join(" ")).toMatch(/Provider or platform comparisons/)
  })

  it("preserves the guided readiness route and permits direct education access", () => {
    expect(investingOntology.entry.opensWhen).toBe("INVESTING_READINESS")
    expect(investingOntology.entry.fromRoute).toBe("/money-decision")
    expect(investingOntology.entry.destinationRoute).toBe("/investing")
    expect(investingOntology.entry.directAccessAllowed).toBe(true)
  })
})
