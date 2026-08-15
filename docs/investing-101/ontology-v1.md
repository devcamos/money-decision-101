# Investing 101 Ontology v1

Status: DRAFT_FOR_REVIEW  
Version: 1.0.0  
Last reviewed: 2026-08-15  
Machine contract: [`ontology-v1.json`](./ontology-v1.json)

This is the visitor teaching ontology for Investing 101. It is not Reality Orbit, not Money Decision policy, and not page copy.

- **Money Decision 101** classifies the next topic (six facts, OPA states, evidence, result contract).
- **Investing 101** teaches a closed set of UK investing concepts after `INVESTING_READINESS`.
- **Page copy** is a reviewed skin. It must stay narrower than this graph.
- **Reality Orbit** is a different product. Do not file these nodes on the Orbit backlog.

Canonical graph: 10 concepts. Do not add a node because the copy would read nicer. New concepts need a review of this file, the evidence registry, and the page together.

## Entry

`/money-decision` → `INVESTING_READINESS` → `/investing`

## Concepts

| ID | Label | Role | Page section |
|---|---|---|---|
| INV-101-INVESTING | Investing | root | What is investing? |
| INV-101-DEBT | Review debt | foundation | Financial foundations |
| INV-101-EMERGENCY | Emergency savings | foundation | Financial foundations |
| INV-101-PENSION | Workplace pension | foundation | Foundations and UK accounts |
| INV-101-HORIZON | Time horizon | horizon | Time horizon matters |
| INV-101-RISK | Risk | property | Risk, diversification and costs |
| INV-101-DIVERSIFICATION | Diversification | property | Risk, diversification and costs |
| INV-101-COSTS | Costs | property | Risk, diversification and costs |
| INV-101-ISA | Individual Savings Account | wrapper | UK accounts and pensions |
| INV-101-WARNING | Promised high or guaranteed returns | warning | Warning signs |

Full definitions, first principles, and evidence IDs live in the JSON.

## Ordering

Debt, emergency savings, and workplace pension sit **before** investing education. Time horizon **constrains** it. Risk, diversification, and costs are **properties of** it. An ISA **may hold** investments and **does not remove** risk.

## Named instruments (ETF, S&P 500, REITs)

Concept before ticker.

| Term | Tier | Why |
|---|---|---|
| ETF | Candidate concept, not v1 | A vehicle type. Could sit under diversification once tracker/passive evidence is added. Never a ticker or “start with an ETF.” |
| Tracker / index fund | Candidate concept, not v1 | FCA explains passive funds that match an index. We already removed “a low-cost total market index fund is a great starting point.” |
| S&P 500 | Not a node | Named US index. Teaching it as the thing to own is a recommendation. If we later illustrate “index,” FCA uses FTSE 100 as an example of a market, not a product pick. |
| REIT | Not v1 | Property vehicle. Needs its own official source. Easy to become yield-product advice. |

## Out of scope for v1

FSCS, Savings 101, asset-allocation percentages, provider comparisons, S&P 500 as a thing to own, REITs, and ETF/tracker nodes until evidence exists.
