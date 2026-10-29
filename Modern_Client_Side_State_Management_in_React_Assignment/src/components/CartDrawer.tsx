import { useState } from 'react'
import { useCartState } from '../context/useCart'
import CartItemsList from './CartItemsList'

function CartDrawer() {
  const { items } = useCartState()
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <aside className="h-fit border-t-2 border-emerald-800 bg-white p-5 lg:border-t-0 lg:border-l-2 lg:border-l-emerald-800">
      <h2 className="text-xl font-bold">Your cart</h2>
      <CartItemsList />
      {items.length > 0 && (
        <p className="mt-5 flex justify-between border-t border-stone-200 pt-4 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      )}
      <button
        className="mt-5 w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        disabled={items.length === 0}
        onClick={() => setShowCheckoutMessage(true)}
        type="button"
      >
        Continue to checkout
      </button>
      {showCheckoutMessage && (
        <p className="mt-3 text-sm text-stone-600" role="status">
          Checkout will be available in the next step.
        </p>
      )}
    </aside>
  )
}

export default CartDrawer