import { CheckoutContext } from '../checkout/CheckoutContext'

function CheckoutButton({ onContinueCheckout }: { onContinueCheckout: () => void }) {
  const actorRef = CheckoutContext.useActorRef()
  const isReviewing = CheckoutContext.useSelector((snapshot) => snapshot.matches('review'))
  const canContinue = CheckoutContext.useSelector((snapshot) => snapshot.can({ type: 'CONTINUE' }))

  if (!isReviewing) {
    return null
  }

  return (
    <button
      className="mt-5 w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      disabled={!canContinue}
      onClick={() => {
        onContinueCheckout()
        actorRef.send({ type: 'CONTINUE' })
      }}
      type="button"
    >
      Continue to payment
    </button>
  )
}

export default CheckoutButton