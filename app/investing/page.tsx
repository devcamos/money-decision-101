import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/investing/hero";
import { Section } from "@/components/investing/section";
import { CTA } from "@/components/investing/cta";
import { Footer } from "@/components/investing/footer";
import { ExternalLink, Shield, Clock, AlertTriangle, Scale, WalletCards } from "lucide-react";

export const metadata: Metadata = {
  title: "Investing 101 - Learn the Fundamentals",
  description:
    "A UK educational guide to investing foundations, risk, time horizon and wrappers. This is the next step after Money Decision 101.",
};

const sources = [
  {
    authority: "Financial Conduct Authority",
    title: "Should you invest?",
    href: "https://www.fca.org.uk/investsmart/should-you-invest",
  },
  {
    authority: "Financial Conduct Authority",
    title: "Is it the right investment for you?",
    href: "https://www.fca.org.uk/investsmart/right-investment-you",
  },
  {
    authority: "MoneyHelper",
    title: "A beginner's guide to investing",
    href: "https://www.moneyhelper.org.uk/en/savings/investing/investing-beginners-guide",
  },
  {
    authority: "GOV.UK",
    title: "Individual Savings Accounts (ISAs)",
    href: "https://www.gov.uk/individual-savings-accounts",
  },
];

export default function InvestingPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <Link
            href="/money-decision"
            className="font-semibold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            NEXUS MOTIVUS
          </Link>
          <p className="text-xs font-medium text-muted-foreground">Investing 101</p>
        </div>
      </header>
      <Hero />

      <Section id="what-is-investing" title="What is investing?" variant="alternate">
        <p className="mb-4 leading-relaxed text-foreground">
          Investing means putting money into assets with the aim of receiving a return over time. Investments can rise or fall in value, and there is no risk-free investment.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          This guide explains UK investing foundations. It does not choose investments for you or assess whether a particular investment is suitable for your circumstances.
        </p>
      </Section>

      <Section title="Start with your financial foundations" subtitle="Official UK guidance puts immediate finances before investing">
        <div className="grid gap-6 md:grid-cols-3 not-prose">
          {[
            {
              icon: WalletCards,
              title: "Review debt",
              body: "The FCA says short-term debt should generally be prioritised before investing, and warns against using credit to invest.",
            },
            {
              icon: Shield,
              title: "Build emergency savings",
              body: "The FCA and MoneyHelper both emphasise keeping accessible emergency savings before committing money to investments.",
            },
            {
              icon: Scale,
              title: "Review your pension",
              body: "If you are employed, official guidance suggests considering your workplace pension as part of your financial foundations.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5">
              <Icon className="mb-4 h-5 w-5 text-foreground" />
              <h3 className="mb-2 font-medium text-foreground">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Time horizon matters" variant="alternate">
        <div className="not-prose flex gap-4 rounded-2xl border border-border bg-background p-6">
          <Clock className="mt-1 h-5 w-5 shrink-0 text-foreground" />
          <div>
            <h3 className="font-medium text-foreground">Money needed soon is different from long-term money</h3>
            <p className="mt-2 leading-7 text-muted-foreground">
              MoneyHelper describes investing as a longer-term decision and discusses goals more than five years away. The FCA separately notes that for a fairly short timeframe, perhaps up to three years, savings may be more appropriate to explore. These are educational guideposts, not a personal suitability assessment.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Risk, diversification and costs" subtitle="Three foundations to understand before choosing any investment">
        <div className="space-y-6 not-prose">
          <div className="border-l-2 border-accent pl-4">
            <h3 className="mb-1 font-medium text-foreground">Risk</h3>
            <p className="text-muted-foreground">Investment values can fall as well as rise. Before investing, understand how much loss you could tolerate while still meeting your goals.</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="mb-1 font-medium text-foreground">Diversification</h3>
            <p className="text-muted-foreground">Spreading exposure across different assets and markets can reduce reliance on any single investment, although it cannot remove investment risk.</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="mb-1 font-medium text-foreground">Costs</h3>
            <p className="text-muted-foreground">Investment and service-provider fees reduce the returns you keep, so understanding both upfront and ongoing costs is part of comparing options.</p>
          </div>
        </div>
      </Section>

      <Section title="UK accounts and pensions" subtitle="Wrappers affect tax treatment, but they do not remove investment risk" variant="alternate">
        <div className="grid gap-5 md:grid-cols-2 not-prose">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h3 className="font-medium text-foreground">Individual Savings Accounts</h3>
            <p className="mt-2 leading-7 text-muted-foreground">
              GOV.UK explains that ISAs can hold cash or eligible investments and provide tax advantages. A Stocks and Shares ISA is a tax wrapper, not a guarantee that the investments held inside it will make money.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h3 className="font-medium text-foreground">Workplace pensions</h3>
            <p className="mt-2 leading-7 text-muted-foreground">
              Workplace pensions commonly receive employer contributions and invest money for retirement. Scheme rules differ, so check your own pension arrangements rather than relying on generic contribution examples.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Warning signs" subtitle="Investing is not a route to guaranteed or fast returns">
        <div className="not-prose flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="leading-7">
            Be cautious of promotions that promise very high or guaranteed returns or present investing as a quick way to get rich. Official guidance recommends understanding the risks before committing money.
          </p>
        </div>
      </Section>

      <Section title="Official guidance used" variant="alternate">
        <p className="mb-6 text-muted-foreground">
          Nexus structures this educational guide from the sources below. The authorities have not reviewed or endorsed Nexus Motivus.
        </p>
        <div className="grid gap-3 not-prose">
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{source.authority}</p>
                <p className="mt-1 font-medium text-foreground">{source.title}</p>
              </div>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          ))}
        </div>
      </Section>

      <CTA />
      <Footer />
    </main>
  );
}
