import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0072CE] via-[#0072CE] to-[#1EB53A] text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgMTE0aDEydjEySDEyem0yNCAwaDEydjEySDM2em0yNCAwaDEydjEySDYwek0xMiA5Mmg1djEySDEyem0yNCAwaDEydjEySDM2em0yNCAwaDEydjEySDYwek0xMiA3MGgxMnYxMkgxMnptMjQgMGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgNDhoMTJ2MTJIMTJ6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDI2aDEydjEySDEyem0yNCAwaDEydjEySDM2em0yNCAwaDEydjEySDYwek0xMiA0aDEydjEySDEyem0yNCAwaDEydjEySDM2em0yNCAwaDEydjEySDYweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="h-4 w-4 text-[#F0B429]" />
              <span className="text-sm font-medium">Sierra Leone's #1 Marketplace</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-balance leading-tight">
              Buy & Sell in <span className="text-[#F0B429] drop-shadow-lg">Sierra Leone</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-white/95 text-pretty leading-relaxed">
            Discover amazing products from local merchants across all districts. From Freetown to Kailahun, from Bo to
            Makeni - shop Made in Salone!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              asChild
              className="font-semibold bg-white text-[#0072CE] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-[#1EB53A] text-white border-white/30 hover:bg-[#1EB53A]/90 hover:border-white/50 shadow-lg"
            >
              <Link href="/merchants">Sell Your Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="h-10 w-10 rounded-full bg-[#F0B429] flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Orange & Afrimoney</p>
                <p className="text-xs text-white/80">Instant Payment</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="h-10 w-10 rounded-full bg-[#F0B429] flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure Shopping</p>
                <p className="text-xs text-white/80">Buyer Protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="h-10 w-10 rounded-full bg-[#F0B429] flex items-center justify-center shrink-0">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Nationwide Delivery</p>
                <p className="text-xs text-white/80">All 14 Districts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}
