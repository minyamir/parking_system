import { type NextRequest, NextResponse } from "next/server"

interface VerifyRequest {
  paymentId: string
  transactionId: string
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequest = await request.json()

    if (!body.paymentId || !body.transactionId) {
      return NextResponse.json({ error: "Missing required fields: paymentId, transactionId" }, { status: 400 })
    }

    // Mock payment verification
    const verification = {
      verified: true,
      paymentId: body.paymentId,
      transactionId: body.transactionId,
      status: "completed",
      amount: Math.floor(Math.random() * 1000) + 100,
      timestamp: new Date().toISOString(),
      signature: `SIG-${Math.random().toString(36).substr(2, 16)}`,
    }

    return NextResponse.json(
      {
        success: true,
        verification,
        message: "Payment verified successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
