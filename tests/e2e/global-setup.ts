import { mkdirSync } from "node:fs"
import { chromium } from "@playwright/test"

export default async function globalSetup() {
  const baseURL = (process.env.PLAYWRIGHT_BASE_URL || process.env.PREVIEW_URL)?.replace(/\/+$/, "")
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  if (!baseURL || !secret) return

  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const response = await page.goto(
    `${baseURL}/api/health?x-vercel-protection-bypass=${encodeURIComponent(secret)}&x-vercel-set-bypass-cookie=true`,
  )
  if (!response?.ok()) {
    await browser.close()
    throw new Error(`Vercel protection bypass failed with status ${response?.status() ?? "unknown"}`)
  }
  mkdirSync("playwright/.auth", { recursive: true })
  await context.storageState({ path: "playwright/.auth/vercel.json" })
  await browser.close()
}
