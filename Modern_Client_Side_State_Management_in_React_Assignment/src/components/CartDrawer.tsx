import { useAtomValue, useSetAtom } from 'jotai'
import { cartIsEmptyAtom, cartTotalAtom, checkoutAtom, checkoutMessageAtom, checkoutStatusAtom, clearCartAtom,} from '../atoms/cartAtoms'
import CartItemsList from './CartItemsList'

function CartDrawer() {
  const total = useAtomValue(cartTotalAtom)
  const isCartEmpty = useAtomValue(cartIsEmptyAtom)
  const checkoutMessage = useAtomValue(checkoutMessageAtom)
  const checkoutStatus = useAtomValue(checkoutStatusAtom)
  const checkout = useSetAtom(checkoutAtom)
  const clearCart = useSetAtom(clearCartAtom)

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
      <div className="mt-5 grid gap-2">
        <button
          className="w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          disabled={isCartEmpty || checkoutStatus === 'submitting'}
          onClick={() => checkout()}
          type="button"
        >
          {checkoutStatus === 'submitting' ? 'Submitting order...' : 'Checkout'}
        </button>
        <button
          className="w-full rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-400"
          disabled={isCartEmpty || checkoutStatus === 'submitting'}
          onClick={() => clearCart()}
          type="button"
        >
          Clear cart
        </button>
      </div>
      {checkoutMessage && (
        <p
          className={`mt-3 text-sm ${checkoutStatus === 'error' ? 'text-red-700' : 'text-green-600'}`}
          role={checkoutStatus === 'error' ? 'alert' : 'status'}
        >
          {checkoutMessage}
        </p>
      )}
    </aside>
  )
}

export default CartDrawer