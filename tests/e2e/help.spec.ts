import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test("Evidence-backed opens help with provenance copy", async ({ page }) => {
  await page.goto("/money-decision")
  await page.getByRole("banner").getByRole("link", { name: "Evidence-backed" }).click()

  await expect(page).toHaveURL(/\/help\/?$/)
  await expect(page.getByRole("heading", { name: "Evidence-backed" })).toBeVisible()
  await expect(page.getByText("Nexus applied its approved policy to the answers you provided. The authorities below did not personally assess you.")).toBeVisible()
  await expect(page.getByRole("heading", { name: "Official guidance used" })).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
  await expect(page.getByRole("link", { name: "How to prioritise your debts" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Help if you're struggling with debt" })).toBeVisible()
  await expect(page.getByText("Policy ID")).toHaveCount(0)
  await expect(page.getByText("1.0.0")).toHaveCount(0)
  await expect(page.getByText("MONEY-FINANCIAL-DIFFICULTY-001")).toHaveCount(0)
})

test("help page has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/help")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
