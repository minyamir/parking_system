import { type NextRequest, NextResponse } from "next/server"

interface RefundRequest {
  paymentId: string
  amount?: number
  reason: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RefundRequest = await request.json()

    if (!body.paymentId || !body.reason) {
      return NextResponse.json({ error: "Missing required fields: paymentId, reason" }, { status: 400 })
    }

    // Mock refund processing
    const refund = {
      id: `REF-${Date.now()}`,
      paymentId: body.paymentId,
      amount: body.amount || 0,
      reason: body.reason,
      status: "completed",
      processedAt: new Date().toISOString(),
      refundAmount: body.amount || 0,
    }

    return NextResponse.json(
      {
        success: true,
        refund,
        message: "Refund processed successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Refund error:", error)
    return NextResponse.json({ error: "Refund processing failed" }, { status: 500 })
  }
}
