# Money Decision 101

A short, guided money-readiness check with decisions made by a versioned OPA policy. The questionnaire offers investing education after its readiness result and knowledge check; Investing 101 also supports direct educational access.

**Live:** https://money-decision-101.vercel.app/money-decision  
**Investing guide:** https://money-decision-101.vercel.app/investing

## Start here

- [Documentation index](docs/README.md)
- [Local setup and configuration](docs/development/setup.md)
- [Build, tests and CI](docs/development/verification.md)
- [Product and policy constraints](docs/product/constraints.md)
- [Deployment and release](docs/operations/deployment.md)
- [Contributor instructions](AGENTS.md)

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS and zod; OPA for governed decisions; Vitest and Playwright for verification. Consult `package.json` and the lockfile for current versions.

## Operations

The live [Notion checklist](https://app.notion.com/p/3be7233a96ec810380d2f07eaeae3553) remains the operational checklist; do not duplicate it in Git. Production tracks `main`; PR branches create Previews through Git integration.

Founder-local URL: http://127.0.0.1:3004/money-decision (requires the custom-port setup documented above).

## Project tooling

Bootstrapped with [v0](https://v0.app). [Linked v0 project](https://v0.app/chat/projects/prj_igT3LMfWP7oLfw0CfML0jEnPm5Fp). Tooling does not bypass the repository's PR, approval or Git deployment rules.

## Security and license

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

Proprietary. Copyright devcamos, all rights reserved. See [LICENSE](LICENSE).
