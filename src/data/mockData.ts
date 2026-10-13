export type ProductCategory = "pizza" | "drink";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Маргарита",
    price: 449,
    category: "pizza",
    image: "https://placehold.co/400x300?text=Margherita",
  },
  {
    id: 2,
    name: "Пепперони",
    price: 549,
    category: "pizza",
    image: "https://placehold.co/400x300?text=Pepperoni",
  },
  {
    id: 3,
    name: "Четыре сыра",
    price: 599,
    category: "pizza",
    image: "https://placehold.co/400x300?text=Quattro+Formaggi",
  },
  {
    id: 4,
    name: "Кока-Кола 0.5л",
    price: 129,
    category: "drink",
    image: "https://placehold.co/400x300?text=Cola",
  },
  {
    id: 5,
    name: "Апельсиновый сок",
    price: 149,
    category: "drink",
    image: "https://placehold.co/400x300?text=Juice",
  },
  {
    id: 6,
    name: "Минеральная вода",
    price: 99,
    category: "drink",
    image: "https://placehold.co/400x300?text=Water",
  },
];
