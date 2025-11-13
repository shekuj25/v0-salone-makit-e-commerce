import { CheckoutForm } from "@/components/checkout-form"

export const metadata = {
  title: "Checkout - Salone Makit",
  description: "Complete your order with secure payment options",
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-balance">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}
