import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-[#0072CE]">Contact</span> <span className="text-[#1EB53A]">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're here to help! Reach out to us through any of the channels below
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Phone */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#0072CE]/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#0072CE]" />
                </div>
                <span>Phone Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="tel:+23273745673" className="block text-lg font-semibold hover:text-[#0072CE] transition-colors">
                +232 73 745 673
              </a>
              <a href="tel:+23233066369" className="block text-lg font-semibold hover:text-[#0072CE] transition-colors">
                +232 33 066 369
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Call us for immediate assistance with your orders
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#1EB53A]/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[#1EB53A]" />
                </div>
                <span>Email Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="mailto:shekujkamara95@gmail.com"
                className="block text-lg font-semibold hover:text-[#1EB53A] transition-colors break-all"
              >
                shekujkamara95@gmail.com
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Email us for detailed inquiries and support
              </p>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#F0B429]/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#F0B429]" />
                </div>
                <span>WhatsApp</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="https://wa.me/23273745673"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold hover:text-[#F0B429] transition-colors"
              >
                +232 73 745 673
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed">Chat with us on WhatsApp for quick help</p>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#0072CE]/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#0072CE]" />
                </div>
                <span>Business Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p className="font-semibold">Monday - Friday</p>
                <p className="text-muted-foreground">8:00 AM - 6:00 PM</p>
                <p className="font-semibold mt-3">Saturday</p>
                <p className="text-muted-foreground">9:00 AM - 4:00 PM</p>
                <p className="font-semibold mt-3">Sunday</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Office Location */}
        <Card className="bg-gradient-to-br from-[#0072CE]/5 via-white to-[#1EB53A]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-[#1EB53A]" />
              Our Office
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-2">Salone Makit Headquarters</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Freetown, Western Area
              <br />
              Sierra Leone
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visit us during business hours for in-person assistance or to discuss merchant partnerships
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link href="/help">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="text-center p-6">
                <h3 className="font-semibold text-[#0072CE]">Visit Help Center</h3>
                <p className="text-sm text-muted-foreground mt-2">Browse FAQs and guides</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shipping">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="text-center p-6">
                <h3 className="font-semibold text-[#1EB53A]">Shipping Information</h3>
                <p className="text-sm text-muted-foreground mt-2">Learn about delivery</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/returns">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="text-center p-6">
                <h3 className="font-semibold text-[#F0B429]">Return Policy</h3>
                <p className="text-sm text-muted-foreground mt-2">View return guidelines</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
