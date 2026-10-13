import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CheckoutForm } from "@/components/CheckoutForm";
import { products } from "@/data/mockData";
import { CartProvider, useCart } from "@/hooks/useCart";

const [testProduct] = products;

function CartSummary() {
  const { totalCount } = useCart();

  return <p data-testid="cart-count">{totalCount}</p>;
}

function AddTestProduct() {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        if (testProduct) {
          addItem(testProduct);
        }
      }}
    >
      add test product
    </button>
  );
}

function renderCheckout() {
  return render(
    <CartProvider>
      <AddTestProduct />
      <CartSummary />
      <CheckoutForm />
    </CartProvider>,
  );
}

function fillField(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

describe("CheckoutForm", () => {
  it("keeps submit disabled until name, an 11-digit phone and address are filled", () => {
    renderCheckout();

    const submit = screen.getByRole("button", { name: "Подтвердить заказ" });
    expect(submit).toBeDisabled();

    fillField("Имя", "Иван");
    fillField("Адрес", "ул. Баумана, 25");
    fillField("Телефон", "8999123456");
    expect(submit).toBeDisabled();

    fillField("Телефон", "89991234567");
    expect(submit).toBeEnabled();
  });

  it("clears the cart and shows the success message on submit", () => {
    renderCheckout();

    fireEvent.click(screen.getByRole("button", { name: "add test product" }));
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");

    fillField("Имя", "Иван");
    fillField("Телефон", "89991234567");
    fillField("Адрес", "ул. Баумана, 25");

    fireEvent.click(screen.getByRole("button", { name: "Подтвердить заказ" }));

    expect(screen.getByText("Заказ успешно оформлен!")).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });
});
