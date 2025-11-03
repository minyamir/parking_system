import { type NextRequest, NextResponse } from "next/server"

interface User {
  id: string
  email: string
  name: string
  phone: string
  vehicle: {
    make: string
    model: string
    plate: string
    color: string
  }
  totalReservations: number
  totalSpent: number
  createdAt: string
}

// Mock database
const users: User[] = [
  {
    id: "user-123",
    email: "demo@parkmini.com",
    name: "Demo User",
    phone: "+1-555-0123",
    vehicle: { make: "Toyota", model: "Camry", plate: "ABC-1234", color: "Blue" },
    totalReservations: 5,
    totalSpent: 125,
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId parameter required" }, { status: 400 })
  }

  const user = users.find((u) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, user }, { status: 200 })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId parameter required" }, { status: 400 })
    }

    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users[userIndex] = { ...users[userIndex], ...body }

    return NextResponse.json({ success: true, user: users[userIndex] }, { status: 200 })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
