import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0072CE] via-[#0072CE]/95 to-[#1EB53A] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-1 font-poppins font-bold text-2xl mb-4">
              <span className="text-white">Salone</span>
              <span className="text-[#F0B429]">Makit</span>
            </Link>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              Sierra Leone's leading e-commerce platform. Buy and sell with confidence across all districts.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#F0B429]" />
                <a href="tel:+23273745673" className="hover:text-[#F0B429] transition-colors">
                  +232 73 745 673
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#F0B429]" />
                <a href="mailto:shekujkamara95@gmail.com" className="hover:text-[#F0B429] transition-colors break-all">
                  shekujkamara95@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F0B429]" />
                <span>Freetown, Sierra Leone</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#F0B429]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/merchants" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Become a Merchant
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-[#F0B429]">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/90 hover:text-[#F0B429] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-semibold mb-4 text-[#F0B429]">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <span className="text-2xl">🟠</span>
                <div>
                  <p className="text-sm font-semibold">Orange Money</p>
                  <p className="text-xs text-white/80">*133#</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <span className="text-2xl">🔵</span>
                <div>
                  <p className="text-sm font-semibold">Afrimoney</p>
                  <p className="text-xs text-white/80">*151#</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <span className="text-2xl">💵</span>
                <div>
                  <p className="text-sm font-semibold">Cash on Delivery</p>
                  <p className="text-xs text-white/80">All districts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p className="text-white/90 mb-2">&copy; {new Date().getFullYear()} Salone Makit. All rights reserved.</p>
          <p className="flex items-center justify-center gap-2 text-white/80">
            Made with <span className="text-[#F0B429] text-lg">💚</span> in Sierra Leone
          </p>
        </div>
      </div>
    </footer>
  )
}
