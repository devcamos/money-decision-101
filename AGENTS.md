<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Money Decision 101 — agent rules

Governed gateway. Investing 101 opens only after Money Decision readiness. OPA policy **1.0.0 is frozen**. Do not invent extra policy keys.

- Do not add accounts, comments, payments, a database, AI chat, newsletter sending, or a native app in this lane.
- No direct pushes to Production or Preview. All hosted changes go through Git (`gh pr merge`). Do not `vercel deploy`, `vercel --prod`, `vercel promote`, first-deploy `--yes`, or CLI/MCP deploy that bypasses Git. Preview only from GitHub → Vercel Git wrap until founder GO **through git** (`git.deploymentEnabled.main: false`).
- Knowledge check only when the winning key is `INVESTING_READINESS`. Continue to Investing 101 only for that key.
- Colours on the reader and the share card must come from the Nexus kit (`refinery-brand`). Text and buttons use copperDeep (`#8a3d18`); copper (`#b85a2a`) is for charts and large kickers. Do not invent a palette.
- Verify with `npm test`. Policy 1.0.0 frozen. Local URL: http://127.0.0.1:3004/money-decision
- After completing work in this chat, include http://127.0.0.1:3004/money-decision in the reply. Preview does not replace localhost.
