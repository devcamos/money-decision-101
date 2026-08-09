# Money Decision 101 Policy v1

Status: APPROVED_FOR_IMPLEMENTATION
Version: 1.0.0
Approved: 2026-08-09

## Product boundary

Money Decision 101 is an educational decision-support product. It classifies which financial topic a user should consider next using approved UK authority guidance. It does not provide a personal recommendation to buy, sell, hold, switch, or allocate to a specific investment, security, fund, account, pension product, lender, or provider.

## Decision precedence

Higher priority states win as the primary decision. Lower priority matching states may be returned as secondary considerations.

| Priority | State | Trigger summary | Permitted conclusion |
|---:|---|---|---|
| 100 | FINANCIAL_DIFFICULTY | User indicates missed or at-risk essential/priority payments or serious repayment difficulty | Stop the investing-readiness path and signpost free, independent debt support information |
| 90 | DEBT_PRIORITY | Relevant short-term or costly debt remains to be addressed | Review debt before progressing toward investing |
| 80 | EMERGENCY_RESILIENCE | Accessible emergency savings cover less than 3 months of essential living expenses | Consider strengthening accessible emergency savings before investing |
| 70 | PENSION_REVIEW | Workplace pension arrangements and contributions have not been reviewed | Review workplace pension arrangements before considering other investments |
| 60 | NEAR_TERM_CASH | The money may be needed within approximately 3 years | Explore savings/cash options rather than assuming investment risk is suitable |
| 50 | INVESTING_READINESS | Earlier gates are cleared, the money is not needed soon, and the user accepts that investment values can fall | User may be ready to explore investing education |
| 0 | UNDETERMINED | Required facts are missing or policy cannot safely classify the case | Make no substantive financial conclusion |

## Hard prohibitions

The policy must never emit or enable:

- a recommendation to buy, sell, hold, switch, or allocate to a specific investment or financial instrument;
- statements that a particular investment or product is suitable for the user;
- personalised portfolio construction or asset-allocation percentages;
- guaranteed return, safety, or outcome claims;
- invented thresholds presented as FCA, FSCS, HMRC, GOV.UK, MoneyHelper, or Bank of England requirements;
- a financial conclusion where required evidence is missing, withdrawn, expired, or unapproved.

## Input facts

The v1 policy should require only the minimum facts needed to classify the user:

- `financialDifficulty`: boolean
- `relevantDebt`: boolean
- `emergencyFundMonths`: number or null
- `workplacePensionReviewed`: boolean or null
- `moneyNeededWithinThreeYears`: boolean or null
- `acceptsInvestmentRisk`: boolean or null

The policy does not require name, email, address, employer, bank details, exact debt balance, salary, date of birth, or exact portfolio holdings.

## OPA output contract

The policy decision response must contain:

- `decisionState`
- `primaryPolicyId`
- `matchedPolicyIds`
- `secondaryStates`
- `evidenceIds`
- `policyVersion`
- `explanationCode`

OPA must return codes and structured policy metadata only. User-facing prose belongs to separately reviewed result templates.

## Conflict handling

All applicable states should be evaluated. The highest-priority state becomes `decisionState`; other applicable states become `secondaryStates` in descending priority order.

Example:

- relevant debt = true
- emergency fund = 1 month
- workplace pension reviewed = false

Result:

- primary: `DEBT_PRIORITY`
- secondary: `EMERGENCY_RESILIENCE`, `PENSION_REVIEW`

## Fail-closed behaviour

If a required fact is absent, contradictory, or outside the approved policy model, return `UNDETERMINED` rather than infer or fabricate guidance.

If an evidence object or policy is suspended or withdrawn, any dependent rule must become unavailable for new decisions.

## Approval record

Gate A was approved by the product owner on 2026-08-09. This approval freezes Policy v1 for engineering implementation. Subsequent policy changes require a new version and review. It does not constitute external legal or regulatory clearance for public launch.
