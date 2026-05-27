"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function CompoundCalculator() {
  const [age, setAge] = useState(25);
  const [monthlyAmount, setMonthlyAmount] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const retirementAge = 65;

  const calculations = useMemo(() => {
    const years = retirementAge - age;
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    
    // Future value of annuity formula
    const futureValue = monthlyAmount * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalContributed = monthlyAmount * totalMonths;
    const interestEarned = futureValue - totalContributed;
    
    // Generate chart data points
    const chartData = [];
    for (let year = 0; year <= years; year += Math.max(1, Math.floor(years / 10))) {
      const months = year * 12;
      const value = monthlyAmount * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const contributed = monthlyAmount * months;
      chartData.push({
        year: age + year,
        total: Math.round(value),
        contributed: Math.round(contributed),
      });
    }
    // Ensure final year is included
    if (chartData[chartData.length - 1]?.year !== retirementAge) {
      chartData.push({
        year: retirementAge,
        total: Math.round(futureValue),
        contributed: Math.round(totalContributed),
      });
    }
    
    return {
      futureValue: Math.round(futureValue),
      totalContributed: Math.round(totalContributed),
      interestEarned: Math.round(interestEarned),
      years,
      chartData,
    };
  }, [age, monthlyAmount, annualReturn]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxValue = calculations.futureValue;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Compound Interest Calculator</CardTitle>
        <p className="text-sm text-muted-foreground">See how your money can grow over time</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm">Your Age</Label>
            <Input
              id="age"
              type="number"
              min={18}
              max={60}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly" className="text-sm">Monthly Investment</Label>
            <Input
              id="monthly"
              type="number"
              min={50}
              max={10000}
              step={50}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="text-base"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-sm">Annual Return</Label>
              <span className="text-sm font-medium">{annualReturn}%</span>
            </div>
            <Slider
              value={[annualReturn]}
              onValueChange={(v) => setAnnualReturn(v[0])}
              min={1}
              max={12}
              step={0.5}
              className="mt-2"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-primary text-primary-foreground">
            <p className="text-sm opacity-80">Total at {retirementAge}</p>
            <p className="text-2xl font-bold">{formatCurrency(calculations.futureValue)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">You Contribute</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(calculations.totalContributed)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Interest Earned</p>
            <p className="text-2xl font-bold text-accent">{formatCurrency(calculations.interestEarned)}</p>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Growth Over Time</p>
          <div className="space-y-2">
            {calculations.chartData.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">{point.year}</span>
                <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-full"
                    style={{ width: `${(point.contributed / maxValue) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(point.total / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground w-20 text-right">
                  {formatCurrency(point.total)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-primary" /> Total Value
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" /> Your Contributions
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          *Assumes {annualReturn}% annual return compounded monthly. Past performance does not guarantee future results.
        </p>
      </CardContent>
    </Card>
  );
}
