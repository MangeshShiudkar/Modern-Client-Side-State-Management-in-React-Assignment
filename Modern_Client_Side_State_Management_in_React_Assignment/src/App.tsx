
import { useEffect, useState } from 'react'
import CartDrawer from './components/CartDrawer'
import Catalog from './components/Catalog'
import Header from './components/Header'
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

export default App
