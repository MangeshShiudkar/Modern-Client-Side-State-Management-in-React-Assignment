import { CheckoutContext } from '../checkout/CheckoutContext'

function CartErrorBanner() {
  const errorMessage = CheckoutContext.useSelector((snapshot) => snapshot.context.errorMessage)

  if (!errorMessage) {
    return null
  }

  return (
    <p className="mt-3 text-sm text-red-700" role="alert">
      {errorMessage}
    </p>
  )
}

export default CartErrorBanner