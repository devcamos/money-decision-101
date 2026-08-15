export const riskChecks = [
  {
    id: "RISK-FALL-001",
    title: "If you put money into an investment, which of these is true?",
    options: [
      [true, "The value can fall as well as rise, and you could get back less than you put in"],
      [false, "The value can only fall if you sell too quickly"],
      [false, "Waiting long enough means the value cannot fall"],
    ],
  },
  {
    id: "RISK-GUARANTEE-001",
    title: "Are returns from investing guaranteed?",
    options: [
      [false, "Yes, if you choose a well-known company"],
      [true, "No. Returns are not guaranteed"],
      [false, "Yes, if you hold the investment for more than three years"],
    ],
  },
  {
    id: "RISK-TIME-001",
    title: "If you hold an investment for a long time, what can still happen?",
    options: [
      [false, "Losses become impossible after several years"],
      [false, "The investment must recover any fall"],
      [true, "You could still get back less than you put in"],
    ],
  },
  {
    id: "RISK-LESS-001",
    title: "Could you get back less than you put into an investment?",
    options: [
      [false, "No. You always at least get your original amount back"],
      [true, "Yes. You could get back less than you put in"],
      [false, "Only if you sell on the same day you buy"],
    ],
  },
  {
    id: "RISK-MEANING-001",
    title: "What does it mean that investment values can fall as well as rise?",
    options: [
      [false, "Only inexperienced investors can lose money"],
      [true, "You might get back less than you invested"],
      [false, "A fall in value does not count unless you sell"],
    ],
  },
] as const

export type RiskCheck = (typeof riskChecks)[number]

export function riskCheckIndexForDay(epochMs = Date.now()): number {
  return Math.floor(epochMs / 86_400_000) % riskChecks.length
}

export function todaysRiskCheck(epochMs = Date.now()): RiskCheck {
  return riskChecks[riskCheckIndexForDay(epochMs)]
}

export function correctRiskOption(check: RiskCheck): string {
  const match = check.options.find(option => option[0] === true)
  if (!match) throw new Error(`Risk check ${check.id} has no correct option`)
  return match[1]
}
