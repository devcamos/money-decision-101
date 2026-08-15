import { NextResponse } from "next/server"
import { EXPECTED_MONEY_POLICY_VERSION, probeOpa } from "@/lib/money-decision/opa"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const opa = await probeOpa()
    const status = opa.versionMatches ? 200 : 503

    return NextResponse.json(
      {
        status: opa.versionMatches ? "ready" : "not_ready",
        checks: {
          opa: {
            reachable: true,
            policyVersion: opa.policyVersion,
            expectedPolicyVersion: EXPECTED_MONEY_POLICY_VERSION,
            versionMatches: opa.versionMatches,
          },
        },
      },
      { status },
    )
  } catch {
    return NextResponse.json(
      {
        status: "not_ready",
        checks: {
          opa: {
            reachable: false,
            policyVersion: null,
            expectedPolicyVersion: EXPECTED_MONEY_POLICY_VERSION,
            versionMatches: false,
          },
        },
      },
      { status: 503 },
    )
  }
}
