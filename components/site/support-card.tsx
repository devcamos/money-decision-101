import { ExternalLink, Heart } from "lucide-react"
import { supportUrl } from "@/lib/support"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function SupportCard() {
  return (
    <aside
      className="mt-10 rounded-2xl border border-primary/25 bg-card p-6"
      aria-labelledby="support-nexus-title"
    >
      <div className="flex items-start gap-3">
        <Heart className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Keep the compass moving
          </p>
          <h2 id="support-nexus-title" className="mt-2 text-xl font-semibold text-primary">
            A clearer next step should stay free to find.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            If Money Decision helped you make sense of what to explore next, you can support the calm, evidence-led work behind it.
          </p>
          {supportUrl ? (
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
            >
              Support Nexus Motivus
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <p className="mt-5 text-sm font-medium text-primary">
              The support link will appear here once the Nexus support page is configured.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
