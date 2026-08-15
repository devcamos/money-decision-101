import { expect, test } from "@playwright/test"

test("application readiness includes the expected governed OPA policy", async ({ request }) => {
  const response = await request.get("/api/health")
  expect(response.ok()).toBe(true)

  await expect(response.json()).resolves.toMatchObject({
    status: "ready",
    checks: {
      opa: {
        reachable: true,
        policyVersion: "1.0.0",
        expectedPolicyVersion: "1.0.0",
        versionMatches: true,
      },
    },
  })
})
