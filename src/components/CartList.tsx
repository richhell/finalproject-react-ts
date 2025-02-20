import { CartItem } from "../types";
import { useEffect } from "react";
import type { BookItem } from "../types";
import CartItemRow from "./CartItemRow";
const bookData = "http://localhost:3000/";

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    books: BookItem[]
    
}
export default function CartList({ cartItems, setCartItems, books }: Props) {

     useEffect( () => {
        const asyncFunction = async () => {
          const response = await fetch(bookData + "cart");
          const data = await response.json()
          setCartItems(data);
        }
        asyncFunction();
      }, []
    
    );

    return(
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