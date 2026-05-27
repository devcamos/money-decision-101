"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function SavingsConverter() {
  const [savings, setSavings] = useState(10000);
  const savingsRate = 4.5; // High-yield savings
  const investingRate = 7; // Average market return
  const years = 20;

  const savingsGrowth = savings * Math.pow(1 + savingsRate / 100, years);
  const investingGrowth = savings * Math.pow(1 + investingRate / 100, years);
  const difference = investingGrowth - savingsGrowth;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Savings vs. Investing</CardTitle>
        <p className="text-sm text-muted-foreground">See the difference over {years} years</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="savings" className="text-sm">Starting Amount</Label>
          <Input
            id="savings"
            type="number"
            min={1000}
            max={1000000}
            step={1000}
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="text-base"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 p-4 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground">Savings @ {savingsRate}%</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(savingsGrowth)}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex-1 p-4 bg-primary text-primary-foreground rounded-lg">
            <p className="text-xs opacity-80">Investing @ {investingRate}%</p>
            <p className="text-lg font-bold">{formatCurrency(investingGrowth)}</p>
          </div>
        </div>

        <p className="text-sm text-center text-foreground">
          Investing could earn you <span className="font-bold text-accent">{formatCurrency(difference)}</span> more
        </p>
      </CardContent>
    </Card>
  );
}
