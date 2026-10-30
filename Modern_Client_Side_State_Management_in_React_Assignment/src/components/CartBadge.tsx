import { useAtomValue } from 'jotai'
import { cartItemCountAtom } from '../atoms/cartAtoms'

function CartBadge() {
  const itemCount = useAtomValue(cartItemCountAtom)

  return (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">
      Cart : {itemCount}
    </span>
  )
}

export default CartBadge