"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/admin/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name_en?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/approve`, {
        method: "PUT",
      })
      if (response.ok) {
        setProducts(products.map((p) => (p.id === productId ? { ...p, is_active: true } : p)))
      }
    } catch (error) {
      console.error("[v0] Error approving product:", error)
    }
  }

  const handleReject = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== productId))
      }
    } catch (error) {
      console.error("[v0] Error rejecting product:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Review Products</h1>
        <p className="text-muted-foreground">Approve or reject product listings</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
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
                    {!product.is_active && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 bg-transparent hover:bg-green-50"
                          onClick={() => handleApprove(product.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive bg-transparent hover:bg-red-50"
                          onClick={() => handleReject(product.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No products found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
