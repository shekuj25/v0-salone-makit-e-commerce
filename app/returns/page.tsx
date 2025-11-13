import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-[#0072CE]">Return</span> <span className="text-[#1EB53A]">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your satisfaction is our priority. We make returns easy and hassle-free.
          </p>
        </div>

        {/* Return Window */}
        <Card className="mb-8 bg-gradient-to-br from-[#0072CE]/5 to-[#1EB53A]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-[#0072CE]" />
              Return Timeframe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#0072CE] mb-2">7 Days</p>
            <p className="text-muted-foreground leading-relaxed">
              You have 7 days from the date of delivery to initiate a return or exchange. Items must be unused, in
              original condition, and with all tags/packaging intact.
            </p>
          </CardContent>
        </Card>

        {/* Eligible vs Non-Eligible */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-[#1EB53A]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#1EB53A]">
                <CheckCircle2 className="h-6 w-6" />
                Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Defective or damaged items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Wrong item received</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Items not as described</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Unused items in original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Electronics with defects (within 7 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1EB53A] mt-1">✓</span>
                  <span>Fashion items with tags attached</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-600">
                <XCircle className="h-6 w-6" />
                Not Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Perishable food items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Personal care items (opened)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Underwear and intimate apparel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Items without original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Customized or personalized items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Items returned after 7 days</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How to Return */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <RotateCcw className="h-6 w-6 text-[#0072CE]" />
              How to Return an Item
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact Us</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Call or WhatsApp us at +232 73 745 673 or email shekujkamara95@gmail.com with your order number and
                    reason for return.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#F0B429] text-white flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Send Photos (if damaged)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If the item is damaged or defective, send clear photos via WhatsApp or email for verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#1EB53A] text-white flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Approval</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our team will review your request and approve your return within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Arrange Pickup or Drop-off</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll arrange a free pickup from your location, or you can drop off the item at our Freetown office.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#1EB53A] text-white flex items-center justify-center font-bold shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Receive Refund or Exchange</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Once we receive and inspect the item, you'll get a full refund (via mobile money or bank transfer)
                    or exchange within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Refund Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Refund Methods</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Orange Money or Afrimoney (instant to 24 hours)</li>
                <li>• Bank Transfer (2-3 business days)</li>
                <li>• Store Credit (instant, with 10% bonus)</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Shipping Costs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If the return is due to our error (wrong item, defective, etc.), we'll cover all shipping costs. For
                other returns, the original shipping fee is non-refundable.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-[#F0B429]/10 border-[#F0B429]/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-[#F0B429] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Important Notice</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For hygiene and safety reasons, we cannot accept returns on opened personal care items, food products,
                  or intimate apparel. Please inspect your order carefully upon delivery and contact us immediately if
                  there are any issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
