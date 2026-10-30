import { atom } from 'jotai'
import type { CartItem, CheckoutResult, Product } from '../types'

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error'

export const cartItemsAtom = atom<CartItem[]>([])

export const cartItemCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((count, item) => count + item.qty, 0),
)

export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((total, item) => total + item.price * item.qty, 0),
)

export const cartIsEmptyAtom = atom((get) => get(cartItemsAtom).length === 0)
export const checkoutMessageAtom = atom<string | null>(null)
export const checkoutStatusAtom = atom<CheckoutStatus>('idle')

export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom)
  const existingItem = items.find((item) => item.id === product.id)

  set(checkoutMessageAtom, null)
  set(checkoutStatusAtom, 'idle')
  set(
    cartItemsAtom,
    existingItem
      ? items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      : [...items, { ...product, qty: 1 }],
  )
})

export const removeItemAtom = atom(null, (get, set, id: string) => {
  set(checkoutMessageAtom, null)
  set(checkoutStatusAtom, 'idle')
  set(cartItemsAtom, get(cartItemsAtom).filter((item) => item.id !== id))
})

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, [])
  set(checkoutMessageAtom, null)
  set(checkoutStatusAtom, 'idle')
})

export const checkoutAtom = atom(null, async (get, set) => {
  const items = get(cartItemsAtom)

  if (items.length === 0 || get(checkoutStatusAtom) === 'submitting') {
    return
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  set(checkoutStatusAtom, 'submitting')
  set(checkoutMessageAtom, null)

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
    set(cartItemsAtom, [])
    set(checkoutStatusAtom, 'success')
    set(checkoutMessageAtom, `Order placed successfully. Order #${order.id}.`)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to complete checkout. Please try again.'
    set(checkoutStatusAtom, 'error')
    set(checkoutMessageAtom, message)
  }
})