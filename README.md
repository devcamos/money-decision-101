# Money Decision 101

A short, guided money-readiness check. It works through the basics (budget, emergency fund, debt) and gives a clear result; Investing 101 opens only once you're ready. Decisions are made by a versioned, tested policy rather than ad-hoc code.

**Live:** https://money-decision-101.vercel.app/money-decision

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, zod
- Open Policy Agent (Rego) policy for the readiness decision, run as a private service
- Vitest (unit, with coverage) and Playwright (E2E); deployed on Vercel

## Run locally

```bash
npm ci
npm run dev        # http://localhost:3000/money-decision
```

## Tests and checks

```bash
npm run lint
npm run typecheck
npm test           # Vitest
npm run test:e2e   # Playwright
npm run build
```

## Operating runbook

**Checklist (live):** [Money Decision 101](https://app.notion.com/p/3be7233a96ec810380d2f07eaeae3553)
Tick boxes on Notion. Do not copy the checklist into git.

**Local:** http://127.0.0.1:3004/money-decision
**GitHub:** https://github.com/devcamos/money-decision-101
**Pipeline:** PR [app-build.yml](https://github.com/devcamos/money-decision-101/actions/workflows/app-build.yml) · Preview Health [preview-health.yml](https://github.com/devcamos/money-decision-101/actions/workflows/preview-health.yml) · Production Health [production-health.yml](https://github.com/devcamos/money-decision-101/actions/workflows/production-health.yml).
**Production:** https://money-decision-101.vercel.app/money-decision
**Verify:** `npm test` · Policy **1.0.0 frozen**
**Surface:** Git `main` deploys Production (founder GO 2026-08-16). Preview from PR branches. Do not `vercel deploy`, `vercel --prod`, or `vercel promote`.

### Optional support link

After a result, Money Decision can show a low-pressure coffee-support card. It does not process payments or store supporter data; it links out only. Default destination is `https://buymeacoffee.com/devoamos`. Override with `NEXT_PUBLIC_SUPPORT_URL` (see `.env.example`).

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Founder GO 2026-08-16: merges to `main` deploy Production (`git.deploymentEnabled.main: true`). Still go through Git — do not `vercel --prod` or `vercel promote`.

[Continue working on v0 →](https://v0.app/chat/projects/prj_igT3LMfWP7oLfw0CfML0jEnPm5Fp)


## Deployment

The application deploys as a public Next.js service with a privately bound OPA container service. See [docs/deployment.md](docs/deployment.md) for local startup, Vercel prerequisites, readiness checks, and remote Preview testing.

## Security

Please report vulnerabilities privately. See [SECURITY.md](SECURITY.md).

## License

Proprietary. Copyright Devonte Amos, all rights reserved. See [LICENSE](LICENSE).
