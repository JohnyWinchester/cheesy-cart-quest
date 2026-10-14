-- 1. Создание таблицы товаров (Products)
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL CHECK (category IN ('pizza', 'drink')),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Создание таблицы заказов (Orders)
-- Для MVP мы храним состав заказа в формате JSONB, чтобы избежать сложных JOIN-ов
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL, -- Массив объектов: [{id, name, price, quantity}]
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Включение Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 4. Политики доступа (RLS Policies)
-- Товары: читать могут все (включая неавторизованных), изменять только аутентифицированные (или админ)
CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT USING (true);

-- Заказы: создавать могут все (гостевой чекаут для MVP), читать только авторизованные пользователи
CREATE POLICY "Allow public to insert orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read orders" ON orders
    FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Добавление тестовых данных (Mock Data)
INSERT INTO products (name, description, price, category, image_url) VALUES
('Пепперони', 'Классическая пицца с пикантной пепперони и моцареллой', 550, 'pizza', 'https://placehold.co/400x300?text=Pepperoni'),
('Маргарита', 'Томатный соус, свежая моцарелла и базилик', 450, 'pizza', 'https://placehold.co/400x300?text=Margarita'),
('Четыре сыра', 'Моцарелла, пармезан, горгонзола и чеддер', 650, 'pizza', 'https://placehold.co/400x300?text=4+Cheese'),
('Кола 0.5л', 'Освежающий газированный напиток', 150, 'drink', 'https://placehold.co/400x300?text=Cola'),
('Морс клюквенный', 'Домашний ягодный морс, 0.5л', 120, 'drink', 'https://placehold.co/400x300?text=Mors'),
('Вода без газа', 'Чистая питьевая вода, 0.5л', 80, 'drink', 'https://placehold.co/400x300?text=Water');