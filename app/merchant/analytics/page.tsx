"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, Eye, ShoppingCart, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MerchantAnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/login")
          return
        }

        const { data: userData } = await supabase.from("users").select("role").eq("id", authUser.id).single()

        if (userData?.role !== "merchant") {
          router.push("/")
          return
        }

        // Fetch merchant analytics
        const { data: products } = await supabase.from("products").select("*").eq("merchant_id", authUser.id)

        const { data: orders } = await supabase
          .from("order_items")
          .select("*")
          .in("product_id", products?.map((p) => p.id) || [])

        const totalViews = products?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0
        const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_price || 0), 0) || 0

        setAnalytics({
          totalProducts: products?.length || 0,
          totalOrders: orders?.length || 0,
          totalViews,
          totalRevenue,
          conversionRate: products?.length ? (((orders?.length || 0) / totalViews) * 100).toFixed(2) : 0,
        })
      } catch (error) {
        console.error("[v0] Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your sales performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics?.totalOrders || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₨{analytics?.totalRevenue?.toLocaleString() || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Product Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics?.totalViews?.toLocaleString() || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics?.conversionRate || 0}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
