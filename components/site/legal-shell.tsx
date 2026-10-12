import { ProductHeader } from "@/components/site/product-header"
import { SiteFooter } from "@/components/site/site-footer"

export function LegalShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <ProductHeader productHref="/money-decision" productLabel="Money Decision 101" />
      <main className="min-h-screen bg-background text-foreground">
        <article className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-primary">{title}</h1>
          <div className="mt-8 space-y-5 text-base leading-7 text-muted-foreground">{children}</div>
        </article>
        <SiteFooter product="Money Decision 101" />
      </main>
    </>
  )
}
