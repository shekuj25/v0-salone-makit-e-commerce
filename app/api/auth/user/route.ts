import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

    return NextResponse.json({
      user: {
        ...user,
        profile,
      },
    })
  } catch (error: any) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch user" }, { status: 500 })
  }
}
