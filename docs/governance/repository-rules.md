# Money Decision repository rules

Read [product constraints](../product/constraints.md), [setup](../development/setup.md), [verification](../development/verification.md) and [deployment](../operations/deployment.md).

## Principle-to-product mapping
- Correctness: OPA policy 1.0.0 frozen; never infer readiness when the service fails. Direct Investing 101 access is education, not suitability.
- Privacy: no accounts/database, financial profiling or answer/progress persistence added in this lane.
- Accessibility: semantic keyboard-accessible lessons, explanatory feedback and clear risk/no-advice language.
- Brand: existing tokens and shared icon renderer; no imposed cross-product rebrand.
- Operations: /api/health and critical questionnaire/guide journeys for the exact deployed revision.
- PWA: internet required; no offline/saved-progress claims without separately approved scope and acceptance.
- Delivery: feature PRs, Git-triggered Preview/main deployment, explicit named-PR merge approval. No direct CLI/API deploys.

For code changes retain lint, types, unit/browser tests and build checks. Documentation-only changes check paths/links/commands; existing CI stays unchanged. Keep agent identities/memories/telemetry outside the app repo.
