import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X } from "lucide-react"
import Image from "next/image"
import { mockProducts } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

export const metadata = {
  title: "Review Products - Admin Panel",
  description: "Review and approve product listings",
}

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Review Products</h1>
        <p className="text-muted-foreground">Approve or reject product listings</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" />
        </div>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({mockProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex gap-4 p-4 border rounded-lg">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name_en}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{product.name_en}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.district}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                    <Badge variant="outline">Stock: {product.stock_quantity}</Badge>
                    <Badge variant={product.is_active ? "secondary" : "outline"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-secondary bg-transparent">
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
