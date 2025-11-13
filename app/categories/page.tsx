import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { mockCategories } from "@/lib/mock-data"

export const metadata = {
  title: "All Categories - Salone Makit",
  description: "Browse all product categories on Salone Makit",
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-balance">All Categories</h1>
        <p className="text-muted-foreground text-pretty">Browse products by category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mockCategories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <span className="text-5xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-balance">{category.name_en}</h3>
                  <p className="text-xs text-muted-foreground">{category.name_krio}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
