import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, MapPin, Clock, Shield, AlertCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-[#0072CE]">Shipping</span> <span className="text-[#1EB53A]">Information</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fast and reliable delivery across all districts in Sierra Leone
          </p>
        </div>

        {/* Delivery Times */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-[#0072CE]" />
              Delivery Timeframes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-[#0072CE] mt-1" />
                  <div>
                    <h3 className="font-semibold">Freetown & Western Area</h3>
                    <p className="text-2xl font-bold text-[#0072CE] my-2">1-3 Days</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Orders placed before 2 PM are typically processed same day
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <Truck className="h-5 w-5 text-[#1EB53A] mt-1" />
                  <div>
                    <h3 className="font-semibold">Other Districts</h3>
                    <p className="text-2xl font-bold text-[#1EB53A] my-2">3-7 Days</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Bo, Kenema, Makeni, Port Loko, and other regions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F0B429]/10 rounded-lg border border-[#F0B429]/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#F0B429] mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold mb-1">Note on Delivery Times</p>
                  <p className="text-muted-foreground">
                    Delivery times may vary during rainy season or public holidays. Remote areas may require additional
                    1-2 days. We'll keep you updated via SMS throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Costs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Package className="h-6 w-6 text-[#1EB53A]" />
              Shipping Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Freetown & Western Area</span>
                <span className="text-lg font-bold text-[#0072CE]">Le 10,000</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Bo, Kenema, Makeni</span>
                <span className="text-lg font-bold text-[#1EB53A]">Le 15,000</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Other Districts</span>
                <span className="text-lg font-bold text-[#F0B429]">Le 20,000</span>
              </div>
            </div>

            <div className="p-4 bg-[#1EB53A]/10 rounded-lg border border-[#1EB53A]/20">
              <p className="text-sm leading-relaxed">
                <strong>Free Shipping:</strong> Orders over Le 500,000 qualify for free shipping within Freetown. Orders
                over Le 1,000,000 get free shipping nationwide!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tracking & Notifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#F0B429]" />
              Order Tracking & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Stay informed every step of the way with SMS notifications sent directly to your phone:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border-l-4 border-[#0072CE] bg-[#0072CE]/5 rounded">
                <div className="h-6 w-6 rounded-full bg-[#0072CE] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">Immediate confirmation after placing your order</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border-l-4 border-[#F0B429] bg-[#F0B429]/5 rounded">
                <div className="h-6 w-6 rounded-full bg-[#F0B429] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold">Payment Received</p>
                  <p className="text-sm text-muted-foreground">
                    Confirmation when your payment is processed (for prepaid orders)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border-l-4 border-[#1EB53A] bg-[#1EB53A]/5 rounded">
                <div className="h-6 w-6 rounded-full bg-[#1EB53A] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold">Order Shipped</p>
                  <p className="text-sm text-muted-foreground">Notification when your package is on the way</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border-l-4 border-[#0072CE] bg-[#0072CE]/5 rounded">
                <div className="h-6 w-6 rounded-full bg-[#0072CE] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-semibold">Out for Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Alert when the delivery driver is heading to your location
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border-l-4 border-[#1EB53A] bg-[#1EB53A]/5 rounded">
                <div className="h-6 w-6 rounded-full bg-[#1EB53A] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  5
                </div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-sm text-muted-foreground">Confirmation that your order has been delivered</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packaging */}
        <Card>
          <CardHeader>
            <CardTitle>Safe & Secure Packaging</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              All items are carefully packaged to ensure they arrive in perfect condition. Fragile items receive extra
              padding and are clearly marked.
            </p>
            <p>
              Our delivery partners are trained to handle packages with care. If you receive a damaged item, please
              contact us immediately with photos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
