export interface Product {
  id: string
  name: string
  price: number
}

export interface CartItem extends Product {
  qty: number
}

export interface CheckoutResult {
  id: string | number
  items: CartItem[]
  total: number
}