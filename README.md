# money-decision-101

Money Decision 101 is the governed gateway. Investing 101 opens only after readiness.

## Operating runbook

**Checklist (live):** [Money Decision 101](https://app.notion.com/p/3be7233a96ec810380d2f07eaeae3553)
Tick boxes on Notion. Do not copy the checklist into git.

**Local:** http://127.0.0.1:3004/money-decision
**GitHub:** https://github.com/devcamos/money-decision-101
**Pipeline:** PR [app-build.yml](https://github.com/devcamos/money-decision-101/actions/workflows/app-build.yml) · Preview Health [preview-health.yml](https://github.com/devcamos/money-decision-101/actions/workflows/preview-health.yml) · Production Health [production-health.yml](https://github.com/devcamos/money-decision-101/actions/workflows/production-health.yml).
**Production:** https://v0-investing-101-web-app.vercel.app/money-decision (Vercel project name unchanged; GitHub is `money-decision-101`)
**Verify:** `npm test` · Policy **1.0.0 frozen**
**Surface:** Git `main` deploys Production (founder GO 2026-08-16). Preview from PR branches. Do not `vercel deploy`, `vercel --prod`, or `vercel promote`.

### Optional support link

After a result, Money Decision can show a low-pressure coffee-support card. It does not process payments or store supporter data; it links out only. Default destination is `https://buymeacoffee.com/devoamos`. Override with `NEXT_PUBLIC_SUPPORT_URL` (see `.env.example`).

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Founder GO 2026-08-16: merges to `main` deploy Production (`git.deploymentEnabled.main: true`). Still go through Git — do not `vercel --prod` or `vercel promote`.

[Continue working on v0 →](https://v0.app/chat/projects/prj_igT3LMfWP7oLfw0CfML0jEnPm5Fp)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

The application deploys as a public Next.js service with a privately bound OPA container service. See [docs/deployment.md](docs/deployment.md) for local startup, Vercel prerequisites, readiness checks, and remote Preview testing.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/devcamos/money-decision-101" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
