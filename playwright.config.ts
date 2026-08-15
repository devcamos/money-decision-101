import { defineConfig, devices } from "@playwright/test"

const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL || process.env.PREVIEW_URL
const baseURL = remoteBaseURL?.replace(/\/+$/, "") ?? "http://127.0.0.1:3000"

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    extraHTTPHeaders: process.env.VERCEL_AUTOMATION_BYPASS_SECRET
      ? {
          "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
          "x-vercel-set-bypass-cookie": "samesitenone",
        }
      : process.env.VERCEL_OIDC_TOKEN
        ? { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN }
        : undefined,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  webServer: remoteBaseURL
    ? undefined
    : {
        command: "npm run dev -- --hostname 127.0.0.1",
        url: "http://127.0.0.1:3000/money-decision",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
