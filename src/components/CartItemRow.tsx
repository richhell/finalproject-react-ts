import type { CartItem } from "../types";
import type { BookItem } from "../types";

type Props = {
    item: CartItem
    books: BookItem[]
    deleteBook: (id: number) => void
};
export default function CartItemRow({ item, books, deleteBook }: Props) {
    const book = books.find(b => b.id === item.productId);
    return (
        <tr >
            <td>{book?.title || "TITLE NOT FOUND"}</td>
            <td>${book?.price.toFixed(2)} </td>
            <td>{item.quantity}</td>
            <td >
                <button className="btn btn-outline-info btn-xs"
                onClick={() => book && deleteBook(item.id)}
                disabled={!book}
                >Remove</button>
            </td>
        </tr>
    );

}