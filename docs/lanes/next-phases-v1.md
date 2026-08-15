# Two-lane next phases (after PR 6)

Status: OPEN  
Last reviewed: 2026-08-15  
Main: `96ca853` ([PR #6](https://github.com/devramos/v0-investing-101-web-app/pull/6))

This is the development contract for the next Money Decision 101 and Investing 101 work. It is not Reality Orbit. Do not file it on Newsletter, API Sandbox, YieldTrace, or Orbit boards.

Money Decision **policy 1.0.0 is frozen**. New teaching needs evidence + ontology + page together. Preview first. Production is merge-gated.

## Shared “now”

One app. `/` redirects to Money Decision 101. Header uses the product name. Nexus Motivus is footer-only. Investing 101 v2 teaches asset types, pooled funds, and tracker versus active from FCA / MoneyHelper / GOV.UK only.

Sequence: `/money-decision` → `INVESTING_READINESS` → `/investing`

## Lane A — Money Decision 101

Classifies the next topic. Does not teach investing.

| ID | Intent | Branch | Non-goal |
|---|---|---|---|
| MD-P1 | Make Production Health an honest signal (unique Vercel URL is SSO 302 HTML today) | `feat/md-production-health-signal` | Do not put Preview Health secrets on Production |
| MD-P2 | Optional hardening of `POST /api/money-decision` | `feat/md-post-hardening` | Do not change OPA 1.0.0 |
| MD-P3 | Savings 101 as a destination from `EMERGENCY_RESILIENCE` / `NEAR_TERM_CASH` | `feat/md-savings-101-surface` | Not a policy bump unless a new state is approved |
| MD-P4 | Identity / checkout remain No | — | Do not add accounts |

**Next GO on this lane:** MD-P1.

## Lane B — Investing 101

Teaches after investing-readiness. Copy must stay narrower than `docs/investing-101/ontology-v2.json`.

| ID | Intent | Branch | Non-goal |
|---|---|---|---|
| INV-P1 | Bind `/investing` sections to ontology v2 so copy cannot drift | `feat/inv-bind-ontology-v2` | Do not add ETF/REIT/S&P nodes |
| INV-P2 | FSCS lesson only with FSCS.gov.uk | `feat/inv-fscs-lesson` | Do not invent £85k / £120k from MSE |
| INV-P3 | ISA allowance / tax-band figures from GOV.UK / HMRC with a review date | `feat/inv-isa-allowance` | Numbers expire; no provider |
| INV-P4 | ETF as a vehicle type only if a UK official page explains it | `feat/inv-etf-vehicle` | Never a ticker or “start with an ETF” |

**Next GO on this lane:** INV-P1.

## Never on either lane

- Change policy 1.0.0 without a new approved evidence pack
- Invent an APR cutoff or `LEARN_ABOUT_RISK`
- Beginner / intermediate / advanced levels
- Martin Lewis / MSE as official authority
- Named fund, platform, or “buy the S&P 500”
- Reverse the one-way sequence

## Verify

- Local (in-dev only): OPA `127.0.0.1:8181`, app `http://127.0.0.1:3000/api/health`
- PR review on Preview, not Production
- `npm test` and Playwright journeys for the lane that moved
