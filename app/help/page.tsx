import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { ProductHeader } from "@/components/site/product-header"
import { SiteFooter } from "@/components/site/site-footer"
import { officialGuidanceFor, resultCopy } from "@/lib/money-decision/results"
import { decisionStates } from "@/lib/money-decision/schema"

export const metadata: Metadata = {
  title: "FAQ — Evidence-backed — Money Decision 101",
  description: "How Money Decision 101 uses approved policy and official UK guidance, without a personal assessment by those authorities.",
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const helpPolicies = decisionStates.filter(state => state !== "UNDETERMINED")

export default function HelpPage() {
  return (
    <>
      <ProductHeader productHref="/money-decision" productLabel="Money Decision 101" />
      <main className="min-h-screen bg-background text-foreground">
        <article className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-primary">Evidence-backed</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This is the help page for how a Money Decision result is made. It is educational. It is not personal financial advice.
        </p>

        <section className="mt-12" aria-labelledby="who-applied">
          <h2 id="who-applied" className="text-xl font-semibold text-primary">Who applied this result?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Nexus applied its approved policy to the answers you provided. The authorities below did not personally assess you.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="official-guidance-faq">
          <h2 id="official-guidance-faq" className="text-xl font-semibold text-primary">Official guidance used</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Each result points at official UK sources that already sit behind that policy. MoneyHelper, the FCA, and GOV.UK have not reviewed you and have not endorsed Nexus Motivus.
          </p>

          <div className="mt-8 space-y-8">
            {helpPolicies.map(state => {
              const copy = resultCopy[state]
              const sources = officialGuidanceFor(state)
              return (
                <div key={state}>
                  <h3 className="font-medium text-foreground">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.body}</p>
                  <ul className="mt-4 grid gap-3">
                    {sources.map(source => (
                      <li key={source.url}>
                        <OfficialGuidanceLink
                          href={source.url}
                          authority={source.authority}
                          title={source.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="investing-101-entry">
          <h2 id="investing-101-entry" className="text-xl font-semibold text-primary">When does Investing 101 open?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Only an investing-readiness result offers Continue to Investing 101. Other money priorities stay with the matching official pages, not the investing guide.
          </p>
        </section>
      </article>
      <SiteFooter product="Money Decision 101" />
      </main>
    </>
  )
}

function OfficialGuidanceLink({
  href,
  authority,
  title,
}: {
  href: string
  authority: string
  title: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 ${focusRing}`}
    >
      <div>
        <p className="text-sm font-semibold text-muted-foreground">{authority}</p>
        <p className="mt-1 font-medium text-foreground">{title}</p>
      </div>
      <span className="sr-only">(opens in a new tab)</span>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </a>
  )
}
