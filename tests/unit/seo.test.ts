import { describe, expect, it } from "vitest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { metadata as helpMetadata } from "@/app/help/page"
import { metadata as investingMetadata } from "@/app/investing/page"
import { metadata as moneyDecisionMetadata } from "@/app/money-decision/layout"
import { metadata as privacyMetadata } from "@/app/privacy/page"
import { metadata as termsMetadata } from "@/app/terms/page"
import { buildSitemap, canonicalUrl, indexableRoutes } from "@/lib/seo/routes"
import { productionSiteOrigin } from "@/lib/site"

describe("canonical tags", () => {
  it.each([
    ["/money-decision", moneyDecisionMetadata],
    ["/investing", investingMetadata],
    ["/help", helpMetadata],
    ["/privacy", privacyMetadata],
    ["/terms", termsMetadata],
  ])("%s points at the production domain", (path, metadata) => {
    expect(metadata.alternates?.canonical).toBe(`${productionSiteOrigin}${path}`)
  })

  it("never canonicalises to a preview .vercel.app hash URL", () => {
    for (const route of indexableRoutes) {
      expect(canonicalUrl(route.path)).toMatch(/^https:\/\/money-decision-101\.vercel\.app\//)
    }
  })
})

describe("sitemap.xml", () => {
  it("lists every indexable page on the production domain", () => {
    const entries = sitemap()
    expect(entries.map(entry => entry.url)).toEqual(
      indexableRoutes.map(route => `${productionSiteOrigin}${route.path}`),
    )
    expect(entries.every(entry => entry.lastModified instanceof Date)).toBe(true)
  })

  it("does not list the /faq alias or API routes", () => {
    const urls = buildSitemap(new Date(0)).map(entry => entry.url)
    expect(urls.some(url => url.includes("/faq") || url.includes("/api/"))).toBe(false)
  })
})

describe("robots.txt", () => {
  it("allows crawling, blocks the API and links the sitemap", () => {
    const result = robots()
    expect(result.rules).toEqual({ userAgent: "*", allow: "/", disallow: ["/api/"] })
    expect(result.sitemap).toBe(`${productionSiteOrigin}/sitemap.xml`)
  })
})
