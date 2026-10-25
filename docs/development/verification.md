# Build and verification

Run commands from the repository root after `npm ci`:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` runs Vitest with coverage. The shared guardrails require at least 80% coverage and clean audits. Never weaken a gate, skip tests or add exemptions to obtain a pass. Bug fixes require a regression test.

For browser tests, start canonical OPA as described in [setup](setup.md), then:

```bash
npx playwright install chromium
OPA_URL=http://127.0.0.1:8181 npm run test:e2e
```

By default Playwright starts/reuses Next.js at port 3000. It runs desktop and mobile Chromium projects. For an already running server on port 3004:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3004 npm run test:e2e
```

Remote-base mode does not start a server; the target must already be running with its policy service. For protected hosted Previews, follow the [deployment guide](../operations/deployment.md).

## CI evidence

The workflows in `.github/workflows/` are authoritative:

- `app-build.yml`: application quality checks and browser compliance.
- `opa-policy.yml`: governed policy validation.
- `preview-health.yml`: deployed Preview readiness and public journeys.
- `production-health.yml`: deployed Production readiness and public journeys.

Verify results for the exact candidate commit. A skipped Production check on a Preview is not a Production pass. Report unavailable local checks honestly; remote CI evidence does not mean a local command ran. Follow shared timing and push rules before publishing work.

## Framework guidance

Before coding, read the relevant installed Next.js documentation under `node_modules/next/dist/docs/`. The root framework-managed section in `AGENTS.md` is retained because Next.js may regenerate it.
