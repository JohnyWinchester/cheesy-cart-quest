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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="font-semibold text-card-foreground">{product.name}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-lg font-bold text-card-foreground">
            {product.price} ₽
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
