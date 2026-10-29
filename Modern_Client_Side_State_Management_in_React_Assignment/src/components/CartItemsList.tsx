import { useCartDispatch, useCartState } from '../context/useCart'

function CartItemsList() {
  const { items } = useCartState()
  const dispatch = useCartDispatch()

  if (items.length === 0) {
    return <p className="mt-4 text-sm text-stone-600">Your cart is empty.</p>
  }

  return (
    <ul className="mt-4 divide-y divide-stone-200">
      {items.map((item) => (
        <li className="flex items-start justify-between gap-3 py-4" key={item.id}>
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="mt-1 text-sm text-stone-600">
              ${item.price.toFixed(2)} each · Qty {item.qty}
            </p>
            <p className="mt-1 text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</p>
          </div>
          <button
            className="text-sm font-medium text-red-700 underline decoration-red-300 underline-offset-2 hover:text-red-900"
            onClick={() => dispatch({ type: 'removed', id: item.id })}
            type="button"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CartItemsList