import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user is admin or the order owner
    const { data: userRole } = await supabase.from("users").select("role").eq("id", user.id).single()

    let query = supabase.from("orders").select("*, order_items(*)").eq("id", params.id)

    if (userRole?.role !== "admin") {
      query = query.eq("user_id", user.id)
    }

    const { data: order, error } = await query.single()

    if (error) throw error
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error("[v0] Get order error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
