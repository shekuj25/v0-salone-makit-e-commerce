import Link from "next/link"
import { Store, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Become a Merchant - Salone Makit",
  description: "Start selling your products on Salone Makit",
}

export default function BecomeMerchantPage() {
  const benefits = [
    {
      icon: Store,
      title: "Reach More Customers",
      description: "Access buyers across all districts in Sierra Leone",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Simple tools to manage products, orders, and sales",
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Be part of Sierra Leone's largest e-commerce platform",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-balance">
            Become a Merchant on <span className="text-primary">Salone Makit</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Start selling your products to customers across Sierra Leone. Join hundreds of merchants already growing
            their business with us.
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link href="/merchant">Get Started</Link>
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <benefit.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Register as a Merchant</h3>
                <p className="text-sm text-muted-foreground">Create your merchant account in minutes</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">List Your Products</h3>
                <p className="text-sm text-muted-foreground">Add photos, descriptions, and prices for your products</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Start Selling</h3>
                <p className="text-sm text-muted-foreground">Receive orders and payments through our platform</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to start selling?</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/merchant">Create Merchant Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
