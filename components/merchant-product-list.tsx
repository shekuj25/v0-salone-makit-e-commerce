"use client"

import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

export function MerchantProductList() {
  // In a real app, filter by merchant_id
  const merchantProducts = mockProducts

  return (
    <div className="space-y-4">
      {merchantProducts.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name_en}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{product.name_en}</h3>
                    <p className="text-sm text-muted-foreground">{product.name_krio}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/merchant/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price: </span>
                    <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stock: </span>
                    <span
                      className={
                        product.stock_quantity > 0 ? "text-secondary font-medium" : "text-destructive font-medium"
                      }
                    >
                      {product.stock_quantity} units
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Views: </span>
                    <span>{product.views_count}</span>
                  </div>
                  <Badge variant={product.is_active ? "secondary" : "outline"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                  {product.is_featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
