# Product constraints

## Educational scope

Money Decision 101 provides educational decision support, not personal financial advice. Do not add accounts, comments, payment processing, a database, AI chat, newsletter sending or a native application in this lane. The optional support card links to an external site only.

## Routing and frozen policy

Investing 101 permits direct educational access at `/investing`. The guided questionnaire at `/money-decision` offers its knowledge check and continuation to Investing 101 only when the winning key is `INVESTING_READINESS`. Direct access is not a suitability assessment or a readiness result.

OPA policy **1.0.0 is frozen**. Do not invent extra keys or infer a result when the policy service is unavailable or mismatched. Canonical policy files remain in `policy/money/v1/`; supporting specifications remain in `docs/money-decision-101/`.

## Brand

Use shared `lib/brand.ts` / `appBrand` tokens for generated icons and share cards and the existing CSS tokens for UI. Text and buttons use copperDeep (`#8a3d18`); copper (`#b85a2a`) is for charts and large kickers. Do not invent a palette.

## Home-screen installation

The installed web app requires internet. Do not claim offline availability or saved answers/progress. Keep the shared icon renderer consistent across favicon, Apple and PWA icons. Real-device installation checks are separate from browser/manifest validation.
