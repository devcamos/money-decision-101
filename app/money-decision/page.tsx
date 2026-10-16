"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Loader2 } from "lucide-react"
import { ProductHeader } from "@/components/site/product-header"
import { SiteFooter } from "@/components/site/site-footer"
import { ResultDisclaimer } from "@/components/site/result-disclaimer"
import { SupportCard } from "@/components/site/support-card"
import {
  trackKnowledgeCheckPass,
  trackKnowledgeCheckShown,
  trackResult,
  trackStart,
  trackStep,
} from "@/lib/analytics"
import { foundationQuestions } from "@/lib/money-decision/questions"
import {
  evidenceCopy,
  isInvestingReadyKey,
  matchedAnswerAudit,
  policyCopy,
  resultCopy,
  type SuggestedAction,
} from "@/lib/money-decision/results"
import { todaysRiskCheck } from "@/lib/money-decision/risk-checks"
import { moneyDecisionInputSchema, type MoneyDecisionInput, type MoneyDecisionResult } from "@/lib/money-decision/schema"

type Answers = Partial<MoneyDecisionInput>
type ApiResult = MoneyDecisionResult & {
  audit?: { evaluatedAt?: string; reason?: string }
}

type QuestionKey = keyof MoneyDecisionInput

type Question = {
  key: QuestionKey
  title: string
  hint?: string
  options: ReadonlyArray<readonly [boolean | number, string]>
}

function buildQuestions(): Question[] {
  const check = todaysRiskCheck()
  return [
    ...foundationQuestions,
    {
      key: "acceptsInvestmentRisk",
      title: check.title,
      hint: "This is a knowledge check from approved UK guidance. It is not a personal suitability assessment.",
      options: check.options,
    },
  ]
}

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function ScreenTitle({
  id,
  focusKey,
  className,
  children,
}: {
  id: string
  focusKey: string
  className: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [focusKey])

  return (
    <h1 id={id} ref={ref} tabIndex={-1} className={`outline-none ${className}`}>
      {children}
    </h1>
  )
}

function isDecisionResult(value: unknown): value is ApiResult {
  return Boolean(
    value &&
      typeof value === "object" &&
      "decisionState" in value &&
      typeof (value as { decisionState?: unknown }).decisionState === "string",
  )
}

