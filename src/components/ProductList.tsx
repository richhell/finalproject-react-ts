import { useEffect } from "react";
import type { BookItem, CartItem } from "../types";
const bookData = "http://localhost:3000/";

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    books: BookItem[]
    setBooks: (newValue: BookItem[]) => void
}
export default function ProductList({ setCartItems, cartItems, books, setBooks }: Props) {
  
    // Render the list of books.
  useEffect( () => {
    const asyncFunction = async () => {
      const response = await fetch(bookData + "books");
      const data = await response.json()
      setBooks(data);
    }
    asyncFunction();
  }, []);

//Add a book to the cart. 
  const addToCart = async (productId: number) => {
    const newCartItem = {
      productId: productId,
      quantity: 1,
    }
    const response = await fetch(bookData + "cart", {
      method: "POST",
      body: JSON.stringify(newCartItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const newlyCreatedCartItem = await response.json()
    setCartItems( [...cartItems, newlyCreatedCartItem] )
  }

    return(
        <div className="d-flex flex-wrap gap-3">
       
        { books.map(book => (
            <div className="card flex-grow-1" key={book.id}>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="card-text">{book.genre}</p>
                <button 
                className="btn btn-primary" 
                onClick={() => addToCart(book.id)}
                
                >
                  ${book.price.toFixed(2)}</button>
              </div>
              
            </div>
          )) }
        </div>
    )
}