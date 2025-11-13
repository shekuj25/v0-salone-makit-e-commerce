import Link from "next/link"
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Merchant Dashboard - Salone Makit",
  description: "Manage your products, orders, and sales",
}

export default function MerchantDashboardPage() {
  // Mock data
  const stats = [
    { title: "Total Products", value: "12", icon: Package, color: "text-blue-600" },
    { title: "Pending Orders", value: "5", icon: ShoppingCart, color: "text-orange-600" },
    { title: "Total Sales", value: "Le 2.4M", icon: DollarSign, color: "text-green-600" },
    { title: "This Month", value: "Le 450K", icon: TrendingUp, color: "text-purple-600" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-balance">Merchant Dashboard</h1>
          <p className="text-muted-foreground">Manage your store and products</p>
        </div>
        <Button asChild size="lg">
          <Link href="/merchant/products/new">Add New Product</Link>
        </Button>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/merchant/products">
                <Package className="mr-2 h-4 w-4" />
                Manage Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/merchant/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">Welcome to Salone Makit! Here's how to get started:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">1.</span>
                <span>Add your products with clear photos and descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">2.</span>
                <span>Set competitive prices in Sierra Leonean Leones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">3.</span>
                <span>Manage orders and keep stock updated</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
