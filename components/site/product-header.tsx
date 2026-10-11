import Link from "next/link"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function ProductHeader({
  productHref,
  productLabel,
}: {
  productHref: string
  productLabel: string
}) {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href={productHref}
          aria-label={`${productLabel} by Nexus Motivus`}
          className={`font-serif text-xl tracking-[0.04em] text-foreground ${focusRing}`}
        >
          Nexus Motivus
        </Link>
        <nav aria-label="Primary">
          <Link
            href="/help"
            className={`inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-primary ${focusRing}`}
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  )
}
