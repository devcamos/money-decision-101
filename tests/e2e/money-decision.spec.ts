import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"
import { correctRiskOption, riskChecks, todaysRiskCheck } from "../../lib/money-decision/risk-checks"

async function enterKnowledgeCheck(page: Page) {
  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toBeVisible()
  await expect(page.getByText("stays locked until you complete this check")).toBeVisible()
  await page.getByRole("button", { name: "Continue to knowledge check" }).click()
}

async function answerRiskCheck(page: Page, pass = true) {
  await enterKnowledgeCheck(page)
  const heading = page.getByRole("heading", { level: 1 })
  await expect(heading).toBeVisible()
  const title = (await heading.innerText()).trim()
  const check = riskChecks.find(item => item.title === title)
  expect(check, `unknown risk check: ${title}`).toBeTruthy()
  const label = pass
    ? correctRiskOption(check!)
    : check!.options.find(option => option[0] === false)![1]
  await page.getByRole("button", { name: label }).click()
}

async function answerFoundations(
  page: Page,
  path: "ready" | "difficulty" | "debt",
) {
  await page.getByRole("button", { name: "Start Money Decision" }).click()
  await page.getByRole("button", { name: path === "difficulty" ? "Yes" : "No" }).click()
  await page.getByRole("button", { name: path === "ready" ? "No" : "Yes" }).click()
  await page.getByRole("button", { name: path === "ready" || path === "debt" ? "3 to 6 months" : "Less than 1 month" }).click()
  await page.getByRole("button", { name: path === "difficulty" ? "No" : "Yes" }).click()
  await page.getByRole("button", { name: path === "difficulty" ? "Yes" : "No" }).click()
}

async function answerInvestingReady(page: Page) {
  await answerFoundations(page, "ready")
  await answerRiskCheck(page, true)
}

test("investing-readiness journey is policy-backed and provenance is visible", async ({ page }) => {
  await page.goto("/money-decision")
  await answerInvestingReady(page)

  await expect(page.getByRole("heading", { name: "You may be ready to explore investing" })).toBeVisible()
  await expect(page.getByText("Investing readiness", { exact: true })).toBeVisible()
  const riskCheck = todaysRiskCheck()
  const riskAnswer = correctRiskOption(riskCheck)
  await expect(page.getByText("Your answers", { exact: true })).toBeVisible()
  await expect(page.getByText(riskCheck.title, { exact: true })).toBeVisible()
  await expect(
    page.locator("li").filter({ hasText: riskCheck.title }).getByText(riskAnswer, { exact: true }),
  ).toBeVisible()
  await expect(page.getByText("Suggested actions")).toBeVisible()
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveAttribute("href", "/investing")
  await expect(page.getByText("Policy ID")).toHaveCount(0)
  await expect(page.getByText("MONEY-INVESTING-READINESS-001")).toHaveCount(0)
  await expect(page.getByText("1.0.0")).toHaveCount(0)
  await expect(page.getByText("Financial Conduct Authority").first()).toBeVisible()
  await expect(page.getByRole("banner").getByRole("link", { name: "Help", exact: true })).toHaveAttribute("href", "/help")
  await expect(page.getByText(/guaranteed return/i)).toHaveCount(0)
  await expect(page.getByText(/buy .*,/i)).toHaveCount(0)
})

