import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const relatedProducts = mockProducts
    .filter((p) => p.category_id === categoryId && p.id !== currentProductId)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold font-poppins mb-6">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
