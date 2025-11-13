import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { MapPin } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl hover:border-[#0072CE]/30 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name_en}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.is_featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#F0B429] to-[#ffd54f] text-black border-0 shadow-lg font-semibold">
              ⭐ Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-base line-clamp-2 mb-2 text-pretty group-hover:text-[#0072CE] transition-colors">
            {product.name_en}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-[#1EB53A]" />
            <span>{product.district}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t bg-muted/30">
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-bold bg-gradient-to-r from-[#0072CE] to-[#1EB53A] bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </p>
            {product.stock_quantity < 10 && product.stock_quantity > 0 && (
              <Badge variant="outline" className="text-xs border-[#F0B429] text-[#F0B429]">
                {product.stock_quantity} left
              </Badge>
            )}
            {product.stock_quantity === 0 && (
              <Badge variant="destructive" className="text-xs">
                Out of stock
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
