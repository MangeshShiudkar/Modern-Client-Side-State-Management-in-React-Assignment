import { useEffect } from 'react'
import { CheckoutContext } from '../checkout/CheckoutContext'
import { useCartStore } from '../stores/cartStore'

function OrderCompletionBridge({
  onComplete,
}: {
  onComplete: (orderId: string | number) => void
}) {
  const actorRef = CheckoutContext.useActorRef()
  const clearCart = useCartStore((state) => state.clear)

  useEffect(() => {
    const subscription = actorRef.on('orderSuccess', ({ orderId }) => {
      clearCart()
      onComplete(orderId)
    })
    return () => subscription.unsubscribe()
  }, [actorRef, clearCart, onComplete])

  return null
}

export default OrderCompletionBridge