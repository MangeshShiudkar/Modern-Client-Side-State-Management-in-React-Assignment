import { CheckoutContext } from '../checkout/CheckoutContext'

function PaymentPanel({ completedOrderId }: { completedOrderId: string | number | null }) {
  const actorRef = CheckoutContext.useActorRef()
  const isPaymentReady = CheckoutContext.useSelector((snapshot) => snapshot.matches('payment'))
  const isSubmitting = CheckoutContext.useSelector((snapshot) => snapshot.matches('submitting'))
  const isSuccess = CheckoutContext.useSelector((snapshot) => snapshot.matches('success'))
  const isOrderSuccessful = completedOrderId !== null || isSuccess
  const errorMessage = CheckoutContext.useSelector((snapshot) => snapshot.context.errorMessage)
  const canSubmit = CheckoutContext.useSelector((snapshot) => snapshot.can({ type: 'SUBMIT' }))

  if (!isPaymentReady && !isSubmitting && !isSuccess && !errorMessage && completedOrderId === null) {
    return null
  }

  return (
    <aside
      aria-labelledby="payment-heading"
      className="h-fit border-t-2 border-emerald-800 bg-white p-5 xl:border-t-0 xl:border-l-2 xl:border-l-emerald-800"
      id="payment-panel"
    >
      <h2 className="text-xl font-bold" id="payment-heading">Payment</h2>
      <p
        className={`mt-3 text-sm ${isOrderSuccessful ? 'font-semibold text-green-700' : 'text-stone-600'}`}
        role="status"
      >
        {completedOrderId !== null ? (
          <>Order completed successfully. Order ID: {completedOrderId}.</>
        ) : isSubmitting
          ? 'Payment is being processed.'
          : isSuccess
            ? 'Order completed successfully.'
            : isPaymentReady
              ? 'Your payment is ready to be submitted from the cart.'
              : 'Review your cart before continuing to payment.'}
      </p>
      {errorMessage && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}
      {isPaymentReady && (
        <button
          className="mt-5 w-full rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-stone-300"
          disabled={!canSubmit}
          onClick={() => actorRef.send({ type: 'SUBMIT' })}
          type="button"
        >
          Submit Payment
        </button>
      )}
      {(isSubmitting || isPaymentReady) && (
        <button
          className="mt-5 w-full rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold hover:bg-stone-100"
          onClick={() => actorRef.send({ type: 'CANCEL' })}
          type="button"
        >
          Cancel
        </button>
      )}
    </aside>
  )
}

export default PaymentPanel