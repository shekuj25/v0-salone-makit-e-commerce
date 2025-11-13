-- Seed categories with English and Krio names
INSERT INTO categories (name_en, name_krio, slug, icon, display_order) VALUES
('Food & Groceries', 'Chɔp ɛn Tins fɔ It', 'food-groceries', '🍚', 1),
('Fashion & Clothing', 'Klos ɛn Fashɔn', 'fashion-clothing', '👕', 2),
('Handicrafts', 'We Dɛn Mek wit An', 'handicrafts', '🎨', 3),
('Electronics', 'Ilɛktrik Tins', 'electronics', '📱', 4),
('Beauty & Personal Care', 'Byuti ɛn Bɔdi Tin', 'beauty-personal-care', '💄', 5),
('Home & Garden', 'Os ɛn Gadin', 'home-garden', '🏠', 6),
('Books & Education', 'Buk ɛn Ɛdyukeshɔn', 'books-education', '📚', 7),
('Sports & Outdoors', 'Spɔt ɛn Awtsay', 'sports-outdoors', '⚽', 8),
('Toys & Kids', 'Pikin Tins', 'toys-kids', '🧸', 9),
('Health & Wellness', 'Wɛlbɔdi', 'health-wellness', '💊', 10)
ON CONFLICT (slug) DO NOTHING;
