import type { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const CATEGORY_LABELS: Record<Product["category"], string> = {
  pizza: "Пицца",
  drink: "Напиток",
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-card-foreground">{product.name}</h2>
          <span className="text-sm text-muted-foreground">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-card-foreground">
            {product.price} ₽
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
