-- Add email field to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_email VARCHAR(255);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for products (public read, merchants can manage their own)
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true OR auth.uid() = merchant_id);

CREATE POLICY "Merchants can insert their own products" ON products
  FOR INSERT WITH CHECK (auth.uid() = merchant_id);

CREATE POLICY "Merchants can update their own products" ON products
  FOR UPDATE USING (auth.uid() = merchant_id);

CREATE POLICY "Merchants can delete their own products" ON products
  FOR DELETE USING (auth.uid() = merchant_id);

-- RLS Policies for orders (users can manage their own)
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "Users can view their order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- RLS Policies for cart_items
CREATE POLICY "Users can view their cart" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
