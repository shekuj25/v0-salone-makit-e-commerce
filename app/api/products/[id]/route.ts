import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (error) throw error

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error("[v0] Get product error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: product } = await supabase.from("products").select("merchant_id").eq("id", params.id).single()

    if (product?.merchant_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { data: updated, error } = await supabase.from("products").update(body).eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ product: updated })
  } catch (error: any) {
    console.error("[v0] Update product error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: product } = await supabase.from("products").select("merchant_id").eq("id", params.id).single()

    if (product?.merchant_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ message: "Product deleted" })
  } catch (error: any) {
    console.error("[v0] Delete product error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
