import { Hero } from "@/components/investing/hero";
import { Section } from "@/components/investing/section";
import { CTA } from "@/components/investing/cta";
import { Footer } from "@/components/investing/footer";
import { ProgressBar } from "@/components/investing/progress-bar";
import { CompoundCalculator } from "@/components/investing/compound-calculator";
import { RiskQuiz } from "@/components/investing/risk-quiz";
import { SavingsConverter } from "@/components/investing/savings-converter";
import { NextStepChecklist } from "@/components/investing/checklist";
import { Resources } from "@/components/investing/resources";
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Target,
  Layers,
  Calendar,
  PiggyBank,
  TrendingDown,
  Gauge
} from "lucide-react";

export default function InvestingPage() {
  return (
    <main className="min-h-screen">
      <ProgressBar />
      <Hero />

      {/* What is Investing */}
      <Section 
        id="what-is-investing" 
        title="What is Investing?"
        variant="alternate"
      >
        <div className="grid gap-4 md:grid-cols-3 not-prose mb-6">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Buy Assets</h3>
            <p className="text-sm text-muted-foreground">Stocks, bonds, real estate, or funds that can grow in value over time.</p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Let Time Work</h3>
            <p className="text-sm text-muted-foreground">Your money compounds, earning returns on your returns over years.</p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Build Wealth</h3>
            <p className="text-sm text-muted-foreground">Reach financial goals like retirement, a home, or financial freedom.</p>
          </div>
        </div>
        <p className="text-foreground leading-relaxed">
          Instead of letting your savings sit idle in a bank account (where inflation slowly erodes their value), investing puts your money to work. The goal is simple: buy assets today that will be worth more in the future.
        </p>
      </Section>

      {/* Why It Matters - Interactive Calculator */}
      <Section 
        id="why-it-matters"
        title="Why Investing Matters"
        subtitle="See the power of compound growth for yourself"
      >
        <CompoundCalculator />
        
        <div className="grid gap-6 md:grid-cols-2 not-prose mt-8">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Beat Inflation</h3>
              <p className="text-sm text-muted-foreground">Cash loses ~3% value yearly. Investments historically return 7-10%.</p>
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
        id="core-principles"
        title="Core Principles" 
        subtitle="The fundamentals that every investor should know"
        variant="alternate"
      >
        <div className="grid gap-4 md:grid-cols-5 not-prose">
          {[
            { icon: Calendar, title: "Start Early", desc: "Time is your greatest advantage" },
            { icon: Layers, title: "Diversify", desc: "Spread risk across assets" },
            { icon: TrendingUp, title: "Stay Consistent", desc: "Regular contributions win" },
            { icon: Clock, title: "Think Long-Term", desc: "Patience beats timing" },
            { icon: PiggyBank, title: "Keep Costs Low", desc: "Fees eat into returns" },
          ].map((principle, index) => (
            <div key={index} className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <principle.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{principle.title}</h3>
              <p className="text-xs text-muted-foreground">{principle.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Tools */}
      <Section 
        id="quick-tools"
        title="Interactive Tools" 
        subtitle="Discover your investing profile and plan your next steps"
      >
        <div className="grid gap-6 lg:grid-cols-2 not-prose">
          <RiskQuiz />
          <div className="space-y-6">
            <SavingsConverter />
            <NextStepChecklist />
          </div>
        </div>
      </Section>

      {/* Common Mistakes */}
      <Section 
        title="Mistakes to Avoid" 
        subtitle="Common pitfalls that cost beginners money"
        variant="alternate"
      >
        <div className="grid gap-3 md:grid-cols-2 not-prose">
          {[
            { icon: Gauge, title: "Timing the Market", desc: "Nobody predicts markets consistently. Time in beats timing." },
            { icon: TrendingDown, title: "Panic Selling", desc: "Fear leads to selling low. Have a plan and stick to it." },
            { icon: PiggyBank, title: "Ignoring Fees", desc: "1% difference costs hundreds of thousands over a lifetime." },
            { icon: Clock, title: "Not Starting", desc: "The biggest mistake is waiting. Start today, even small." },
          ].map((mistake, index) => (
            <div key={index} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
              <mistake.icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">{mistake.title}</h3>
                <p className="text-sm text-muted-foreground">{mistake.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section 
        id="resources"
        title="Trusted Resources" 
        subtitle="Continue learning with these vetted sources"
      >
        <Resources />
      </Section>

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
