import CartBadge from './CartBadge'
import Toolbar from './Toolbar'

function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <Toolbar>
        <CartBadge />
      </Toolbar>
    </header>
  )
}

export default Header