export default function MoneyDecisionPage() {
  const questions = useMemo(() => buildQuestions(), [])
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selectedLabels, setSelectedLabels] = useState<Partial<Record<QuestionKey, string>>>({})
  const [result, setResult] = useState<ApiResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [requestFailed, setRequestFailed] = useState(false)
  const [enteringKnowledgeCheck, setEnteringKnowledgeCheck] = useState(false)

  const continueToKnowledgeCheck = useCallback(() => {
    setEnteringKnowledgeCheck(false)
    setStep(foundationQuestions.length)
    trackKnowledgeCheckShown()
  }, [])

  async function requestDecision(payload: Answers): Promise<ApiResult | null> {
    const response = await fetch("/api/money-decision", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
    const body: unknown = await response.json().catch(() => null)
    return isDecisionResult(body) ? body : null
  }

  async function evaluate(next: Answers) {
    setLoading(true)
    setRequestFailed(false)
    try {
      const payload = await requestDecision(next)
      if (!payload) {
        setRequestFailed(true)
        return
      }
      if (next.acceptsInvestmentRisk === true) {
        trackKnowledgeCheckPass()
      }
      trackResult(payload.decisionState)
      setResult(payload)
    } catch {
      setRequestFailed(true)
    } finally {
      setLoading(false)
    }
  }

  async function classifyAfterFoundations(foundation: Answers) {
    setLoading(true)
    setRequestFailed(false)
    try {
      // Probe OPA with the existing investing-readiness key (policy 1.0.0 unchanged).
      // Higher-priority keys still win; only INVESTING_READINESS opens the knowledge check.
      const payload = await requestDecision({ ...foundation, acceptsInvestmentRisk: true })
      if (!payload) {
        setRequestFailed(true)
        return
      }
      if (isInvestingReadyKey(payload.decisionState)) {
        setEnteringKnowledgeCheck(true)
        return
      }
      trackResult(payload.decisionState)
      setResult(payload)
    } catch {
      setRequestFailed(true)
    } finally {
      setLoading(false)
    }
  }

  async function answer(value: boolean | number) {
    const question = questions[step]
    const label = question.options.find(option => option[0] === value)?.[1]
    const next = { ...answers, [question.key]: value }
    setAnswers(next)
    trackStep(step + 1, question.key)
    if (label) {
      setSelectedLabels(current => ({ ...current, [question.key]: label }))
    }

    if (step === foundationQuestions.length - 1) {
      await classifyAfterFoundations(next)
      return
    }

    if (step < questions.length - 1) {
      setStep(current => current + 1)
      return
    }

    await evaluate(next)
  }

  function restart() {
    setAnswers({})
    setSelectedLabels({})
    setStep(0)
    setResult(null)
    setRequestFailed(false)
    setEnteringKnowledgeCheck(false)
    setStarted(true)
  }

  function retryKnowledgeCheck() {
    setResult(null)
    setRequestFailed(false)
    setLoading(false)
    setEnteringKnowledgeCheck(false)
    setAnswers(current => {
      const next = { ...current }
      delete next.acceptsInvestmentRisk
      return next
    })
    setSelectedLabels(current => {
      const next = { ...current }
      delete next.acceptsInvestmentRisk
      return next
    })
    setStep(foundationQuestions.length)
  }

  if (!started) {
    return (
      <Shell>
        <LandingScreen onStart={() => { trackStart(); setStarted(true) }} />
      </Shell>
    )
  }

  if (enteringKnowledgeCheck) {
    return (
      <Shell>
        <KnowledgeCheckGate
          onContinue={continueToKnowledgeCheck}
          onBack={() => setEnteringKnowledgeCheck(false)}
        />
      </Shell>
    )
  }

  if (requestFailed) {
    return (
      <Shell>
        <ErrorScreen
          onRetry={() =>
            answers.acceptsInvestmentRisk === undefined
              ? classifyAfterFoundations(answers)
              : evaluate(answers)
          }
          onStartOver={restart}
        />
      </Shell>
    )
  }

  if (loading) {
    return (
      <Shell>
        <EvaluatingScreen />
      </Shell>
    )
  }

  if (result) {
    return (
      <Shell>
        <ResultScreen
          result={result}
          answers={answers}
          selectedLabels={selectedLabels}
          onRestart={restart}
          onRetryCheck={retryKnowledgeCheck}
        />
      </Shell>
    )
  }

  return (
    <Shell>
      <QuestionScreen
        question={questions[step]}
        step={step}
        total={step >= foundationQuestions.length ? questions.length : foundationQuestions.length}
        selected={answers[questions[step].key]}
        onAnswer={answer}
        onBack={() => step > 0 ? setStep(current => current - 1) : setStarted(false)}
      />
    </Shell>
  )
}

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="max-w-2xl py-16 md:py-24" aria-labelledby="money-decision-title">
      <h1 id="money-decision-title" className="text-4xl font-semibold tracking-tight text-primary md:text-6xl">
        What should I do with my next £1,000?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
        A handful of questions about your money. If the policy points to investing education, there is a short knowledge check first. Built from approved UK guidance.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStart}
          className={`inline-flex min-h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
        >
          Start Money Decision <ArrowRight className="ml-2 inline h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Educational decision support, not personal financial advice. No account or financial provider connection required.
      </p>
    </section>
  )
}

function KnowledgeCheckGate({
  onContinue,
  onBack,
}: {
  onContinue: () => void
  onBack: () => void
}) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return
    const timer = window.setTimeout(onContinue, 1600)
    return () => window.clearTimeout(timer)
  }, [onContinue])

  return (
    <section className="max-w-xl py-16 md:py-24" aria-labelledby="knowledge-gate-title" aria-busy="true">
      <button
        type="button"
        onClick={onBack}
        className={`mb-10 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground ${focusRing}`}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
      </button>

      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Required to continue
      </p>
      <p className="mt-2 text-sm text-muted-foreground">6 of 6</p>
      <ScreenTitle
        id="knowledge-gate-title"
        focusKey="knowledge-gate"
        className="mt-4 text-3xl font-semibold tracking-tight text-primary md:text-4xl"
      >
        Knowledge check required
      </ScreenTitle>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Your Money Decision response stays locked until you complete this check. It asks whether investment values can fall as well as rise. It is not a personal suitability assessment.
      </p>
      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        Preparing the knowledge check…
      </p>
      <button
        type="button"
        onClick={onContinue}
        className={`mt-8 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
      >
        Continue to knowledge check <ArrowRight className="ml-2 inline h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  )
}

