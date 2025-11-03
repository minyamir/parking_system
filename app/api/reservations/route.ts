import { type NextRequest, NextResponse } from "next/server"

// Types for the parking system
interface ReservationRequest {
  spaceId: string
  userId: string
  duration: number
  level: number
}

interface Reservation {
  id: string
  spaceId: string
  userId: string
  startTime: string
  endTime: string
  status: "active" | "completed" | "cancelled"
  level: number
  cost: number
}

// Mock database - replace with real database
const reservations: Reservation[] = []

export async function POST(request: NextRequest) {
  try {
    const body: ReservationRequest = await request.json()

    // Validation
    if (!body.spaceId || !body.userId || !body.duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if space is already reserved
    const existingReservation = reservations.find((r) => r.spaceId === body.spaceId && r.status === "active")

    if (existingReservation) {
      return NextResponse.json({ error: "Space is already reserved" }, { status: 409 })
    }

    // Create reservation
    const startTime = new Date()
    const endTime = new Date(startTime.getTime() + body.duration * 60 * 60 * 1000)
    const cost = 25 * body.duration // $25 per hour

    const reservation: Reservation = {
      id: `RES-${Date.now()}`,
      spaceId: body.spaceId,
      userId: body.userId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: "active",
      level: body.level,
      cost,
    }

    reservations.push(reservation)

    return NextResponse.json(
      {
        success: true,
        reservation,
        message: `Space ${body.spaceId} reserved for ${body.duration} hours`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 })
  }

  const userReservations = reservations.filter((r) => r.userId === userId)

  return NextResponse.json(
    {
      count: userReservations.length,
      reservations: userReservations,
    },
    { status: 200 },
  )
}
