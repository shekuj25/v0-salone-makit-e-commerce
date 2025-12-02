-- Drop existing conflicting policies
DROP POLICY IF NOT EXISTS "Users can create orders" ON orders;

-- Update RLS Policies for orders to allow authenticated users to insert
CREATE POLICY "Authenticated users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow service role to read all orders for admin dashboard
CREATE POLICY "Service role can read all orders" ON orders
  FOR SELECT USING (auth.role() = 'service_role' OR auth.uid() = user_id);

-- Allow admins to view all orders
ALTER POLICY "Service role can read all orders" ON orders
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create policy for admins to update order status
CREATE POLICY "Admins can update order status" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Update product policies to allow service role for admin
CREATE POLICY "Admin can view all products" ON products
  FOR SELECT USING (
    is_active = true OR 
    auth.uid() = merchant_id OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Allow admins to manage all products
CREATE POLICY "Admin can manage all products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Allow service role for order items
CREATE POLICY "Service role can read all order items" ON order_items
  FOR SELECT USING (
    auth.role() = 'service_role' OR
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM users 
             WHERE users.id = auth.uid() 
             AND users.role = 'admin'
           )
          )
    )
  );
