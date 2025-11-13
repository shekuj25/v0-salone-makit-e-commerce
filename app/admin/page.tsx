import { BarChart3, Users, Package, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Admin Dashboard - Salone Makit",
  description: "Platform administration and analytics",
}

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Active Merchants", value: "89", change: "+5%", icon: Package, color: "text-green-600" },
    { title: "Total Products", value: "432", change: "+18%", icon: Package, color: "text-purple-600" },
    { title: "Orders Today", value: "23", change: "+8%", icon: ShoppingCart, color: "text-orange-600" },
  ]

  const recentActivity = [
    { action: "New merchant registered", user: "Aminata Kamara", time: "5 minutes ago" },
    { action: "Product listed", user: "Ibrahim Sesay", time: "12 minutes ago" },
    { action: "Order placed", user: "Fatmata Koroma", time: "23 minutes ago" },
    { action: "Product updated", user: "Mohamed Bangura", time: "1 hour ago" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-balance">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/merchants">
                <Package className="mr-2 h-4 w-4" />
                Manage Merchants
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/products">
                <Package className="mr-2 h-4 w-4" />
                Review Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View All Orders
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
