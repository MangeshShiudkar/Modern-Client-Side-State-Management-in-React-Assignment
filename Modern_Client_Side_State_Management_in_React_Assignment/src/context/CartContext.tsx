import { useReducer, type ReactNode } from 'react'
import { CartDispatchContext, CartStateContext, type CartAction, type CartState } from './cartContexts'

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'added': {
      const existingItem = state.items.find((item) => item.id === action.product.id)
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }
      return { items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'removed':
      return { items: state.items.filter((item) => item.id !== action.id) }
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}