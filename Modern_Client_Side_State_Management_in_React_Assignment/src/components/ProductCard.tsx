import type { Product } from '../types'

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex min-h-52 flex-col justify-between rounded-md border border-stone-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="mt-3 text-xl font-bold text-emerald-900">${product.price.toFixed(2)}</p>
      </div>
      <button
        className="mt-6 cursor-not-allowed rounded-md bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-500"
        disabled
        title="Cart actions will be added in the next assignment step."
        type="button"
      >
        Add to cart
      </button>
    </article>
  )
}

export default ProductCard