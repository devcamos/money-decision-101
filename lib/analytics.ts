import { track } from "@vercel/analytics"

/**
 * Money Decision launch funnel events (launch-plan-v2 §measurement).
 * md_step_n is one event name with the question number as a property, so Vercel
 * Analytics can chart drop-off by step without six separate event names.
 */
export const mdEvents = {
  start: "md_start",
  step: "md_step_n",
  knowledgeCheckShown: "md_kc_shown",
  knowledgeCheckPass: "md_kc_pass",
  result: "md_result",
  supportClick: "md_bmc_click",
} as const

export type MdEventName = (typeof mdEvents)[keyof typeof mdEvents]
type Props = Record<string, string | number | boolean>

/** Analytics must never break the flow, so failures are swallowed. */
export function trackMd(name: MdEventName, props?: Props): void {
  try {
    track(name, props)
  } catch {
    // ignore: analytics is best effort
  }
}

export const trackStart = () => trackMd(mdEvents.start)

/** step is 1-based: the question number the visitor just answered. */
export const trackStep = (step: number, question: string) =>
  trackMd(mdEvents.step, { step, question })

export const trackKnowledgeCheckShown = () => trackMd(mdEvents.knowledgeCheckShown)

export const trackKnowledgeCheckPass = () => trackMd(mdEvents.knowledgeCheckPass)

export const trackResult = (decisionState: string) =>
  trackMd(mdEvents.result, { decisionState })

export const trackSupportClick = (placement: string) =>
  trackMd(mdEvents.supportClick, { placement })
