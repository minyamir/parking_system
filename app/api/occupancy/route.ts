import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock occupancy data
  const occupancyData = {
    total: 50,
    available: 18,
    occupied: 28,
    reserved: 4,
    occupancyRate: 64,
    byLevel: [
      { level: 1, total: 25, available: 8, occupied: 14, reserved: 3, occupancyRate: 68 },
      { level: 2, total: 25, available: 10, occupied: 14, reserved: 1, occupancyRate: 60 },
    ],
    peakTimes: [
      { time: "8:00 AM", occupancy: 85 },
      { time: "12:00 PM", occupancy: 75 },
      { time: "6:00 PM", occupancy: 92 },
    ],
  }

  return NextResponse.json({ success: true, occupancy: occupancyData }, { status: 200 })
}
