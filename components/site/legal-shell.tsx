import Link from "next/link"
import { SiteFooter } from "@/components/site/site-footer"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function LegalShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/money-decision" className={`font-semibold tracking-tight text-primary ${focusRing}`}>
            NEXUS MOTIVUS
          </Link>
          <Link
            href="/money-decision"
            className={`inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground ${focusRing}`}
          >
            Money Decision 101
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">{title}</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-muted-foreground">{children}</div>
      </article>
      <SiteFooter product="Nexus Motivus" />
    </main>
  )
}
