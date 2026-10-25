# Development setup

## Prerequisites

Use Node.js compatible with the installed Next.js version, npm and the OPA CLI. Install the lockfile versions with `npm ci`; do not substitute dependency versions from prose. See `package.json` for scripts and `package-lock.json` for resolved dependencies.

## Start the application

From the repository root:

```bash
npm ci
```

Start the canonical policy in one terminal:

```bash
opa run --server --addr=127.0.0.1:8181 \
  policy/money/v1/money_decision.rego \
  policy/money/v1/evidence.json
```

Start Next.js in another:

```bash
OPA_URL=http://127.0.0.1:8181 npm run dev
```

Default URL: http://127.0.0.1:3000/money-decision.
Readiness: http://127.0.0.1:3000/api/health. A running web page alone does not prove policy readiness.

For the founder's established port:

```bash
OPA_URL=http://127.0.0.1:8181 npm run dev -- --port 3004
```

Founder-local URL: http://127.0.0.1:3004/money-decision. This URL is not a hosted Preview or a claim that a server is running.

## Configuration

`OPA_URL` points to local OPA during development; Vercel supplies a private service binding in hosted deployments. Do not override that hosted binding.

The optional `NEXT_PUBLIC_SUPPORT_URL` is documented in `.env.example`. It changes an external support link only; no payments or supporter data are processed by the app. Never commit credentials or generated browser authentication state.

See [verification](verification.md) and [hosted deployment](../operations/deployment.md).
