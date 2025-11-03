import { type NextRequest, NextResponse } from "next/server"

interface ParkingSpace {
  id: string
  level: number
  position: [number, number, number]
  status: "available" | "occupied" | "reserved"
  price: number
  features: string[]
}

// Mock database - replace with real database
const parkingSpaces: ParkingSpace[] = [
  { id: "A1", level: 1, position: [-5, 0, -5], status: "available", price: 25, features: ["standard"] },
  { id: "A2", level: 1, position: [-3, 0, -5], status: "occupied", price: 25, features: ["standard"] },
  { id: "A3", level: 1, position: [-1, 0, -5], status: "available", price: 25, features: ["standard", "covered"] },
  { id: "B1", level: 1, position: [1, 0, -5], status: "reserved", price: 25, features: ["standard"] },
  { id: "B2", level: 1, position: [3, 0, -5], status: "available", price: 25, features: ["standard", "ev-charging"] },
  { id: "C1", level: 2, position: [-5, 0, 5], status: "available", price: 20, features: ["standard"] },
  { id: "C2", level: 2, position: [-3, 0, 5], status: "available", price: 20, features: ["standard", "handicap"] },
  { id: "C3", level: 2, position: [-1, 0, 5], status: "occupied", price: 20, features: ["standard"] },
]

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status")
  const level = request.nextUrl.searchParams.get("level")

  let filtered = parkingSpaces

  if (status) {
    filtered = filtered.filter((s) => s.status === status)
  }

  if (level) {
    filtered = filtered.filter((s) => s.level === Number.parseInt(level))
  }

  const stats = {
    total: parkingSpaces.length,
    available: parkingSpaces.filter((s) => s.status === "available").length,
    occupied: parkingSpaces.filter((s) => s.status === "occupied").length,
    reserved: parkingSpaces.filter((s) => s.status === "reserved").length,
  }

  return NextResponse.json(
    {
      spaces: filtered,
      stats,
    },
    { status: 200 },
  )
}
