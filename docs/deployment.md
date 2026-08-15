# Next.js + OPA deployment

## Architecture

Vercel deploys two services from one commit:

- `web` is the only publicly routed service and remains the Next.js application.
- `opa` is built from the root `Dockerfile.vercel`, loads the canonical files in `policy/money/v1`, and listens on Vercel's `PORT`.
- A private service binding injects the deployment-specific OPA URL into `web` as `OPA_URL`. There is deliberately no public rewrite to `opa`.

`GET /api/health` is the public readiness contract. It returns `200` only when OPA is reachable, reports policy version `1.0.0`, and matches the version expected by the app. It otherwise returns `503`. Money decisions also fail closed on an unavailable or mismatched policy service.

## Vercel setup

1. Import this repository into Vercel and set the project Framework Preset to **Services**.
2. Confirm the account/project has access to the Vercel Services and container runtime beta. If **Services** is absent from the preset list, request access from Vercel; `vercel.json` cannot enable an account feature.
3. Keep GitHub deployments enabled so successful Preview and Production deployments emit `deployment_status` events.
4. Do not create an `OPA_URL` project environment variable. The `web` service binding supplies it per deployment; a manually configured value would override the binding.

Pushes to non-production branches create Preview deployments. A successful Preview or Production deployment triggers the matching health workflow, which checks `/api/health` and two public browser journeys.

## Local development

Run OPA and Next.js in separate terminals:

```bash
opa run --server --addr=127.0.0.1:8181 \
  policy/money/v1/money_decision.rego \
  policy/money/v1/evidence.json
```

```bash
OPA_URL=http://127.0.0.1:8181 npm run dev
```

Verify readiness at `http://127.0.0.1:3000/api/health`. To exercise Vercel's service wiring locally, use a current Vercel CLI and run `vercel dev -L` from the repository root.

## Test a deployed Preview

Playwright uses a remote deployment directly, without starting its local `webServer`, when either variable is set:

```bash
PLAYWRIGHT_BASE_URL=https://your-preview.vercel.app npm run test:e2e
```

`PREVIEW_URL` is accepted as an equivalent fallback. Preview Health sends `x-vercel-protection-bypass` from the GitHub Actions secret `VERCEL_AUTOMATION_BYPASS_SECRET`. Create that bypass under Vercel Deployment Protection and store the same value in the repository secret.
