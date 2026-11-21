# Architecture overview

Reviewed against main commit `ed78847f5b617a4422e6aed0eea87c4a8eef7ad8` on 6 November 2026. This describes repository configuration and code, not a live cloud-settings audit.

## Purpose and boundaries

Money Decision 101 is UK educational decision support, not personal financial advice. Visitors answer a questionnaire; the server applies frozen OPA policy 1.0.0. Only an investing-readiness outcome opens the guided knowledge check and continuation. The Investing 101 lessons at /investing also permit direct educational access.

No login, application database, object store, cache service, payment API, background worker or notification scheduler is configured in this repository. Do not infer such services from unused UI packages. The installable web app requires internet; a manifest is not an offline implementation.

## Stack and cloud services

| Area | Implementation | Source |
| --- | --- | --- |
| Web and API | Next.js 16 App Router, React 19, TypeScript; Node.js API routes | [package.json](../../package.json), [API routes](../../app/api/) |
| UI | Tailwind CSS 4, Radix UI, lucide-react; existing cream/copper tokens | [brand](../../lib/brand.ts) |
| Validation | zod request/result schemas | [schema](../../lib/money-decision/schema.ts) |
| Decisions | OPA runtime 1.17.0; Rego policy version 1.0.0 (different version concepts) | [Dockerfile](../../Dockerfile.vercel), [policy](../../policy/money/v1/) |
| Hosting | Vercel Services: public web, privately bound money-policy container | [vercel.json](../../vercel.json) |
| Analytics | Vercel Web Analytics component in production builds; best-effort custom events | [layout](../../app/layout.tsx), [events](../../lib/analytics.ts) |
| Delivery | GitHub Actions tests/scans; Git integration creates Vercel deployments | [workflows](../../.github/workflows/) |
| Tests | Vitest coverage, Playwright desktop/mobile Chromium, axe accessibility | [package.json](../../package.json) |

Use the lockfile for resolved versions. CI uses Node 24. Google fonts are declared through next/font/google: font retrieval is a build dependency and fonts are served as application assets, not a required runtime Google API call.

## External integration inventory

| System | Relationship | Required for a policy decision? |
| --- | --- | --- |
| Vercel hosting | Runs web and private OPA service | Yes, on the configured hosted deployment |
| Vercel Analytics | Browser analytics; failures must not stop the flow | No |
| Buy Me a Coffee | Browser follows optional external support link (overridable); no payment SDK/webhook | No |
| FCA, MoneyHelper, GOV.UK | Outbound guidance/evidence links | No runtime API integration |
| S&P Dow Jones Indices, MSCI, FTSE Russell/LSEG, STOXX, London Stock Exchange, SEC Investor.gov, European Union | Outbound reference links in lessons | No runtime API integration |
| GitHub / GitHub Actions | Source control and build/test workflow | Delivery-time only |
| v0 | Linked authoring tool | Authoring-time only |
| Notion | Private planning/runbook/editorial references | Not a runtime dependency |

The support destination can be any configured URL; the default is Buy Me a Coffee. No answer data is deliberately passed in that link by the support component. Avoid blanket claims that the app emits no telemetry: custom event helpers can include question identifiers, decision states and support placements. Do not add raw personal/financial answers to analytics.

## Runtime and failure behavior

Browser -> Next.js POST /api/money-decision uses HTTPS + JSON. zod rejects invalid inputs with HTTP 400 and an UNDETERMINED body. The server posts JSON `{ input }` to OPA's /v1/data/nexus/money/v1/decision using the service-binding URL. Calls have a 5-second timeout and no-store caching. The result schema and policy version must match; failures return HTTP 503 and UNDETERMINED, not a guessed result.

GET /api/health probes OPA /health and /v1/data/nexus/money/v1/policy_version. It returns 200 only when policy readiness/version checks pass; otherwise 503. Opening a page or a successful Next build is insufficient readiness evidence.

The web/API share one Next.js service: the API is not a separate deployment. Policy/evidence files are read-only build inputs in the OPA image, not a database. Questionnaire answers and lesson progress are session UI state, not persisted application records.

## Further reading

- [C4 diagrams](c4.md)
- [Contributor/local setup](../../CONTRIBUTING.md)
- [Deployment operations](../deployment.md)
