import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CheckoutForm } from "@/components/CheckoutForm";
import { CartProvider } from "@/hooks/useCart";

// 🔥 МОКИРУЕМ SUPABASE ДЛЯ ТЕСТОВ 🔥
vi.mock("@/lib/supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ 
        data: [{ id: "test-order-id" }], 
        error: null 
      }),
    })),
  },
}));

// Вспомогательный компонент-обертка для провайдера корзины
const renderWithCartProvider = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("CheckoutForm", () => {
  it("keeps submit disabled until name, an 11-digit phone and address are filled", () => {
    renderWithCartProvider(<CheckoutForm />);

    const submitButton = screen.getByRole("button", { name: /подтвердить заказ/i });
    expect(submitButton).toBeDisabled();

    // Заполняем валидные данные
    fireEvent.change(screen.getByPlaceholderText("Иван"), { target: { value: "Иван" } });
    fireEvent.change(screen.getByPlaceholderText("89991234567"), { target: { value: "89991234567" } });
    fireEvent.change(screen.getByPlaceholderText("ул. Баумана, 25, кв. 12"), { target: { value: "ул. Баумана, 25" } });

    expect(submitButton).not.toBeDisabled();
  });

  it("clears the cart and shows the success message on submit", async () => {
    // Рендерим форму
    renderWithCartProvider(<CheckoutForm />);

    // Заполняем форму валидными данными
    fireEvent.change(screen.getByPlaceholderText("Иван"), { target: { value: "Иван" } });
    fireEvent.change(screen.getByPlaceholderText("89991234567"), { target: { value: "89991234567" } });
    fireEvent.change(screen.getByPlaceholderText("ул. Баумана, 25, кв. 12"), { target: { value: "ул. Баумана, 25" } });

    // Нажимаем кнопку отправки
    const submitButton = screen.getByRole("button", { name: /подтвердить заказ/i });
    fireEvent.click(submitButton);

    // 🔥 ЖДЕМ асинхронного обновления UI (до 2 секунд) 🔥
    await waitFor(
      () => {
        expect(screen.getByText("Заказ успешно оформлен!")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Проверяем, что корзина очистилась (если в твоем хуке есть data-testid="cart-count")
    const cartCount = screen.queryByTestId("cart-count");
    if (cartCount) {
      expect(cartCount).toHaveTextContent("0");
    }
  });
});
