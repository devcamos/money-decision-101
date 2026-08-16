import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test("site root opens Money Decision 101", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveURL(/\/money-decision\/?$/)
  await expect(page.getByRole("heading", { name: "What should I do with my next £1,000?" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Money Decision 101" })).toHaveAttribute("href", "/money-decision")
  await expect(page.getByRole("link", { name: "NEXUS MOTIVUS" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Investing 101" })).toHaveCount(0)
})

test("Investing 101 shows UK authority provenance", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByRole("heading", { name: "Investing 101" })).toBeVisible()
  await expect(page.getByText("Financial Conduct Authority").first()).toBeVisible()
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
  await expect(page.getByText("GOV.UK").first()).toBeVisible()
  await expect(page.getByText(/authorities have not reviewed or endorsed Nexus Motivus/i)).toBeVisible()
  await expect(page.getByRole("link", { name: /Advantages of mainstream investments/i })).toBeVisible()
})

test("Investing 101 teaches pooled funds and trackers without product picks", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByRole("heading", { name: "What can you invest in?" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Pooled funds and tracker funds" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Tracker funds", exact: true })).toBeVisible()
  await expect(page.getByText(/FTSE 100 as an example of a market index/i)).toBeVisible()

  await expect(page.getByText(/S&P 500/i)).toHaveCount(0)
  await expect(page.getByText(/\bETF\b/i)).toHaveCount(0)
  await expect(page.getByText(/start with a tracker/i)).toHaveCount(0)
  await expect(page.getByText(/start with an ETF/i)).toHaveCount(0)
  await expect(page.getByText(/MoneySavingExpert/i)).toHaveCount(0)
  await expect(page.getByText(/Martin Lewis/i)).toHaveCount(0)
  await expect(page.getByRole("tab", { name: /intermediate/i })).toHaveCount(0)
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
  await expect(page.getByRole("link", { name: "Investing 101" })).toHaveAttribute("href", "/investing")
  await expect(page.getByRole("link", { name: "NEXUS MOTIVUS" })).toHaveCount(0)
  await expect(page.getByText("Next after Money Decision 101")).toHaveCount(0)
  await expect(page.getByText("After Money Decision 101")).toHaveCount(0)
  await expect(page.getByRole("link", { name: /Try Money Decision 101/i })).toHaveCount(0)
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveCount(0)
})

test("Investing 101 share card uses the Parent-style Open Graph image", async ({ page, request }) => {
  await page.goto("/investing")
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Learn the foundations.",
  )
  const ogImage = page.locator('meta[property="og:image"]')
  await expect(ogImage).toHaveAttribute("content", /\/investing\/opengraph-image/)
  const imageUrl = await ogImage.getAttribute("content")
  expect(imageUrl).toBeTruthy()
  const image = await request.get(imageUrl!)
  expect(image.status()).toBe(200)
  expect(image.headers()["content-type"]).toContain("image/png")
})

test("Investing 101 has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/investing")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})