test("financial difficulty skips the knowledge check and signposts MoneyHelper", async ({ page }) => {
  await page.goto("/money-decision")
  await answerFoundations(page, "difficulty")

  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Immediate financial stability is the next topic" })).toBeVisible()
  await expect(page.getByText("Immediate financial stability", { exact: true })).toBeVisible()
  await expect(page.getByText("Also matched, lower priority")).toBeVisible()
  await expect(page.getByText("Suggested actions")).toBeVisible()
  await expect(page.getByRole("link", { name: "Help if you're struggling with debt" }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: "How to prioritise your debts" }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveCount(0)
  await expect(page.getByText("Policy ID")).toHaveCount(0)
  await expect(page.getByText("MONEY-FINANCIAL-DIFFICULTY-001")).toHaveCount(0)
  await expect(page.getByText("MoneyHelper").first()).toBeVisible()
})

test("debt-priority result names the policy and the matching debt answer", async ({ page }) => {
  await page.goto("/money-decision")
  await answerFoundations(page, "debt")

  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Debt is the next topic before investing education" })).toBeVisible()
  await expect(page.getByText("Debt before investing", { exact: true })).toBeVisible()
  await expect(page.getByRole("link", { name: "How to prioritise your debts" }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveCount(0)
  await expect(page.getByText("Your answers", { exact: true })).toBeVisible()
  await expect(page.getByText("Do you currently have short-term or costly debt that still needs addressing?")).toBeVisible()
  await expect(
    page.locator("li").filter({
      hasText: "Do you currently have short-term or costly debt that still needs addressing?",
    }).getByText("Yes", { exact: true }),
  ).toBeVisible()
  await expect(page.getByText("MONEY-DEBT-001")).toHaveCount(0)
  await expect(page.getByText(/APR/i)).toHaveCount(0)
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
  await answerFoundations(page, "ready")

  await expect(page.getByRole("heading", { name: "We could not evaluate your answers" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toHaveCount(0)
  await expect(page.getByText("MONEY-INVESTING-READINESS-001")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "You may be ready to explore investing" })).toHaveCount(0)
})

test("knowledge check is shown only when the policy key is investing-ready", async ({ page }) => {
  await page.goto("/money-decision")
  await answerFoundations(page, "ready")

  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toBeVisible()
  await expect(page.getByText("Preparing the knowledge check")).toBeVisible()
  await expect(page.getByRole("button", { name: "Continue to knowledge check" })).toBeVisible()
  await page.getByRole("button", { name: "Continue to knowledge check" }).click()

  await expect(page.getByText("Knowledge check", { exact: true })).toBeVisible()
  const title = (await page.getByRole("heading", { level: 1 }).innerText()).trim()
  expect(riskChecks.some(check => check.title === title)).toBe(true)
  await expect(page.getByText("not a personal suitability assessment")).toBeVisible()
  await expect(page.getByRole("button", { name: "Yes", exact: true })).toHaveCount(0)
})

test("landing page has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/money-decision")
  const results = await new AxeBuilder({ page }).analyze()
  const material = results.violations.filter(v => v.impact === "serious" || v.impact === "critical")
  expect(material).toEqual([])
})

test("going back keeps the selected answer", async ({ page }) => {
  await page.goto("/money-decision")
  await page.getByRole("button", { name: "Start Money Decision" }).click()
  await page.getByRole("button", { name: "No" }).click()
  await page.getByRole("button", { name: "Back" }).click()

  await expect(page.getByRole("button", { name: "No" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("button", { name: "Yes" })).toHaveAttribute("aria-pressed", "false")
})

test("evaluating uses a classifying screen before the result", async ({ page }) => {
  await page.route("**/api/money-decision", async route => {
    await new Promise(resolve => setTimeout(resolve, 800))
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        decisionState: "UNDETERMINED",
        primaryPolicyId: "MONEY-UNDETERMINED-001",
        matchedPolicyIds: [],
        secondaryStates: [],
        evidenceIds: [],
        policyVersion: "1.0.0",
        explanationCode: "UNDETERMINED",
        audit: { reason: "POLICY_ENGINE_UNAVAILABLE" },
      }),
    })
  })

  await page.goto("/money-decision")
  await answerFoundations(page, "ready")
  await expect(page.getByRole("heading", { name: "Your result is being classified" })).toBeVisible()
  await expect(page.getByText("Evaluating your answers")).toBeVisible()
})

test("failed knowledge check can be retried without restarting", async ({ page }) => {
  await page.route("**/api/money-decision", async route => {
    const body = route.request().postDataJSON() as { acceptsInvestmentRisk?: boolean }
    const undetermined = body.acceptsInvestmentRisk === false
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        decisionState: undetermined ? "UNDETERMINED" : "INVESTING_READINESS",
        primaryPolicyId: undetermined ? "MONEY-UNDETERMINED-001" : "MONEY-INVESTING-READINESS-001",
        matchedPolicyIds: undetermined ? [] : ["MONEY-INVESTING-READINESS-001"],
        secondaryStates: [],
        evidenceIds: undetermined ? [] : ["FCA-INVEST-001", "FCA-INVEST-002"],
        policyVersion: "1.0.0",
        explanationCode: undetermined ? "UNDETERMINED" : "INVESTING_READINESS",
      }),
    })
  })

  await page.goto("/money-decision")
  await answerFoundations(page, "ready")
  await answerRiskCheck(page, false)

  await expect(page.getByRole("heading", { name: "This cannot be classified yet" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Try the knowledge check again" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Continue to Investing 101" })).toHaveCount(0)
  await page.getByRole("button", { name: "Try the knowledge check again" }).click()

  await expect(page.getByText("Knowledge check", { exact: true })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Knowledge check required" })).toHaveCount(0)
  await page.getByRole("button", { name: "Back", exact: true }).click()
  await expect(page.getByRole("heading", { name: "Could you need this £1,000 within the next three years?" })).toBeVisible()
  await expect(page.getByRole("button", { name: "No" })).toHaveAttribute("aria-pressed", "true")
})

test("investing-readiness is a gateway into Investing 101", async ({ page }) => {
  await page.route("**/api/money-decision", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        decisionState: "INVESTING_READINESS",
        primaryPolicyId: "MONEY-INVESTING-READINESS-001",
        matchedPolicyIds: ["MONEY-INVESTING-READINESS-001"],
        secondaryStates: [],
        evidenceIds: ["FCA-INVEST-001", "FCA-INVEST-002"],
        policyVersion: "1.0.0",
        explanationCode: "INVESTING_READINESS",
      }),
    })
  })

  await page.goto("/money-decision")
  await answerInvestingReady(page)

  const gateway = page.getByRole("link", { name: "Continue to Investing 101" })
  await expect(gateway).toBeVisible()
  await expect(gateway).toHaveAttribute("href", "/investing")
  await expect(page.getByText("Suggested actions")).toBeVisible()
  await gateway.click()
  await expect(page.getByRole("heading", { name: "Investing 101" })).toBeVisible()
})
