// src/__tests__/cart.test.js
import { describe, it, expect } from 'vitest';

// Имитация логики хука useCart для тестирования
const calculateCart = (items, action) => {
  if (action.type === 'ADD') {
    const existing = items.find(i => i.id === action.payload.id);
    if (existing) {
      return items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i);
    }
    return [...items, { ...action.payload, quantity: 1 }];
  }
  if (action.type === 'UPDATE_QUANTITY') {
    if (action.payload.quantity <= 0) {
      return items.filter(i => i.id !== action.payload.id);
    }
    return items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
  }
  return items;
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

describe('Логика корзины (Cart Logic)', () => {
  const initialItems = [];
  const mockProduct = { id: '1', name: 'Пепперони', price: 550, category: 'pizza' };

  it('1. Должен добавлять новый товар в пустую корзину', () => {
    const result = calculateCart(initialItems, { type: 'ADD', payload: mockProduct });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(1);
  });

  it('2. Должен увеличивать количество существующего товара', () => {
    const itemsWithProduct = [{ ...mockProduct, quantity: 1 }];
    const result = calculateCart(itemsWithProduct, { type: 'UPDATE_QUANTITY', payload: { id: '1', quantity: 2 } });
    expect(result[0].quantity).toBe(2);
  });

  it('3. Должен удалять товар при уменьшении количества до 0', () => {
    const itemsWithProduct = [{ ...mockProduct, quantity: 1 }];
    const result = calculateCart(itemsWithProduct, { type: 'UPDATE_QUANTITY', payload: { id: '1', quantity: 0 } });
    expect(result).toHaveLength(0);
  });

  it('4. Должен корректно считать итоговую сумму', () => {
    const items = [
      { id: '1', name: 'Пепперони', price: 550, quantity: 2 },
      { id: '2', name: 'Кола', price: 150, quantity: 3 }
    ];
    const total = calculateTotal(items);
    expect(total).toBe(1550); // (550*2) + (150*3)
  });
});
