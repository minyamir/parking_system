import { type NextRequest, NextResponse } from "next/server"

interface LoginRequest {
  email: string
  password: string
}

interface User {
  id: string
  email: string
  name: string
  vehicleNumber: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()

    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - replace with real database
    if (body.email === "demo@parkmini.com" && body.password === "demo123") {
      const user: User = {
        id: "user-123",
        email: body.email,
        name: "Demo User",
        vehicleNumber: "ABC-1234",
      }

      return NextResponse.json(
        {
          success: true,
          user,
          token: "mock-jwt-token",
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
