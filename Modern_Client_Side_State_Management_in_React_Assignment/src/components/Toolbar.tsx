import type { ReactNode } from 'react'

function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
      <a className="text-xl font-bold tracking-tight" href="/">
        ShopCart
      </a>
      {children}
    </div>
  )
}

export default Toolbar