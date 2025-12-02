import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured") === "true"

    let query = supabase.from("products").select("*").eq("is_active", true)

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    if (featured) {
      query = query.eq("is_featured", true)
    }

    const { data: products, error } = await query.order("created_at", { ascending: false }).limit(50)

    if (error) throw error

    return NextResponse.json({ products: products || [] })
  } catch (error: any) {
    console.error("[v0] Get products error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "merchant" && userData?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { categoryId, nameEn, nameKrio, descriptionEn, descriptionKrio, price, stockQuantity, imageUrl } = body

    const { data: product, error } = await supabase.from("products").insert({
      merchant_id: user.id,
      category_id: categoryId,
      name_en: nameEn,
      name_krio: nameKrio,
      description_en: descriptionEn,
      description_krio: descriptionKrio,
      price,
      stock_quantity: stockQuantity,
      image_url: imageUrl,
      is_active: false, // Requires admin approval
    })

    if (error) throw error

    return NextResponse.json({ product, message: "Product created, pending admin approval" }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create product error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
