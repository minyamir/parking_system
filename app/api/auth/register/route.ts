import { type NextRequest, NextResponse } from "next/server"

interface RegisterRequest {
  email: string
  password: string
  name: string
  vehicleNumber: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()

    if (!body.email || !body.password || !body.name || !body.vehicleNumber) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Mock registration - replace with real database
    const user = {
      id: `user-${Date.now()}`,
      email: body.email,
      name: body.name,
      vehicleNumber: body.vehicleNumber,
    }

    return NextResponse.json(
      {
        success: true,
        user,
        message: "User registered successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
