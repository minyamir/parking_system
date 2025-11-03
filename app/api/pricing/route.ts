import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock pricing structure
  const pricing = {
    hourly: {
      standard: 25,
      handicap: 15,
      compact: 20,
      premium: 35,
    },
    daily: {
      standard: 150,
      handicap: 90,
      compact: 120,
      premium: 200,
    },
    monthly: {
      standard: 300,
      handicap: 180,
      compact: 240,
      premium: 400,
    },
    features: {
      "ev-charging": 10,
      covered: 5,
      cctv: 0,
      accessible: 0,
    },
    discounts: {
      student: 0.1,
      senior: 0.15,
      monthly: 0.2,
      corporate: 0.25,
    },
  }

  return NextResponse.json({ success: true, pricing }, { status: 200 })
}
