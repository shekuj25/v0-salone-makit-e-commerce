import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: orders || [] })
  } catch (error: any) {
    console.error("[v0] Get orders error:", error)
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

    const orderNumber = `ORD-${Date.now()}-${uuidv4().slice(0, 8)}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: "pending",
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: "pending",
        delivery_district: deliveryDistrict,
        delivery_address: deliveryAddress,
        delivery_phone: deliveryPhone,
        delivery_name: deliveryName,
        notes,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) throw itemsError

    // Log admin activity
    await supabase.from("admin_logs").insert({
      action: "Order created",
      entity_type: "order",
      entity_id: order.id,
      details: { user_id: user.id, order_number: orderNumber },
    })

    return NextResponse.json(
      {
        success: true,
        order: { ...order, orderNumber },
        message: "Order placed successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
