import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import type { CartItem } from './types';
import type { BookItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [books, setBooks] = useState<BookItem[]>([]);

  return (
    <div className="container mt-3"> 
      <h2 className="display-5 mb-4">Your Cart</h2>
      <CartList 
      cartItems={cartItems} 
      setCartItems={setCartItems} 
      books={books} 
      />
      <h2 className="display-5 mb-4">Want Something to Read?</h2>
      <ProductList 
      cartItems={cartItems} 
      setCartItems={setCartItems} 
      books={books}
      setBooks={setBooks}
      />
     
    </div>
  )

}

