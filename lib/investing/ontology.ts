import ontologyJson from "@/docs/investing-101/ontology-v3.json"

export const investingOntology = ontologyJson

export type InvestingOntologyNode = (typeof ontologyJson)["nodes"][number]
export type InvestingOntologyEdge = (typeof ontologyJson)["edges"][number]
export type InvestingOntology = typeof ontologyJson

export const investingOntologyEvidenceIds = [
  "FCA-INVEST-101-001",
  "FCA-INVEST-101-002",
  "FCA-INVEST-101-003",
  "MONEYHELPER-INVEST-101-001",
  "GOVUK-ISA-101-001",
  "GOVUK-PENSION-101-001",
  "SPDJI-INDEX-001",
  "MSCI-WORLD-001",
  "MSCI-ACWI-001",
  "FTSE-INDEX-001",
  "STOXX-INDEX-001",
  "EU-GEOGRAPHY-001",
  "MSCI-ASIA-001",
  "LSE-ETF-001",
  "SEC-ETF-001",
] as const
