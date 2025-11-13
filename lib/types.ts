export interface Category {
  id: string
  name_en: string
  name_krio: string
  slug: string
  icon: string
  display_order: number
}

export interface Product {
  id: string
  merchant_id?: string
  category_id: string
  name_en: string
  name_krio: string
  description_en: string
  description_krio?: string
  price: number
  currency: string
  image_url: string
  images?: string[]
  stock_quantity: number
  is_active: boolean
  is_featured: boolean
  district: string
  views_count: number
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: "buyer" | "merchant" | "admin"
  district?: string
  language_preference: "en" | "krio"
}

export interface Order {
  id: string
  user_id?: string
  order_number: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  currency: string
  payment_method: string
  payment_status: "pending" | "completed" | "failed"
  delivery_district: string
  delivery_address: string
  delivery_phone: string
  delivery_name: string
  notes?: string
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}
