import { CartItem } from "../types";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import type { BookItem } from "../types";
import CartItemRow from "./CartItemRow";
const bookData = "http://localhost:3000/";


export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

     useEffect( () => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await fetch(bookData + "cart");
                if (!response.ok) {
                    setError("Uh-oh! Something went wrong. " + response.statusText);
                } else {
                const data = await response.json()
                setCartItems(data);
                }
            } catch (error: any) {
                setError("Uh-oh! Something went wrong. " + error.message);
            }
            setLoading(false);
        }
        fetchCart()

        const fetchBooks = async () => {
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
        fetchBooks();
      }, []
    
    );

    // Remove a book from the cart.
    const deleteBook = (id: number) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
    };
    
    // Render the list of books in the cart.
    return(
        <>
        <h4 className="display-5 mb-4">Your Cart</h4>
        {loading ? (
            <div className="spinner-container">
            <Spinner variant="primary" />
          </div>
        )
         : error ? (
            <p className="alert alert-danger">{error}</p> ) :
         (
        <table className="table table-striped">
            <tbody>
            {cartItems.map(item => (
                <CartItemRow 
                key={item.id} 
                item={item} 
                books={books}
                />
            ))}
            </tbody>
        </table>
        
        )
        
         }
        </>
    )
}