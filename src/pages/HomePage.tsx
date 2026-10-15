import { useState } from "react";
import { Clock, Pizza, Star } from "lucide-react";
import { Catalog } from "@/components/Catalog";
import { CartSidebar } from "@/components/CartSidebar";
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/mockData";
import heroPizza from "@/assets/pizza-margherita.jpg";

export function HomePage() {
  const { addItem, totalCount, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={totalCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <section className="border-b border-border bg-gradient-to-br from-muted via-background to-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Горячая пицца{" "}
              <span className="text-primary">по-казански</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Свежая выпечка, сочные начинки и напитки к столу. Соберите заказ —
              доставим быстро.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-primary" />
                Доставка 40–60 минут
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={16} className="text-primary" />
                4.8 из 5 · более 200 отзывов
              </span>
            </div>
          </div>
          <div className="justify-self-center md:justify-self-end">
            <img
              src={heroPizza}
              alt="Пицца Маргарита"
              width={800}
              height={600}
              className="h-56 w-auto rounded-2xl border border-border object-cover shadow-xl md:h-72"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-foreground">Меню</h2>
          {totalCount > 0 && (
            <p className="text-sm text-muted-foreground">
              В корзине: {totalCount} шт. на {totalPrice} ₽
            </p>
          )}
        </div>
        <Catalog onAddToCart={handleAddToCart} />
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center">
          <span className="flex items-center gap-2 text-lg font-bold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Pizza size={16} />
            </span>
            Пицца Казань
          </span>
          <p className="text-sm text-muted-foreground">
            Казань, ул. Баумана, 1 · ежедневно с 10:00 до 23:00
          </p>
        </div>
      </footer>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
