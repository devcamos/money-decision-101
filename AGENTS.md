<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Money Decision 101 — contributor entry point

## Shared foundation

Read [engineering principles](https://github.com/devonte-amos-apps/pr-intelligence/blob/main/docs/engineering-principles.md) and [shared agent controls](https://github.com/devonte-amos-apps/pr-intelligence/blob/main/AGENT_RULES.md), then [this repository's rules](docs/governance/repository-rules.md). The shared controls define precedence and approval boundaries. Adoption is proposed until the prerequisite shared PR is merged; do not treat links to an unmerged document as an effective rule.


Follow the [shared engineering guardrails](https://github.com/devonte-amos-apps/pr-intelligence/blob/main/AGENT_RULES.md); they take precedence over conflicting repository guidance. Read the applicable documents before changing code:

- [Product and policy constraints](docs/product/constraints.md)
- [Development setup](docs/development/setup.md)
- [Build and verification](docs/development/verification.md)
- [Deployment and release](docs/operations/deployment.md)

OPA policy **1.0.0 is frozen**. Do not invent policy keys or bypass the governed decision service. Keep agent identities, memories and telemetry outside this application repository.

After completing work, include the founder-local URL http://127.0.0.1:3004/money-decision and state when availability is unverified. See the setup guide for default and custom ports.
