import { useState, type FormEvent } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { z } from "zod";
import { useCart } from "@/hooks/useCart";

const phoneDigitCount = (value: string) => value.replace(/\D/g, "").length;

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Введите имя" })
    .max(100, { message: "Имя — не длиннее 100 символов" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Телефон — не длиннее 20 символов" })
    .refine((value) => phoneDigitCount(value) >= 11, {
      message: "Телефон — минимум 11 цифр",
    }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Введите адрес" })
    .max(250, { message: "Адрес — не длиннее 250 символов" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const EMPTY_FORM: CheckoutFormValues = {
  name: "",
  phone: "",
  address: "",
};

const INPUT_CLASS =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

interface CheckoutFormProps {
  onContinue?: () => void;
}

export function CheckoutForm({ onContinue }: CheckoutFormProps) {
  const { clearCart, totalPrice } = useCart();
  const [values, setValues] = useState<CheckoutFormValues>(EMPTY_FORM);
  const [showErrors, setShowErrors] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const parsed = checkoutSchema.safeParse(values);
  const isValid = parsed.success;

  const fieldErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as keyof CheckoutFormValues] = issue.message;
      }
    }
  }

  const handleChange = (field: keyof CheckoutFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    if (!parsed.success) {
      return;
    }

    clearCart();
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="rounded-full bg-primary/10 p-4 text-primary">
          <CheckCircle2 size={28} />
        </span>
        <p className="text-base font-medium text-foreground">
          Заказ успешно оформлен!
        </p>
        <p className="text-sm text-muted-foreground">
          Мы перезвоним, чтобы подтвердить доставку.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Имя</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          maxLength={100}
          placeholder="Иван"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className={INPUT_CLASS}
        />
        {showErrors && fieldErrors.name && (
          <span className="text-xs text-destructive">{fieldErrors.name}</span>
        )}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Телефон</span>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder="89991234567"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className={INPUT_CLASS}
        />
        {showErrors && fieldErrors.phone && (
          <span className="text-xs text-destructive">{fieldErrors.phone}</span>
        )}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Адрес</span>
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          maxLength={250}
          placeholder="ул. Баумана, 25, кв. 12"
          value={values.address}
          onChange={(event) => handleChange("address", event.target.value)}
          className={INPUT_CLASS}
        />
        {showErrors && fieldErrors.address && (
          <span className="text-xs text-destructive">
            {fieldErrors.address}
          </span>
        )}
      </label>

      <div className="flex h-40 shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted px-4 text-center">
        <MapPin size={28} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Здесь будет Яндекс.Карта (Казань, 55.7887, 49.1221)
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Итого</span>
          <span className="text-lg font-bold text-foreground">
            {totalPrice} ₽
          </span>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Подтвердить заказ
        </button>
      </div>
    </form>
  );
}
