# ParkHub Payment System Documentation

## Overview
ParkHub payment system supports multiple payment methods with secure transaction processing, refunds, and verification.

## Payment Methods Supported
- **Card**: Credit/Debit cards (Visa, Mastercard, AmEx)
- **Wallet**: Digital wallets and prepaid accounts
- **UPI**: Unified Payments Interface (India)
- **NetBanking**: Direct bank transfers

## API Endpoints

### 1. Process Payment
**POST** `/api/payments`

Request:
\`\`\`json
{
  "reservationId": "RES-123456",
  "userId": "user-123",
  "amount": 500,
  "paymentMethod": "card",
  "cardDetails": {
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe"
  }
}
\`\`\`

Response (Success):
\`\`\`json
{
  "success": true,
  "payment": {
    "id": "PAY-1699564800000",
    "reservationId": "RES-123456",
    "userId": "user-123",
    "amount": 500,
    "status": "completed",
    "paymentMethod": "card",
    "transactionId": "TXN-1699564800000-abc123def",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
\`\`\`

### 2. Get Payment Status
**GET** `/api/payments?paymentId=PAY-1699564800000`

Response:
\`\`\`json
{
  "success": true,
  "payment": {
    "id": "PAY-1699564800000",
    "status": "completed",
    "amount": 500
  }
}
\`\`\`

### 3. Refund Payment
**POST** `/api/payments/refund`

Request:
\`\`\`json
{
  "paymentId": "PAY-1699564800000",
  "amount": 500,
  "reason": "User cancelled reservation"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "refund": {
    "id": "REF-1699564900000",
    "paymentId": "PAY-1699564800000",
    "status": "completed",
    "refundAmount": 500,
    "processedAt": "2024-01-15T10:05:00.000Z"
  }
}
\`\`\`

### 4. Verify Payment
**POST** `/api/payments/verify`

Request:
\`\`\`json
{
  "paymentId": "PAY-1699564800000",
  "transactionId": "TXN-1699564800000-abc123def"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "verification": {
    "verified": true,
    "paymentId": "PAY-1699564800000",
    "status": "completed"
  }
}
\`\`\`

## Frontend Integration

### Basic Payment Processing
\`\`\`typescript
import { processPayment, formatCurrency } from "@/lib/payment-utils"

async function handlePayment() {
  try {
    const result = await processPayment({
      reservationId: "RES-123456",
      userId: "user-123",
      amount: 500,
      paymentMethod: "card",
    })
    
    if (result.success) {
      console.log("Payment successful:", result.payment)
    }
  } catch (error) {
    console.error("Payment failed:", error)
  }
}
\`\`\`

### Calculate Parking Cost
\`\`\`typescript
import { calculateParkingCost, formatCurrency } from "@/lib/payment-utils"

const hourlyRate = 50 // Rs 50 per hour
const hours = 3
const discountPercent = 10

const totalCost = calculateParkingCost(hourlyRate, hours, discountPercent)
console.log(formatCurrency(totalCost)) // Rs 135.00
\`\`\`

### Validate Payment Methods
\`\`\`typescript
import { validateCardNumber, validateUPI, validateExpiry } from "@/lib/payment-utils"

validateCardNumber("4111111111111111") // true
validateUPI("user@paytm") // true
validateExpiry("12/25") // true/false based on current date
\`\`\`

## Error Handling

All payment endpoints return error responses with appropriate HTTP status codes:

- **400**: Bad Request - Missing or invalid fields
- **404**: Not Found - Payment/refund not found
- **500**: Server Error - Payment processing failed

Example error response:
\`\`\`json
{
  "error": "Payment amount must be greater than 0"
}
\`\`\`

## Security Considerations

1. Always validate payment data on the backend
2. Store sensitive card details securely (use third-party providers like Stripe)
3. Implement rate limiting on payment endpoints
4. Log all payment transactions for audit purposes
5. Use HTTPS for all payment requests
6. Implement PCI DSS compliance

## Production Integration

For production, replace mock payment processing with:
- **Stripe**: For global card payments
- **Razorpay**: For India-specific payments (cards, UPI, wallets)
- **PayPal**: For international payments

Update the payment routes to call these services' APIs instead of mock processing.
