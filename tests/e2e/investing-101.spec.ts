import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test("site root opens Money Decision 101", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveURL(/\/money-decision\/?$/)
  await expect(page.getByRole("heading", { name: "What should I do with my next £1,000?" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Investing 101" })).toHaveCount(0)
})

test("Investing 101 shows UK authority provenance", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByRole("heading", { name: "Investing 101" })).toBeVisible()
  await expect(page.getByText("Financial Conduct Authority").first()).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
  await expect(page.getByText("GOV.UK").first()).toBeVisible()
  await expect(page.getByText(/authorities have not reviewed or endorsed Nexus Motivus/i)).toBeVisible()
})

test("Investing 101 avoids unsupported recommendation and social-proof language", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByText(/401\(k\)/i)).toHaveCount(0)
  await expect(page.getByText(/\bIRA\b/i)).toHaveCount(0)
  await expect(page.getByText(/thousands of beginners/i)).toHaveCount(0)
  await expect(page.getByText(/what to invest in first/i)).toHaveCount(0)
  await expect(page.getByText(/buy .*,/i)).toHaveCount(0)
  await expect(page.getByText(/we guarantee/i)).toHaveCount(0)
  await expect(page.getByText(/guaranteed profit/i)).toHaveCount(0)
  await expect(page.getByText(/guaranteed return of/i)).toHaveCount(0)

  await expect(page.getByText(/promotions that promise very high or guaranteed returns/i)).toBeVisible()
})

test("Investing 101 is a destination, not a gateway back to Money Decision", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByText("This is the investing guide")).toBeVisible()
  await expect(page.getByRole("link", { name: /Try Money Decision 101/i })).toHaveCount(0)
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveCount(0)
})

test("Investing 101 has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/investing")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
