import { useCartDispatch } from '../context/useCart'
import type { Product } from '../types'

function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch()

  return (
    <article className="flex min-h-52 flex-col justify-between rounded-md border border-stone-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="mt-3 text-xl font-bold text-emerald-900">${product.price.toFixed(2)}</p>
      </div>
      <button
        className="mt-6 rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
        onClick={() => dispatch({ type: 'added', product })}
        type="button"
      >
        Add to cart
      </button>
    </article>
  )
}

export default ProductCard