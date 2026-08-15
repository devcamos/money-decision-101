import ontologyJson from "@/docs/investing-101/ontology-v1.json"

export const investingOntology = ontologyJson

export type InvestingOntologyNode = (typeof ontologyJson)["nodes"][number]
export type InvestingOntologyEdge = (typeof ontologyJson)["edges"][number]
export type InvestingOntology = typeof ontologyJson

export const investingOntologyEvidenceIds = [
  "FCA-INVEST-101-001",
  "FCA-INVEST-101-002",
  "MONEYHELPER-INVEST-101-001",
  "GOVUK-ISA-101-001",
  "GOVUK-PENSION-101-001",
] as const
