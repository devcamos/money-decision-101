# Money Decision 101 Result Contract v1

Status: DRAFT_FOR_APPROVAL

Every result has three explicitly separated layers:

1. **Your result** - the policy classification.
2. **Why this appeared** - which user facts matched the approved policy.
3. **Official guidance used** - the authority evidence underpinning the policy, with source links shown in the UI.

The UI must not imply that an authority personally assessed the user or issued the classification.

**Suggested actions** sit under **What to explore next**. Each policy has its own linked next steps. Continue to Investing 101 is a suggested action only for `INVESTING_READINESS`. Provenance copy lives on `/help` (header: Help). Policy ID and version stay off the reader.

## FINANCIAL_DIFFICULTY

### Heading
Focus on immediate financial stability

### Interpretation
Your answers indicate that keeping up with essential or priority payments may currently deserve attention before considering investing.

### Next educational action
Pause the investing-readiness journey and review free, independent debt-support information.

### Suggested actions
- Help if you're struggling with debt (MoneyHelper)
- How to prioritise your debts (MoneyHelper)

### Boundary
Do not diagnose insolvency, recommend a debt solution, negotiate debt, or recommend a commercial debt provider.

## DEBT_PRIORITY

### Heading
Review debt before investing

### Interpretation
Your answers indicate that relevant short-term or costly debt remains to be addressed. The Money Decision policy therefore places debt review ahead of progressing toward investing.

### Next educational action
Understand your debts, their costs and repayment priorities using approved UK guidance before returning to investing readiness.

### Suggested actions
- How to prioritise your debts (MoneyHelper)
- Should you invest? (FCA)

### Boundary
Do not prescribe a repayment product, consolidation loan, lender, exact repayment amount, or universal APR threshold unless an approved authority explicitly supports the threshold used.

## EMERGENCY_RESILIENCE

### Heading
Strengthen your financial buffer

### Interpretation
Your answers indicate that your accessible emergency savings cover less than the policy's minimum investing-readiness threshold of three months of essential living expenses.

### Next educational action
Explore building accessible emergency savings before progressing toward investing.

### Suggested actions
- Should you invest? (FCA)
- Is it the right investment for you? (FCA)

### Context
The product may explain that FCA material describes three months as a rule of thumb and separately notes that many experts recommend three to six months. It must not present six months as an FCA requirement.

## PENSION_REVIEW

### Heading
Review your workplace pension first

### Interpretation
Your answers indicate that your workplace pension arrangements or available contributions have not yet been reviewed.

### Next educational action
Check your scheme's own contribution rules and available employer contributions before deciding whether to explore other investments.

### Suggested actions
- Workplace pensions: what you, your employer and the government pay (GOV.UK)
- Should you invest? (FCA)

### Boundary
Do not tell the user to contribute a particular percentage, transfer a pension, select a fund, or assume generic statutory minimums describe their individual scheme.

## NEAR_TERM_CASH

### Heading
Keep near-term needs in view

### Interpretation
Your answers indicate that you may need this money within approximately three years. The policy therefore does not classify it as ready for long-term investing education.

### Next educational action
Explore appropriate savings and cash information for money that may be needed in the near term.

### Suggested actions
- Is it the right investment for you? (FCA)

### Boundary
Do not recommend a specific bank, savings account, cash ISA, or provider.

## INVESTING_READINESS

### Heading
You may be ready to explore investing

### Interpretation
Your answers have cleared the financial-foundation checks in Money Decision 101, you do not expect to need this money within the near term, and you have acknowledged that investments can fall as well as rise.

### Next educational action
Learn about investment risk, diversification, time horizons, fees and UK investment wrappers using approved sources.

### Suggested actions
- Continue to Investing 101 (`/investing`)
- A beginner's guide to investing (MoneyHelper)
- Should you invest? (FCA)

### Boundary
This result is not a statement that investing is suitable for the user and must never recommend a specific investment, fund, security, provider, portfolio, or allocation.

## UNDETERMINED

### Heading
We cannot classify this safely yet

### Interpretation
The information provided does not allow the approved Money Decision policy to reach a supported classification.

### Next educational action
Review the unanswered or unsupported area, or consult an appropriately authorised or qualified source where needed.

### Suggested actions
- How we use official guidance (`/help`)

### Boundary
Never guess a result merely to complete the user journey.

## UI provenance requirement

The reader must make the following findable:

- the policy classification (policy name);
- authority name(s), source title(s) and source link(s) for the matching result;
- a way to open **Help** (`/help`) for the provenance copy.

Do **not** show Policy ID or policy version on the reader. Those remain on `/api/health`, OPA, and the decision API.

A clear statement that the result was structured from the cited guidance and that the authority did not personally assess the user lives on `/help`.
