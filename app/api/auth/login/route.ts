import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 })
  }
}
