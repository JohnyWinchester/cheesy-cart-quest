import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { CartItem } from "@/components/CartItem";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/hooks/useCart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, totalPrice, totalCount } =
    useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleClose = () => {
    setIsCheckoutOpen(false);
    onClose();
  };

  const handleCheckout = () => {
    console.log("Checkout");
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={
          isOpen
            ? "fixed inset-0 z-40 bg-black/40 transition-opacity"
            : "pointer-events-none fixed inset-0 z-40 bg-black/40 opacity-0 transition-opacity"
        }
      />

      <aside
        aria-label="Корзина"
        className={
          isOpen
            ? "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm translate-x-0 flex-col border-l border-border bg-card shadow-xl transition-transform duration-300"
            : "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm translate-x-full flex-col border-l border-border bg-card shadow-xl transition-transform duration-300"
        }
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            {isCheckoutOpen ? "Оформление заказа" : "Корзина"}
            {!isCheckoutOpen && totalCount > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({totalCount})
              </span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Закрыть корзину"
            onClick={handleClose}
            className="rounded-md p-2 text-foreground transition-colors hover:bg-accent"
          >
            <X size={20} />
          </button>
        </div>

        {isCheckoutOpen ? (
          <CheckoutForm onContinue={handleClose} />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="rounded-full bg-muted p-4 text-muted-foreground">
              <ShoppingCart size={28} />
            </span>
            <p className="text-base font-medium text-foreground">
              Корзина пуста
            </p>
            <p className="text-sm text-muted-foreground">
              Добавьте пиццу или напиток из меню — и они появятся здесь.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>

            <div className="border-t border-border px-4 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Итого</span>
                <span className="text-xl font-bold text-card-foreground">
                  {totalPrice} ₽
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
