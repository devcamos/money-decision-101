# Nexus Gold Engineering Standard v1

Status: NORMATIVE
Version: 1.0.0
Scope: All Nexus Motivus applications

> Nexus applications are not built from model opinion. They are built from trusted external knowledge transformed into internal, testable engineering standards.

## 1. Evidence planes

Every Nexus application should distinguish three evidence planes:

1. **Domain evidence**: authoritative sources governing what the product may say or do.
2. **Engineering evidence**: trusted standards and official technical guidance governing how the product is built.
3. **Product evidence**: automated tests, user testing, analytics and feedback showing whether the product actually works.

The traceability pattern is:

`authority -> principle -> Nexus rule -> implementation -> automated or review evidence -> release gate`

## 2. Standard classes

### GOLD / Normative
Mandatory where applicable. Violations materially increase product, security, compliance, accessibility, correctness or maintainability risk.

### Recommended
Strong default. Deviations are allowed when the engineering trade-off is understood and documented.

### Experimental
Promising patterns under evaluation. They must not silently become release requirements.

## 3. Gold application gates

A production-bound Nexus web application must, where applicable, prove:

- deterministic dependency installation from a committed lockfile;
- no unresolved high or critical dependency vulnerabilities without an explicit governed exception;
- lint passes with warnings treated according to the repository policy;
- static type checking passes;
- unit/contract tests pass;
- production build passes without ignored compiler/type errors;
- critical user journeys pass in browser E2E tests;
- compliance-sensitive behaviours are represented as executable E2E invariants where feasible;
- serious and critical accessibility violations are blocked;
- domain policy tests pass independently of the UI;
- failures at governed boundaries fail safely rather than inventing results.

For the current React/Next.js reference implementation this means:

`OPA check/test -> npm ci -> npm audit gate -> ESLint -> TypeScript -> Vitest -> Next build -> real OPA service -> Playwright -> compliance assertions -> axe accessibility`

## 4. Domain-policy separation

Where a product contains governed decision logic:

- policy decisions belong in an explicit policy boundary, not uncontrolled UI or AI prose;
- user-facing copy is separately reviewable from policy execution;
- policy outputs are structured, versioned and explainable;
- domain evidence is versioned and traceable to the policies or claims it supports;
- missing, suspended or withdrawn required evidence causes safe degradation;
- AI must not bypass or reinterpret hard policy boundaries.

## 5. Frontend quality

Frontend implementations should:

- minimise inherited/generated surface area;
- prefer removal of unused components and dependencies over maintaining speculative infrastructure;
- use semantic HTML and visible keyboard focus;
- make loading, error and unavailable states explicit;
- avoid impure rendering and unnecessary effect-driven state;
- keep components understandable enough that policy and provenance remain visible in the UI architecture;
- remain usable on mobile without hiding essential evidence or safety information.

## 6. Security and supply chain

Applications should:

- validate untrusted inputs at the boundary;
- collect only data necessary for the product decision or workflow;
- keep secrets out of client code and source control;
- use deterministic dependency resolution;
- treat high/critical dependency findings as release blockers unless formally dispositioned;
- review dependency additions for actual need and remove unused libraries;
- preserve audit artifacts where they materially support release governance.

## 7. Accessibility

Accessibility is a release property, not a finishing task.

At minimum:

- keyboard access and focus visibility are intentional;
- text and interactive contrast meet the selected WCAG conformance target;
- semantic structure communicates headings, progress and controls;
- automated accessibility checks cover key user journeys;
- automated tools supplement, but do not replace, human accessibility review for production releases.

## 8. Testing model

Tests should be layered by responsibility:

- **Policy tests** prove governed decision rules and precedence.
- **Unit/contract tests** prove schemas, transformations and component/service contracts.
- **Integration tests** prove boundaries between application services where useful.
- **Playwright E2E** proves the real user journey through real application boundaries.
- **Compliance E2E** proves user-visible invariants such as provenance, prohibited claims, fail-closed behaviour and data minimisation.
- **Accessibility E2E** proves automated WCAG-related invariants on critical surfaces.

Mocks must not replace the real governed engine in the principal compliance E2E path when the real engine can reasonably be run in CI.

## 9. Engineering evidence registry

Trusted artifacts should be captured as standards using:

- Source / authority
- Principle
- Nexus interpretation
- Classification: Normative, Recommended or Experimental
- Applicability
- Implementation expectation
- Verification method
- Review date / version

Examples of source classes include official framework documentation, OWASP security standards, WCAG/W3C guidance, OPA documentation, Playwright documentation and carefully reviewed agent-engineering guidance.

## 10. Release rule

A green pipeline means the implementation satisfies the current executable contract. It does **not** by itself prove that the underlying domain policy is legally, financially, medically or otherwise professionally sufficient.

External or specialist review remains a distinct release gate where the product domain requires it.

## 11. Change rule

Do not weaken a Gold gate simply to make a build green.

When a gate fails:

1. determine whether the implementation, test or standard is wrong;
2. fix the correct layer;
3. record material changes;
4. rerun the complete affected evidence chain.

Gold is intentionally small. Preferences that do not materially affect trust, correctness, security, accessibility, compliance or long-term maintainability should remain Recommended or local implementation choices.
