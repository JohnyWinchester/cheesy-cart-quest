import { Catalog } from "@/components/Catalog";
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/mockData";

export function HomePage() {
  const { addItem, totalCount, totalPrice } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalCount} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-foreground">Меню</h1>
          {totalCount > 0 && (
            <p className="text-sm text-muted-foreground">
              В корзине: {totalCount} шт. на {totalPrice} ₽
            </p>
          )}
        </div>
        <Catalog onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}
