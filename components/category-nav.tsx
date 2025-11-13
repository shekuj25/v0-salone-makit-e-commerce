"use client"

import type React from "react"

import Link from "next/link"
import { mockCategories } from "@/lib/mock-data"

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

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted transition-all duration-300 group border border-transparent hover:border-current hover:shadow-lg"
              style={{ "--hover-color": color } as React.CSSProperties}
            >
              <div className="relative">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300 inline-block">
                  {category.icon}
                </span>
                <div
                  className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: color }}
                ></div>
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
