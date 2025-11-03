// Payment utility functions for frontend integration

export interface PaymentConfig {
  apiUrl: string
  timeout: number
}

const defaultConfig: PaymentConfig = {
  apiUrl: "/api/payments",
  timeout: 30000,
}

export async function processPayment(paymentData: {
  reservationId: string
  userId: string
  amount: number
  paymentMethod: string
}) {
  try {
    const response = await fetch(`${defaultConfig.apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error(`Payment failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Payment processing error:", error)
    throw error
  }
}

export async function getPaymentStatus(paymentId: string) {
  try {
    const response = await fetch(`${defaultConfig.apiUrl}?paymentId=${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get payment status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Get payment status error:", error)
    throw error
  }
}

export async function refundPayment(paymentId: string, amount: number, reason: string) {
  try {
    const response = await fetch(`${defaultConfig.apiUrl}/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        amount,
        reason,
      }),
    })

    if (!response.ok) {
      throw new Error(`Refund failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Refund error:", error)
    throw error
  }
}

export async function verifyPayment(paymentId: string, transactionId: string) {
  try {
    const response = await fetch(`${defaultConfig.apiUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        transactionId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Verification failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Verification error:", error)
    throw error
  }
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount)
}

export function calculateParkingCost(hourlyRate: number, hours: number, discountPercent = 0): number {
  const subtotal = hourlyRate * hours
  const discount = subtotal * (discountPercent / 100)
  return subtotal - discount
}

export function validateCardNumber(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\s/g, "")
  return /^\d{13,19}$/.test(sanitized) && luhnCheck(sanitized)
}

function luhnCheck(cardNumber: string): boolean {
  let sum = 0
  let isEven = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cardNumber.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export function validateUPI(upi: string): boolean {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/.test(upi)
}

export function validateExpiry(expiryDate: string): boolean {
  const [month, year] = expiryDate.split("/")
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const expMonth = Number.parseInt(month)
  const expYear = Number.parseInt(year)

  if (expMonth < 1 || expMonth > 12) return false
  if (expYear < currentYear) return false
  if (expYear === currentYear && expMonth < currentMonth) return false

  return true
}
