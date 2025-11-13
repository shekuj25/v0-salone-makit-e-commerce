"use client"

import { useCart } from "@/components/cart-provider"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockProducts } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function CartContent() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started</p>
        <Button asChild size="lg">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  // Calculate totals
  const cartItems = items
    .map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return {
        ...item,
        product,
      }
    })
    .filter((item) => item.product !== undefined)

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.product!.price * item.quantity
  }, 0)

  const deliveryFee = 10000 // Fixed delivery fee for demo
  const total = subtotal + deliveryFee

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.productId} productId={item.productId} quantity={item.quantity} product={item.product!} />
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">{formatPrice(deliveryFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
