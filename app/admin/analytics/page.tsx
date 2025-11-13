import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export const metadata = {
  title: "Analytics - Admin Panel",
  description: "Platform analytics and insights",
}

export default function AdminAnalyticsPage() {
  const topDistricts = [
    { name: "Western Area", orders: 156, sales: "Le 4.2M" },
    { name: "Bo", orders: 89, sales: "Le 2.1M" },
    { name: "Kenema", orders: 67, sales: "Le 1.8M" },
    { name: "Makeni", orders: 54, sales: "Le 1.4M" },
  ]

  const topCategories = [
    { name: "Food & Groceries", products: 145, sales: "Le 3.8M" },
    { name: "Fashion & Clothing", products: 98, sales: "Le 2.9M" },
    { name: "Handicrafts", products: 76, sales: "Le 1.5M" },
    { name: "Beauty & Personal Care", products: 54, sales: "Le 1.2M" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Analytics</h1>
        <p className="text-muted-foreground">Platform insights and performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Districts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Top Districts by Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDistricts.map((district, index) => (
                <div key={district.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{district.name}</p>
                      <p className="text-sm text-muted-foreground">{district.orders} orders</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary">{district.sales}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Top Categories by Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.products} products</p>
                    </div>
                  </div>
                  <span className="font-bold text-secondary">{category.sales}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
