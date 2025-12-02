"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { mockProducts } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ShoppingBag, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const districts = [
  "Western Area",
  "Bo",
  "Kenema",
  "Makeni",
  "Freetown",
  "Kailahun",
  "Moyamba",
  "Bonthe",
  "Port Loko",
  "Kono",
  "Kambia",
  "Koinadugu",
  "Tonkolili",
  "Pujehun",
]

const paymentMethods = [
  { id: "orange-money", name: "Orange Money", icon: "🟠", color: "#FF7900" },
  { id: "afrimoney", name: "Afrimoney", icon: "🔵", color: "#0066CC" },
  { id: "bank-transfer", name: "Bank Transfer", icon: "🏦", color: "#1EB53A" },
  { id: "cash-on-delivery", name: "Cash on Delivery", icon: "💵", color: "#F0B429" },
]

export function CheckoutForm() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    district: "",
    address: "",
    notes: "",
    paymentMethod: "orange-money",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"instructions" | "processing" | "success">("instructions")

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handlePaymentProcess = async () => {
    setPaymentStep("processing")
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success")
      completeOrder()
    }, 2000)
  }

  const completeOrder = async () => {
    setIsProcessing(true)

    try {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Please Login",
          description: "You must be logged in to place an order",
          variant: "destructive",
        })
        router.push("/login?redirectTo=/checkout")
        return
      }

      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            productName: mockProducts.find((p) => p.id === item.productId)?.name_en || "Product",
            quantity: item.quantity,
            unitPrice: mockProducts.find((p) => p.id === item.productId)?.price || 0,
            totalPrice: (mockProducts.find((p) => p.id === item.productId)?.price || 0) * item.quantity,
          })),
          totalAmount:
            items.reduce((sum, item) => {
              const productPrice = mockProducts.find((p) => p.id === item.productId)?.price || 0
              return sum + productPrice * item.quantity
            }, 0) + 10000,
          paymentMethod: formData.paymentMethod,
          deliveryDistrict: formData.district,
          deliveryAddress: formData.address,
          deliveryPhone: formData.phone,
          deliveryName: formData.fullName,
          deliveryEmail: formData.email,
          notes: formData.notes || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      const { order } = await response.json()

      await sendOrderNotifications(order.orderNumber)

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.orderNumber}. Check your email and phone for updates.`,
      })

      clearCart()
      localStorage.setItem("last-order-number", order.orderNumber)
      router.push("/order-confirmation")
    } catch (error: any) {
      console.error("[v0] Order completion error:", error)
      toast({
        title: "Order Failed",
        description: error.message || "Could not complete order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setShowPaymentDialog(false)
    }
  }

  const sendOrderNotifications = async (orderNumber: string) => {
    const notifications = [
      {
        time: "Immediate",
        type: "SMS & Email",
        message: `Order #${orderNumber} confirmed! Your order has been received and is being processed. Total: ${formatPrice(
          items.reduce((sum, item) => {
            const productPrice = mockProducts.find((p) => p.id === item.productId)?.price || 0
            return sum + productPrice * item.quantity
          }, 0) + 10000,
        )}`,
      },
      {
        time: "After payment (if prepaid)",
        type: "SMS & Email",
        message: "Payment received! Your order will be shipped shortly.",
      },
      {
        time: "When shipped",
        type: "SMS & Email",
        message: `Order #${orderNumber} is on the way! Track your delivery at salonemakit.sl`,
      },
      {
        time: "Before delivery",
        type: "SMS",
        message:
          "Your delivery is scheduled for today between 10AM-5PM. Our driver will call you 30 minutes before arrival.",
      },
      {
        time: "After delivery",
        type: "SMS & Email",
        message: `Order #${orderNumber} delivered! Thank you for shopping with Salone Makit. Rate your experience at salonemakit.sl`,
      },
    ]

    console.log("[v0] Notifications that would be sent:")
    console.log("[v0] Phone:", formData.phone)
    console.log("[v0] Email:", formData.email)
    notifications.forEach((notif) => {
      console.log(`[v0] [${notif.type}] ${notif.time}: ${notif.message}`)
    })
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products before checking out</p>
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

  const deliveryFee = 10000
  const total = subtotal + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.phone || !formData.email || !formData.district || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.paymentMethod !== "cash-on-delivery") {
      setShowPaymentDialog(true)
      setPaymentStep("instructions")
    } else {
      await completeOrder()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">We'll send order updates to this email</p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+232 XX XXX XXX"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">For SMS updates and delivery coordination</p>
              </div>

              <div>
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => handleChange("district", value)} required>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Any special delivery instructions?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange("paymentMethod", value)}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="relative flex items-center space-x-3 border-2 rounded-lg p-4 hover:border-primary transition-all cursor-pointer"
                      style={{
                        borderColor: formData.paymentMethod === method.id ? method.color : undefined,
                        backgroundColor: formData.paymentMethod === method.id ? `${method.color}10` : undefined,
                      }}
                      onClick={() => handleChange("paymentMethod", method.id)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer font-semibold">
                        <span className="mr-2 text-xl">{method.icon}</span>
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Payment Instructions */}
              <div
                className="mt-4 p-4 bg-muted rounded-lg border-l-4"
                style={{ borderColor: paymentMethods.find((m) => m.id === formData.paymentMethod)?.color }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {formData.paymentMethod === "orange-money" &&
                    "Click 'Place Order' to proceed. You'll receive payment instructions via SMS to complete your Orange Money payment securely."}
                  {formData.paymentMethod === "afrimoney" &&
                    "Click 'Place Order' to proceed. Afrimoney payment details will be sent to your phone for secure payment processing."}
                  {formData.paymentMethod === "bank-transfer" &&
                    "Click 'Place Order' to proceed. Bank account details will be provided for manual transfer. Your order ships after payment confirmation."}
                  {formData.paymentMethod === "cash-on-delivery" &&
                    "Pay in cash when your order is delivered. Please have the exact amount ready for the delivery driver."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product!.name_en} x {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.product!.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing */}
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

              <Button type="submit" size="lg" className="w-full">
                Place Order
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </form>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          {paymentStep === "instructions" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{paymentMethods.find((m) => m.id === formData.paymentMethod)?.icon}</span>
                  {paymentMethods.find((m) => m.id === formData.paymentMethod)?.name} Payment
                </DialogTitle>
                <DialogDescription className="leading-relaxed">
                  Follow these instructions to complete your payment
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                {formData.paymentMethod === "orange-money" && (
                  <div className="space-y-3 text-sm">
                    <div className="p-4 bg-[#FF7900]/10 rounded-lg border border-[#FF7900]/20">
                      <p className="font-semibold mb-2">Dial: *133#</p>
                      <ol className="space-y-1 text-muted-foreground ml-4 list-decimal">
                        <li>Select "Send Money"</li>
                        <li>
                          Enter merchant number: <strong>232-XX-XXXXXX</strong>
                        </li>
                        <li>
                          Enter amount: <strong>{formatPrice(total)}</strong>
                        </li>
                        <li>Enter your PIN to confirm</li>
                      </ol>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You will receive an SMS with the merchant number after clicking "Proceed to Payment"
                    </p>
                  </div>
                )}

                {formData.paymentMethod === "afrimoney" && (
                  <div className="space-y-3 text-sm">
                    <div className="p-4 bg-[#0066CC]/10 rounded-lg border border-[#0066CC]/20">
                      <p className="font-semibold mb-2">Dial: *151#</p>
                      <ol className="space-y-1 text-muted-foreground ml-4 list-decimal">
                        <li>Select "Transfer Money"</li>
                        <li>Select "To Afrimoney Account"</li>
                        <li>
                          Enter account: <strong>76-XXXXXXX</strong>
                        </li>
                        <li>
                          Enter amount: <strong>{formatPrice(total)}</strong>
                        </li>
                        <li>Confirm with your PIN</li>
                      </ol>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Account details will be sent via SMS after clicking "Proceed to Payment"
                    </p>
                  </div>
                )}

                {formData.paymentMethod === "bank-transfer" && (
                  <div className="space-y-3 text-sm">
                    <div className="p-4 bg-[#1EB53A]/10 rounded-lg border border-[#1EB53A]/20">
                      <p className="font-semibold mb-2">Bank Details:</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <strong>Bank:</strong> Sierra Leone Commercial Bank
                        </p>
                        <p>
                          <strong>Account Name:</strong> Salone Makit Ltd
                        </p>
                        <p>
                          <strong>Account Number:</strong> Will be sent via SMS
                        </p>
                        <p>
                          <strong>Amount:</strong> {formatPrice(total)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Complete bank details will be sent to your phone. Your order ships after payment confirmation.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs">
                  <span>💬</span>
                  <span className="text-muted-foreground">
                    SMS will be sent to: <strong>{formData.phone}</strong>
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowPaymentDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handlePaymentProcess}
                  style={{ backgroundColor: paymentMethods.find((m) => m.id === formData.paymentMethod)?.color }}
                >
                  Proceed to Payment
                </Button>
              </div>
            </>
          )}

          {paymentStep === "processing" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
              <p className="text-sm text-muted-foreground text-center">Please complete the payment on your phone</p>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-[#1EB53A]/10 flex items-center justify-center mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1EB53A]">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground text-center">Completing your order...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
