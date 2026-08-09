package nexus.money.v1

import rego.v1

base_input := {
  "financialDifficulty": false,
  "relevantDebt": false,
  "emergencyFundMonths": 3,
  "workplacePensionReviewed": true,
  "moneyNeededWithinThreeYears": false,
  "acceptsInvestmentRisk": true,
}

test_financial_difficulty_wins if {
  result := decision with input as object.union(base_input, {"financialDifficulty": true, "relevantDebt": true, "emergencyFundMonths": 1})
  result.decisionState == "FINANCIAL_DIFFICULTY"
}

test_debt_precedes_emergency_and_pension if {
  result := decision with input as object.union(base_input, {"relevantDebt": true, "emergencyFundMonths": 1, "workplacePensionReviewed": false})
  result.decisionState == "DEBT_PRIORITY"
  result.secondaryStates == ["EMERGENCY_RESILIENCE", "PENSION_REVIEW"]
}

test_emergency_below_three_months if {
  result := decision with input as object.union(base_input, {"emergencyFundMonths": 2.9})
  result.decisionState == "EMERGENCY_RESILIENCE"
}

test_three_month_boundary_passes_emergency_gate if {
  result := decision with input as object.union(base_input, {"workplacePensionReviewed": false})
  result.decisionState == "PENSION_REVIEW"
}

test_near_term_cash if {
  result := decision with input as object.union(base_input, {"moneyNeededWithinThreeYears": true})
  result.decisionState == "NEAR_TERM_CASH"
}

test_investing_readiness if {
  result := decision with input as base_input
  result.decisionState == "INVESTING_READINESS"
}

test_risk_not_accepted_is_undetermined if {
  result := decision with input as object.union(base_input, {"acceptsInvestmentRisk": false})
  result.decisionState == "UNDETERMINED"
}

test_missing_fact_fails_closed if {
  incomplete := object.remove(base_input, {"emergencyFundMonths"})
  result := decision with input as incomplete
  result.decisionState == "UNDETERMINED"
}

test_policy_version_is_returned if {
  result := decision with input as base_input
  result.policyVersion == "1.0.0"
}

test_investing_result_has_evidence if {
  result := decision with input as base_input
  count(result.evidenceIds) > 0
}

test_suspended_primary_evidence_fails_closed if {
  suspended := object.union(data.evidence, {
    "FCA-INVEST-001": object.union(data.evidence["FCA-INVEST-001"], {"status": "SUSPENDED"})
  })
  result := decision with input as base_input with data.evidence as suspended
  result.decisionState == "UNDETERMINED"
  count(result.evidenceIds) == 0
}

test_missing_evidence_fails_closed if {
  incomplete_evidence := object.remove(data.evidence, {"FCA-INVEST-002"})
  result := decision with input as base_input with data.evidence as incomplete_evidence
  result.decisionState == "UNDETERMINED"
}

test_unrelated_suspended_evidence_does_not_block_decision if {
  modified := object.union(data.evidence, {
    "MONEYHELPER-DEBT-001": object.union(data.evidence["MONEYHELPER-DEBT-001"], {"status": "SUSPENDED"})
  })
  result := decision with input as base_input with data.evidence as modified
  result.decisionState == "INVESTING_READINESS"
}
