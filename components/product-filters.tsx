"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { mockCategories } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

const districts = [
  "Western Area",
  "Bo",
  "Kenema",
  "Makeni",
  "Freetown",
  "Kailahun",
  "Moyamba",
  "Bonthe",
  "Port Loko",
  "Kono",
]

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200000])

  return (
    <div className="space-y-4">
      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockCategories.slice(0, 6).map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`cat-${category.id}`} />
              <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal cursor-pointer flex-1">
                {category.icon} {category.name_en}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={200000} step={5000} className="w-full" />
          <div className="flex items-center justify-between text-sm">
            <span>Le {priceRange[0].toLocaleString()}</span>
            <span>Le {priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* District Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">District</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {districts.slice(0, 5).map((district) => (
            <div key={district} className="flex items-center space-x-2">
              <Checkbox id={`dist-${district}`} />
              <Label htmlFor={`dist-${district}`} className="text-sm font-normal cursor-pointer">
                {district}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full" size="lg">
        Apply Filters
      </Button>
    </div>
  )
}
