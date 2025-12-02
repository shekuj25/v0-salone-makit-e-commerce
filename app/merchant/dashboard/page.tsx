import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, ShoppingCart, AlertCircle } from "lucide-react"

export default async function MerchantDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (userData?.role !== "merchant" && userData?.role !== "admin") {
    redirect("/")
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("merchant_id", user.id)
    .order("created_at", { ascending: false })

  const { data: orders } = await supabase
    .from("order_items")
    .select(
      `
      *,
      orders:order_id (
        id,
        order_number,
        status,
        total_amount,
        created_at
      )
    `,
    )
    .in("product_id", products?.map((p) => p.id) || [])

  const totalProducts = products?.length || 0
  const totalOrders = orders?.length || 0
  const totalViews = products?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Merchant Dashboard</h1>
          <p className="text-gray-600">Manage your products and track orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-green-600" />
                Your Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{totalProducts}</p>
              <p className="text-xs text-gray-500 mt-1">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
              <p className="text-xs text-gray-500 mt-1">Total orders received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Eye className="w-4 h-4 text-yellow-600" />
                Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{totalViews}</p>
              <p className="text-xs text-gray-500 mt-1">Product views</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/merchant/products/new">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Add New Product</Button>
          </Link>
          <Link href="/merchant/products">
            <Button variant="outline" className="w-full border-blue-200 bg-transparent">
              View All Products
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders for your products</CardDescription>
          </CardHeader>
          <CardContent>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{order.product_name}</p>
                      <p className="text-sm text-gray-600">Order #{order.orders?.order_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {order.quantity} × ₨{order.unit_price}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{order.orders?.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
