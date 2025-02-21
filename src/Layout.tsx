import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div>
        <Link to="/">Home</Link>
        <Link to="/books-cart">Cart</Link>
        <Link to="/newbooks">New Books</Link>
        <Outlet />
      </div>
    )
}