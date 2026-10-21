export const RESULT_DISCLAIMER = "General information, not financial advice."

/** Shown on every Money Decision result screen (Finance Bro rule). */
export function ResultDisclaimer() {
  return (
    <p
      data-testid="result-disclaimer"
      className="mt-6 rounded-2xl border border-border bg-card p-4 text-sm leading-6 text-foreground"
    >
      <strong className="font-semibold">{RESULT_DISCLAIMER}</strong>{" "}
      This result is educational. It is not a personal recommendation and does not consider your full circumstances.
      If you need personal advice, speak to a regulated financial adviser.
    </p>
  )
}
