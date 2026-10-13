import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <span className="text-xl font-bold text-foreground">
          🍕 Пицца Казань
        </span>
        <button
          type="button"
          aria-label="Корзина"
          className="relative rounded-md p-2 text-foreground transition-colors hover:bg-accent"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
