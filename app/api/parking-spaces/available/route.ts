import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const level = request.nextUrl.searchParams.get("level")
  const type = request.nextUrl.searchParams.get("type")

  // Mock available spaces
  const availableSpaces = [
    { id: "A1", level: 1, number: "A1", type: "standard", hourlyRate: 25, features: ["covered"] },
    { id: "A3", level: 1, number: "A3", type: "standard", hourlyRate: 25, features: ["covered", "cctv"] },
    { id: "B2", level: 1, number: "B2", type: "premium", hourlyRate: 35, features: ["ev-charging", "covered", "cctv"] },
    { id: "C1", level: 2, number: "C1", type: "standard", hourlyRate: 20, features: [] },
    { id: "C2", level: 2, number: "C2", type: "handicap", hourlyRate: 15, features: ["accessible", "covered"] },
  ]

  let filtered = availableSpaces

  if (level) {
    filtered = filtered.filter((s) => s.level === Number.parseInt(level))
  }

  if (type) {
    filtered = filtered.filter((s) => s.type === type)
  }

  return NextResponse.json(
    {
      success: true,
      count: filtered.length,
      spaces: filtered,
    },
    { status: 200 },
  )
}
