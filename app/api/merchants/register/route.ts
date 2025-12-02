import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { businessName, businessPhone, businessDistrict, legalDocumentUrl } = body

    const merchantId = `MERCHANT-${Date.now().toString().slice(-8)}`

    const { error: updateError } = await supabase
      .from("users")
      .update({
        role: "merchant",
        full_name: businessName,
        phone: businessPhone,
        district: businessDistrict,
      })
      .eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        merchantId,
        message: "Successfully registered as merchant",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
