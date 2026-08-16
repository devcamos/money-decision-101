import Link from "next/link"
import { ShieldCheck } from "lucide-react"

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
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
        <Link href={productHref} className={`font-semibold tracking-tight text-primary ${focusRing}`}>
          {productLabel}
        </Link>
        <Link
          href="/help"
          className={`inline-flex min-h-11 items-center gap-2 text-xs font-medium text-primary ${focusRing}`}
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Evidence-backed
        </Link>
      </div>
    </header>
  )
}
