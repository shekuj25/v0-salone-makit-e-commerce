import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return NextResponse.json({ success: true, message: "Logged out successfully" })
  } catch (error: any) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: error.message || "Logout failed" }, { status: 500 })
  }
}
