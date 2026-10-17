import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"
import { lessons } from "../../lib/investing/lessons"

async function chooseLesson(page: Page, index: number) {
  const select = page.getByRole("combobox", { name: "Choose a lesson" })
  if (await select.isVisible()) {
    await select.selectOption(String(index))
  } else {
    await page.getByRole("navigation", { name: "Lessons", exact: true }).getByRole("button").filter({ hasText: lessons[index].title }).click()
  }
  await expect(page.getByRole("heading", { name: lessons[index].title, exact: true })).toBeVisible()
}

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
  await expect(page.getByText(/authorities have not reviewed or endorsed this site or its author/i)).toBeVisible()
  await expect(page.getByRole("link", { name: /Advantages of mainstream investments/i })).toBeVisible()
})

test("Investing 101 teaches pooled funds and trackers without product picks", async ({ page }) => {
  await page.goto("/investing")

  await chooseLesson(page, lessons.findIndex(lesson => lesson.id === "funds"))
  await expect(page.getByRole("heading", { name: "Pooled funds and tracker funds" })).toBeVisible()
  await expect(page.getByText(/FTSE 100 as an example of a market index/i)).toBeVisible()

  await expect(page.locator("article").getByText(/buy the S&P 500/i)).toHaveCount(0)
  await expect(page.locator("article").getByText(/start with an ETF/i)).toHaveCount(0)
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

  await chooseLesson(page, lessons.length - 1)
  await expect(page.getByText(/promotions that promise very high or guaranteed returns/i)).toBeVisible()
})

test("Investing 101 is a destination, not a gateway back to Money Decision", async ({ page }) => {
  await page.goto("/investing")

  await expect(page.getByRole("heading", { name: lessons[0].title, exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeDisabled()
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


test("practice explains mistakes, allows retry and never gates lessons", async ({ page }) => {
  await page.goto("/investing")
  const question = lessons[0].question
  const wrongIndex = (question.correctIndex + 1) % question.options.length
  await page.getByRole("radio", { name: question.options[wrongIndex], exact: true }).check()
  await page.getByRole("button", { name: "Check answer", exact: true }).click()
  await expect(page.getByRole("status").filter({ hasText: "Not quite." })).toContainText(question.explanation)
  await expect(page.getByRole("button", { name: "Next lesson", exact: true })).toBeEnabled()
  await expect(page.getByRole("button", { name: "Mark lesson complete", exact: true })).toBeEnabled()
  await page.getByRole("button", { name: "Try again", exact: true }).click()
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeDisabled()
  await page.getByRole("radio", { name: question.options[question.correctIndex], exact: true }).check()
  await page.getByRole("button", { name: "Check answer", exact: true }).click()
  await expect(page.getByRole("status").filter({ hasText: "Correct." })).toContainText(question.explanation)
  await page.getByRole("button", { name: "Next lesson", exact: true }).click()
  await expect(page.getByRole("heading", { name: lessons[1].title, exact: true })).toBeFocused()
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeDisabled()
})

test("completion counts unique lessons, can be undone, and resets on reload", async ({ page }) => {
  await page.goto("/investing")
  const progress = page.getByRole("progressbar")
  await expect(progress).toHaveAttribute("value", "0")
  await page.getByRole("button", { name: "Mark lesson complete", exact: true }).click()
  await expect(progress).toHaveAttribute("value", "1")
  await chooseLesson(page, 1)
  await chooseLesson(page, 0)
  const completed = page.getByRole("button", { name: "Completed — mark incomplete", exact: true })
  await expect(completed).toHaveAttribute("aria-pressed", "true")
  await completed.click()
  await expect(progress).toHaveAttribute("value", "0")
  await page.getByRole("button", { name: "Mark lesson complete", exact: true }).click()
  await page.reload()
  await expect(progress).toHaveAttribute("value", "0")
})

test("every lesson can be explored and completed without answering a test", async ({ page }) => {
  await page.goto("/investing")
  for (const [index, lesson] of lessons.entries()) {
    await chooseLesson(page, index)
    await expect(page.getByRole("group", { name: lesson.question.prompt })).toBeVisible()
    await page.getByRole("button", { name: "Mark lesson complete", exact: true }).click()
    await expect(page.getByRole("progressbar")).toHaveAttribute("value", String(index + 1))
  }
  await expect(page.getByRole("status").filter({ hasText: "marked all lessons complete" })).toContainText("does not determine whether investing is suitable for you")
  await page.getByRole("button", { name: "Review lessons", exact: true }).click()
  await expect(page.getByRole("heading", { name: lessons[0].title, exact: true })).toBeFocused()
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", String(lessons.length))
})

test("lesson navigation adapts to the viewport and keyboard controls move focus", async ({ page, isMobile }) => {
  await page.goto("/investing")
  const nav = page.getByRole("navigation", { name: "Lessons", exact: true })
  const select = page.getByRole("combobox", { name: "Choose a lesson" })
  if (isMobile) {
    await expect(select).toBeVisible()
    await expect(nav).toBeHidden()
    await select.focus()
    await select.selectOption("1")
    await expect(select).toBeFocused()
    await expect(page.getByRole("heading", { name: lessons[1].title, exact: true })).toBeVisible()
  } else {
    await expect(nav).toBeVisible()
    await expect(select).toBeHidden()
    const secondLesson = nav.getByRole("button").nth(1)
    await secondLesson.focus()
    await page.keyboard.press("Enter")
    await expect(page.getByRole("heading", { name: lessons[1].title, exact: true })).toBeFocused()
  }
  await chooseLesson(page, 0)
  const glossary = page.getByText(lessons[0].terms[0].term, { exact: true })
  await glossary.focus()
  await page.keyboard.press("Enter")
  await expect(page.getByText(lessons[0].terms[0].definition, { exact: true })).toBeVisible()
  const next = page.getByRole("button", { name: "Next lesson", exact: true })
  await next.focus()
  await page.keyboard.press("Enter")
  await expect(page.getByRole("heading", { name: lessons[1].title, exact: true })).toBeFocused()
  await page.getByRole("button", { name: "Previous lesson", exact: true }).focus()
  await page.keyboard.press("Enter")
  await expect(page.getByRole("heading", { name: lessons[0].title, exact: true })).toBeFocused()
})

for (const id of ["markets", "indices", "etfs"]) {
  test(`${id} teaches definitions without making a suitability decision`, async ({ page }) => {
    await page.goto("/investing")
    const index = lessons.findIndex(lesson => lesson.id === id)
    await chooseLesson(page, index)
    const question = lessons[index].question
    await page.getByRole("radio", { name: question.options[(question.correctIndex + 1) % question.options.length], exact: true }).check()
    await page.getByRole("button", { name: "Check answer", exact: true }).click()
    await expect(page.getByRole("status").filter({ hasText: "Not quite." })).toContainText(question.explanation)
    await expect(page.getByRole("button", { name: "Next lesson", exact: true })).toBeEnabled()
    await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0")
    await expect(page.locator("article input[type=email], article input[type=number]")).toHaveCount(0)
    await expect(page.locator("article").getByRole("link").first()).toBeVisible()
  })
}
