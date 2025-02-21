import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import NewBooks from './NewBooks';
import Root from './Root';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import ErrorPage from './components/ErrorPage';

//Paths for each page of the bookstore app.
const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,

      children: [{
        path: "/",
        element: <ProductList/>
      },
      {
        path: "/books-cart",
        element: <CartList/>
      } ,
      {
        path: "/newbooks",
        element: <NewBooks/>
      }
      ]
  }]
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
