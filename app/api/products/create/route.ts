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

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "merchant" && userData?.role !== "admin") {
      return NextResponse.json({ error: "Only merchants can add products" }, { status: 403 })
    }

    const body = await request.json()
    const { nameEn, nameKrio, descriptionEn, descriptionKrio, price, categoryId, stockQuantity, district, imageUrl } =
      body

    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        merchant_id: user.id,
        name_en: nameEn,
        name_krio: nameKrio,
        description_en: descriptionEn,
        description_krio: descriptionKrio,
        price,
        category_id: categoryId,
        stock_quantity: stockQuantity,
        district,
        image_url: imageUrl,
        is_active: true,
      })
      .select()
      .single()

    if (productError) {
      console.error("[v0] Product creation error:", productError)
      return NextResponse.json({ error: productError.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
