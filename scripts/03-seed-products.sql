-- Seed sample products (using merchant_id as NULL for demo)
INSERT INTO products (name_en, name_krio, description_en, description_krio, price, category_id, image_url, stock_quantity, is_featured, district) 
SELECT 
  'Fresh Cassava Leaves',
  'Frɛsh Kasada Lif',
  'Fresh cassava leaves from local farms, perfect for making plasas',
  'Frɛsh kasada lif frɔm lokal fam, fayn fɔ mek plasas',
  15000,
  id,
  '/placeholder.svg?height=400&width=400',
  100,
  true,
  'Western Area'
FROM categories WHERE slug = 'food-groceries'
UNION ALL
SELECT 
  'Traditional Gara Tie-Dye Fabric',
  'Tradishɔnal Gara Klɔt',
  'Authentic Sierra Leonean gara fabric with beautiful patterns',
  'Rial Salone gara klɔt wit fayn fayn patan dɛm',
  80000,
  id,
  '/placeholder.svg?height=400&width=400',
  25,
  true,
  'Bo'
FROM categories WHERE slug = 'fashion-clothing'
UNION ALL
SELECT 
  'Handwoven Palm Basket',
  'Basket we Dɛn Wiv wit Palm',
  'Beautiful handwoven basket made by local artisans',
  'Fayn basket we lokal pipul dɛm wiv wit dɛn an',
  35000,
  id,
  '/placeholder.svg?height=400&width=400',
  15,
  true,
  'Kenema'
FROM categories WHERE slug = 'handicrafts'
UNION ALL
SELECT 
  'Palm Oil (Pure & Organic)',
  'Palm Ɔyl (Klin ɛn Ɔganik)',
  'Locally processed pure red palm oil',
  'Lokal palm ɔyl we dɛn prosɛs klin',
  25000,
  id,
  '/placeholder.svg?height=400&width=400',
  50,
  false,
  'Moyamba'
FROM categories WHERE slug = 'food-groceries'
UNION ALL
SELECT 
  'African Print Dress',
  'Afrika Print Drɛs',
  'Stylish African print dress, made in Salone',
  'Fayn Afrika print drɛs, dɛn mek am na Salone',
  120000,
  id,
  '/placeholder.svg?height=400&width=400',
  20,
  true,
  'Freetown'
FROM categories WHERE slug = 'fashion-clothing'
UNION ALL
SELECT 
  'Shea Butter (Natural)',
  'Shea Bɔta (Nachral)',
  '100% natural shea butter for skin and hair',
  '100% nachral shea bɔta fɔ skin ɛn yɛ',
  30000,
  id,
  '/placeholder.svg?height=400&width=400',
  40,
  false,
  'Kailahun'
FROM categories WHERE slug = 'beauty-personal-care'
ON CONFLICT DO NOTHING;
