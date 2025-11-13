import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { HelpCircle, Package, CreditCard, ShieldCheck, MessageSquare } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-[#0072CE]">Help</span> <span className="text-[#1EB53A]">Center</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're here to help you with any questions about shopping on Salone Makit
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Link href="/shipping">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Package className="h-12 w-12 text-[#0072CE] mb-3" />
                <h3 className="font-semibold">Shipping Info</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/returns">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <ShieldCheck className="h-12 w-12 text-[#1EB53A] mb-3" />
                <h3 className="font-semibold">Returns</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/contact">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <MessageSquare className="h-12 w-12 text-[#F0B429] mb-3" />
                <h3 className="font-semibold">Contact Us</h3>
              </CardContent>
            </Card>
          </Link>
          <Card className="bg-gradient-to-br from-[#0072CE]/10 to-[#1EB53A]/10 h-full">
            <CardContent className="flex flex-col items-center text-center p-6">
              <CreditCard className="h-12 w-12 text-[#0072CE] mb-3" />
              <h3 className="font-semibold">Payments</h3>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-[#0072CE]" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I place an order?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Browse products, add items to your cart, then proceed to checkout. Fill in your delivery details and
                  choose your payment method. You'll receive confirmation via SMS and email.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We accept Orange Money, Afrimoney, Bank Transfer, and Cash on Delivery. For mobile money payments,
                  you'll receive payment instructions via SMS after placing your order.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Delivery within Freetown takes 1-3 business days. Other districts may take 3-7 business days depending
                  on location. You'll receive tracking updates via SMS.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I track my order?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! After placing your order, you'll receive SMS notifications at key stages: order confirmation,
                  payment received, item shipped, and delivery scheduled. You can also check your order status in your
                  account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What if I receive a damaged item?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  If you receive a damaged item, please contact us within 48 hours with photos. We'll arrange for a
                  replacement or refund. See our Returns page for full details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I become a merchant?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Visit our Become a Merchant page to sign up. You'll need a valid ID, business details, and bank
                  account information. Our team will review your application within 2-3 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Is it safe to shop on Salone Makit?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We verify all merchants, secure all transactions, and offer buyer protection. Your payment information
                  is encrypted and never shared with merchants.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  You can modify or cancel your order within 2 hours of placing it by contacting us immediately. Once
                  the item is shipped, cancellation may not be possible, but you can still return it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="mt-8 bg-gradient-to-r from-[#0072CE]/10 via-white to-[#1EB53A]/10">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">Our support team is here to help you</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#0072CE] text-white hover:bg-[#0072CE]/90 h-10 px-6 py-2"
            >
              Contact Support
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
