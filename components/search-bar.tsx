"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log("[v0] Search query:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for products, categories, or merchants..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 h-12 text-base"
      />
    </form>
  )
}
