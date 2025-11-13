"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockCategories } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

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

export function ProductForm() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name_en: "",
    name_krio: "",
    description_en: "",
    description_krio: "",
    category_id: "",
    price: "",
    stock_quantity: "",
    district: "",
    is_featured: false,
    is_active: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !formData.name_en ||
      !formData.category_id ||
      !formData.price ||
      !formData.stock_quantity ||
      !formData.district
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simulate product creation
    toast({
      title: "Product Added!",
      description: "Your product has been listed successfully",
    })

    router.push("/merchant/products")
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* English Name */}
          <div>
            <Label htmlFor="name_en">Product Name (English) *</Label>
            <Input
              id="name_en"
              value={formData.name_en}
              onChange={(e) => handleChange("name_en", e.target.value)}
              placeholder="e.g., Fresh Cassava Leaves"
              required
            />
          </div>

          {/* Krio Name */}
          <div>
            <Label htmlFor="name_krio">Product Name (Krio)</Label>
            <Input
              id="name_krio"
              value={formData.name_krio}
              onChange={(e) => handleChange("name_krio", e.target.value)}
              placeholder="e.g., Frɛsh Kasada Lif"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category_id} onValueChange={(value) => handleChange("category_id", value)} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name_en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* English Description */}
          <div>
            <Label htmlFor="description_en">Description (English)</Label>
            <Textarea
              id="description_en"
              value={formData.description_en}
              onChange={(e) => handleChange("description_en", e.target.value)}
              placeholder="Describe your product in detail..."
              rows={4}
            />
          </div>

          {/* Krio Description */}
          <div>
            <Label htmlFor="description_krio">Description (Krio)</Label>
            <Textarea
              id="description_krio"
              value={formData.description_krio}
              onChange={(e) => handleChange("description_krio", e.target.value)}
              placeholder="Diskrayb yu product pan Krio..."
              rows={3}
            />
          </div>

          {/* Price and Stock */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (SLL) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="e.g., 25000"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock_quantity">Stock Quantity *</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => handleChange("stock_quantity", e.target.value)}
                placeholder="e.g., 50"
                required
              />
            </div>
          </div>

          {/* District */}
          <div>
            <Label htmlFor="district">District *</Label>
            <Select value={formData.district} onValueChange={(value) => handleChange("district", value)} required>
              <SelectTrigger id="district">
                <SelectValue placeholder="Select your district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleChange("is_featured", checked as boolean)}
              />
              <Label htmlFor="is_featured" className="cursor-pointer">
                Feature this product on homepage
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleChange("is_active", checked as boolean)}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Make product active (visible to buyers)
              </Label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" size="lg" className="flex-1">
              Add Product
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
