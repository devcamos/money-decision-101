"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "emergency",
    title: "Build an Emergency Fund",
    description: "Save 3-6 months of expenses in a high-yield savings account",
  },
  {
    id: "debt",
    title: "Pay Off High-Interest Debt",
    description: "Eliminate credit card debt and loans over 7% interest",
  },
  {
    id: "401k",
    title: "Contribute to 401(k) Match",
    description: "Get your employer's full 401(k) match (free money!)",
  },
  {
    id: "ira",
    title: "Open a Roth IRA",
    description: "Max out $7,000/year for tax-free retirement growth",
  },
  {
    id: "brokerage",
    title: "Open a Brokerage Account",
    description: "Invest additional savings in low-cost index funds",
  },
];

export function NextStepChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleStep = (id: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompleted(newCompleted);
  };

  const progress = (completed.size / steps.length) * 100;

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Your Next Steps</CardTitle>
          <span className="text-sm text-muted-foreground">
            {completed.size}/{steps.length} complete
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = completed.has(step.id);
          const isNext = !isCompleted && 
            steps.slice(0, index).every((s) => completed.has(s.id));

          return (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                isCompleted
                  ? "border-primary/50 bg-primary/5"
                  : isNext
                  ? "border-accent bg-accent/5"
                  : "border-border"
              }`}
            >
              <Checkbox
                id={step.id}
                checked={isCompleted}
                onCheckedChange={() => toggleStep(step.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={step.id}
                  className={`font-medium cursor-pointer ${
                    isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {step.title}
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
              </div>
              {isNext && !isCompleted && (
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                  Next
                </span>
              )}
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
