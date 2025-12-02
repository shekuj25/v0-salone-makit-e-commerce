import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, order_items(*), users(full_name, email)")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: orders || [] })
  } catch (error: any) {
    console.error("[v0] Get orders error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { orderId, status } = body

    const { data: order, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select().single()

    if (error) throw error

    return NextResponse.json({ order, message: `Order status updated to ${status}` })
  } catch (error: any) {
    console.error("[v0] Update order error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
