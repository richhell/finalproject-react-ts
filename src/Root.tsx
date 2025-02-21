import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
export default function Root() {
  
  return (
    <div className="container"> 
      <ul className="nav bg-light mb-3 border-bottom" >
        <li className='nav-item'>
          <NavLink to="/" className="nav-link">Books</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to="/books-cart" className="nav-link">Your Cart</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to="/newbooks" className="nav-link">New Books</NavLink>
        </li>
      </ul>
      <Outlet />
     
    </div>
  )

}

