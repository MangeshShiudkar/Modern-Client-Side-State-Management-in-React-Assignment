import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }

      return { items: [...state.items, { ...product, qty: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id)

      if (items.length === state.items.length) {
        return state
      }

      return { items }
    }),
  clear: () => set({ items: [] }),
}))

export const selectCartItemCount = (state: CartStore) =>
  state.items.reduce((count, item) => count + item.qty, 0)

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((total, item) => total + item.price * item.qty, 0)

export const selectCartIsEmpty = (state: CartStore) => state.items.length === 0