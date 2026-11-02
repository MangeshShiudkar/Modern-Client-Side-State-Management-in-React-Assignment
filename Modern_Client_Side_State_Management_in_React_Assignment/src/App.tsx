import { useEffect, useState } from 'react'
import { CheckoutContext } from './checkout/CheckoutContext'
import CartDrawer from './components/CartDrawer'
import Catalog from './components/Catalog'
import Header from './components/Header'
import CartSynchronizer from './components/CartSynchronizer'
import OrderCompletionBridge from './components/OrderCompletionBridge'
import PaymentPanel from './components/PaymentPanel'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkoutSession, setCheckoutSession] = useState(0)
  const [completedOrderId, setCompletedOrderId] = useState<string | number | null>(null)

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
    <CheckoutContext.Provider key={checkoutSession}>
      <CartSynchronizer />
      <OrderCompletionBridge
        onComplete={(orderId) => {
          setCompletedOrderId(orderId)
          setCheckoutSession((session) => session + 1)
        }}
      />
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <Header />
        <main className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_20rem_20rem]">
          <Catalog products={products} isLoading={isLoading} error={error} />
          <CartDrawer onContinueCheckout={() => setCompletedOrderId(null)} />
          <PaymentPanel completedOrderId={completedOrderId} />
        </main>
      </div>
    </CheckoutContext.Provider>
  )
}

export default App
