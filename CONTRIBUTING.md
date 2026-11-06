# Contributing to Money Decision 101

Read [AGENTS.md](AGENTS.md) for current repository controls. This guide explains the source-derived setup; it grants no deployment, migration or merge permissions. Work in a feature branch and preserve OPA policy **1.0.0**.

## Prerequisites

- Git; repository access.
- **Node.js 24 and npm**, matching [.github/workflows/app-build.yml](.github/workflows/app-build.yml). Use npm ci and the committed lockfile.
- **OPA CLI 1.17.0**, matching CI and Dockerfile.vercel. Alternatively use the optional Docker route below instead of installing OPA.
- curl (or another HTTP client) for readiness checks.
- Chromium installed by Playwright for browser tests.

Python, Java, a database, Stripe credentials and an auth provider are not needed. Docker is optional, not required for the CLI setup. There is no Docker Compose file in this repo.

## 1. Install and configure

```bash
git clone https://github.com/devcamos/money-decision-101.git
cd money-decision-101
npm ci
cp .env.example .env.local
```

If .env.local already exists, edit it rather than overwriting it. Next.js loads .env.local for the web app; it is not shell configuration for OPA or other CLI programs.

Local development values:

```dotenv
OPA_URL=http://127.0.0.1:8181
# Optional; leave blank to keep the default external support destination.
NEXT_PUBLIC_SUPPORT_URL=
```

OPA_URL is server-side and required for policy evaluation/readiness. NEXT_PUBLIC_SUPPORT_URL is public client configuration, never a secret. There is no required app API key for local use.

Do not upload local OPA_URL to Vercel: hosted web receives its own private service binding. Never commit .env.local, real bypass tokens, generated browser auth state or private records.

## 2. Run OPA in terminal A

From the repo root with OPA CLI 1.17.0:

```bash
opa version
opa run --server --addr=127.0.0.1:8181 policy/money/v1/money_decision.rego policy/money/v1/evidence.json
```

Leave it running. This loads the decision policy and its evidence, not just an empty OPA process.

### Optional Docker alternative

Use this instead of the CLI command, not simultaneously on the same port:

```bash
docker build -f Dockerfile.vercel -t money-decision-opa:local .
docker run --rm --name money-decision-opa -p 127.0.0.1:8181:80 money-decision-opa:local
```

The image bundles OPA/policy and defaults to PORT 80. Binding the published port to localhost keeps the local policy service off external interfaces. Leave the container running; Ctrl-C stops it.

## 3. Run Next.js in terminal B

```bash
npm run dev
```

Open http://127.0.0.1:3000/money-decision and http://127.0.0.1:3000/investing.

The founder's existing port is optional and must be explicitly selected:

```bash
npm run dev -- --port 3004
```

Then use http://127.0.0.1:3004/money-decision. Do not assume npm run dev defaults to 3004.

## 4. Verify readiness in terminal C

For the default port:

```bash
curl --fail http://127.0.0.1:8181/health
curl --fail http://127.0.0.1:3000/api/health
```

Expect the app response to include status ready, OPA reachable and versionMatches true with policyVersion 1.0.0. Use 3004 instead if selected above. HTTP 503 means not ready; do not interpret the page loading as a working decision service.

## 5. Run checks

```bash
npm run lint
npm run typecheck
npm test
npm audit --audit-level=high
opa check policy/money/v1
opa test policy/money/v1 -v
npm run build
```

For browser checks with OPA still running:

```bash
npx playwright install --with-deps chromium
OPA_URL=http://127.0.0.1:8181 npm run test:e2e
```

The POSIX inline environment syntax above is for bash/sh; in PowerShell set $env:OPA_URL = "http://127.0.0.1:8181" before running npm run test:e2e. Playwright uses desktop and mobile Chromium and starts/reuses Next.js on port 3000 by default. Keep that port free or stop your own dev server before allowing Playwright to start it.

For an already-running server on the founder port:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3004 npm run test:e2e
```

Remote-base mode does not start a server. OPA_URL must already be configured for the target's server process. [Deployment guide](docs/deployment.md) describes protected Preview testing; do not put a dummy bypass credential in local env or commit a real one.

## Optional build/start flow

Stop the dev server on the selected port first, keep OPA running, then:

```bash
npm run build
npm start
```

Default startup is port 3000. This production-mode local server may enable the analytics component because NODE_ENV is production; npm run dev does not enable that component. Build-time font fetching and first-time package/browser/image downloads need internet. A successful build is not proof that OPA is reachable at runtime.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| /api/health is 503 | OPA running, OPA_URL loaded by Next.js, correct port, both policy files loaded and version 1.0.0 |
| Decision POST is 400 | Input did not satisfy zod schema; do not alter the frozen policy to hide invalid input |
| Decision POST is 503 / UNDETERMINED | Missing/unreachable/timed-out/mismatched OPA; no inferred financial result is expected |
| Address already in use | Stop the previous process or explicitly choose another port; update URLs/test base |
| Playwright missing browser/system libraries | Run its install command above; OS packages may require administrator rights |
| Build cannot download fonts | Check approved network access for next/font/google; no runtime Google auth key is required |
| Audit check fails | Investigate the advisory and affected dependencies; do not weaken the gate |
| New home-screen icon looks old | Browser/OS caching can retain installed artwork; device results are separate from HTTP/manifest tests |

## Contributor acceptance and architecture

- [Architecture overview and service inventory](docs/architecture/overview.md)
- [C4 context/container diagrams](docs/architecture/c4.md)
- [Deployment operations](docs/deployment.md)
- [Security reporting](SECURITY.md)

Use synthetic data; maintain educational/no-advice wording and accessibility. Keep changes focused and preserve existing checks. PR review/green checks are not release approval.
