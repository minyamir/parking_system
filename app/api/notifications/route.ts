import { type NextRequest, NextResponse } from "next/server"

interface Notification {
  id: string
  userId: string
  type: "reminder" | "alert" | "payment" | "offer"
  title: string
  message: string
  read: boolean
  createdAt: string
}

// Mock notifications
const notifications: Notification[] = []

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId parameter required" }, { status: 400 })
  }

  const userNotifications = notifications.filter((n) => n.userId === userId)

  return NextResponse.json(
    {
      success: true,
      count: userNotifications.length,
      notifications: userNotifications,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const notification: Notification = {
      id: `NOT-${Date.now()}`,
      userId: body.userId,
      type: body.type,
      title: body.title,
      message: body.message,
      read: false,
      createdAt: new Date().toISOString(),
    }

    notifications.push(notification)

    return NextResponse.json({ success: true, notification }, { status: 201 })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
