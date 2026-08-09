import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test("Investing 101 shows UK authority provenance", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "Investing 101" })).toBeVisible()
  await expect(page.getByText("Financial Conduct Authority").first()).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
  await expect(page.getByText("GOV.UK").first()).toBeVisible()
  await expect(page.getByText(/authorities have not reviewed or endorsed Nexus Motivus/i)).toBeVisible()
})

test("Investing 101 avoids unsupported recommendation and social-proof language", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByText(/401\(k\)/i)).toHaveCount(0)
  await expect(page.getByText(/\bIRA\b/i)).toHaveCount(0)
  await expect(page.getByText(/thousands of beginners/i)).toHaveCount(0)
  await expect(page.getByText(/what to invest in first/i)).toHaveCount(0)
  await expect(page.getByText(/buy .*fund/i)).toHaveCount(0)
  await expect(page.getByText(/we guarantee/i)).toHaveCount(0)
  await expect(page.getByText(/guaranteed profit/i)).toHaveCount(0)
  await expect(page.getByText(/guaranteed return of/i)).toHaveCount(0)

  await expect(page.getByText(/promotions that promise very high or guaranteed returns/i)).toBeVisible()
})

test("Investing 101 routes uncertain users to governed Money Decision 101", async ({ page }) => {
  await page.goto("/")

  const link = page.getByRole("link", { name: /Try Money Decision 101/i })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute("href", "/money-decision")
})

test("Investing 101 has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
