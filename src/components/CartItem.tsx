import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemData } from "@/hooks/useCart";

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <li className="flex items-center gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0">
      <img
        src={product.image}
        alt={product.name}
        className="h-14 w-14 shrink-0 rounded-md object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-medium text-card-foreground">
          {product.name}
        </span>
        <span className="text-sm text-muted-foreground">{product.price} ₽</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Уменьшить количество: ${product.name}`}
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-accent"
        >
          <Minus size={14} />
        </button>
        <span className="min-w-6 text-center text-sm font-semibold text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Увеличить количество: ${product.name}`}
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-accent"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        type="button"
        aria-label={`Удалить из корзины: ${product.name}`}
        onClick={() => onRemove(product.id)}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}
