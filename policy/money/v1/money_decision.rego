package nexus.money.v1

import rego.v1

policy_version := "1.0.0"

priorities := {
  "FINANCIAL_DIFFICULTY": 100,
  "DEBT_PRIORITY": 90,
  "EMERGENCY_RESILIENCE": 80,
  "PENSION_REVIEW": 70,
  "NEAR_TERM_CASH": 60,
  "INVESTING_READINESS": 50,
}

policy_ids := {
  "FINANCIAL_DIFFICULTY": "MONEY-FINANCIAL-DIFFICULTY-001",
  "DEBT_PRIORITY": "MONEY-DEBT-001",
  "EMERGENCY_RESILIENCE": "MONEY-EMERGENCY-001",
  "PENSION_REVIEW": "MONEY-PENSION-001",
  "NEAR_TERM_CASH": "MONEY-CASH-001",
  "INVESTING_READINESS": "MONEY-INVESTING-READINESS-001",
}

evidence_ids := {
  "FINANCIAL_DIFFICULTY": ["MONEYHELPER-DEBT-001", "MONEYHELPER-DEBT-002"],
  "DEBT_PRIORITY": ["FCA-INVEST-001", "FCA-INVEST-002"],
  "EMERGENCY_RESILIENCE": ["FCA-INVEST-001"],
  "PENSION_REVIEW": ["FCA-INVEST-001", "GOVUK-PENSION-001"],
  "NEAR_TERM_CASH": ["FCA-INVEST-002"],
  "INVESTING_READINESS": ["FCA-INVEST-001", "FCA-INVEST-002"],
}

required_facts_present if {
  is_boolean(input.financialDifficulty)
  is_boolean(input.relevantDebt)
  is_number(input.emergencyFundMonths)
  input.emergencyFundMonths >= 0
  is_boolean(input.workplacePensionReviewed)
  is_boolean(input.moneyNeededWithinThreeYears)
  is_boolean(input.acceptsInvestmentRisk)
}

evidence_approved(evidence_id) if {
  data.evidence[evidence_id].status == "APPROVED"
}

state_evidence_approved(state) if {
  every evidence_id in evidence_ids[state] {
    evidence_approved(evidence_id)
  }
}

candidate_matches contains "FINANCIAL_DIFFICULTY" if {
  required_facts_present
  input.financialDifficulty
}

candidate_matches contains "DEBT_PRIORITY" if {
  required_facts_present
  input.relevantDebt
}

candidate_matches contains "EMERGENCY_RESILIENCE" if {
  required_facts_present
  input.emergencyFundMonths < 3
}

candidate_matches contains "PENSION_REVIEW" if {
  required_facts_present
  not input.workplacePensionReviewed
}

candidate_matches contains "NEAR_TERM_CASH" if {
  required_facts_present
  input.moneyNeededWithinThreeYears
}

candidate_matches contains "INVESTING_READINESS" if {
  required_facts_present
  not input.financialDifficulty
  not input.relevantDebt
  input.emergencyFundMonths >= 3
  input.workplacePensionReviewed
  not input.moneyNeededWithinThreeYears
  input.acceptsInvestmentRisk
}

matches contains state if {
  state := candidate_matches[_]
  state_evidence_approved(state)
}

blocked_matches contains state if {
  state := candidate_matches[_]
  not state_evidence_approved(state)
}

ranked_matches := sort([{"priority": priorities[state], "state": state} | state := matches[_]])

primary_state := ranked_matches[count(ranked_matches) - 1].state if {
  count(ranked_matches) > 0
}

secondary_states := [item.state | item := reverse(ranked_matches)[_]; item.state != primary_state]

decision := {
  "decisionState": primary_state,
  "primaryPolicyId": policy_ids[primary_state],
  "matchedPolicyIds": [policy_ids[item.state] | item := reverse(ranked_matches)[_]],
  "secondaryStates": secondary_states,
  "evidenceIds": evidence_ids[primary_state],
  "policyVersion": policy_version,
  "explanationCode": primary_state,
} if {
  required_facts_present
  count(blocked_matches) == 0
  count(ranked_matches) > 0
}

decision := {
  "decisionState": "UNDETERMINED",
  "primaryPolicyId": "MONEY-UNDETERMINED-001",
  "matchedPolicyIds": [],
  "secondaryStates": [],
  "evidenceIds": [],
  "policyVersion": policy_version,
  "explanationCode": "UNDETERMINED",
} if {
  not required_facts_present
}

decision := {
  "decisionState": "UNDETERMINED",
  "primaryPolicyId": "MONEY-UNDETERMINED-001",
  "matchedPolicyIds": [],
  "secondaryStates": [],
  "evidenceIds": [],
  "policyVersion": policy_version,
  "explanationCode": "UNDETERMINED",
} if {
  required_facts_present
  count(blocked_matches) > 0
}

decision := {
  "decisionState": "UNDETERMINED",
  "primaryPolicyId": "MONEY-UNDETERMINED-001",
  "matchedPolicyIds": [],
  "secondaryStates": [],
  "evidenceIds": [],
  "policyVersion": policy_version,
  "explanationCode": "UNDETERMINED",
} if {
  required_facts_present
  count(blocked_matches) == 0
  count(ranked_matches) == 0
}