function QuestionScreen({
  question,
  step,
  total,
  selected,
  onAnswer,
  onBack,
}: {
  question: Question
  step: number
  total: number
  selected: boolean | number | undefined
  onAnswer: (value: boolean | number) => void
  onBack: () => void
}) {
  return (
    <section className="max-w-2xl py-14 md:py-24" aria-labelledby="question-title">
      <div className="mb-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground ${focusRing}`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {step + 1} of {total}
        </span>
      </div>

      <ol className="mb-8 flex gap-2" aria-label="Assessment progress">
        {Array.from({ length: total }, (_, index) => (
          <li
            key={index}
            className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-input"}`}
            aria-current={index === step ? "step" : undefined}
          >
            <span className="sr-only">Question {index + 1}{index === step ? ", current" : ""}</span>
          </li>
        ))}
      </ol>

      {question.hint ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Knowledge check
        </p>
      ) : null}

      <ScreenTitle
        id="question-title"
        focusKey={`${step}-${question.key}`}
        className="text-3xl font-semibold leading-tight tracking-tight text-primary md:text-4xl"
      >
        {question.title}
      </ScreenTitle>
      {question.hint ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{question.hint}</p>
      ) : null}

      <div className="mt-10 grid gap-3" role="group" aria-labelledby="question-title">
        {question.options.map(([value, label]) => {
          const isSelected = selected === value
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onAnswer(value)}
              className={`min-h-11 rounded-2xl border p-5 text-left font-medium transition ${focusRing} ${
                isSelected
                  ? "border-primary bg-muted text-foreground"
                  : "border-input bg-card text-foreground hover:border-primary/40 hover:bg-muted"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function EvaluatingScreen() {
  return (
    <section className="max-w-xl py-16 md:py-24" aria-labelledby="evaluating-title" aria-busy="true">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Classifying
      </p>
      <ScreenTitle
        id="evaluating-title"
        focusKey="evaluating"
        className="mt-4 text-3xl font-semibold tracking-tight text-primary md:text-4xl"
      >
        Your result is being classified
      </ScreenTitle>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        The approved Money Decision policy is being applied to the answers you provided. It will not invent a financial result if the policy cannot classify them.
      </p>
      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        Evaluating your answers…
      </p>
    </section>
  )
}

function ErrorScreen({ onRetry, onStartOver }: { onRetry: () => void; onStartOver: () => void }) {
  return (
    <section className="max-w-2xl py-16 md:py-24" aria-labelledby="error-title">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Connection problem
      </p>
      <h1 id="error-title" className="text-4xl font-semibold tracking-tight text-primary">
        We could not evaluate your answers
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        The decision service did not respond. Your answers were not stored, and no financial result was inferred.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className={`inline-flex min-h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
        >
          Try again
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className={`inline-flex min-h-11 items-center rounded-xl px-6 font-medium text-primary ${focusRing}`}
        >
          Start over
        </button>
      </div>
    </section>
  )
}

function ResultScreen({
  result,
  answers,
  selectedLabels,
  onRestart,
  onRetryCheck,
}: {
  result: ApiResult
  answers: Answers
  selectedLabels: Partial<Record<QuestionKey, string>>
  onRestart: () => void
  onRetryCheck: () => void
}) {
  const copy = resultCopy[result.decisionState]
  const policy = policyCopy[result.decisionState]
  const parsedAnswers = moneyDecisionInputSchema.safeParse({
    ...answers,
    acceptsInvestmentRisk: answers.acceptsInvestmentRisk ?? false,
  })
  const knowledgeLabel = selectedLabels.acceptsInvestmentRisk
  const knowledgeCheck =
    answers.acceptsInvestmentRisk !== undefined && knowledgeLabel
      ? { title: todaysRiskCheck().title, answerLabel: knowledgeLabel }
      : null
  const audit = parsedAnswers.success
    ? matchedAnswerAudit(parsedAnswers.data, result, {
        engineUnavailable: Boolean(result.audit?.reason),
        knowledgeCheck,
      })
    : []
  const secondaryTitles = result.secondaryStates
    .filter(state => state !== "UNDETERMINED" && state !== result.decisionState)
    .map(state => resultCopy[state].title)
  const canRetryCheck = result.decisionState === "UNDETERMINED"
    && answers.acceptsInvestmentRisk === false
    && !result.audit?.reason

  return (
    <section className="max-w-3xl py-12 md:py-20" aria-labelledby="result-title">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{copy.eyebrow}</p>
      <ScreenTitle
        id="result-title"
        focusKey={result.decisionState}
        className="mt-4 text-4xl font-semibold tracking-tight text-primary md:text-5xl"
      >
        {copy.title}
      </ScreenTitle>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{copy.body}</p>

      <ResultDisclaimer />

      <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
        <p className="text-sm font-semibold text-primary">What to explore next</p>
        <p className="mt-2 leading-7 text-secondary-foreground">{copy.next}</p>
        {copy.actions.length > 0 ? (
          <SuggestedActionList actions={copy.actions} />
        ) : null}
      </div>

      {result.audit?.reason && (
        <div role="status" className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm text-foreground">
          The governed policy engine is currently unavailable, so no financial result was inferred. Reference: {result.audit.reason}.
        </div>
      )}

      <section className="mt-10" aria-labelledby="why-result-title">
        <h2 id="why-result-title" className="text-xl font-semibold text-primary">Why this result?</h2>
        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <dl className="text-sm">
            <div>
              <dt className="text-muted-foreground">Policy</dt>
              <dd className="mt-1 font-medium">{policy.name}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-6 text-foreground">{policy.description}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{policy.why}</p>
          {audit.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-primary">Your answers</p>
              <ul className="mt-3 space-y-4">
                {audit.map(row => (
                  <li key={row.question}>
                    <p className="text-sm leading-6 text-muted-foreground">{row.question}</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-foreground">{row.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {secondaryTitles.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-primary">Also matched, lower priority</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                {secondaryTitles.map(title => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            <Link href="/help" className={`font-medium text-primary ${focusRing}`}>
              Help
            </Link>
            {" "}explains how this result is made, including official guidance.
          </p>
        </div>
      </section>

      {result.evidenceIds.length > 0 && (
        <section className="mt-10" aria-labelledby="official-guidance-title">
          <h2 id="official-guidance-title" className="text-xl font-semibold text-primary">Official guidance used</h2>
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
                  className={`rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 ${focusRing}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{item.authority}</p>
                      <p className="mt-1 font-medium text-foreground">{item.title}</p>
                    <span className="sr-only">(opens in a new tab)</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      )}

      <SupportCard />

      <div className="mt-10 flex flex-wrap gap-3">
        {canRetryCheck ? (
          <button
            type="button"
            onClick={onRetryCheck}
            className={`inline-flex min-h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
          >
            Try the knowledge check again
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRestart}
          className={`inline-flex min-h-11 items-center rounded-md px-2 text-sm font-semibold text-primary ${focusRing}`}
        >
          Run again
        </button>
      </div>
    </section>
  )
}

function SuggestedActionList({ actions }: { actions: SuggestedAction[] }) {
  const investing = actions.find(action => action.href === "/investing")
  const rest = actions.filter(action => action !== investing)

  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-primary">Suggested actions</p>
      {investing ? (
        <Link
          href={investing.href}
          className={`mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 ${focusRing}`}
        >
          {investing.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
      {rest.length > 0 ? (
        <ul className="mt-4 grid gap-3">
          {rest.map(action => (
            <li key={action.href}>
              {action.kind === "internal" ? (
                <Link
                  href={action.href}
                  className={`flex min-h-11 items-center rounded-2xl border border-border bg-card px-5 font-medium text-primary ${focusRing}`}
                >
                  {action.label}
                </Link>
              ) : (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 ${focusRing}`}
                >
                  <div>
                    {action.source ? (
                      <p className="text-sm font-semibold text-muted-foreground">{action.source}</p>
                    ) : null}
                    <p className={`${action.source ? "mt-1 " : ""}font-medium text-foreground`}>{action.label}</p>
                  </div>
                  <span className="sr-only">(opens in a new tab)</span>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductHeader productHref="/money-decision" productLabel="Money Decision 101" />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 md:px-8">{children}</div>
        <SiteFooter product="Money Decision 101" />
      </main>
    </>
  )
}
