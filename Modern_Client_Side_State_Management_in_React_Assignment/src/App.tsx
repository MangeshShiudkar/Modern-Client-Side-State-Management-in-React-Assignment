
import { useEffect, useState } from 'react'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load products. Please try again.')
        }

        return response.json() as Promise<Product[]>
      })
      .then(setProducts)
      .catch(() => setError('Unable to load products. Please try again.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <Header />
      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <Catalog products={products} isLoading={isLoading} error={error} />
        <CartDrawer />
      </main>
    </div>
  )
}

function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <Toolbar />
    </header>
  )
}

function Toolbar() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
      <a className="text-xl font-bold tracking-tight" href="/">
        ShopCart
      </a>
      <CartBadge />
    </div>
  )
}

function CartBadge() {
  return (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">
      Cart · 0
    </span>
  )
}

function Catalog({
  products,
  isLoading,
  error,
}: {
  products: Product[]
  isLoading: boolean
  error: string
}) {
  return (
    <section aria-labelledby="catalog-heading">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Everyday essentials
        </p>
        <h1 id="catalog-heading" className="mt-2 text-3xl font-bold tracking-tight">
          Shop the catalog
        </h1>
      </div>

      {isLoading && <p className="text-stone-600">Loading products...</p>}
      {error && <p className="rounded-md bg-red-50 p-4 text-red-800">{error}</p>}

      {!isLoading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

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

function CartDrawer() {
  return (
    <aside className="h-fit border-t-2 border-emerald-800 bg-white p-5 lg:border-t-0 lg:border-l-2 lg:border-l-emerald-800">
      <h2 className="text-xl font-bold">Your cart</h2>
      <CartItemsList />
    </aside>
  )
}

function CartItemsList() {
  return <p className="mt-4 text-sm text-stone-600">Your cart is empty.</p>
}

export default App
