import type { CartItem } from "../types";
import type { BookItem } from "../types";

type Props = {
    item: CartItem
    books: BookItem[]
};
export default function CartItemRow({ item, books }: Props) {
    const book = books.find(b => b.id === item.productId);
    return (
        <tr >
            <td>{book?.title || "TITLE NOT FOUND"}</td>
            <td>${book?.price.toFixed(2)} </td>
            <td>{item.quantity}</td>
        </tr>
    );

}