import { CartItem } from "../types";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import type { BookItem } from "../types";
import CartItemRow from "./CartItemRow";
const bookData = "http://localhost:3000/";

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    books: BookItem[]
    
}
export default function CartList({ cartItems, setCartItems, books }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

     useEffect( () => {
        const asyncFunction = async () => {
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
        asyncFunction();
      }, []
    
    );

    return(
        <>
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
                books={books}/>
            ))}
            </tbody>
        </table>
        
        )
        
         }
        </>
    )
}