# Money Decision 101 Decision Test Matrix v1

Status: DRAFT_FOR_APPROVAL

These cases are the acceptance contract that executable Rego must satisfy.

| Test | Facts summary | Expected primary | Expected secondary |
|---|---|---|---|
| MD-001 | Financial difficulty = true; all other facts arbitrary | FINANCIAL_DIFFICULTY | Any lower matching states may be secondary |
| MD-002 | No difficulty; relevant debt = true; emergency fund = 1 month; pension not reviewed | DEBT_PRIORITY | EMERGENCY_RESILIENCE, PENSION_REVIEW |
| MD-003 | No difficulty/debt; emergency fund = 2.9 months; pension reviewed; money not needed soon; accepts risk | EMERGENCY_RESILIENCE | none required |
| MD-004 | No difficulty/debt; emergency fund = 3 months; pension not reviewed | PENSION_REVIEW | none required |
| MD-005 | Foundations cleared; money needed within 3 years = true | NEAR_TERM_CASH | none required |
| MD-006 | Foundations cleared; money not needed within 3 years; accepts investment risk = true | INVESTING_READINESS | none |
| MD-007 | Foundations cleared; accepts investment risk = false | UNDETERMINED | none |
| MD-008 | emergencyFundMonths = null | UNDETERMINED | none |
| MD-009 | workplacePensionReviewed = null where pension review is required | UNDETERMINED | none |
| MD-010 | contradictory/invalid fact shape | UNDETERMINED or request rejected by input validation | none |
| MD-011 | Same valid facts + same policy version evaluated repeatedly | Identical decision every time | identical |
| MD-012 | Required evidence for winning policy is suspended | UNDETERMINED | none |

## Global invariants

All tests must additionally prove:

1. No decision contains a named investment, fund, security, provider or lender recommendation.
2. No decision contains personalised portfolio allocation percentages.
3. Every substantive primary decision includes at least one approved evidence ID.
4. `UNDETERMINED` is permitted and preferred over unsupported inference.
5. Policy version is returned for every evaluation.
6. Higher-priority matching rules always win deterministically.
7. The UI can explain which facts caused the classification without exposing unnecessary sensitive data.
8. OPA returns structured codes and metadata, not uncontrolled user-facing prose.

## Phase 7 E2E acceptance

The first working vertical slice is accepted only when a user can:

Landing page -> assessment -> answer review -> OPA evaluation -> result -> why this result -> official sources

and the resulting decision exactly matches this matrix for the relevant fixture.
