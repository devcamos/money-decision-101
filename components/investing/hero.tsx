import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-12 pt-16 text-center md:pb-16 md:pt-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">A beginner’s knowledge guide</p>
      <h1 className="text-balance font-serif text-5xl font-medium tracking-tight text-foreground md:text-7xl">Investing 101</h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        Understand the basics, one idea at a time. Explore short lessons, unpack unfamiliar words and practise what you learn — at your own pace.
      </p>
      <Button asChild size="lg" className="mt-8 min-h-11 rounded-full px-8">
        <a href="#learning-guide">Start learning <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" /></a>
      </Button>
      <p className="mt-5 text-sm text-muted-foreground">General education, not personal financial advice. Investments can lose value.</p>
    </section>
  );
}
