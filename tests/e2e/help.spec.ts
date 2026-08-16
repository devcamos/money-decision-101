import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

const provenanceCopy =
  "Nexus applied its approved policy to the answers you provided. The authorities below did not personally assess you."

async function expectFaqLink(locator: import("@playwright/test").Locator) {
  await expect(locator).toBeVisible()
  await expect(locator).toHaveAttribute("href", "/faq")
  await expect(locator).toHaveText(/FAQ/)
  const box = await locator.boundingBox()
  expect(box, "FAQ control should have a bounding box").toBeTruthy()
  expect(box!.height).toBeGreaterThanOrEqual(44)
  expect(box!.width).toBeGreaterThanOrEqual(44)
}

test("header FAQ is visible and opens provenance copy", async ({ page }) => {
  await page.goto("/money-decision")
  const faq = page.getByRole("banner").getByRole("link", { name: /FAQ/ })
  await expectFaqLink(faq)
  await faq.click()

  await expect(page).toHaveURL(/\/faq\/?$/)
  await expect(page.getByRole("heading", { name: "Evidence-backed" })).toBeVisible()
  await expect(page.getByText(provenanceCopy)).toBeVisible()
  await expect(page.getByRole("heading", { name: "Official guidance used" })).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
  await expect(page.getByRole("link", { name: "How to prioritise your debts" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Help if you're struggling with debt" })).toBeVisible()
  await expect(page.getByText("Policy ID")).toHaveCount(0)
  await expect(page.getByText("1.0.0")).toHaveCount(0)
  await expect(page.getByText("MONEY-FINANCIAL-DIFFICULTY-001")).toHaveCount(0)
})

test("/faq returns 200 with provenance copy", async ({ page }) => {
  const response = await page.goto("/faq")
  expect(response?.status()).toBe(200)
  await expect(page.getByRole("heading", { name: "Evidence-backed" })).toBeVisible()
  await expect(page.getByText(provenanceCopy)).toBeVisible()
  await expect(page.getByRole("heading", { name: "Official guidance used" })).toBeVisible()
})

test("/help still serves the same FAQ provenance copy", async ({ page }) => {
  const response = await page.goto("/help")
  expect(response?.status()).toBe(200)
  await expect(page.getByText("FAQ").first()).toBeVisible()
  await expect(page.getByText(provenanceCopy)).toBeVisible()
})

test("help page has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/help")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
