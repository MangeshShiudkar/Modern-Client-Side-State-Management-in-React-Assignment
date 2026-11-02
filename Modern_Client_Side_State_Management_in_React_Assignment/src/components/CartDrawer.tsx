import { selectCartIsEmpty, selectCartTotal, useCartStore } from '../stores/cartStore'
import CartItemsList from './CartItemsList'
import CartErrorBanner from './CartErrorBanner'
import CheckoutButton from './CheckoutButton'

function CartDrawer({ onContinueCheckout }: { onContinueCheckout: () => void }) {
  const total = useCartStore(selectCartTotal)
  const isCartEmpty = useCartStore(selectCartIsEmpty)

  return (
    <aside className="h-fit border-t-2 border-emerald-800 bg-white p-5 xl:border-t-0 xl:border-l-2 xl:border-l-emerald-800">
      <h2 className="text-xl font-bold">Your cart</h2>
      <CartItemsList />
      {!isCartEmpty && (
        <p className="mt-5 flex justify-between border-t border-stone-200 pt-4 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      )}
      <CheckoutButton onContinueCheckout={onContinueCheckout} />
      <CartErrorBanner />
    </aside>
  )
}

export default CartDrawer