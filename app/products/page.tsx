import { Suspense } from "react"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"

export const metadata = {
  title: "All Products - Salone Makit",
  description: "Browse all products from Sierra Leone merchants across all districts",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-balance">All Products</h1>
        <p className="text-muted-foreground text-pretty">
          Discover amazing products from merchants across Sierra Leone
        </p>
      </div>

      <SearchBar />

      <div className="grid lg:grid-cols-4 gap-6 mt-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
