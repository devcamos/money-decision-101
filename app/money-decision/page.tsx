"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react"
import { evidenceCopy, resultCopy } from "@/lib/money-decision/results"
import type { MoneyDecisionInput, MoneyDecisionResult } from "@/lib/money-decision/schema"

type Answers = Partial<MoneyDecisionInput>
type ApiResult = MoneyDecisionResult & {
  audit?: { evaluatedAt?: string; reason?: string }
}

type QuestionKey = keyof MoneyDecisionInput

type Question = {
  key: QuestionKey
  title: string
  options: ReadonlyArray<readonly [boolean | number, string]>
}

const questions: readonly Question[] = [
  {
    key: "financialDifficulty",
    title: "Are you struggling to keep up with essential bills or priority payments?",
    options: [[false, "No"], [true, "Yes"]],
  },
  {
    key: "relevantDebt",
    title: "Do you currently have short-term or costly debt that still needs addressing?",
    options: [[false, "No"], [true, "Yes"]],
  },
  {
    key: "emergencyFundMonths",
    title: "How much of your essential living costs could your accessible savings cover?",
    options: [
      [0.5, "Less than 1 month"],
      [2, "1 to under 3 months"],
      [4.5, "3 to 6 months"],
      [7, "More than 6 months"],
    ],
  },
  {
    key: "workplacePensionReviewed",
    title: "Have you reviewed your workplace pension and the contributions available through it?",
    options: [[true, "Yes"], [false, "No"]],
  },
  {
    key: "moneyNeededWithinThreeYears",
    title: "Could you need this £1,000 within the next three years?",
    options: [[false, "No"], [true, "Yes"]],
  },
  {
    key: "acceptsInvestmentRisk",
    title: "If you explored investing, do you understand that the value can fall as well as rise?",
    options: [[true, "Yes"], [false, "No"]],
  },
]

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183C2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F3]"

export default function MoneyDecisionPage() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<ApiResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function answer(value: boolean | number) {
    const question = questions[step]
    const next = { ...answers, [question.key]: value }
    setAnswers(next)

    if (step < questions.length - 1) {
      setStep(current => current + 1)
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/money-decision", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      })
      setResult(await response.json())
    } finally {
      setLoading(false)
    }
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setResult(null)
    setStarted(true)
  }

  if (!started) {
    return (
      <Shell>
        <LandingScreen onStart={() => setStarted(true)} />
      </Shell>
    )
  }

  if (result) {
    return (
      <Shell>
        <ResultScreen result={result} onRestart={restart} />
      </Shell>
    )
  }

  return (
    <Shell>
      <QuestionScreen
        question={questions[step]}
        step={step}
        total={questions.length}
        loading={loading}
        onAnswer={answer}
        onBack={() => step > 0 ? setStep(current => current - 1) : setStarted(false)}
      />
    </Shell>
  )
}

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="max-w-2xl py-16 md:py-24" aria-labelledby="money-decision-title">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#496554]">
        Nexus Motivus · Decision 101
      </p>
      <h1 id="money-decision-title" className="text-4xl font-semibold tracking-tight text-[#183C2E] md:text-6xl">
        What should I do with my next £1,000?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#4F5C55]">
        Six questions. One clear next area to explore. Built from approved UK guidance, with the policy and sources shown behind your result.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStart}
          className={`rounded-xl bg-[#183C2E] px-6 py-3.5 font-medium text-white transition hover:bg-[#214D3B] ${focusRing}`}
        >
          Start Money Decision <ArrowRight className="ml-2 inline h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-6 text-sm text-[#59645E]">
        Educational decision support, not personal financial advice. No account or financial provider connection required.
      </p>
    </section>
  )
}

