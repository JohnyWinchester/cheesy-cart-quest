import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { products, type Product } from "@/data/mockData";

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-card-foreground">
                    {product.name}
                  </h2>
                  <span className="text-sm font-medium text-muted-foreground">
                    {product.category === "pizza" ? "Пицца" : "Напиток"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-card-foreground">
                    {product.price} ₽
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
