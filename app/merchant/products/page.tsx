import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MerchantProductList } from "@/components/merchant-product-list"

export const metadata = {
  title: "My Products - Merchant Dashboard",
  description: "Manage your product listings",
}

export default function MerchantProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-2">My Products</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <Button asChild>
          <Link href="/merchant/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <MerchantProductList />
    </div>
  )
}
