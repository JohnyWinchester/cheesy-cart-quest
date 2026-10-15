import { Pizza, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Pizza size={20} />
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Пицца Казань
          </span>
        </div>
        <button
          type="button"
          aria-label="Корзина"
          onClick={onCartClick}
          className="relative rounded-xl p-2 text-foreground transition-colors hover:bg-accent"
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
