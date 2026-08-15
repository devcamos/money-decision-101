# Investing 101 Ontology v2

Status: DRAFT_FOR_REVIEW  
Version: 2.0.0  
Last reviewed: 2026-08-15  
Supersedes: [`ontology-v1.md`](./ontology-v1.md)  
Machine contract: [`ontology-v2.json`](./ontology-v2.json)

This is the visitor teaching ontology for Investing 101. It is not Reality Orbit, not Money Decision policy, and not page copy.

- **Money Decision 101** classifies the next topic. Policy **1.0.0 is unchanged**.
- **Investing 101** teaches a closed set of UK investing concepts after `INVESTING_READINESS`.
- **Page copy** is a reviewed skin. It must stay narrower than this graph.

Canonical graph: 13 concepts. Do not add a node because the copy would read nicer. New concepts need a review of this file, the evidence registry, and the page together.

## What v2 adds

Three vehicle concepts, backed by existing MoneyHelper beginner guidance plus new FCA InvestSmart evidence (`FCA-INVEST-101-003`, Advantages of mainstream investments):

- Shares, bonds and cash as types
- Pooled funds as a basket
- Tracker versus active funds as a cost and method difference

v2 does **not** add ETF, REIT, S&P 500, FSCS amounts, Martin Lewis, or beginner/intermediate/advanced levels.

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
| INV-101-ASSET-TYPES | Shares, bonds and cash | vehicle | What can you invest in? |
| INV-101-FUNDS | Pooled funds | vehicle | Pooled funds and tracker funds |
| INV-101-TRACKER | Tracker funds | vehicle | Pooled funds and tracker funds |
| INV-101-RISK | Risk | property | Risk, diversification and costs |
| INV-101-DIVERSIFICATION | Diversification | property | Risk, diversification and costs |
| INV-101-COSTS | Costs | property | Risk, diversification and costs |
| INV-101-ISA | Individual Savings Account | wrapper | UK accounts and pensions |
| INV-101-WARNING | Promised high or guaranteed returns | warning | Warning signs |

## Named instruments

| Term | Tier in v2 |
|---|---|
| Tracker / index fund | Node `INV-101-TRACKER` |
| ETF | Still not a node |
| S&P 500 | Never a node. FTSE 100 may appear only as the FCA’s example of an index. |
| REIT | Not v2 |
