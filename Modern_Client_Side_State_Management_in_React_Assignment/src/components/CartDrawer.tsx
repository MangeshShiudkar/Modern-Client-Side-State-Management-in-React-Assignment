import { selectCartIsEmpty, selectCartTotal, useCartStore,} from '../stores/cartStore'
import CartItemsList from './CartItemsList'

function CartDrawer() {
  const total = useCartStore(selectCartTotal)
  const isCartEmpty = useCartStore(selectCartIsEmpty)
  const checkoutStatus = useCartStore((state) => state.checkoutStatus)
  const checkoutError = useCartStore((state) => state.checkoutError)
  const checkout = useCartStore((state) => state.checkout)

  function handleCheckout() {
    void checkout().catch(() => undefined)
  }

  return (
    <aside className="h-fit border-t-2 border-emerald-800 bg-white p-5 lg:border-t-0 lg:border-l-2 lg:border-l-emerald-800">
      <h2 className="text-xl font-bold">Your cart</h2>
      <CartItemsList />
      {!isCartEmpty && (
        <p className="mt-5 flex justify-between border-t border-stone-200 pt-4 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      )}
      <button
        className="mt-5 w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        disabled={isCartEmpty || checkoutStatus === 'submitting'}
        onClick={handleCheckout}
        type="button"
      >
        {checkoutStatus === 'submitting' ? 'Submitting order...' : 'Continue to checkout'}
      </button>
      {checkoutStatus === 'success' && (
        <p className="mt-3 text-sm text-emerald-800" role="status">
          Order placed successfully.
        </p>
      )}
      {checkoutStatus === 'error' && checkoutError && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {checkoutError}
        </p>
      )}
    </aside>
  )
}

export default CartDrawer