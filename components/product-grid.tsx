import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

interface ProductGridProps {
  featured?: boolean
  categoryId?: string
}

export function ProductGrid({ featured, categoryId }: ProductGridProps) {
  let products = mockProducts

  if (featured) {
    products = products.filter((p) => p.is_featured)
  }

  if (categoryId) {
    products = products.filter((p) => p.category_id === categoryId)
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No products found</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
