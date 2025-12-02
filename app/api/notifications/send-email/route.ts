import {
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
  sendPaymentInstructionsEmail,
} from "@/lib/email-service"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, orderNumber, orderDetails, type } = await request.json()

    if (!email || !orderNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let result

    switch (type) {
      case "confirmation":
        result = await sendOrderConfirmationEmail(email, orderNumber, orderDetails)
        break
      case "status-update":
        result = await sendOrderStatusUpdateEmail(email, orderNumber, orderDetails.status, orderDetails.message)
        break
      case "payment-instructions":
        result = await sendPaymentInstructionsEmail(
          email,
          orderNumber,
          orderDetails.paymentMethod,
          orderDetails.amount,
          orderDetails.instructions,
        )
        break
      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[v0] Notification API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
