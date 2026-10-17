import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { guideSources, lessons } from "@/lib/investing/lessons"
import { investingOntologyEvidenceIds } from "@/lib/investing/ontology"

const registry = readFileSync("docs/investing-101/evidence-registry-v2.md", "utf8")

describe("Beginner lesson publication contract", () => {
  it("resolves every lesson citation to a classified source in the evidence registry", () => {
    const sources = new Map(guideSources.map(source => [source.id, source]))
    expect(sources.size).toBe(guideSources.length)
    for (const lesson of lessons) {
      expect(lesson.sourceIds.length, lesson.id).toBeGreaterThan(0)
      for (const id of lesson.sourceIds) {
        const source = sources.get(id)
        expect(source, `${lesson.id}: missing ${id}`).toBeDefined()
        expect(source!.href).toMatch(/^https:\/\//)
        expect(registry).toContain(source!.evidenceId)
        expect(investingOntologyEvidenceIds).toContain(source!.evidenceId)
        expect(source!.sourceRole.length).toBeGreaterThan(0)
      }
    }
  })

  it("has unique stable lesson IDs and answerable checks with explanatory feedback", () => {
    expect(new Set(lessons.map(lesson => lesson.id)).size).toBe(lessons.length)
    for (const lesson of lessons) {
      const question = lesson.question
      expect(question.correctIndex).toBeGreaterThanOrEqual(0)
      expect(question.correctIndex).toBeLessThan(question.options.length)
      expect(new Set(question.options).size).toBe(question.options.length)
      expect(question.explanation.length).toBeGreaterThan(30)
    }
  })
})
