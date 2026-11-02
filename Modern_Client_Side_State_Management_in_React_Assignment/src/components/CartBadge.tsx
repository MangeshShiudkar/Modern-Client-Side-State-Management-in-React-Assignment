import { selectCartItemCount, useCartStore } from '../stores/cartStore'

function CartBadge() {
  const itemCount = useCartStore(selectCartItemCount)

  return (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">
      Cart · {itemCount}
    </span>
  )
}

export default CartBadge