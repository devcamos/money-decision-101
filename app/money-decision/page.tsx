"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react"
import { evidenceCopy, resultCopy } from "@/lib/money-decision/results"
import type { MoneyDecisionInput, MoneyDecisionResult } from "@/lib/money-decision/schema"

type Answers = Partial<MoneyDecisionInput>
type ApiResult = MoneyDecisionResult & { audit?: { evaluatedAt?: string; reason?: string } }

const questions = [
  { key: "financialDifficulty", title: "Are you struggling to keep up with essential bills or priority payments?", options: [[false, "No"], [true, "Yes"]] },
  { key: "relevantDebt", title: "Do you currently have short-term or costly debt that still needs addressing?", options: [[false, "No"], [true, "Yes"]] },
  { key: "emergencyFundMonths", title: "How much of your essential living costs could your accessible savings cover?", options: [[0.5, "Less than 1 month"], [2, "1 to under 3 months"], [4.5, "3 to 6 months"], [7, "More than 6 months"]] },
  { key: "workplacePensionReviewed", title: "Have you reviewed your workplace pension and the contributions available through it?", options: [[true, "Yes"], [false, "No"]] },
  { key: "moneyNeededWithinThreeYears", title: "Could you need this £1,000 within the next three years?", options: [[false, "No"], [true, "Yes"]] },
  { key: "acceptsInvestmentRisk", title: "If you explored investing, do you understand that the value can fall as well as rise?", options: [[true, "Yes"], [false, "No"]] },
] as const

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
    if (step < questions.length - 1) return setStep(step + 1)
    setLoading(true)
    try {
      const response = await fetch("/api/money-decision", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(next) })
      setResult(await response.json())
    } finally { setLoading(false) }
  }

  function restart() { setAnswers({}); setStep(0); setResult(null); setStarted(true) }

  if (!started) return <Shell><div className="max-w-2xl py-16 md:py-24"><p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#52705f]">Nexus Motivus · Decision 101</p><h1 className="text-4xl font-semibold tracking-tight text-[#183C2E] md:text-6xl">What should I do with my next £1,000?</h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#56625c]">Six questions. One clear next area to explore. Built from approved UK guidance, with the policy and sources shown behind your result.</p><div className="mt-10 flex flex-wrap gap-3"><button onClick={() => setStarted(true)} className="rounded-xl bg-[#183C2E] px-6 py-3.5 font-medium text-white">Start Money Decision <ArrowRight className="ml-2 inline h-4 w-4" /></button></div><p className="mt-6 text-sm text-[#6b756f]">Educational decision support, not personal financial advice. No account or financial provider connection required.</p></div></Shell>

  if (result) {
    const copy = resultCopy[result.decisionState]
    return <Shell><div className="max-w-3xl py-12 md:py-20"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#52705f]">{copy.eyebrow}</p><h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#183C2E] md:text-5xl">{copy.title}</h1><p className="mt-6 text-lg leading-8 text-[#4f5c55]">{copy.body}</p><div className="mt-8 rounded-2xl border border-[#d8e1db] bg-[#eaf1ec] p-6"><p className="text-sm font-semibold text-[#183C2E]">What to explore next</p><p className="mt-2 leading-7 text-[#405047]">{copy.next}</p></div>{result.audit?.reason && <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">The governed policy engine is currently unavailable, so Nexus deliberately did not infer a financial result. Reference: {result.audit.reason}.</div>}<section className="mt-10"><h2 className="text-xl font-semibold text-[#183C2E]">Why this result?</h2><div className="mt-4 rounded-2xl border border-[#dde3df] bg-white p-6"><dl className="grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-[#6b756f]">Policy</dt><dd className="mt-1 font-medium">{result.primaryPolicyId}</dd></div><div><dt className="text-[#6b756f]">Version</dt><dd className="mt-1 font-medium">{result.policyVersion}</dd></div></dl><p className="mt-5 text-sm leading-6 text-[#66716b]">Nexus applied its approved policy to the answers you provided. The authorities below did not personally assess you.</p></div></section>{result.evidenceIds.length > 0 && <section className="mt-10"><h2 className="text-xl font-semibold text-[#183C2E]">Official guidance used</h2><div className="mt-4 grid gap-3">{result.evidenceIds.map(id => { const item = evidenceCopy[id]; return item ? <a key={id} href={item.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#dde3df] bg-white p-5 transition hover:border-[#8fa99a]"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-[#52705f]">{item.authority}</p><p className="mt-1 font-medium text-[#1d2922]">{item.title}</p></div><ExternalLink className="h-4 w-4 text-[#6b756f]" /></div></a> : null })}</div></section>}<button onClick={restart} className="mt-10 text-sm font-semibold text-[#183C2E]">Run again</button></div></Shell>
  }

  const question = questions[step]
  return <Shell><div className="max-w-2xl py-14 md:py-24"><div className="mb-10 flex items-center justify-between"><button onClick={() => step ? setStep(step - 1) : setStarted(false)} className="flex items-center gap-2 text-sm text-[#59665f]"><ArrowLeft className="h-4 w-4" /> Back</button><span className="text-sm text-[#6b756f]">{step + 1} of {questions.length}</span></div><div className="mb-8 flex gap-2">{questions.map((_, i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[#183C2E]" : "bg-[#dfe6e1]"}`} />)}</div><h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#183C2E] md:text-4xl">{question.title}</h1><div className="mt-10 grid gap-3">{question.options.map(([value, label]) => <button key={label} disabled={loading} onClick={() => answer(value)} className="rounded-2xl border border-[#d9e1dc] bg-white p-5 text-left font-medium text-[#243129] transition hover:border-[#789582] hover:bg-[#f4f7f5] disabled:opacity-50">{loading ? "Evaluating…" : label}</button>)}</div></div></Shell>
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#F8F7F3] text-[#191C1A]"><header className="border-b border-[#e2e4df]"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8"><div className="font-semibold tracking-tight text-[#183C2E]">NEXUS MOTIVUS</div><div className="flex items-center gap-2 text-xs font-medium text-[#65716a]"><ShieldCheck className="h-4 w-4" /> Evidence-backed</div></div></header><div className="mx-auto max-w-5xl px-5 md:px-8">{children}</div></main>
}
