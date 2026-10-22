import type { MetadataRoute } from "next"
import { productionSiteOrigin } from "@/lib/site"

/** Public, indexable pages. /faq re-exports /help, so it canonicalises to /help and is not listed. */
export const indexableRoutes = [
  { path: "/money-decision", priority: 1, changeFrequency: "weekly" },
  { path: "/investing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/help", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const satisfies ReadonlyArray<{
  path: string
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
}>

export type IndexablePath = (typeof indexableRoutes)[number]["path"]

/** Absolute canonical URL on the production domain. */
export function canonicalUrl(path: IndexablePath): string {
  return new URL(path, productionSiteOrigin).toString()
}

/** Metadata fragment for a page's canonical link. */
export function canonicalFor(path: IndexablePath) {
  return { canonical: canonicalUrl(path) }
}

export function buildSitemap(lastModified: Date = new Date()): MetadataRoute.Sitemap {
  return indexableRoutes.map(route => ({
    url: canonicalUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: new URL("/sitemap.xml", productionSiteOrigin).toString(),
    host: productionSiteOrigin,
  }
}
