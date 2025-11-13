import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { mockCategories } from "@/lib/mock-data"
import { SearchBar } from "@/components/search-bar"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    return {
      title: "Category Not Found - Salone Makit",
    }
  }

  return {
    title: `${category.name_en} - Salone Makit`,
    description: `Shop ${category.name_en} products from Sierra Leone merchants`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-balance">{category.name_en}</h1>
            <p className="text-muted-foreground">{category.name_krio}</p>
          </div>
        </div>
      </div>

      <SearchBar />

      <div className="mt-8">
        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ProductGrid categoryId={category.id} />
        </Suspense>
      </div>
    </div>
  )
}
