import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import type { BookItem } from "./types";
const bookData = "https://67b8cc07699a8a7baef54f13.mockapi.io/api/bookstore/"; //mockapi
// const bookData = "http://localhost:3000/";

export default function NewBooks() {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
  
    // Render the list of books.
  useEffect( () => {
    const asyncFunction = async () => {
      setLoading(true);
      try {
          const response = await fetch(bookData + "newBooks");

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


    return(
      <>
      <h4 className="display-5 mb-4">Upcoming Titles</h4>
      <p>New titles available for pre-order. Pre-orders purchased today will ship when available.</p>
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
              >
                ${book.price.toFixed(2)}</button>
              </div>
              
            </div>
          )) 
        }
        
        </div>
      </>
        )
}