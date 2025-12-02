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

    const body = await request.json()
    const {
      items,
      totalAmount,
      paymentMethod,
      deliveryDistrict,
      deliveryAddress,
      deliveryPhone,
      deliveryName,
      deliveryEmail,
      notes,
    } = body

    const orderNumber = `SM${Date.now().toString().slice(-8)}`

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: "pending",
        total_amount: totalAmount,
        currency: "SLL",
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cash-on-delivery" ? "pending" : "pending",
        delivery_district: deliveryDistrict,
        delivery_address: deliveryAddress,
        delivery_phone: deliveryPhone,
        delivery_name: deliveryName,
        delivery_email: deliveryEmail,
        notes,
      })
      .select()
      .single()

    if (orderError) {
      console.error("[v0] Order creation error:", orderError)
      return NextResponse.json({ error: orderError.message }, { status: 400 })
    }

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Order items error:", itemsError)
    }

    return NextResponse.json(
      {
        success: true,
        order: {
          id: order.id,
          orderNumber: order.order_number,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
