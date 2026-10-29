import { create } from 'zustand'
import type { CartItem, CheckoutResult, Product } from '../types'

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error'

interface CartStore {
  items: CartItem[]
  checkoutStatus: CheckoutStatus
  checkoutError: string | null
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  checkout: () => Promise<CheckoutResult>
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  checkoutStatus: 'idle',
  checkoutError: null,
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
          checkoutStatus: state.checkoutStatus === 'submitting' ? 'submitting' : 'idle',
          checkoutError: null,
        }
      }

      return {
        items: [...state.items, { ...product, qty: 1 }],
        checkoutStatus: state.checkoutStatus === 'submitting' ? 'submitting' : 'idle',
        checkoutError: null,
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id)

      if (items.length === state.items.length) {
        return state
      }

      return {
        items,
        checkoutStatus: state.checkoutStatus === 'submitting' ? 'submitting' : 'idle',
        checkoutError: null,
      }
    }),
  checkout: async () => {
    const { items } = get()

    if (items.length === 0) {
      const message = 'Add at least one item before checkout.'
      set({ checkoutStatus: 'error', checkoutError: message })
      throw new Error(message)
    }

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    set({ checkoutStatus: 'submitting', checkoutError: null })

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total }),
      })

      if (!response.ok) {
        throw new Error('Unable to complete checkout. Please try again.')
      }

      const order = (await response.json()) as CheckoutResult
      set({ items:[],checkoutStatus: 'success', checkoutError: null })
      return order
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to complete checkout. Please try again.'
      set({ checkoutStatus: 'error', checkoutError: message })
      throw error
    }
  },
}))

export const selectCartItemCount = (state: CartStore) =>
  state.items.reduce((count, item) => count + item.qty, 0)

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((total, item) => total + item.price * item.qty, 0)

export const selectCartIsEmpty = (state: CartStore) => state.items.length === 0