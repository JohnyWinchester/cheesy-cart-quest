# Документация Backend и интеграции (ДЗ5)

**Проект:** MVP "Пицца Казань"  
**Backend-решение:** Supabase (PostgreSQL, BaaS)  
**Дата:** 14.10.2026

## 1. Описание архитектуры

Для реализации backend-части MVP был выбран сервис **Supabase** (Backend-as-a-Service).

**Причины выбора:**
- Готовая управляемая база данных PostgreSQL
- Автоматическая генерация RESTful API на основе схемы БД
- Встроенная система аутентификации и Row Level Security (RLS)
- Щедрый бесплатный тариф (Free Tier), идеально подходящий для студенческого MVP

**Схема данных:**
1. `products`: Справочник товаров (id, name, price, category, image_url)
2. `orders`: Заказы клиентов (id, customer_name, customer_phone, delivery_address, items [JSONB], total_amount, status)

Использование JSONB для поля `items` оптимизировано для MVP, чтобы избежать избыточных JOIN-операций при чтении истории заказов.

## 2. Инструкции по развертыванию

### 2.1. Создание проекта в Supabase

1. Зарегистрироваться на [supabase.com](https://supabase.com)
2. Создать новый проект с названием `pizza-kazan-mvp`
3. Выбрать регион (рекомендуется Frankfurt или Warsaw для России)
4. Сохранить пароль от базы данных

### 2.2. Создание таблиц и настройка RLS

Выполнить следующий SQL-скрипт в **SQL Editor**:

```sql
-- Создание таблицы товаров
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL CHECK (category IN ('pizza', 'drink')),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы заказов
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL,
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Политики доступа
CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow public to insert orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read orders" ON orders
    FOR SELECT USING (auth.role() = 'authenticated');

-- Добавление тестовых данных
INSERT INTO products (name, description, price, category, image_url) VALUES
('Пепперони', 'Классическая пицца с пикантной пепперони', 550, 'pizza', 'https://placehold.co/400x300?text=Pepperoni'),
('Маргарита', 'Томатный соус, моцарелла и базилик', 450, 'pizza', 'https://placehold.co/400x300?text=Margarita'),
('Четыре сыра', 'Моцарелла, пармезан, горгонзола и чеддер', 650, 'pizza', 'https://placehold.co/400x300?text=4+Cheese'),
('Кола 0.5л', 'Освежающий газированный напиток', 150, 'drink', 'https://placehold.co/400x300?text=Cola'),
('Морс клюквенный', 'Домашний ягодный морс, 0.5л', 120, 'drink', 'https://placehold.co/400x300?text=Mors'),
('Вода без газа', 'Чистая питьевая вода, 0.5л', 80, 'drink', 'https://placehold.co/400x300?text=Water');