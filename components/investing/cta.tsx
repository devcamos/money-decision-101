import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

const SUBSTACK_URL = "https://substack.com";

const benefits = [
  "A step-by-step plan to start investing today",
  "What to invest in first (and what to avoid)",
  "Common mistakes that cost beginners money",
];

export function CTA() {
  return (
    <section className="py-16 md:py-24 px-4 bg-primary">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Free Resource
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-4">
              Get the Investing Starter System
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of beginners who have used this system to start building wealth with confidence.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button 
              asChild
              size="lg" 
              className="w-full md:w-auto rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a 
                href={SUBSTACK_URL} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Get Free Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
