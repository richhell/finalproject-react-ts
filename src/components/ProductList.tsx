import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import type { BookItem, CartItem } from "../types";
const bookData = "http://localhost:3000/";

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    books: BookItem[]
    setBooks: (newValue: BookItem[]) => void
}
export default function ProductList({ setCartItems, cartItems, books, setBooks }: Props) {
      const [loading, setLoading] = useState(false);
      const [isAdding, setIsAdding] = useState(false);
      const [error, setError] = useState<null | string>(null);
  
  
    // Render the list of books.
  useEffect( () => {
    const asyncFunction = async () => {
      setLoading(true);
      try {
          const response = await fetch(bookData + "books");

          if (!response.ok) {
            setError("Uh-oh! Something went wrong. " + response.statusText);
          } else {
            const data = await response.json()
            setBooks(data);
            setError(null);
      }
    } catch (error: any) {
      setError("Uh-oh! Something went wrong. " + error.message);
    }
    setLoading(false);
  }
    asyncFunction();
  }, []);

//Add a book to the cart. 
  const addToCart = async (productId: number) => {
    const newCartItem = {
      productId: productId,
      quantity: 1,
    }
    setIsAdding(true);
    try { 
      const response = await fetch(bookData + "cart", {
        method: "POST",
        body: JSON.stringify(newCartItem),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        setError("Uh-oh! Something went wrong. " + response.statusText);
      } else {
      const newlyCreatedCartItem = await response.json()
      setCartItems( [...cartItems, newlyCreatedCartItem] )
      }
    } catch (error: any) {
      setError("Uh-oh! Something went wrong. " + error.message);
    }
    setIsAdding(false);
  }
    return(
        <div className="d-flex flex-wrap gap-3">
        {loading && 
          <div className="spinner-container">
            <Spinner variant="primary" />
          </div>}
        {error && <p className="alert alert-danger">{error}</p>}
        { books.map(book => (
            <div className="card flex-grow-1" key={book.id}>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="card-text">{book.genre}</p>
                <button 
                className="btn btn-primary" 
                disabled={isAdding}
                onClick={() => addToCart(book.id)}
              >
                ${book.price.toFixed(2)}</button>
              </div>
              
            </div>
          )) 
        }
        
        </div>
        )

    
}