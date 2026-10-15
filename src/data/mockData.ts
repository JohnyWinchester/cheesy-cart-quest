import margherita from "@/assets/pizza-margherita.jpg";
import pepperoni from "@/assets/pizza-pepperoni.jpg";
import quattroFormaggi from "@/assets/pizza-quattro.jpg";
import cola from "@/assets/drink-cola.jpg";
import orangeJuice from "@/assets/drink-juice.jpg";
import mineralWater from "@/assets/drink-water.jpg";

export type ProductCategory = "pizza" | "drink";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Маргарита",
    price: 449,
    category: "pizza",
    image: margherita,
    description: "Томаты, моцарелла, свежий базилик",
  },
  {
    id: 2,
    name: "Пепперони",
    price: 549,
    category: "pizza",
    image: pepperoni,
    description: "Острая пепперони, сыр моцарелла",
  },
  {
    id: 3,
    name: "Четыре сыра",
    price: 599,
    category: "pizza",
    image: quattroFormaggi,
    description: "Моцарелла, дорблю, пармезан, чеддер",
  },
  {
    id: 4,
    name: "Кока-Кола 0.5л",
    price: 129,
    category: "drink",
    image: cola,
    description: "Классическая кола со льдом",
  },
  {
    id: 5,
    name: "Апельсиновый сок",
    price: 149,
    category: "drink",
    image: orangeJuice,
    description: "Свежевыжатый сок апельсина",
  },
  {
    id: 6,
    name: "Минеральная вода",
    price: 99,
    category: "drink",
    image: mineralWater,
    description: "Прохладная вода со льдом",
  },
];
