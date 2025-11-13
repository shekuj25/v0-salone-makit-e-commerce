import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { CategoryNav } from "@/components/category-nav"
import { HeroSection } from "@/components/hero-section"
import { SearchBar } from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="container mx-auto px-4 py-6 space-y-8">
        <SearchBar />

        <CategoryNav />

        <section>
          <h2 className="text-2xl font-bold mb-4 text-balance">Featured Products</h2>
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductGrid featured={true} />
          </Suspense>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-balance">All Products</h2>
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
