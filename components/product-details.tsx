"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { mockCategories } from "@/lib/mock-data"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const category = mockCategories.find((c) => c.id === product.category_id)

  const handleAddToCart = () => {
    if (product.stock_quantity === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      })
      return
    }

    if (quantity > product.stock_quantity) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${product.stock_quantity} items available`,
        variant: "destructive",
      })
      return
    }

    addItem(product.id, quantity)
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name_en} added to your cart`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name_en}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.is_featured && (
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Featured</Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Category & District */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {category?.icon} {category?.name_en}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {product.district}
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-balance">{product.name_en}</h1>
          <p className="text-muted-foreground italic">{product.name_krio}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground">SLL</span>
        </div>

        {/* Stock Status */}
        <div>
          {product.stock_quantity > 0 ? (
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              In Stock ({product.stock_quantity} available)
            </Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description_en}</p>
          {product.description_krio && (
            <p className="text-muted-foreground leading-relaxed mt-2 italic text-sm">{product.description_krio}</p>
          )}
        </div>

        <Separator />

        {/* Quantity Selector & Add to Cart */}
        {product.stock_quantity > 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        )}

        {/* Product Info Cards */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Delivery</p>
              <p className="font-semibold text-sm">All Districts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Payment</p>
              <p className="font-semibold text-sm">Multiple Options</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
