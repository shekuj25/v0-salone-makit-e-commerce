"use client"

import type React from "react"
import Link from "next/link"
import { mockCategories } from "@/lib/mock-data"
import Image from "next/image"

// Category images using placeholder service with specific queries
const categoryImages = {
  "food-groceries": "/fresh-groceries-rice-palm-oil.jpg",
  "fashion-clothing": "/african-fashion-clothing-dress.jpg",
  handicrafts: "/african-handicrafts-art.jpg",
  electronics: "/mobile-phone-electronics.jpg",
  "beauty-personal-care": "/beauty-cosmetics-skincare.jpg",
  "home-garden": "/home-garden-furniture.jpg",
  "books-education": "/books-education-learning.jpg",
  "sports-outdoors": "/sports-equipment-football.jpg",
  "toys-kids": "/toys-kids-games.jpg",
  "health-wellness": "/health-wellness-medicine.jpg",
}

export function CategoryNav() {
  return (
    <div className="bg-card rounded-xl border-2 border-transparent bg-gradient-to-r from-[#0072CE]/10 via-white to-[#1EB53A]/10 p-6 shadow-sm">
      <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <span className="h-1 w-8 bg-gradient-to-r from-[#0072CE] to-[#1EB53A] rounded-full"></span>
        Shop by Category
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {mockCategories.map((category, index) => {
          const colors = ["#0072CE", "#1EB53A", "#F0B429", "#0072CE", "#1EB53A"]
          const color = colors[index % colors.length]
          const imageUrl =
            categoryImages[category.slug as keyof typeof categoryImages] || "/placeholder.svg?height=100&width=100"

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted transition-all duration-300 group border border-transparent hover:border-current hover:shadow-lg"
              style={{ "--hover-color": color } as React.CSSProperties}
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={category.name_en}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-center leading-tight group-hover:text-[var(--hover-color)] transition-colors">
                {category.name_en}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
