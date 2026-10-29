import { createContext, type Dispatch } from 'react'
import type { CartItem, Product } from '../types'

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'added'; product: Product }
  | { type: 'removed'; id: string }

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)