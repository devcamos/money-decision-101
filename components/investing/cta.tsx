import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

const benefits = [
  "Check your financial foundations before exploring investing",
  "See which approved policy state matched your answers",
  "Review the FCA, MoneyHelper and GOV.UK evidence behind the result",
];

export function CTA() {
  return (
    <section className="bg-primary px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">
              Nexus Decision 101
            </p>
            <h2 className="mb-4 text-2xl font-serif font-medium text-foreground md:text-3xl">
              Not sure whether investing is your next priority?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Money Decision 101 is the gateway into Investing 101. Six facts and an approved UK policy identify the next money topic to explore. It does not recommend a specific investment.
            </p>

            <ul className="mb-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="w-full min-h-11 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90 md:w-auto"
            >
              <a href="/money-decision">
                Try Money Decision 101
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
