import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

async function answerInvestingReady(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Start Money Decision" }).click()
  await page.getByRole("button", { name: "No" }).click()
  await page.getByRole("button", { name: "No" }).click()
  await page.getByRole("button", { name: "3 to 6 months" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
  await page.getByRole("button", { name: "No" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
}

test("investing-readiness journey is policy-backed and provenance is visible", async ({ page }) => {
  await page.goto("/money-decision")
  await answerInvestingReady(page)

  await expect(page.getByRole("heading", { name: "You may be ready to explore investing" })).toBeVisible()
  await expect(page.getByText("MONEY-INVESTING-READINESS-001")).toBeVisible()
  await expect(page.getByText("1.0.0")).toBeVisible()
  await expect(page.getByText("Financial Conduct Authority").first()).toBeVisible()
  await expect(page.getByText("The authorities below did not personally assess you.")).toBeVisible()
  await expect(page.getByText(/guaranteed return/i)).toHaveCount(0)
  await expect(page.getByText(/buy .*fund/i)).toHaveCount(0)
})

test("financial difficulty overrides lower-priority states and signposts independent support", async ({ page }) => {
  await page.goto("/money-decision")
  await page.getByRole("button", { name: "Start Money Decision" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
  await page.getByRole("button", { name: "Less than 1 month" }).click()
  await page.getByRole("button", { name: "No" }).click()
  await page.getByRole("button", { name: "Yes" }).click()
  await page.getByRole("button", { name: "No" }).click()

  await expect(page.getByRole("heading", { name: "Focus on immediate financial stability" })).toBeVisible()
  await expect(page.getByText("MONEY-FINANCIAL-DIFFICULTY-001")).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
})

test("consumer flow does not collect unnecessary identity or account data", async ({ page }) => {
  await page.goto("/money-decision")
  await page.getByRole("button", { name: "Start Money Decision" }).click()

  await expect(page.locator('input[type="email"]')).toHaveCount(0)
  await expect(page.locator('input[type="password"]')).toHaveCount(0)
  await expect(page.getByText(/bank account number/i)).toHaveCount(0)
  await expect(page.getByText(/national insurance/i)).toHaveCount(0)
})

test("network failure shows a retryable error instead of a decision", async ({ page }) => {
  await page.route("**/api/money-decision", route => route.abort())
  await page.goto("/money-decision")
  await answerInvestingReady(page)

  await expect(page.getByRole("heading", { name: "We could not evaluate your answers" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible()
  await expect(page.getByText("MONEY-INVESTING-READINESS-001")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "You may be ready to explore investing" })).toHaveCount(0)
})

test("landing page has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/money-decision")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
