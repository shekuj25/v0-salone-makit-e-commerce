"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  productId: string
  quantity: number
  product: Product
}

export function CartItem({ productId, quantity, product }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      updateQuantity(productId, quantity + 1)
    }
  }

  const itemTotal = product.price * quantity

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name_en}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-2">
                {product.name_en}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-3">{product.district}</p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="flex-1 text-right">
                <p className="text-lg font-bold text-primary">{formatPrice(itemTotal)}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(product.price)} each</p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeItem(productId)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
