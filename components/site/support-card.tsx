import { ExternalLink, Heart } from "lucide-react"
import { supportUrl } from "@/lib/brand"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function SupportCard() {
  return (
    <aside
      className="mt-10 rounded-2xl border border-primary/25 bg-card p-6"
      aria-labelledby="support-title"
    >
      <div className="flex items-start gap-3">
        <Heart className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="support-title" className="text-xl font-semibold text-primary">
            Keep this free to find
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            If this helped, you can get me a coffee. Totally optional — nothing about your result depends on it.
          </p>
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
          >
            Get me a coffee
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </aside>
  )
}
