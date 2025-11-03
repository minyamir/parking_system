import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId parameter required" }, { status: 400 })
  }

  // Mock statistics
  const stats = {
    activeReservations: 2,
    completedReservations: 15,
    cancelledReservations: 1,
    totalHours: 48,
    totalCost: 1200,
    averageRating: 4.8,
    preferences: {
      favoriteLevel: 2,
      favoriteType: "premium",
      peakHours: "8:00-10:00 AM",
    },
  }

  return NextResponse.json({ success: true, stats }, { status: 200 })
}
