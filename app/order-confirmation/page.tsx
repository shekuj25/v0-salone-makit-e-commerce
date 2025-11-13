"use client"

import Link from "next/link"
import { CheckCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  useEffect(() => {
    const lastOrder = localStorage.getItem("last-order-number")
    setOrderNumber(lastOrder)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="pt-12 pb-12 space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#1EB53A]/10 p-6">
              <CheckCircle className="h-16 w-16 text-[#1EB53A]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-poppins text-balance">Order Confirmed!</h1>
            {orderNumber && <p className="text-lg font-medium text-[#0072CE]">Order #{orderNumber}</p>}
            <p className="text-muted-foreground text-pretty">
              Thank you for your order. We've sent confirmations to your phone and email.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-4">
            <p className="text-sm font-medium">You'll receive notifications via:</p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-[#FF7900]" />
                <span>SMS Updates</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-[#0072CE]" />
                <span>Email Updates</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-3">
            <p className="text-sm text-muted-foreground font-medium">What happens next?</p>
            <ul className="text-sm space-y-3 text-left max-w-md mx-auto">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#1EB53A] text-white text-xs font-bold">
                  1
                </span>
                <span>You'll receive payment instructions via SMS and email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#0072CE] text-white text-xs font-bold">
                  2
                </span>
                <span>The merchant will confirm and prepare your order</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#F0B429] text-white text-xs font-bold">
                  3
                </span>
                <span>You'll get tracking updates before and during delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#1EB53A] text-white text-xs font-bold">
                  4
                </span>
                <span>Your order will be delivered to your address in your district</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            Need help? Contact us at{" "}
            <a href="mailto:shekujkamara95@gmail.com" className="text-[#0072CE] hover:underline">
              shekujkamara95@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:+23273745673" className="text-[#0072CE] hover:underline">
              +232 73 745 673
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
