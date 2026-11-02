import { useEffect } from 'react'
import { CheckoutContext } from '../checkout/CheckoutContext'
import { useCartStore } from '../stores/cartStore'

function CartSynchronizer() {
  const actorRef = CheckoutContext.useActorRef()
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    actorRef.send({ type: 'SYNC_ITEMS', items })
  }, [actorRef, items])

  return null
}

export default CartSynchronizer