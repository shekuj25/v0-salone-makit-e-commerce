import { notFound } from "next/navigation"
import { mockProducts } from "@/lib/mock-data"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return {
      title: "Product Not Found - Salone Makit",
    }
  }

  return {
    title: `${product.name_en} - Salone Makit`,
    description: product.description_en,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />

      <div className="mt-16">
        <RelatedProducts categoryId={product.category_id} currentProductId={product.id} />
      </div>
    </div>
  )
}
