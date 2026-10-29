import type { Product } from '../types'
import ProductCard from './ProductCard'

interface CatalogProps {
  products: Product[]
  isLoading: boolean
  error: string
}

function Catalog({ products, isLoading, error }: CatalogProps) {
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

export default Catalog