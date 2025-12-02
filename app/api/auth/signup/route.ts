import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, phone, district, role } = await request.json()

    if (!email || !password || !fullName || !district) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) throw authError

    if (!authData.user) {
      return NextResponse.json({ error: "User creation failed" }, { status: 400 })
    }

    // Create user profile in database
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      phone,
      district,
      role: role || "buyer",
    })

    if (profileError) throw profileError

    return NextResponse.json(
      {
        success: true,
        user: authData.user,
        message: "Account created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: error.message || "Signup failed" }, { status: 500 })
  }
}
