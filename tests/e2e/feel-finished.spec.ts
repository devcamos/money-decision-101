import { expect, test } from "@playwright/test"

const viewports = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
] as const

async function expectMinTarget(
  locator: import("@playwright/test").Locator,
  minimum = 44,
) {
  await expect(locator).toBeVisible()
  const box = await locator.boundingBox()
  expect(box, "control should have a bounding box").toBeTruthy()
  expect(box!.height).toBeGreaterThanOrEqual(minimum)
  expect(box!.width).toBeGreaterThanOrEqual(minimum)
}

for (const viewport of viewports) {
  test(`primary Money Decision controls are at least 44px at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto("/money-decision")

    const start = page.getByRole("button", { name: "Start Money Decision" })
    await expectMinTarget(start)
    await start.click()

    await expectMinTarget(page.getByRole("button", { name: "Back" }))
    await expectMinTarget(page.getByRole("button", { name: "No" }).first())
    await expect(page.getByRole("link", { name: "Privacy" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Terms" })).toBeVisible()
  })
}

test("Investing 101 and Money Decision 101 expose privacy and terms", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy")
  await expect(page.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms")

  await page.getByRole("link", { name: "Privacy" }).click()
  await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible()
  await expect(page.getByText(/do not ask you to create an account/i)).toBeVisible()
  await expect(page.locator('input[type="email"]')).toHaveCount(0)

  await page.getByRole("link", { name: "Terms" }).click()
  await expect(page.getByRole("heading", { name: "Terms" })).toBeVisible()
  await expect(page.getByText(/not personal financial advice/i)).toBeVisible()
  await expect(page.getByText(/guaranteed return/i)).toHaveCount(0)
})
