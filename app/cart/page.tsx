import { CartContent } from "@/components/cart-content"

export const metadata = {
  title: "Shopping Cart - Salone Makit",
  description: "View and manage items in your shopping cart",
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-balance">Shopping Cart</h1>
      <CartContent />
    </div>
  )
}
