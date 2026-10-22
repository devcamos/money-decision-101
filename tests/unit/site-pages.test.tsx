// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { renderToStaticMarkup } from "react-dom/server"

const { track } = vi.hoisted(() => ({ track: vi.fn() }))
const { redirect } = vi.hoisted(() => ({ redirect: vi.fn() }))
vi.mock("@vercel/analytics", () => ({ track: (...args: unknown[]) => track(...args) }))
vi.mock("@vercel/analytics/next", () => ({ Analytics: () => <span data-testid="vercel-analytics" /> }))
vi.mock("next/navigation", () => ({ redirect: (to: string) => redirect(to) }))
vi.mock("next/font/google", () => {
  const font = () => ({ variable: "font-var", className: "font" })
  return { Fraunces: font, Geist_Mono: font, Source_Sans_3: font }
})
vi.mock("next/og", () => ({
  ImageResponse: class {
    constructor(public element: React.ReactElement, public options: unknown) {}
  },
}))
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
})

describe("static pages render", () => {
  it.each([
    ["@/app/investing/page", /Investing 101|investing/i],
    ["@/app/help/page", /Help/],
    ["@/app/faq/page", /Help/],
    ["@/app/privacy/page", /Privacy/],
    ["@/app/terms/page", /Terms/],
  ])("%s", async (modulePath, text) => {
    const { default: Page } = await import(/* @vite-ignore */ modulePath)
    render(<Page />)
    expect(screen.getAllByText(text).length).toBeGreaterThan(0)
  })

  it("the home route redirects to Money Decision", async () => {
    const { default: Home } = await import("@/app/page")
    Home()
    expect(redirect).toHaveBeenCalledWith("/money-decision")
  })

  it("the money-decision layout passes children through", async () => {
    const { default: Layout } = await import("@/app/money-decision/layout")
    render(<Layout><p>child</p></Layout>)
    expect(screen.getByText("child")).toBeTruthy()
  })
})

describe("root layout", () => {
  it("loads Vercel Analytics only in production", async () => {
    const { default: RootLayout } = await import("@/app/layout")
    vi.stubEnv("NODE_ENV", "production")
    expect(renderToStaticMarkup(<RootLayout><p>x</p></RootLayout>)).toContain("vercel-analytics")
    vi.stubEnv("NODE_ENV", "test")
    expect(renderToStaticMarkup(<RootLayout><p>x</p></RootLayout>)).not.toContain("vercel-analytics")
  })
})

describe("image routes", () => {
  it.each([
    "@/app/icon",
    "@/app/apple-icon",
    "@/app/opengraph-image",
    "@/app/investing/opengraph-image",
    "@/app/money-decision/opengraph-image",
  ])("%s builds an image", async modulePath => {
    const { default: image } = await import(/* @vite-ignore */ modulePath)
    const response = image() as { element: React.ReactElement }
    expect(renderToStaticMarkup(response.element).length).toBeGreaterThan(0)
  })
})

describe("support card", () => {
  it("tracks md_bmc_click with its placement", async () => {
    const { SupportCard } = await import("@/components/site/support-card")
    render(<SupportCard placement="test" />)
    fireEvent.click(screen.getByRole("link", { name: /Get me a coffee/ }))
    expect(track).toHaveBeenCalledWith("md_bmc_click", { placement: "test" })
  })
})
