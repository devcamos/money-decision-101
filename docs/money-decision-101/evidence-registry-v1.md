# Money Decision 101 Evidence Registry v1

Status: DRAFT_FOR_APPROVAL
Last reviewed: 2026-08-09

Only approved authoritative UK sources may underpin production financial policy. Interpretations must remain narrower than the source evidence.

| Evidence ID | Authority | Source | Supports | Interpretation boundary |
|---|---|---|---|---|
| FCA-INVEST-001 | Financial Conduct Authority | Should you invest? (last updated 16 May 2025) | DEBT_PRIORITY, EMERGENCY_RESILIENCE, PENSION_REVIEW | FCA says immediate finances should be in order before investing, prioritising short-term debt, an emergency cash fund and considering workplace pension investing. This may be used as ordering guidance, not as personalised advice. |
| FCA-INVEST-002 | Financial Conduct Authority | Is it the right investment for you? | DEBT_PRIORITY, NEAR_TERM_CASH | FCA says not to use emergency cash to invest, to clear debts, never invest using a credit card, and notes that for a fairly short timeframe, perhaps up to three years, savings could be considered. Near-term money may be classified away from long-term investing education, but may not recommend a specific savings product. |
| MONEYHELPER-DEBT-001 | MoneyHelper | How to prioritise your debts | FINANCIAL_DIFFICULTY | MoneyHelper distinguishes debt emergencies, priority debts and non-priority debts and directs people facing debt emergencies toward free independent debt advice. The investing journey may stop and signpost support, but may not prescribe a debt solution. |
| MONEYHELPER-DEBT-002 | MoneyHelper | Help if you're struggling with debt | FINANCIAL_DIFFICULTY | MoneyHelper says free debt advice is important where a person is worried about missing a priority payment, has missed one, or faces emergency issues. These circumstances may be used as a safety stop. |
| GOVUK-PENSION-001 | GOV.UK | Workplace pensions: What you, your employer and the government pay | PENSION_REVIEW | Contribution amounts depend on scheme type and enrolment. Most automatic-enrolment schemes use minimum contributions of 3% employer, 5% employee, 8% total, but scheme rules can differ. Users must be told to review their own scheme and must not infer an individual contribution recommendation from generic statutory figures. |

## Evidence governance

Each production evidence object must record:

- evidence ID;
- authority;
- source title and official URL;
- publication/update date where available;
- retrieval/review date;
- proposition supported;
- dependent policy IDs;
- interpretation boundary;
- status: DRAFT, APPROVED, SUSPENDED, SUPERSEDED or WITHDRAWN;
- next review date.

A policy dependent on SUSPENDED, SUPERSEDED or WITHDRAWN evidence must fail closed until reviewed.

## Current gaps

1. INVESTING_READINESS must be framed as the absence of earlier blockers plus acknowledgement of investment risk, not as an FCA declaration that investing is personally suitable.
2. `acceptsInvestmentRisk` requires carefully reviewed wording. It is an educational readiness fact, not a regulated suitability or risk-profiling assessment.
3. No universal APR threshold for `relevantDebt` is approved in v1. The questionnaire must avoid inventing one.
4. FSCS protection evidence belongs primarily in downstream Savings 101 / Investing 101 content and is not currently required to determine the Money Decision 101 primary state.
