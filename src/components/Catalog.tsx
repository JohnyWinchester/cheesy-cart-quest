import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  products,
  type Product,
  type ProductCategory,
} from "@/data/mockData";

type CatalogFilter = "all" | ProductCategory;

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

const TABS: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "pizza", label: "Пицца" },
  { id: "drink", label: "Напитки" },
];

export function Catalog({ onAddToCart }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<CatalogFilter>("all");

  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Категории товаров"
        className="flex flex-wrap gap-2"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeCategory;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(tab.id)}
              className={
                isActive
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
                  : "rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
