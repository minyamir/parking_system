import { type NextRequest, NextResponse } from "next/server"

interface PaymentRequest {
  reservationId: string
  userId: string
  amount: number
  paymentMethod: "card" | "wallet" | "upi" | "netbanking"
  cardDetails?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
  }
}

interface Payment {
  id: string
  reservationId: string
  userId: string
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  transactionId: string
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
}

// Mock database - replace with real database in production
const payments: Map<string, Payment> = new Map()

function validatePayment(body: PaymentRequest): { valid: boolean; error?: string } {
  if (!body.reservationId || !body.userId || body.amount === undefined || !body.paymentMethod) {
    return { valid: false, error: "Missing required fields: reservationId, userId, amount, paymentMethod" }
  }

  if (body.amount <= 0) {
    return { valid: false, error: "Payment amount must be greater than 0" }
  }

  if (!["card", "wallet", "upi", "netbanking"].includes(body.paymentMethod)) {
    return { valid: false, error: "Invalid payment method" }
  }

  if (body.paymentMethod === "card" && body.cardDetails) {
    if (!body.cardDetails.cardNumber || !body.cardDetails.expiryDate || !body.cardDetails.cvv) {
      return { valid: false, error: "Invalid card details" }
    }
  }

  return { valid: true }
}

async function processPayment(
  request: PaymentRequest,
): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  try {
    const validation = validatePayment(request)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Mock payment gateway call - replace with real Stripe/Razorpay API
    const paymentSuccess = Math.random() > 0.1 // 90% success rate for demo

    const payment: Payment = {
      id: `PAY-${Date.now()}`,
      reservationId: request.reservationId,
      userId: request.userId,
      amount: request.amount,
      status: paymentSuccess ? "completed" : "failed",
      paymentMethod: request.paymentMethod,
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        ipAddress: request.cardDetails?.cardNumber?.slice(-4) || "N/A",
        attemptCount: 1,
      },
    }

    payments.set(payment.id, payment)

    return { success: true, payment }
  } catch (error) {
    return { success: false, error: "Payment processing failed" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    const result = await processPayment(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        payment: result.payment,
        message: "Payment processed successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get("paymentId")

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    const payment = payments.get(paymentId)
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, payment })
  } catch (error) {
    console.error("Get payment error:", error)
    return NextResponse.json({ error: "Failed to retrieve payment" }, { status: 500 })
  }
}
