import CartItemsList from './CartItemsList'

function CartDrawer() {
  return (
    <aside className="h-fit border-t-2 border-emerald-800 bg-white p-5 lg:border-t-0 lg:border-l-2 lg:border-l-emerald-800">
      <h2 className="text-xl font-bold">Your cart</h2>
      <CartItemsList />
    </aside>
  )
}

export default CartDrawer