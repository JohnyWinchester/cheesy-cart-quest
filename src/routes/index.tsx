import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Пицца Казань — доставка пиццы и напитков" },
      {
        name: "description",
        content:
          "Пицца Казань: свежая пицца и напитки с доставкой. Выберите любимую пиццу и добавьте в корзину.",
      },
      { property: "og:title", content: "Пицца Казань — доставка пиццы и напитков" },
      {
        property: "og:description",
        content:
          "Пицца Казань: свежая пицца и напитки с доставкой. Выберите любимую пиццу и добавьте в корзину.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});
