import { ProductForm } from "@/components/product-form"

export const metadata = {
  title: "Add New Product - Merchant Dashboard",
  description: "Add a new product to your store",
}

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins mb-2">Add New Product</h1>
          <p className="text-muted-foreground">Fill in the details to list your product</p>
        </div>

        <ProductForm />
      </div>
    </div>
  )
}
