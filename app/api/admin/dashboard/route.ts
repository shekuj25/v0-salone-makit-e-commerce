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

    const { data: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })
    const { data: totalMerchants } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "merchant")
    const { data: totalProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
    const { data: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers?.length || 0,
        totalMerchants: totalMerchants?.length || 0,
        totalProducts: totalProducts?.length || 0,
        totalOrders: totalOrders?.length || 0,
      },
    })
  } catch (error: any) {
    console.error("[v0] Dashboard error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
