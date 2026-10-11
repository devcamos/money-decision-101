import Link from "next/link"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function SiteFooter({ product }: { product: string }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <p className="font-serif text-lg text-foreground">Nexus Motivus</p>
        <p className="text-sm text-muted-foreground">{year} · {product}</p>
        <p className="text-xs leading-5 text-muted-foreground">
          UK educational content only. Nexus does not provide a personal recommendation or claim endorsement by the authorities cited on this site.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/help"
            className={`inline-flex min-h-11 min-w-11 items-center text-sm font-medium text-primary ${focusRing}`}
          >
            Help
          </Link>
          <Link
            href="/privacy"
            className={`inline-flex min-h-11 items-center text-sm font-medium text-primary ${focusRing}`}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className={`inline-flex min-h-11 items-center text-sm font-medium text-primary ${focusRing}`}
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
