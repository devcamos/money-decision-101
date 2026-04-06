import { Hero } from "@/components/investing/hero";
import { Section } from "@/components/investing/section";
import { CTA } from "@/components/investing/cta";
import { Footer } from "@/components/investing/footer";
import { TrendingUp, Shield, Clock, AlertTriangle, Target } from "lucide-react";

export default function InvestingPage() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* What is Investing */}
      <Section 
        id="what-is-investing" 
        title="What is Investing?"
        variant="alternate"
      >
        <p className="text-foreground leading-relaxed mb-4">
          Investing is putting your money to work so it can grow over time. Instead of letting your savings sit idle, you use them to buy assets that have the potential to increase in value.
        </p>
        <p className="text-foreground leading-relaxed">
          Common investments include stocks (ownership in companies), bonds (loans to governments or corporations), and real estate. The goal is simple: buy assets that will be worth more in the future than what you paid today.
        </p>
      </Section>

      {/* Why It Matters */}
      <Section 
        title="Why Investing Matters"
        subtitle="Building wealth requires more than just saving"
      >
        <div className="grid gap-6 md:grid-cols-2 not-prose">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Beat Inflation</h3>
              <p className="text-sm text-muted-foreground">Cash loses value over time. Investments help your money grow faster than prices rise.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Compound Growth</h3>
              <p className="text-sm text-muted-foreground">Your returns earn returns. Starting early means exponential growth over decades.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Target className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Financial Goals</h3>
              <p className="text-sm text-muted-foreground">Retirement, a home, education—investing helps you reach major milestones.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Shield className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Financial Security</h3>
              <p className="text-sm text-muted-foreground">Build a safety net that provides options and peace of mind.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Principles */}
      <Section 
        title="Core Principles" 
        subtitle="The fundamentals that every investor should know"
        variant="alternate"
      >
        <div className="space-y-6 not-prose">
          <div className="border-l-2 border-accent pl-4">
            <h3 className="font-medium text-foreground mb-1">1. Start Early</h3>
            <p className="text-muted-foreground">Time is your greatest advantage. Even small amounts invested early can grow significantly.</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="font-medium text-foreground mb-1">2. Diversify</h3>
            <p className="text-muted-foreground">{"Don't put all your eggs in one basket. Spread investments across different asset types."}</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="font-medium text-foreground mb-1">3. Stay Consistent</h3>
            <p className="text-muted-foreground">Regular contributions matter more than timing the market. Invest systematically.</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="font-medium text-foreground mb-1">4. Think Long-Term</h3>
            <p className="text-muted-foreground">Markets fluctuate short-term but trend upward over decades. Patience pays off.</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <h3 className="font-medium text-foreground mb-1">5. Keep Costs Low</h3>
            <p className="text-muted-foreground">High fees eat into returns. Choose low-cost index funds when possible.</p>
          </div>
        </div>
      </Section>

      {/* Beginner Mistakes */}
      <Section 
        title="Mistakes to Avoid" 
        subtitle="Common pitfalls that cost beginners money"
      >
        <div className="space-y-4 not-prose">
          {[
            {
              title: "Trying to Time the Market",
              description: "Nobody can consistently predict market movements. Focus on time in the market, not timing."
            },
            {
              title: "Following Hot Tips",
              description: "\"Sure things\" and trending stocks are often overpriced. Stick to fundamentals."
            },
            {
              title: "Letting Emotions Drive Decisions",
              description: "Fear and greed lead to buying high and selling low. Have a plan and stick to it."
            },
            {
              title: "Ignoring Fees",
              description: "A 1% difference in fees can cost you hundreds of thousands over a lifetime."
            },
            {
              title: "Not Starting",
              description: "The biggest mistake is waiting. The best time to start was yesterday."
            }
          ].map((mistake, index) => (
            <div key={index} className="flex gap-3 p-4 rounded-lg bg-secondary/50">
              <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">{mistake.title}</h3>
                <p className="text-sm text-muted-foreground">{mistake.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Simple Framework */}
      <Section 
        title="A Simple Framework" 
        subtitle="Follow these steps to get started"
        variant="alternate"
      >
        <div className="space-y-6 not-prose">
          {[
            {
              step: "01",
              title: "Build an Emergency Fund",
              description: "Before investing, save 3-6 months of expenses in a high-yield savings account."
            },
            {
              step: "02",
              title: "Pay Off High-Interest Debt",
              description: "Credit card debt at 20% interest beats most investments. Eliminate it first."
            },
            {
              step: "03",
              title: "Open an Investment Account",
              description: "Start with a tax-advantaged account like a 401(k) or IRA if available."
            },
            {
              step: "04",
              title: "Choose Simple Investments",
              description: "A low-cost total market index fund is a great starting point for most people."
            },
            {
              step: "05",
              title: "Automate and Forget",
              description: "Set up automatic contributions. Consistency beats complexity."
            }
          ].map((item, index) => (
            <div key={index} className="flex gap-4">
              <span className="text-3xl font-serif text-accent shrink-0">{item.step}</span>
              <div className="pt-1">
                <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Transition Section */}
      <Section title="Ready to Take Action?">
        <p className="text-foreground leading-relaxed">
          {"You now understand the basics of investing. But knowledge without action won't build wealth. The next step is having a clear plan to follow—knowing exactly what to do first, what to invest in, and which mistakes to avoid."}
        </p>
      </Section>

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
