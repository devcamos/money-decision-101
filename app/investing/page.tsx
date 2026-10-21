import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { Hero } from "@/components/investing/hero"
import { LearningGuide } from "@/components/investing/learning-guide"
import { CTA } from "@/components/investing/cta"
import { Footer } from "@/components/investing/footer"
import { ProductHeader } from "@/components/site/product-header"
import { guideSources } from "@/lib/investing/lessons"
import { canonicalFor } from "@/lib/seo/routes"

export const metadata: Metadata = {
  alternates: canonicalFor("/investing"),
  title: "Investing 101 | Learn the foundations.",
  description: "An interactive UK beginner guide to investing foundations, asset types, markets, indices, ETFs, risk and wrappers.",
  openGraph: {
    title: "Learn the foundations.",
    description: "Learn UK investing foundations through short lessons, examples and practice questions.",
  },
}

export default function InvestingPage() {
  return (
    <>
      <ProductHeader productHref="/investing" productLabel="Investing 101" />
      <main>
        <Hero />
        <LearningGuide />
        <section aria-labelledby="guidance-title" className="border-t border-border px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Keep exploring</p>
            <h2 id="guidance-title" className="mt-3 text-3xl font-medium tracking-tight text-foreground">Guidance and index definitions</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              UK public guidance supports the financial foundations. Index providers define their own benchmarks; the US regulator source explains ETF structure, not UK tax or investor rights. The authorities have not reviewed or endorsed this site or its author. Source links do not imply endorsement. Follow the sources for more detail and current rules.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {guideSources.map(source => (
                <a key={source.id} href={source.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <span><span className="block text-sm text-muted-foreground">{source.authority} · {source.sourceRole}</span><span className="mt-1 block font-semibold">{source.title}</span></span>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <CTA />
        <Footer />
      </main>
    </>
  )
}
