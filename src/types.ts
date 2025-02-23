export type BookItem = {
    id: number
    title: string
    author: string
    genre: string
    price: number
    pubdate: string
  }

  export type CartItem = {
    id: number
    productId: number
    quantity: number
  }