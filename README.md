# Cheesy Cart Quest

Ты — Senior React Developer. Твоя задача — инициализировать и создать базовую структуру MVP приложения "Пицца Казань".

СТЕК: React, Vite, Tailwind CSS, lucide-react (для иконок).

ПРАВИЛА (строго):

1. Только функциональные компоненты и хуки. Никаких классов.

2. Никаких инлайн-стилей (`style={{}}`). Только классы Tailwind CSS.

3. При создании или изменении файла выдавай ПОЛНЫЙ код файла, без сокращений вроде "// остальной код".

4. Код должен быть чистым, с понятными именами переменных (camelCase) и компонентов (PascalCase).

ЗАДАЧА:

1. Создай структуру папок: `src/components`, `src/hooks`, `src/data`, `src/pages`.

2. В `src/data/mockData.js` создай массив из 6 товаров (3 пиццы, 3 напитка) с полями: id, name, price, category ('pizza' | 'drink'), image (используй ссылки на placeholder, например, 'https://placehold.co/400x300?text=Pizza').

3. В `src/hooks/useCart.js` создай кастомный хук для управления корзиной. Он должен хранить массив товаров, функции addItem, removeItem, updateQuantity и вычисляемое свойство totalPrice (через useMemo). Добавь простую синхронизацию с localStorage.

4. Создай базовый компонент `Header` с логотипом "🍕 Пицца Казань" и иконкой корзины (из lucide-react), которая показывает общее количество товаров.

5. Создай компонент `App.jsx`, который рендерит Header и основной контейнер для контента.

Выполни задачу пошагово, создай все файлы и убедись, что проект компилируется без ошибок.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/96d373d7-78d7-57dd-a0c9-b2d87ba960ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