function QuestionScreen({
  question,
  step,
  total,
  loading,
  onAnswer,
  onBack,
}: {
  question: Question
  step: number
  total: number
  loading: boolean
  onAnswer: (value: boolean | number) => void
  onBack: () => void
}) {
  return (
    <section className="max-w-2xl py-14 md:py-24" aria-labelledby="question-title">
      <div className="mb-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`flex items-center gap-2 rounded-md text-sm font-medium text-[#4F5C55] ${focusRing}`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
        <span className="text-sm text-[#59645E]" aria-live="polite">
          {step + 1} of {total}
        </span>
      </div>

      <ol className="mb-8 flex gap-2" aria-label="Assessment progress">
        {questions.map((_, index) => (
          <li
            key={index}
            className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[#183C2E]" : "bg-[#D6DDD8]"}`}
            aria-current={index === step ? "step" : undefined}
          >
            <span className="sr-only">Question {index + 1}{index === step ? ", current" : ""}</span>
          </li>
        ))}
      </ol>

      <h1 id="question-title" className="text-3xl font-semibold leading-tight tracking-tight text-[#183C2E] md:text-4xl">
        {question.title}
      </h1>

      <div className="mt-10 grid gap-3" role="group" aria-labelledby="question-title">
        {question.options.map(([value, label]) => (
          <button
            key={label}
            type="button"
            disabled={loading}
            onClick={() => onAnswer(value)}
            className={`rounded-2xl border border-[#CCD8D0] bg-white p-5 text-left font-medium text-[#243129] transition hover:border-[#789582] hover:bg-[#F4F7F5] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
          >
            {loading ? "Evaluating…" : label}
          </button>
        ))}
      </div>
    </section>
  )
}

function ResultScreen({ result, onRestart }: { result: ApiResult; onRestart: () => void }) {
  const copy = resultCopy[result.decisionState]

  return (
    <section className="max-w-3xl py-12 md:py-20" aria-labelledby="result-title">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#496554]">{copy.eyebrow}</p>
      <h1 id="result-title" className="mt-4 text-4xl font-semibold tracking-tight text-[#183C2E] md:text-5xl">
        {copy.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-[#4F5C55]">{copy.body}</p>

      <div className="mt-8 rounded-2xl border border-[#D1DDD5] bg-[#EAF1EC] p-6">
        <p className="text-sm font-semibold text-[#183C2E]">What to explore next</p>
        <p className="mt-2 leading-7 text-[#405047]">{copy.next}</p>
      </div>

      {result.audit?.reason && (
        <div role="status" className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
          The governed policy engine is currently unavailable, so Nexus deliberately did not infer a financial result. Reference: {result.audit.reason}.
        </div>
      )}

      <section className="mt-10" aria-labelledby="why-result-title">
        <h2 id="why-result-title" className="text-xl font-semibold text-[#183C2E]">Why this result?</h2>
        <div className="mt-4 rounded-2xl border border-[#D8E0DB] bg-white p-6">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[#59645E]">Policy</dt>
              <dd className="mt-1 font-medium">{result.primaryPolicyId}</dd>
            </div>
            <div>
              <dt className="text-[#59645E]">Version</dt>
              <dd className="mt-1 font-medium">{result.policyVersion}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-6 text-[#59645E]">
            Nexus applied its approved policy to the answers you provided. The authorities below did not personally assess you.
          </p>
        </div>
      </section>

      {result.evidenceIds.length > 0 && (
        <section className="mt-10" aria-labelledby="official-guidance-title">
          <h2 id="official-guidance-title" className="text-xl font-semibold text-[#183C2E]">Official guidance used</h2>
          <div className="mt-4 grid gap-3">
            {result.evidenceIds.map(id => {
              const item = evidenceCopy[id]
              if (!item) return null
              return (
                <a
                  key={id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-2xl border border-[#D8E0DB] bg-white p-5 transition hover:border-[#789582] ${focusRing}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#496554]">{item.authority}</p>
                      <p className="mt-1 font-medium text-[#1D2922]">{item.title}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#59645E]" aria-hidden="true" />
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={onRestart}
        className={`mt-10 rounded-md text-sm font-semibold text-[#183C2E] ${focusRing}`}
      >
        Run again
      </button>
    </section>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#191C1A]">
      <header className="border-b border-[#E2E4DF]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <div className="font-semibold tracking-tight text-[#183C2E]">NEXUS MOTIVUS</div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#59645E]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Evidence-backed
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 md:px-8">{children}</div>
    </main>
  )
}
