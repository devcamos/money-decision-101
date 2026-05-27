"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "How long do you plan to invest before needing the money?",
    options: [
      { value: 1, label: "Less than 2 years" },
      { value: 2, label: "2-5 years" },
      { value: 3, label: "5-10 years" },
      { value: 4, label: "More than 10 years" },
    ],
  },
  {
    id: 2,
    question: "If your investments dropped 20% in a month, what would you do?",
    options: [
      { value: 1, label: "Sell everything immediately" },
      { value: 2, label: "Sell some to reduce risk" },
      { value: 3, label: "Hold and wait for recovery" },
      { value: 4, label: "Buy more at the lower price" },
    ],
  },
  {
    id: 3,
    question: "What is your primary investment goal?",
    options: [
      { value: 1, label: "Preserve what I have" },
      { value: 2, label: "Steady income with some growth" },
      { value: 3, label: "Long-term growth" },
      { value: 4, label: "Maximum growth, accept high risk" },
    ],
  },
  {
    id: 4,
    question: "How would you describe your investment knowledge?",
    options: [
      { value: 1, label: "Complete beginner" },
      { value: 2, label: "Know the basics" },
      { value: 3, label: "Intermediate understanding" },
      { value: 4, label: "Advanced/experienced" },
    ],
  },
  {
    id: 5,
    question: "How stable is your current income?",
    options: [
      { value: 1, label: "Very unstable or uncertain" },
      { value: 2, label: "Somewhat stable" },
      { value: 3, label: "Stable with good job security" },
      { value: 4, label: "Very stable with multiple income sources" },
    ],
  },
];

const profiles = {
  conservative: {
    title: "Conservative Investor",
    description: "You prefer stability over high returns. Focus on bonds, money market funds, and dividend stocks.",
    allocation: "70% Bonds, 20% Stocks, 10% Cash",
    color: "bg-blue-500",
  },
  moderate: {
    title: "Moderate Investor",
    description: "You want balanced growth with manageable risk. A mix of stocks and bonds suits you well.",
    allocation: "50% Stocks, 40% Bonds, 10% Cash",
    color: "bg-green-500",
  },
  growth: {
    title: "Growth Investor",
    description: "You prioritize long-term growth and can handle market ups and downs.",
    allocation: "70% Stocks, 25% Bonds, 5% Cash",
    color: "bg-amber-500",
  },
  aggressive: {
    title: "Aggressive Investor",
    description: "You seek maximum returns and are comfortable with significant volatility.",
    allocation: "90% Stocks, 10% Bonds",
    color: "bg-red-500",
  },
};

export function RiskQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: parseInt(value) });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const getProfile = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const avg = total / questions.length;
    
    if (avg <= 1.5) return profiles.conservative;
    if (avg <= 2.5) return profiles.moderate;
    if (avg <= 3.5) return profiles.growth;
    return profiles.aggressive;
  };

  if (showResult) {
    const profile = getProfile();
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Risk Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${profile.color} text-white`}>
            <h3 className="text-xl font-bold">{profile.title}</h3>
          </div>
          <p className="text-foreground">{profile.description}</p>
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">Suggested Allocation</p>
            <p className="font-medium text-foreground">{profile.allocation}</p>
          </div>
          <Button onClick={resetQuiz} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg font-medium">Risk Tolerance Quiz</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground font-medium">{question.question}</p>
        
        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
            >
              <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
              <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer text-foreground">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex gap-3">
          <Button
            onClick={prevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion]}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
