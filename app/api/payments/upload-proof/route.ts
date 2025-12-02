import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, paymentMethod, referenceId, proofUrl } = body

    // Create payment record
    const { data: payment, error } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        payment_method: paymentMethod,
        reference_id: referenceId,
        proof_url: proofUrl,
        status: "pending",
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ payment, message: "Payment proof submitted for verification" }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Upload proof error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
