"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("what-is-investing")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
        Next after Money Decision 101
      </p>
      <h1 className="max-w-4xl text-balance text-4xl font-serif font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl">
        Investing 101
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        Understand investing foundations, risk, time horizon and UK wrappers using visible FCA, MoneyHelper and GOV.UK guidance.
      </p>
      <Button
        onClick={scrollToContent}
        variant="outline"
        size="lg"
        className="mt-10 min-h-11 rounded-full px-8 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Start learning
        <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
    </section>
  );
}
