import { NextResponse } from "next/server"
import { probeOpa } from "@/lib/money-decision/opa"
import { healthBody } from "@/lib/money-decision/responses"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const opa = await probeOpa().catch(() => null)
  const body = healthBody(opa)
  return NextResponse.json(body, { status: body.status === "ready" ? 200 : 503 })
}
