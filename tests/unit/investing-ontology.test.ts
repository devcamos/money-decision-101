import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { investingOntology, investingOntologyEvidenceIds } from "@/lib/investing/ontology"

const registry = readFileSync("docs/investing-101/evidence-registry-v1.md", "utf8")

describe("Investing 101 ontology v2", () => {
  it("has thirteen concepts and a single root", () => {
    expect(investingOntology.version).toBe("2.0.0")
    expect(investingOntology.nodes).toHaveLength(13)
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

  it("adds tracker and pooled-fund nodes without ETFs, S&P 500, or REITs", () => {
    const ids = investingOntology.nodes.map(node => node.id)
    expect(ids).toContain("INV-101-ASSET-TYPES")
    expect(ids).toContain("INV-101-FUNDS")
    expect(ids).toContain("INV-101-TRACKER")

    const labels = investingOntology.nodes.map(node => `${node.id} ${node.label}`).join(" ")
    expect(labels).not.toMatch(/FSCS|S&P|ETF|REIT|401\(k\)|IRA/i)

    const tracker = investingOntology.namedInstrumentTiers.find(item => item.term === "Tracker / index fund")
    expect(tracker?.tier).toBe("node")
    expect(investingOntology.namedInstrumentTiers.find(item => item.term === "ETF")?.tier).toBe("not-a-node")
    expect(investingOntology.namedInstrumentTiers.find(item => item.term === "S&P 500")?.tier).toBe("not-a-node")
  })

  it("keeps MSE and difficulty levels out of the official graph", () => {
    expect(investingOntology.never.join(" ")).toMatch(/MoneySavingExpert/)
    expect(investingOntology.never.join(" ")).toMatch(/Beginner \/ intermediate \/ advanced/)
    expect(investingOntology.outOfScopeV2.join(" ")).toMatch(/ETF/)
  })

  it("opens only from Money Decision investing-readiness", () => {
    expect(investingOntology.entry.opensWhen).toBe("INVESTING_READINESS")
    expect(investingOntology.entry.fromRoute).toBe("/money-decision")
    expect(investingOntology.entry.destinationRoute).toBe("/investing")
  })
})
