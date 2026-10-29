import { useCartState } from '../context/useCart'

function CartBadge() {
  const { items } = useCartState()
  const itemCount = items.reduce((count, item) => count + item.qty, 0)

  return (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">
      Cart : {itemCount}
    </span>
  )
}

export default CartBadge