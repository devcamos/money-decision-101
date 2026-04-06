"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    document.getElementById("what-is-investing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
        Learn the fundamentals
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-foreground max-w-4xl text-balance">
        Investing 101
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
        A clear, simple guide to understanding how investing works and why it matters for your financial future.
      </p>
      <Button 
        onClick={scrollToContent}
        variant="outline" 
        size="lg" 
        className="mt-10 rounded-full px-8"
      >
        Start Learning
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    </section>
  );
}
